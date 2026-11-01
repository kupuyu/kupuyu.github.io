import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'design', 'raw-v2');
fs.mkdirSync(outDir, { recursive: true });

const baseNegative = [
  'frame',
  'border',
  'white background',
  'mockup',
  'shadow box',
  'photo of a model',
  'tabletop',
  'text',
  'letters',
  'watermark',
  'signature',
].join(', ');

const assets = [
  {
    name: 'hero-4931',
    width: 1600,
    height: 900,
    seed: 4931,
    prompt: `A lush 3D papercut storybook illustration of an enchanted forest, full bleed edge to edge. Hand-cut layered paper with visible paper grain and soft tactile shadows, flat artwork made of paper collage, not a diorama on a table. Ancient moss-covered trees, a stone bridge over a gentle waterfall stream, ferns, mushrooms and layered leaves. Warm golden sun rays filter through a green canopy, tiny fireflies and a white butterfly. A large mossy rock ledge in the lower right foreground is empty. Rich emerald, olive and sage greens with warm cream highlights, cinematic wide composition, extremely detailed, storybook art. No frame, no border, no white background, no text, no lettering, no people, no animals, no watermark.`,
  },
  {
    name: 'hero-6721',
    width: 1600,
    height: 900,
    seed: 6721,
    prompt: `Wide cinematic 3D papercut art of a magical green forest glade, layered hand-cut paper collage with visible fibers and soft drop shadows. Giant tree trunks, hanging vines, a small arched stone bridge, waterfall and clear stream, ferns, wild mushrooms, clusters of rounded leaves. Sunlight breaks through the canopy in warm cream rays. The right foreground has a broad mossy rock shelf. Storybook picture-book aesthetic, deep emerald and sage palette, warm highlights, tactile papercraft. Full-bleed artwork covering the entire canvas, not a framed diorama, no border, no white, no text, no people, no animals, no watermark.`,
  },
  {
    name: 'project-forest-song',
    width: 1024,
    height: 1280,
    seed: 4182,
    prompt: `3D papercut storybook scene, a small boy explorer in a green cap and backpack sits on a mossy rock in a sunlit forest clearing, seen from behind, a white rabbit beside him. Layered hand-cut paper, visible paper texture, soft shadows, lush ferns and leaves, warm golden sunbeams, emerald and sage green palette, whimsical animation film still, full bleed edge to edge, no frame, no border, no white background, no text, no watermark.`,
  },
  {
    name: 'project-forest-spirit',
    width: 1024,
    height: 1280,
    seed: 8274,
    prompt: `3D papercut character design sheet for an animation, a gentle forest spirit girl with short dark green hair, small twig antlers and a leaf cloak, shown in several full-body poses and small expression studies arranged on a warm cream paper sheet. Hand-cut layered paper figures with soft shadows, subtle moss green and cream palette, whimsical character concept art, full bleed edge to edge. No border, no text, no letters, no watermark.`,
  },
  {
    name: 'project-treehouse',
    width: 1024,
    height: 1280,
    seed: 6058,
    prompt: `3D papercut treehouse village, whimsical multi-level wooden houses nested among giant forest trees, winding stairs, rope bridges, round glowing windows, layered hand-cut paper with visible grain and soft shadows, lush green foliage, warm late afternoon sunlight, storybook environment design, full bleed edge to edge, no frame, no border, no white background, no text, no watermark.`,
  },
  {
    name: 'project-symbiosis',
    width: 1024,
    height: 1280,
    seed: 9917,
    prompt: `3D papercut poster artwork about nature and coexistence, a large pair of hands gently cradling a tiny layered forest, silhouettes of leaves and birds, high contrast deep forest green and warm cream paper, hand-cut paper layers with visible fibers and cast shadows, elegant graphic composition, full bleed edge to edge, no frame, no border, no text, no letters, no watermark.`,
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function download(asset) {
  const file = path.join(outDir, `${asset.name}-raw.jpg`);
  if (fs.existsSync(file) && fs.statSync(file).size > 12_000) {
    console.log(`[${asset.name}] exists, skipping`);
    return true;
  }
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(asset.prompt)}` +
    `?width=${asset.width}&height=${asset.height}&seed=${asset.seed}` +
    `&model=flux&nologo=true&enhance=false&private=true` +
    `&negative_prompt=${encodeURIComponent(baseNegative)}`;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      console.log(`[${asset.name}] attempt ${attempt}`);
      const res = await fetch(url, {
        signal: AbortSignal.timeout(240_000),
        headers: { 'User-Agent': 'Mozilla/5.0 portfolio-asset-generator' },
      });
      if (!res.ok) {
        const text = (await res.text()).slice(0, 180);
        console.error(`[${asset.name}] HTTP ${res.status}: ${text}`);
        if (res.status === 402 || res.status === 429) await wait(48_000);
        else await wait(8_000);
        continue;
      }
      const bytes = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(file, bytes);
      console.log(`[${asset.name}] wrote ${file} (${Math.round(bytes.length / 1024)} KB)`);
      return true;
    } catch (error) {
      console.error(`[${asset.name}] error: ${error.message}`);
      await wait(10_000);
    }
  }
  return false;
}

for (const asset of assets) {
  await download(asset);
  await wait(52_000);
}
console.log('DONE');
