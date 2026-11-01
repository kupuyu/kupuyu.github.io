import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const out = 'E:\\deepseek文件\\portfolio\\qa';
const profile = path.join(os.tmpdir(), `edge-portfolio-${Date.now()}`);
const port = 9237;
const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1920,1080',
  'http://127.0.0.1:5173/'], { stdio: 'ignore', windowsHide: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getTarget() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('no target');
}
const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
let nextId = 1;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result);
  }
});
const send = (method, params = {}) => {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
};
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
const shot = async (name) => {
  const r = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  fs.writeFileSync(path.join(out, name), Buffer.from(r.data, 'base64'));
  console.log('shot', name);
};
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await sleep(2600);
await evaluate(`document.querySelector('#projects')?.scrollIntoView({behavior:'instant', block:'start'})`);
await sleep(800);

await evaluate(`document.querySelectorAll('.project-card')[1]?.click()`);
await sleep(1100);
console.log('heritage title', await evaluate(`document.querySelector('.modal-cards__title')?.textContent`));
console.log('thumbs', await evaluate(`document.querySelectorAll('.modal-cards__thumb').length`));
console.log('play button', await evaluate(`Boolean(document.querySelector('.modal-cards__play'))`));
await shot('portfolio-heritage-poster-1920.png');

await evaluate(`document.querySelector('.modal-cards__play')?.click()`);
await sleep(1800);
console.log('video', await evaluate(`(() => { const v = document.querySelector('.modal-cards__video'); return v ? { readyState: v.readyState, paused: v.paused, duration: v.duration, currentSrc: v.currentSrc } : null; })()`));
await shot('portfolio-heritage-video-1920.png');

await evaluate(`document.querySelector('.modal-cards__thumb')?.click()`);
await sleep(700);
console.log('after thumb video gone', await evaluate(`Boolean(document.querySelector('.modal-cards__video'))`));
await evaluate(`document.querySelector('.modal-cards__close')?.click()`);
await sleep(800);

await evaluate(`document.querySelectorAll('.project-card')[4]?.click()`);
await sleep(1000);
console.log('starjar title', await evaluate(`document.querySelector('.modal-cards__title')?.textContent`));
await shot('portfolio-starjar-1920.png');
await evaluate(`document.querySelector('.modal-cards__close')?.click()`);
await sleep(700);

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
await sleep(2200);
await evaluate(`document.querySelector('#projects')?.scrollIntoView({behavior:'instant', block:'start'})`);
await sleep(700);
await evaluate(`document.querySelector('.project-card')?.click()`);
await sleep(1000);
console.log('mobile panel', await evaluate(`(() => { const p = document.querySelector('.modal-cards__panel'); return p ? { clientH: p.clientHeight, scrollH: p.scrollHeight, top: p.getBoundingClientRect().top, bottom: p.getBoundingClientRect().bottom } : null; })()`));
await evaluate(`(() => { const p = document.querySelector('.modal-cards__panel'); if (p) p.scrollTop = p.scrollHeight; })()`);
await sleep(500);
await shot('portfolio-mobile-bottom-390.png');
await send('Browser.close');
edge.kill();
