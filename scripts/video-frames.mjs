import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const files = [
  ['C:\\Users\\iu\\Desktop\\作品集\\作品集2\\c89d1b53b30e3f65a77962df3f25e24a.mp4', 'video-2'],
  ['C:\\Users\\iu\\Desktop\\作品集\\作品集4\\b31f17889adcbd88423eda36a57310bc.mp4', 'video-4'],
  ['C:\\Users\\iu\\Desktop\\作品集\\作品集5\\cc9ed10514aabb4a0b50709f555f7cd4_raw.mp4', 'video-5'],
];
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const out = 'E:\\deepseek文件\\portfolio\\qa';
const port = 9236;
const profile = path.join(os.tmpdir(), `edge-video-${Date.now()}`);
const edge = spawn(EDGE, [
  '--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1280,720',
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
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });

for (const [file, label] of files) {
  const url = pathToFileURL(file).href;
  await send('Page.navigate', { url });
  await sleep(2500);
  const info = await evaluate(`(() => {
    const v = document.querySelector('video');
    return v ? { duration: v.duration, width: v.videoWidth, height: v.videoHeight, ready: v.readyState } : null;
  })()`);
  console.log(label, info);
  if (!info) continue;
  for (const [i, frac] of [0.12, 0.42, 0.72].entries()) {
    await evaluate(`(() => { const v = document.querySelector('video'); v.currentTime = ${info.duration * frac}; v.pause(); return v.currentTime; })()`);
    await sleep(1200);
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88, fromSurface: true });
    fs.writeFileSync(path.join(out, `${label}-${i + 1}.jpg`), Buffer.from(shot.data, 'base64'));
    console.log('shot', `${label}-${i + 1}.jpg`);
  }
}
await send('Browser.close');
edge.kill();
