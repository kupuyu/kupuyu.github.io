from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'design' / 'hero-ref-right.png'
OUT = ROOT / 'qa' / 'forest-sharp.jpg'

im = Image.open(SRC).convert('RGB')
target_w = 2400
target_h = round(im.height * (target_w / im.width))
im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
im = ImageEnhance.Color(im).enhance(1.06)
im = ImageEnhance.Contrast(im).enhance(1.055)
im = ImageEnhance.Brightness(im).enhance(1.015)
im = Image.blend(im, Image.new('RGB', im.size, (246, 238, 215)), 0.025)

grain = Image.open(ROOT / 'public' / 'images' / 'grain.png').convert('L').resize(im.size, Image.Resampling.BILINEAR)
im = ImageChops.soft_light(im, Image.merge('RGB', (grain, grain, grain)))

vignette = Image.new('L', im.size, 0)
draw = ImageDraw.Draw(vignette)
draw.ellipse((-im.width * 0.22, -im.height * 0.3, im.width * 1.22, im.height * 1.3), fill=255)
vignette = vignette.filter(ImageFilter.GaussianBlur(im.width * 0.018))
im = Image.composite(im, Image.new('RGB', im.size, (6, 18, 10)), vignette)

im = im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=260, threshold=2))
im = im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=120, threshold=1))
im = ImageEnhance.Sharpness(im).enhance(1.18)
im.save(OUT, quality=94, optimize=True, progressive=True)
print(f'wrote {OUT} {im.size} {OUT.stat().st_size // 1024} KB')
