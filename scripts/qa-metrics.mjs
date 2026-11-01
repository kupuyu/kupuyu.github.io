import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#contact').scrollIntoView());
await page.waitForTimeout(1600);
const metrics = await page.evaluate(() => {
  const selectors = [
    '.contact',
    '.contact__inner',
    '.contact__top',
    '.contact__main',
    '.contact__pitch',
    '.contact__details',
    '.contact__foot',
    '.contact__footer-row',
    '.contact__legal',
    '.contact-nook',
    '.contact__rabbit',
    '.hero__inner',
    '.hero__foot',
    '.hero__title',
    '.about__tear',
    '.projects__tear',
    '.contact__tear',
  ];
  const rect = (el) => {
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
    scrollY: window.scrollY,
    innerHeight: window.innerHeight,
    pageHeight: document.documentElement.scrollHeight,
    contactTop: document.querySelector('.contact').getBoundingClientRect().top + window.scrollY,
    items: Object.fromEntries(selectors.map((selector) => [selector, rect(document.querySelector(selector))])),
  };
});
console.log(JSON.stringify(metrics, null, 2));
await browser.close();
