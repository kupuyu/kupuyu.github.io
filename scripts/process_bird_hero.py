from pathlib import Path
import numpy as np
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(r"E:\deepseek文件\portfolio")
SRC = ROOT / "design" / "raw-bird" / "bird-314159.jpg"
OUT = ROOT / "public" / "images" / "generated" / "bird"
OUT.mkdir(parents=True, exist_ok=True)
GRAIN = Image.open(ROOT / "public" / "images" / "grain.png").convert("L")

img = Image.open(SRC).convert("RGB")
w, h = img.size
# Remove the thin cream border and the AI watermark strip, then mirror so the
# bird sits on the right and the title has a quiet left side.
img = img.crop((round(w * 0.018), round(h * 0.022), round(w * 0.982), round(h * 0.936)))
img = ImageOps.mirror(img)
img = ImageOps.fit(img, (2400, 1350), method=Image.Resampling.LANCZOS, centering=(0.5, 0.48))

# Gentle grade: keep the coral / turquoise paper palette but deepen the shadows.
img = ImageEnhance.Color(img).enhance(1.06)
img = ImageEnhance.Contrast(img).enhance(1.035)
img = ImageEnhance.Brightness(img).enhance(1.015)

# Paper tooth, soft-light style.
g = ImageOps.fit(GRAIN, img.size, method=Image.Resampling.BICUBIC)
g = ImageEnhance.Contrast(g).enhance(1.1)
g = Image.merge("RGB", (g, g, g))
img = Image.blend(img, ImageChops.soft_light(img, g), 0.14)

# A whisper of warm paper in the highlights.
warm = Image.new("RGB", img.size, (247, 234, 210))
img = Image.blend(img, ImageChops.multiply(img, warm), 0.035)

# Very soft vignette to give the paper stage depth.
w, h = img.size
x = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
y = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
r = np.sqrt((x * 0.86) ** 2 + (y * 0.86) ** 2)
vig = np.clip(1.0 - np.maximum(r - 0.56, 0) * 0.22, 0.82, 1.0)[..., None]
arr = np.asarray(img).astype(np.float32) * vig
img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=3))
img.save(OUT / "hero-bird.jpg", "JPEG", quality=90, optimize=True, progressive=True)
print("hero-bird", img.size, (OUT / "hero-bird.jpg").stat().st_size)
