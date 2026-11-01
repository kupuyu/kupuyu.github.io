from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'design' / 'hero-ref-right.png'
OUT = ROOT / 'public' / 'images' / 'generated' / 'forest'
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert('RGB')
target_w = 2400
target_h = round(im.height * (target_w / im.width))
im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
im = ImageEnhance.Color(im).enhance(1.08)
im = ImageEnhance.Contrast(im).enhance(1.035)
im = ImageEnhance.Brightness(im).enhance(1.02)
im = Image.blend(im, Image.new('RGB', im.size, (246, 238, 215)), 0.035)

pixels = im.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b = pixels[x, y]
        if r + g + b < 165:
            lift = 8
            pixels[x, y] = (min(255, r + lift), min(255, g + lift), min(255, b + lift))

grain = Image.open(ROOT / 'public' / 'images' / 'grain.png').convert('L').resize(im.size, Image.Resampling.BILINEAR)
im = ImageChops.soft_light(im, Image.merge('RGB', (grain, grain, grain)))

vignette = Image.new('L', im.size, 0)
draw = ImageDraw.Draw(vignette)
draw.ellipse((-im.width * 0.18, -im.height * 0.28, im.width * 1.18, im.height * 1.28), fill=255)
vignette = vignette.filter(ImageFilter.GaussianBlur(im.width * 0.055))
im = Image.composite(im, Image.new('RGB', im.size, (6, 18, 10)), vignette)
im = im.filter(ImageFilter.UnsharpMask(radius=2.0, percent=135, threshold=3))
im.save(OUT / 'hero-forest.jpg', quality=92, optimize=True, progressive=True)
print(f'wrote {im.size} {(OUT / "hero-forest.jpg").stat().st_size // 1024} KB')
