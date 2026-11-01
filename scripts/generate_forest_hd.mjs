import fs from 'node:fs';

const prompt = `Full-bleed 3D layered papercut illustration, wide cinematic forest panorama. A young boy explorer in a green cap and backpack sits on a mossy stone ledge in the lower right, seen from behind, with a small white rabbit beside him. A stone arch bridge and a small waterfall are behind them, framed by giant layered paper tree trunks and lush cut-paper leaves. Warm golden sunlight through the canopy, deep green and sage palette, intricate handcrafted paper layers, subtle torn paper edges, Studio Ghibli storybook feeling, extremely detailed, sharp focus. The left side is quieter foliage with space for a title. No text, no letters, no numbers, no frame, no border, no white background, no mockup, no watermark.`;

const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1920&height=1080&seed=20261030&model=flux&nologo=true&enhance=false&private=true&negative_prompt=${encodeURIComponent('frame, border, white background, mockup, shadow box, text, watermark, blurry, low resolution')}`;

console.log('requesting 1920x1080 forest');
const res = await fetch(url, {
  signal: AbortSignal.timeout(240_000),
  headers: { 'User-Agent': 'Mozilla/5.0 portfolio-asset-generator' },
});
if (!res.ok) {
  console.error(`HTTP ${res.status}`, (await res.text()).slice(0, 300));
  process.exit(1);
}
const bytes = Buffer.from(await res.arrayBuffer());
fs.writeFileSync('design/raw-bird/forest-hd.jpg', bytes);
console.log('wrote', bytes.length, 'bytes');
