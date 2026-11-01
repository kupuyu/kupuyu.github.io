import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('qa');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

async function settle(page, ms = 650) {
  await page.waitForTimeout(ms);
}

async function jump(page, selector, offset = 0) {
  await page.evaluate(
    ([sel, off]) => {
      const el = document.querySelector(sel);
      window.scrollTo({ top: el.offsetTop + off, behavior: 'instant' });
    },
    [selector, offset],
  );
  await settle(page);
}

const report = {};

for (const [label, width, height] of [
  ['1920', 1920, 1080],
  ['1440', 1440, 900],
  ['390', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await settle(page, 1200);

  const pageInfo = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    pageHeight: document.documentElement.scrollHeight,
    errors: window.__qaErrors || [],
  }));
  report[label] = pageInfo;

  if (label === '390') {
    await page.screenshot({ path: path.join(out, 'review-390-hero.png') });
    await jump(page, '#about', 0);
    await page.screenshot({ path: path.join(out, 'review-390-about.png') });
    await jump(page, '#projects', 0);
    await page.screenshot({ path: path.join(out, 'review-390-projects.png') });
    await jump(page, '#contact', 0);
    await page.screenshot({ path: path.join(out, 'review-390-contact.png') });
    await page.screenshot({ path: path.join(out, 'review-390-full.png'), fullPage: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page);
    await page.getByRole('button', { name: /菜单|menu/i }).click();
    await settle(page);
    await page.screenshot({ path: path.join(out, 'review-390-menu.png') });
  } else {
    await page.screenshot({ path: path.join(out, `review-${label}-hero.png`) });
    await jump(page, '#about', -38);
    await page.screenshot({ path: path.join(out, `review-${label}-about.png`) });
    await jump(page, '#projects', -38);
    await page.screenshot({ path: path.join(out, `review-${label}-projects.png`) });
    await jump(page, '#contact', 0);
    await page.screenshot({ path: path.join(out, `review-${label}-contact.png`) });
    await page.screenshot({ path: path.join(out, `review-${label}-full.png`), fullPage: true });
  }
  await page.close();
}

console.log(JSON.stringify(report, null, 2));
await browser.close();
