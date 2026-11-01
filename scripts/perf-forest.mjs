import { spawn } from 'node:child_process';
import fs from 'node:fs';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9334;
const profile = 'E:\\deepseek文件\\portfolio\\.edge-perf-profile';
fs.rmSync(profile, { recursive: true, force: true });

const edge = spawn(EDGE, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1920,1080',
  '--hide-scrollbars',
  'about:blank',
], { stdio: 'ignore', windowsHide: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 60; i += 1) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await res.json();
    target = list.find((item) => item.type === 'page');
    if (target) break;
  } catch {}
  await sleep(300);
}
if (!target) throw new Error('Edge CDP target unavailable');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});
let id = 0;
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
  const callId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(callId, { resolve, reject });
    ws.send(JSON.stringify({ id: callId, method, params }));
  });
}

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: Number(process.env.DPR || 1),
    mobile: false,
  });
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
  await sleep(2500);
  const result = await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `
      (async () => {
        const frames = [];
        const longTasks = [];
        let last = performance.now();
        let running = true;
        const obs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) longTasks.push(Math.round(entry.duration));
        });
        try { obs.observe({ entryTypes: ['longtask'] }); } catch {}
        function tick(now) {
          if (!running) return;
          frames.push(now - last);
          last = now;
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        const scrollHeight = document.documentElement.scrollHeight;
        const maxScroll = scrollHeight - innerHeight;
        const steps = 140;
        for (let i = 0; i < steps; i += 1) {
          const y = Math.round((maxScroll * 0.66) * (i / (steps - 1)));
          window.scrollTo(0, y);
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        running = false;
        obs.disconnect();
        const sorted = [...frames].sort((a, b) => a - b);
        const p = (q) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))];
        return {
          frames: frames.length,
          avg: +(frames.reduce((a, b) => a + b, 0) / frames.length).toFixed(2),
          p50: +p(0.5).toFixed(2),
          p95: +p(0.95).toFixed(2),
          max: +Math.max(...frames).toFixed(2),
          over20: frames.filter((v) => v > 20).length,
          over33: frames.filter((v) => v > 33).length,
          longTasks,
          scrollHeight,
        };
      })()
    `,
  });
  console.log(JSON.stringify(result.result.value, null, 2));
} finally {
  try { ws.close(); } catch {}
  edge.kill();
  await sleep(500);
  fs.rmSync(profile, { recursive: true, force: true });
}
