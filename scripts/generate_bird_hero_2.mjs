import fs from 'node:fs';

const prompt = `Flat 2D paper-cut illustration, editorial poster, the whole canvas is filled edge to edge with overlapping pieces of colored construction paper, no outer frame, no wall, no table, no shadow box, no mockup. A magnificent tropical bird in flight with wings spread wide, built from layered cut-paper feathers in turquoise, teal, golden orange, coral, magenta and violet, positioned right of center and flying toward the left. A dense enchanted paper jungle surrounds the bird: teal and emerald leaves, coral and plum foliage, curving deep-violet branches, pale cream ferns, small orange paper flowers. Rich saturated colors, deep teal background, warm golden light behind the bird. Crisp scissor-cut edges, visible fibrous paper texture, soft shadows between layers, handcrafted kirigami collage, high detail. No text, no letters, no numbers, no watermark, no white background, no border, no frame.`;

const seeds = [987654, 246810];
for (const seed of seeds) {
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=1600&height=900&seed=${seed}&model=flux&nologo=true&enhance=false&private=true` +
    '&negative_prompt=' +
    encodeURIComponent('frame, border, wall, table, shadow box, mockup, text, letters, numbers, watermark, white background, blurry, low detail, 3d render, photograph');
  console.log('requesting seed', seed);
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(240_000),
      headers: { 'User-Agent': 'Mozilla/5.0 portfolio-asset-generator' },
    });
    if (!res.ok) {
      console.error(`seed ${seed}: HTTP ${res.status}`, (await res.text()).slice(0, 220));
    } else {
      const bytes = Buffer.from(await res.arrayBuffer());
      const path = `design/raw-bird/bird2-${seed}.jpg`;
      fs.writeFileSync(path, bytes);
      console.log(`seed ${seed}: wrote ${path} (${(bytes.length / 1024).toFixed(0)} KB)`);
    }
  } catch (error) {
    console.error(`seed ${seed}:`, error.message);
  }
  if (seed !== seeds[seeds.length - 1]) await new Promise((resolve) => setTimeout(resolve, 52_000));
}
