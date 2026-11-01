import fs from 'node:fs';
const prompt = `Full-bleed 3D paper-cut artwork, edge-to-edge, no frame, no border, no wall, no shadow box, no table. A vivid tropical parrot flying toward the left with wings fully spread, built entirely from hand-cut paper feathers in turquoise, cyan, golden orange, coral, magenta and violet. Dense layered paper jungle surrounding the bird: teal and emerald leaves, plum branches, coral flowers, cream ferns, rich color. Deep teal background with a warm golden glow behind the bird. Visible paper fibers, crisp scissor-cut edges, soft shadows between many layers, handcrafted kirigami collage, intricate detail, cinematic. The composition fills the whole canvas with paper shapes. No text, no letters, no numbers, no watermark, no white margin.`;
const seed = 777777;
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1600&height=900&seed=${seed}&model=flux&nologo=true&enhance=false&private=true&negative_prompt=${encodeURIComponent('frame, border, wall, table, shadow box, mockup, white background, text, letters, numbers, watermark, blurry, low detail')}`;
console.log('requesting', seed);
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(240000), headers: { 'User-Agent': 'Mozilla/5.0 portfolio-asset-generator' } });
  if (!res.ok) { console.error(res.status, (await res.text()).slice(0, 200)); process.exit(1); }
  const bytes = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(`design/raw-bird/bird3-${seed}.jpg`, bytes);
  console.log('wrote', bytes.length);
} catch (e) { console.error(e.message); process.exit(1); }
