import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROOT = 'E:\\deepseek文件\\portfolio';
const QA = path.join(ROOT, 'qa');
const PROFILE = path.join(os.tmpdir(), `edge-bird-${Date.now()}`);
const PORT = 9225;
const URL = 'http://127.0.0.1:5173/';
fs.mkdirSync(QA, { recursive: true });

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
  for (let i = 0; i < 80; i += 1) {
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
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
const capture = async (name) => {
  const r = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  fs.writeFileSync(path.join(QA, name), Buffer.from(r.data, 'base64'));
  console.log('shot', name);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: URL });
await sleep(2600);

const metrics = await evaluate(`(() => {
  const hero = document.querySelector('.bird-hero');
  const plate = document.querySelector('.bird-hero__plate');
  return {
    title: document.title,
    viewport: [innerWidth, innerHeight],
    pageHeight: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth,
    hero: hero && { top: hero.offsetTop, height: hero.offsetHeight },
    plate: plate && { src: plate.currentSrc, complete: plate.complete, naturalWidth: plate.naturalWidth, naturalHeight: plate.naturalHeight },
    headline: getComputedStyle(document.querySelector('.bird-hero__title')).fontFamily,
    aboutTop: Math.round(document.querySelector('#about').getBoundingClientRect().top + scrollY)
  };
})()`);
console.log(JSON.stringify(metrics, null, 2));
await capture('bird-p0-1920.png');

for (const [p, top] of [[0.5, 540], [1, 1080]]) {
  await evaluate(`scrollTo({top:${top}, behavior:'instant'})`);
  await sleep(500);
  const style = await evaluate(`(() => {
    const hero = document.querySelector('.bird-hero');
    return {
      p: getComputedStyle(hero).getPropertyValue('--p').trim(),
      scrollY,
      titleOpacity: getComputedStyle(document.querySelector('.bird-hero__copy')).opacity,
      frontOpacity: getComputedStyle(document.querySelector('.bird-foliage--front')).opacity,
      bloomOpacity: getComputedStyle(document.querySelector('.bird-foliage--bloom')).opacity
    };
  })()`);
  console.log('progress', p, style);
  await capture(`bird-p${Math.round(p * 100)}-1920.png`);
}

await evaluate(`document.querySelector('#about').scrollIntoView({behavior:'instant', block:'start'})`);
await sleep(1200);
await capture('bird-about-1920.png');

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: URL });
await sleep(2200);
await capture('bird-p0-1440.png');

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send('Page.navigate', { url: URL });
await sleep(2200);
const mob = await evaluate(`({ overflow: document.documentElement.scrollWidth > innerWidth, pageHeight: document.documentElement.scrollHeight, heroHeight: document.querySelector('.bird-hero').offsetHeight })`);
console.log('mobile', mob);
await capture('bird-p0-390.png');
await evaluate(`scrollTo({top:400, behavior:'instant'})`);
await sleep(500);
await capture('bird-p40-390.png');

await send('Browser.close').catch(() => {});
ws.close();
edge.kill();
await sleep(300);
process.exit(0);
