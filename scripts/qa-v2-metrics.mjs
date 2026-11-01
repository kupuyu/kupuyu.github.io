import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

async function snapshot(name, scrollTo) {
  await page.evaluate((target) => {
    if (target === 'bottom') {
      window.scrollTo(0, document.documentElement.scrollHeight);
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, scrollTo);
  await page.waitForTimeout(1400);
  const metrics = await page.evaluate(() => {
    const selectors = [
      '.contact',
      '.contact__inner',
      '.contact__top',
      '.contact__main',
      '.contact__pitch',
      '.contact__details',
      '.contact-footer',
      '.contact-footer__inner',
      '.contact-footer__brand',
      '.contact-nook',
      '.contact__rabbit',
      '.hero__inner',
      '.hero__foot',
      '.hero__title',
      '.hero__scene',
      '.about__band',
      '.about__cat',
      '.about__cat-leaves',
      '.about__stats',
      '.projects',
      '.projects__intro',
      '.projects__intro h2',
      '.projects__rail-wrap',
      '.projects__tear',
      '.contact__tear',
    ];
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y + window.scrollY),
        w: Math.round(r.width),
        h: Math.round(r.height),
        bottom: Math.round(r.bottom + window.scrollY),
        display: getComputedStyle(el).display,
        opacity: getComputedStyle(el).opacity,
        zIndex: getComputedStyle(el).zIndex,
      };
    };
    return {
      scrollY: Math.round(window.scrollY),
      innerHeight: window.innerHeight,
      pageHeight: document.documentElement.scrollHeight,
      contactTop: Math.round(document.querySelector('.contact').getBoundingClientRect().top + window.scrollY),
      items: Object.fromEntries(selectors.map((selector) => [selector, rect(document.querySelector(selector))])),
    };
  });
  await page.screenshot({ path: `qa/${name}.png` });
  console.log(name, JSON.stringify(metrics, null, 2));
}

await snapshot('v2-contact-top-1920', '#contact');
await snapshot('v2-contact-bottom-1920', 'bottom');

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#contact').scrollIntoView());
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(1400);
await page.screenshot({ path: 'qa/v2-contact-bottom-390.png' });
console.log(
  'mobile-contact',
  JSON.stringify(
    await page.evaluate(() => {
      const info = {};
      for (const selector of ['.contact', '.contact-nook', '.contact-footer', '.contact-footer__inner', '.contact-footer__nav', '.about__stats']) {
        const el = document.querySelector(selector);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        info[selector] = {
          y: Math.round(r.y + window.scrollY),
          h: Math.round(r.height),
          bottom: Math.round(r.bottom + window.scrollY),
          opacity: getComputedStyle(el).opacity,
        };
      }
      return { pageHeight: document.documentElement.scrollHeight, scrollY: Math.round(window.scrollY), info };
    }),
    null,
    2,
  ),
);

await browser.close();
