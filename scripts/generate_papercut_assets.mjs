import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'images', 'generated');
fs.mkdirSync(OUT, { recursive: true });

const STYLE =
  'Immersive 2D storybook illustration, layered cut-paper collage, handcrafted torn paper edges, textured watercolor paper, Studio Ghibli inspired animation background, cinematic soft morning light, intricate depth, muted forest green palette with warm cream';

const assets = [
  {
    name: 'hero-forest',
    width: 1600,
    height: 960,
    seed: 9321,
    prompt:
      `${STYLE}. Wide cinematic 2D enchanted forest interior, full bleed edge to edge. Camera inside the forest looking toward a glowing waterfall and small wooden bridge in the middle distance. A young boy explorer in a green cap and backpack sits with a white rabbit on a mossy rock in the lower right, seen from behind. Tall trees and ferns frame the edges, golden sun rays through the green canopy, fireflies, slight mist, deep emerald and sage with warm cream light. Calm darker foliage negative space on the left for a title. The artwork fills the whole image, not a framed object. No text, no letters, no border, no frame, no white background, no mockup, no shadow box, no watermark.`,
  },
  {
    name: 'project-forest-song',
    width: 1024,
    height: 1280,
    seed: 4914,
    prompt:
      `${STYLE}. Vertical 2D animated film still, full bleed edge to edge. A lone boy explorer resting on a mossy stone in a sunlit ancient forest glade, tall dark trees, huge fern leaves, warm shafts of light through the canopy, floating petals and dust motes. Rich paper cut layers, whimsical and serene. The image is the artwork itself, not a poster or a framed object. No text, no letters, no border, no frame, no white background, no mockup, no shadow box, no watermark.`,
  },
  {
    name: 'project-forest-spirit',
    width: 1024,
    height: 1280,
    seed: 7821,
    prompt:
      `${STYLE}. Vertical 2D anime character concept illustration, full bleed edge to edge. A gentle forest spirit boy wearing a cloak made of leaves, tiny antlers, glowing pale eyes, moss and fern details. Full body three-quarter view standing in a misty dark forest with ferns. Elegant, quiet, intricate paper cut layers. Not a character sheet, not a poster. No text, no letters, no border, no frame, no white background, no mockup, no watermark.`,
  },
  {
    name: 'project-treehouse',
    width: 1024,
    height: 1280,
    seed: 1542,
    prompt:
      `${STYLE}. Vertical 2D storybook environment painting, full bleed edge to edge. Whimsical treehouse town built into an ancient giant tree, tiny wooden houses, curved staircases, warm glowing lanterns, dangling vines, mushrooms and moss. Deep layered paper cut parallax, warm late afternoon light. The forest fills the whole image. No text, no letters, no border, no frame, no white background, no mockup, no diorama box, no watermark.`,
  },
  {
    name: 'project-symbiosis',
    width: 1024,
    height: 1280,
    seed: 9083,
    prompt:
      `${STYLE}. Vertical 2D botanical poster artwork, full bleed edge to edge. Layered paper cut leaves and ferns, silhouettes of a deer and a rabbit hidden among dark forest green foliage, warm cream background, Japanese woodblock print influence, minimal elegant composition, handcrafted paper texture. The artwork itself is full frame. No text, no letters, no border, no frame, no white margin, no mockup, no watermark.`,
  },
  {
    name: 'portrait-peng',
    width: 832,
    height: 1024,
    seed: 6188,
    prompt:
      `${STYLE}. Vertical 2D portrait illustration, full bleed edge to edge. A 20 year old Chinese male animation design student, gentle confident expression, short black hair, dark forest green jacket and olive scarf, slightly turned, warm cream paper background with a few pressed ferns and leaves, waist up, refined anime storybook illustration, layered cut paper clothing shapes. No text, no letters, no border, no frame, no white margin, no mockup, no watermark.`,
  },
];


async function download(asset) {
  const encoded = encodeURIComponent(asset.prompt);
  const url =
    `https://image.pollinations.ai/prompt/${encoded}` +
    `?width=${asset.width}&height=${asset.height}&seed=${asset.seed}` +
    '&model=flux&nologo=true&enhance=false&private=true' +
    '&negative_prompt=' +
    encodeURIComponent('frame, border, white background, mockup, shadow box, text, watermark');
  const target = path.join(OUT, `${asset.name}-raw.jpg`);

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      console.log(`[${asset.name}] attempt ${attempt}: requesting ${asset.width}x${asset.height}`);
      const res = await fetch(url, {
        signal: AbortSignal.timeout(180_000),
        headers: { 'User-Agent': 'Mozilla/5.0 portfolio-asset-generator' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const type = res.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`Unexpected content type: ${type}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length < 8_000) throw new Error(`Suspiciously small image: ${bytes.length} bytes`);
      fs.writeFileSync(target, bytes);
      console.log(`[${asset.name}] wrote ${target} (${(bytes.length / 1024).toFixed(0)} KB)`);
      return target;
    } catch (error) {
      console.error(`[${asset.name}] attempt ${attempt} failed:`, error.message);
      if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, 52_000));
    }
  }
  throw new Error(`Could not download ${asset.name}`);
}

console.log(`Generating ${assets.length} papercut assets into ${OUT}`);
for (const asset of assets) {
  await download(asset);
  console.log(`[${asset.name}] done, cooling down for 52s before the next image`);
  await new Promise((resolve) => setTimeout(resolve, 52_000));
}
console.log('All assets downloaded.');
