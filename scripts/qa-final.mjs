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

const results = {};

// ---------- desktop functional pass ----------
{
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);

  // Anchor navigation
  const anchors = {};
  for (const id of ['about', 'projects', 'contact']) {
    await page.locator(`.site-header a[href="#${id}"]`).first().click();
    await page.waitForTimeout(1800);
    anchors[id] = await page.evaluate((sectionId) => {
      const section = document.getElementById(sectionId);
      return {
        scrollY: Math.round(window.scrollY),
        sectionTop: section.offsetTop,
        viewportTop: Math.round(section.getBoundingClientRect().top),
      };
    }, id);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);

  // Copy WeChat + project dialog interaction
  await page.locator('.site-header a[href="#contact"]').first().click();
  await page.waitForTimeout(600);
  const copyButton = page.locator('.contact__block .copy-value').first();
  await copyButton.click();
  await page.waitForTimeout(250);
  const copyState = await page.evaluate(() => {
    const el = document.querySelector('.contact__block .copy-value');
    return {
      copied: Boolean(el?.classList.contains('is-copied')),
      tooltip: el?.getAttribute('data-tooltip'),
      status: el?.querySelector('.sr-only')?.textContent,
    };
  });

  await page.locator('.site-header a[href="#projects"]').first().click();
  await page.waitForTimeout(600);
  await page.locator('.project-card').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'final-modal-1920.png') });
  const modalOpen = await page.evaluate(() => ({
    open: Boolean(document.querySelector('dialog[open]')),
    title: document.querySelector('dialog[open] h3')?.textContent?.trim(),
  }));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  const modalClosed = await page.evaluate(() => !document.querySelector('dialog[open]'));

  // Video + page metrics
  const metrics = await page.evaluate(() => {
    const video = document.querySelector('.hero__video');
    const images = [...document.querySelectorAll('img')];
    return {
      pageHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
      video: video ? {
        readyState: video.readyState,
        paused: video.paused,
        duration: Math.round(video.duration * 10) / 10,
        size: `${video.videoWidth}x${video.videoHeight}`,
      } : null,
      brokenImages: images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
    };
  });

  results.desktop = { anchors, copyState, modalOpen, modalClosed, metrics, errors };
  await page.close();
}

// ---------- 1440 contact screenshot ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  await page.locator('.site-header a[href="#contact"]').first().click();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(OUT, 'final-contact-1440.png') });
  results.contact1440 = await page.evaluate(() => {
    const rect = (selector) => {
      const el = document.querySelector(selector);
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
    };
    return { contact: rect('.contact'), nook: rect('.contact-nook'), foot: rect('.contact-footer') };
  });
  await page.close();
}

// ---------- mobile pass ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);

  // Walk so every reveal fires.
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < pageHeight; y += 420) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(500);

  // Mobile menu open + nav click.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.locator('.menu-toggle').click();
  await page.waitForTimeout(400);
  const menuOpen = await page.evaluate(() => {
    const menu = document.querySelector('.mobile-menu');
    return { visible: Boolean(menu && getComputedStyle(menu).visibility !== 'hidden'), expanded: document.querySelector('.menu-toggle')?.getAttribute('aria-expanded') };
  });
  await page.screenshot({ path: path.join(OUT, 'final-menu-390.png') });
  await page.locator('.mobile-menu a[href="#projects"]').first().click();
  await page.waitForTimeout(900);
  const menuAfterNav = await page.evaluate(() => ({
    menuOpen: Boolean(document.querySelector('.site-header.is-open')),
    expanded: document.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
    projectsTop: Math.round(document.getElementById('projects').getBoundingClientRect().top),
  }));

  // Bottom of contact.
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(OUT, 'final-contact-390.png') });
  const contactMetrics = await page.evaluate(() => {
    const rect = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), height: Math.round(r.height) };
    };
    return {
      scrollY: Math.round(window.scrollY),
      pageHeight: document.documentElement.scrollHeight,
      contact: rect('.contact'),
      nook: rect('.contact-nook'),
      foot: rect('.contact-footer'),
      brand: rect('.contact-footer__brand'),
      nookOpacity: getComputedStyle(document.querySelector('.contact-nook')).opacity,
    };
  });

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'final-full-390.png'), fullPage: true });
  results.mobile = { menuOpen, menuAfterNav, contactMetrics };
  await page.close();
}

// ---------- reduced motion ----------
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  results.reducedMotion = await page.evaluate(() => ({
    copyTransform: document.querySelector('.hero__copy')?.style.transform || '',
    videoPaused: document.querySelector('.hero__video')?.paused,
    pageWidth: document.documentElement.scrollWidth,
  }));
  await page.screenshot({ path: path.join(OUT, 'final-hero-reduced-1440.png') });
  await context.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
