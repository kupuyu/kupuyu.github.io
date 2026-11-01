import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(700);
// Walk so reveals fire
for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 420) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await page.waitForTimeout(80);
}
await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const details = {};
  for (const selector of ['.contact__pitch', '.contact__details', '.contact__pitch h2', '.contact__cta .button', '.contact__copy', '.contact__inner']) {
    const el = document.querySelector(selector);
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    details[selector] = {
      class: el.className?.baseVal ?? el.className,
      opacity: cs.opacity,
      color: cs.color,
      filter: cs.filter,
      transform: cs.transform,
      top: Math.round(r.top),
      height: Math.round(r.height),
      mixBlend: cs.mixBlendMode,
    };
  }
  return {
    scrollY: window.scrollY,
    elementsAtPoint: [...document.elementsFromPoint(140, 260)].map((el) => `${el.tagName}.${el.className?.baseVal ?? el.className}`),
    details,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: 'qa/debug-contact-390.png' });
await page.locator('.contact__pitch').screenshot({ path: 'qa/debug-contact-pitch-390.png' });
await browser.close();
