import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = process.env.QA_URL || 'http://127.0.0.1:5173/';
const OUT = path.resolve('qa');
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
page.on('requestfailed', (request) => errors.push(`requestfailed: ${request.url()}`));

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await page.screenshot({ path: path.join(OUT, 'site-01-hero-1920.png') });

const metrics = await page.evaluate(() => {
  const v = document.querySelector('.hero__video');
  const images = [...document.querySelectorAll('img')];
  return {
    width: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    title: document.title,
    video: v ? {
      readyState: v.readyState,
      paused: v.paused,
      duration: v.duration,
      width: v.videoWidth,
      height: v.videoHeight,
      currentSrc: v.currentSrc,
    } : null,
    brokenImages: images.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src),
    sections: [...document.querySelectorAll('section, footer')].map((node) => ({
      id: node.id,
      className: node.className,
      top: node.offsetTop,
      height: node.offsetHeight,
    })),
  };
});

for (const [id, name] of [
  ['about', 'site-02-about'],
  ['projects', 'site-03-projects'],
  ['contact', 'site-04-contact'],
]) {
  await page.evaluate((sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({ top: section.offsetTop - 38, behavior: 'instant' });
  }, id);
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, `${name}-1920.png`) });
}

// Project detail modal.
await page.evaluate(() => {
  const section = document.getElementById('projects');
  window.scrollTo({ top: section.offsetTop, behavior: 'instant' });
});
await page.waitForTimeout(500);
await page.locator('.project-card').first().click();
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(OUT, 'site-05-modal-1920.png') });
const dialogOpen = await page.evaluate(() => Boolean(document.querySelector('dialog[open]')));
await page.keyboard.press('Escape');
await page.waitForTimeout(300);

// Trigger reveals then capture the whole page.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.65;
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(OUT, 'site-00-full-1920.png'), fullPage: true });

const viewports = [
  { width: 1440, height: 900, name: 'site-06-hero-1440' },
  { width: 1366, height: 768, name: 'site-07-hero-1366' },
  { width: 1280, height: 800, name: 'site-08-hero-1280' },
  { width: 390, height: 844, name: 'site-09-mobile-390' },
];
const overflow = {};
for (const viewport of viewports) {
  const p = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1100);
  await p.screenshot({ path: path.join(OUT, `${viewport.name}.png`) });
  overflow[viewport.width] = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await p.close();
}

console.log(JSON.stringify({ metrics, dialogOpen, overflow, errors }, null, 2));
await browser.close();
