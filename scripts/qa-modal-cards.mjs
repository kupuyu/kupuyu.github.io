import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROOT = 'E:\\deepseek文件\\portfolio';
const QA = path.join(ROOT, 'qa');
const PROFILE = path.join(os.tmpdir(), `edge-modal-${Date.now()}`);
const PORT = 9233;
const URL = 'http://127.0.0.1:5173/';
fs.mkdirSync(QA, { recursive: true });

const edge = spawn(EDGE, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--window-size=1920,1080', URL,
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
async function setViewport(width, height) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await sleep(500);
}
async function openProjects() {
  await evaluate(`document.querySelector('#projects')?.scrollIntoView({behavior:'instant', block:'start'})`);
  await sleep(700);
}
const getState = () => evaluate(`(() => {
  const modal = document.querySelector('.modal-cards');
  const panel = document.querySelector('.modal-cards__panel');
  const cards = [...document.querySelectorAll('.project-card')];
  return {
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth,
    pageHeight: document.documentElement.scrollHeight,
    cards: cards.length,
    firstCard: cards[0]?.getBoundingClientRect().toJSON(),
    modal: Boolean(modal),
    panel: panel?.getBoundingClientRect().toJSON(),
    bodyLocked: getComputedStyle(document.body).overflow,
    active: document.activeElement?.className,
    modalTitle: document.querySelector('.modal-cards__title')?.textContent
  };
})()`);

await send('Page.enable');
await send('Runtime.enable');
await setViewport(1920, 1080);
await send('Page.navigate', { url: URL });
await sleep(2800);

await openProjects();
console.log('projects', await getState());
await capture('modal-01-projects-1920.png');

await evaluate(`document.querySelector('.project-card')?.click()`);
await sleep(1100);
console.log('open', await getState());
await capture('modal-02-open-1920.png');

await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
await sleep(900);
console.log('afterEsc', await getState());

await evaluate(`document.querySelector('.project-card')?.click()`);
await sleep(1000);
await evaluate(`document.querySelector('.modal-cards__backdrop')?.click()`);
await sleep(900);
console.log('afterBackdrop', await getState());

await setViewport(1440, 900);
await openProjects();
await evaluate(`document.querySelector('.project-card')?.click()`);
await sleep(1100);
console.log('open1440', await getState());
await capture('modal-03-open-1440.png');
await send('Page.navigate', { url: URL });
await sleep(2200);

await setViewport(390, 844);
await openProjects();
await evaluate(`document.querySelector('.project-card')?.click()`);
await sleep(1100);
console.log('open390', await getState());
await capture('modal-04-open-390.png');
await capture('modal-05-full-390.png');

await send('Browser.close');
edge.kill();
