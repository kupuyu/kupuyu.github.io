import { chromium } from 'playwright-core';
import path from 'node:path';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);

await page.evaluate(() => window.scrollTo({ top: document.getElementById('contact').offsetTop, behavior: 'instant' }));
await page.waitForTimeout(1000);
await page.screenshot({ path: path.resolve('qa/check-contact-top.png') });

await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
await page.waitForTimeout(1000);
await page.screenshot({ path: path.resolve('qa/check-contact-bottom.png') });

await page.evaluate(() => window.scrollTo({ top: document.getElementById('about').offsetTop - 38, behavior: 'instant' }));
await page.waitForTimeout(900);
await page.screenshot({ path: path.resolve('qa/check-about.png') });

const info = await page.evaluate(() => {
  const q = (s) => {
    const el = document.querySelector(s);
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), opacity: getComputedStyle(el).opacity };
  };
  return {
    contact: q('.contact'),
    foot: q('.contact__foot'),
    footerRow: q('.contact__footer-row'),
    legal: q('.contact__legal'),
    details: q('.contact__details'),
    nook: q('.contact-nook'),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
