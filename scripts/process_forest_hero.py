from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'design' / 'hero-ref-right.png'
OUT = ROOT / 'public' / 'images' / 'generated' / 'forest'
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert('RGB')
target_w = 2400
scaled_h = round(im.height * (target_w / im.width))
im = im.resize((target_w, scaled_h), Image.Resampling.LANCZOS)

# Gentle warm paper grade, suitable for the bright reference art.
im = ImageEnhance.Color(im).enhance(1.08)
im = ImageEnhance.Contrast(im).enhance(1.035)
im = ImageEnhance.Brightness(im).enhance(1.02)
warm = Image.new('RGB', im.size, (246, 238, 215))
im = Image.blend(im, warm, 0.035)

# Lift the deepest greens just a touch so the hero stays luminous.
pixels = im.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b = pixels[x, y]
        if r + g + b < 165:
            lift = 8
            pixels[x, y] = (min(255, r + lift), min(255, g + lift), min(255, b + lift))

# Build a 16:9 plate with softly reflected canopy/forest extensions.
target_h = 1350
band = (target_h - im.height) // 2
canvas = Image.new('RGB', (target_w, target_h), (20, 45, 27))
canvas.paste(im, (0, band))

top = im.crop((0, 0, target_w, band + 40)).transpose(Image.Transpose.FLIP_TOP_BOTTOM)
top = top.filter(ImageFilter.GaussianBlur(7))
top = ImageEnhance.Brightness(top).enhance(0.58)
top = ImageEnhance.Color(top).enhance(0.82)
canvas.paste(top, (0, 0))

bottom = im.crop((0, im.height - band - 40, target_w, im.height)).transpose(Image.Transpose.FLIP_TOP_BOTTOM)
bottom = bottom.filter(ImageFilter.GaussianBlur(7))
bottom = ImageEnhance.Brightness(bottom).enhance(0.68)
bottom = ImageEnhance.Color(bottom).enhance(0.86)
canvas.paste(bottom, (0, band + im.height))

# Feather the joins.
for y in range(60):
    alpha = int(255 * (y / 60))
    strip = canvas.crop((0, band + y, target_w, band + y + 1))
    canvas.paste(Image.composite(strip, im.crop((0, y, target_w, y + 1)), Image.new('L', (target_w, 1), alpha)), (0, band + y))
    y2 = im.height - 1 - y
    strip2 = canvas.crop((0, band + y2, target_w, band + y2 + 1))
    canvas.paste(Image.composite(strip2, im.crop((0, y2, target_w, y2 + 1)), Image.new('L', (target_w, 1), alpha)), (0, band + y2))

im = canvas

# Paper grain.
grain = Image.open(ROOT / 'public' / 'images' / 'grain.png').convert('L').resize(im.size, Image.Resampling.BILINEAR)
grain_rgb = Image.merge('RGB', (grain, grain, grain))
im = ImageChops.soft_light(im, grain_rgb)

# Very soft edge vignette.
vignette = Image.new('L', im.size, 0)
draw = ImageDraw.Draw(vignette)
draw.ellipse((-im.width * 0.18, -im.height * 0.28, im.width * 1.18, im.height * 1.28), fill=255)
vignette = vignette.filter(ImageFilter.GaussianBlur(im.width * 0.055))
black = Image.new('RGB', im.size, (6, 18, 10))
im = Image.composite(im, black, vignette)

im = im.filter(ImageFilter.UnsharpMask(radius=2.0, percent=135, threshold=3))
im.save(OUT / 'hero-forest.jpg', quality=92, optimize=True, progressive=True)
print(f'wrote {OUT / "hero-forest.jpg"} {im.size} {(OUT / "hero-forest.jpg").stat().st_size // 1024} KB')
