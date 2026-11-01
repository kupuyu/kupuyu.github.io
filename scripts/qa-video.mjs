import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

async function sample(reducedMotion) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  const read = () => page.evaluate(() => {
    const v = document.querySelector('.hero__video');
    return {
      paused: v.paused,
      muted: v.muted,
      autoplay: v.autoplay,
      readyState: v.readyState,
      currentTime: Math.round(v.currentTime * 100) / 100,
      playPromise: v.play ? 'function' : 'none',
    };
  });
  const samples = [await read()];
  await page.waitForTimeout(1500);
  samples.push(await read());
  await page.evaluate(() => document.querySelector('.hero__video').play().catch((e) => e.message));
  await page.waitForTimeout(800);
  samples.push(await read());
  await context.close();
  return samples;
}

console.log(JSON.stringify({ normal: await sample('no-preference'), reduced: await sample('reduce') }, null, 2));
await browser.close();
