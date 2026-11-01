import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROOT = 'E:\\deepseek文件\\portfolio';
const PROFILE = path.join(ROOT, '.edge-verify-profile2');
const PORT = 9224;
fs.mkdirSync(path.join(ROOT, 'qa'), { recursive: true });
const URL = 'http://127.0.0.1:5173/';

fs.rmSync(PROFILE, { recursive: true, force: true });
const edge = spawn(EDGE, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE}`,
  '--window-size=1920,1080',
  URL,
], { stdio: 'ignore', windowsHide: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTarget() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('CDP target not found');
}

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
let nextId = 1;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
});
function send(method, params = {}) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: URL });
await sleep(2600);

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};

const metrics = await evaluate(`(() => {
  const video = document.querySelector('video');
  return {
    title: document.title,
    height: document.documentElement.scrollHeight,
    width: innerWidth,
    overflow: document.documentElement.scrollWidth > innerWidth,
    bodyFont: getComputedStyle(document.body).fontFamily,
    headingFont: getComputedStyle(document.querySelector('.hero__title')).fontFamily,
    video: video && {
      src: video.currentSrc, paused: video.paused, readyState: video.readyState,
      duration: video.duration, width: video.videoWidth, height: video.videoHeight
    },
    sections: [...document.querySelectorAll('#top, #about, #projects, #contact')].map((s) => ({
      id: s.id, top: Math.round(s.getBoundingClientRect().top + scrollY), height: Math.round(s.getBoundingClientRect().height)
    })),
    brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
  };
})()`);
console.log(JSON.stringify(metrics, null, 2));

async function shot(name, selector) {
  await evaluate(`document.querySelector('${selector}').scrollIntoView({behavior:'instant', block:'start'})`);
  await sleep(1400);
  const r = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  fs.writeFileSync(path.join(ROOT, 'qa', name), Buffer.from(r.data, 'base64'));
  const pos = await evaluate(`({scrollY, contact: document.querySelector('#contact').getBoundingClientRect().top})`);
  console.log(name, pos);
}

await shot('rec-about-1920.png', '#about');
await shot('rec-projects-1920.png', '#projects');
await shot('rec-contact-1920.png', '#contact');

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send('Page.navigate', { url: URL });
await sleep(2200);
const mob = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
fs.writeFileSync(path.join(ROOT, 'qa', 'rec-hero-390.png'), Buffer.from(mob.data, 'base64'));
console.log('rec-hero-390.png');

await send('Browser.close').catch(() => {});
ws.close();
edge.kill();
await sleep(300);
process.exit(0);
