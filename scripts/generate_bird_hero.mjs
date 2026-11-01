import fs from 'node:fs';

const prompt = `Ultra detailed 3D layered paper-cut art illustration, 16:9 full bleed edge to edge, no frame, no border, no mockup. A magnificent colorful tropical bird in mid-flight with wings spread wide and a long layered tail, body warm golden orange, wing feathers deep teal, turquoise, magenta, violet, scarlet and cream. Every feather is cut from thick textured paper with visible fibers and soft drop shadows. The bird is positioned slightly right of center, flying toward the left. Around it, a magical paper forest: layered teal and emerald leaves, coral and orange foliage, deep violet curved tree branches, small pink paper flowers, pale cream ferns. Rich saturated color, deep teal background with a warm golden sun glow behind the bird. Handcrafted paper collage, kirigami, paper sculpture, many depth layers, cinematic rim light, intricate detail, high resolution. No text, no letters, no numbers, no watermark, no white background, no wall, no table, no shadow box.`;

const seeds = [314159, 271828, 161803];
for (const seed of seeds) {
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=1920&height=1080&seed=${seed}&model=flux&nologo=true&enhance=false&private=true` +
    '&negative_prompt=' +
    encodeURIComponent('frame, border, white background, wall, table, mockup, shadow box, text, letters, numbers, watermark, low detail, blurry, monochrome');
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
      const path = `design/raw-bird/bird-${seed}.jpg`;
      fs.writeFileSync(path, bytes);
      console.log(`seed ${seed}: wrote ${path} (${(bytes.length / 1024).toFixed(0)} KB)`);
    }
  } catch (error) {
    console.error(`seed ${seed}:`, error.message);
  }
  if (seed !== seeds[seeds.length - 1]) await new Promise((resolve) => setTimeout(resolve, 50_000));
}
