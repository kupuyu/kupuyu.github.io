import { chromium } from 'playwright-core';
import path from 'node:path';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(900);

// Walk the page so every IntersectionObserver reveal has fired before capture.
const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 500) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await page.waitForTimeout(120);
}
await page.waitForTimeout(600);

await page.evaluate(() => window.scrollTo({ top: document.getElementById('about').offsetTop, behavior: 'instant' }));
await page.waitForTimeout(500);
await page.screenshot({ path: path.resolve('qa/mobile-about-revealed.png') });

const stats = await page.evaluate(() =>
  [...document.querySelectorAll('.about__stats li')].map((el) => {
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), h: Math.round(r.height), opacity: getComputedStyle(el).opacity };
  }),
);

await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: path.resolve('qa/mobile-contact-bottom.png') });

console.log(JSON.stringify({ pageHeight: height, stats }, null, 2));
await browser.close();
