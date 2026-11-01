import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const items = [
  ['C:\\Users\\iu\\Desktop\\作品集\\作品集2\\c89d1b53b30e3f65a77962df3f25e24a.mp4', 'cover-heritage.jpg', 110],
  ['C:\\Users\\iu\\Desktop\\作品集\\作品集4\\b31f17889adcbd88423eda36a57310bc.mp4', 'cover-shortfilm.jpg', 91],
  ['C:\\Users\\iu\\Desktop\\作品集\\作品集5\\cc9ed10514aabb4a0b50709f555f7cd4_raw.mp4', 'cover-starjar.jpg', 23],
];
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const out = 'E:\\deepseek文件\\portfolio\\qa';
const port = 9237;
const profile = path.join(os.tmpdir(), `edge-covers-${Date.now()}`);
const edge = spawn(EDGE, [
  '--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1920,1080',
  'about:blank',
], { stdio: 'ignore', windowsHide: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function target() {
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
const t = await target();
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
let id = 1;
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
  const n = id++;
  ws.send(JSON.stringify({ id: n, method, params }));
  return new Promise((resolve, reject) => pending.set(n, { resolve, reject }));
};
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });

for (const [file, name, time] of items) {
  await send('Page.navigate', { url: pathToFileURL(file).href });
  let info = null;
  for (let attempt = 0; attempt < 12 && !info; attempt++) {
    await sleep(700);
    info = await evaluate(`(() => {
      const v = document.querySelector('video');
      if (!v || !v.videoWidth) return null;
      v.controls = false;
      v.pause();
      v.currentTime = ${time};
      document.body.style.margin = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.background = '#000';
      const r = v.getBoundingClientRect();
      return {
        width: v.videoWidth, height: v.videoHeight, duration: v.duration,
        rect: { x: r.x, y: r.y, width: r.width, height: r.height }
      };
    })()`);
  }
  if (!info) {
    console.log('no video', name);
    continue;
  }
  await sleep(1600);
  const shot = await send('Page.captureScreenshot', {
    format: 'jpeg', quality: 90, fromSurface: true,
    clip: { x: info.rect.x, y: info.rect.y, width: info.rect.width, height: info.rect.height, scale: 1 },
  });
  fs.writeFileSync(path.join(out, name), Buffer.from(shot.data, 'base64'));
  console.log(name, info);
}
await send('Browser.close');
edge.kill();
