import fs from 'node:fs';

const prompt = `Wide 16:9 2D cut-paper animation background, full bleed edge to edge, no border, no frame. A magical forest interior at sunrise. In the lower right third, a tiny young anime boy explorer wearing a green cap and a small backpack sits on a mossy rock, seen from behind, with a white rabbit sitting beside him. A slender stone bridge and a small waterfall are far behind them. Giant ancient tree trunks and layered fern silhouettes frame the scene. Warm golden sunbeams break through the deep green canopy, dust and fireflies in the air. Handcrafted layered paper collage, torn paper edges, textured watercolor paper, Studio Ghibli background painting, emerald and sage greens with warm cream light. The left half is darker, calm foliage negative space for a title. The artwork fills the entire image, edge to edge. No text, no letters, no numbers, no frame, no white background, no mockup, no shadow box, no border, no watermark.`;

const seeds = [20261028, 7117];
for (const seed of seeds) {
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=1600&height=960&seed=${seed}&model=flux&nologo=true&enhance=false&private=true` +
    '&negative_prompt=' +
    encodeURIComponent('frame, border, white background, mockup, shadow box, text, watermark, close-up portrait');
  console.log('requesting seed', seed);
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(180_000),
      headers: { 'User-Agent': 'Mozilla/5.0 portfolio-asset-generator' },
    });
    if (!res.ok) {
      console.error(`seed ${seed}: HTTP ${res.status}`, (await res.text()).slice(0, 200));
    } else {
      const bytes = Buffer.from(await res.arrayBuffer());
      const path = `qa/hero-try-${seed}.jpg`;
      fs.writeFileSync(path, bytes);
      console.log(`seed ${seed}: wrote ${path} (${(bytes.length / 1024).toFixed(0)} KB)`);
    }
  } catch (error) {
    console.error(`seed ${seed}:`, error.message);
  }
  if (seed !== seeds[seeds.length - 1]) await new Promise((resolve) => setTimeout(resolve, 50_000));
}
