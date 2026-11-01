"""Prepare the v2 papercut artwork for the portfolio.

Rainbow Forest hero (Pollinations seed 6721) is graded separately; this script
trims watermarks from the project plates, pulls them toward the cream/forest
palette, adds paper tooth, and writes the final web masters used by React.
"""

from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps
import numpy as np

ROOT = Path(r"E:\deepseek文件\portfolio")
RAW = ROOT / "design" / "raw-v2"
OUT = ROOT / "public" / "images" / "generated" / "v2"
OUT.mkdir(parents=True, exist_ok=True)
GRAIN = Image.open(ROOT / "public" / "images" / "grain.png").convert("L")


def paper_tooth(img, opacity=0.06):
    grain = ImageOps.fit(GRAIN, img.size, method=Image.Resampling.BICUBIC)
    grain = ImageEnhance.Contrast(grain).enhance(1.12)
    grain_rgb = Image.merge("RGB", (grain, grain, grain))
    return Image.blend(img, ImageChops.multiply(img, grain_rgb), opacity)


def warm_grade(img, saturation=1.08, contrast=1.03, brightness=1.03, warmth=0.045):
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    if warmth:
        warm = Image.new("RGB", img.size, (246, 232, 202))
        img = Image.blend(img, warm, warmth)
    return img


def cream_paper(img, strength=0.12, color=(242, 236, 221)):
    paper = Image.new("RGB", img.size, color)
    return Image.blend(img, ImageChops.multiply(img, paper), strength)


def vignette(img, strength=0.16, radius=0.5):
    w, h = img.size
    x = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    y = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    r = np.sqrt((x * 0.92) ** 2 + (y * 0.92) ** 2)
    vig = np.clip(1.0 - np.maximum(r - radius, 0) * strength, 0.78, 1.0)[..., None]
    arr = np.asarray(img).astype(np.float32) * vig
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def tame_highlights(img, threshold=0.82, factor=0.65):
    arr = np.asarray(img).astype(np.float32) / 255.0
    over = np.clip((arr - threshold) / (1.0 - threshold), 0, 1)
    arr = arr - over * (1.0 - factor) * (arr - threshold) * 0.55
    return Image.fromarray(np.clip(arr * 255, 0, 255).astype(np.uint8), "RGB")


def sharpen(img, radius=1.25, percent=52):
    return img.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=3))


def crop_norm(img, box):
    w, h = img.size
    l, t, r, b = box
    return img.crop((round(l * w), round(t * h), round(r * w), round(b * h)))


def save(img, name, quality=89):
    path = OUT / name
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{name:30} {img.width}x{img.height}  {path.stat().st_size / 1024:.0f} KB")


# Hero ---------------------------------------------------------------------
hero = Image.open(ROOT / "design" / "hero-grades" / "hero-grade-b.jpg").convert("RGB")
hero = ImageOps.fit(hero, (1920, 1080), method=Image.Resampling.LANCZOS, centering=(0.52, 0.48))
hero = tame_highlights(hero, 0.84, 0.72)
hero = vignette(hero, 0.18, 0.52)
hero = paper_tooth(hero, 0.045)
save(hero, "hero-forest.jpg", quality=90)

# Project plates -----------------------------------------------------------
specs = {
    "project-forest-song": {
        "crop": (0.0, 0.0, 1.0, 0.94),
        "center": (0.5, 0.46),
        "grade": dict(saturation=1.08, contrast=1.03, brightness=1.12, warmth=0.035),
        "cream": 0.08,
        "vignette": 0.16,
    },
    "project-forest-spirit": {
        "crop": (0.05, 0.035, 0.95, 0.945),
        "center": (0.5, 0.47),
        "grade": dict(saturation=1.04, contrast=1.02, brightness=1.08, warmth=0.05),
        "cream": 0.14,
        "vignette": 0.12,
    },
    "project-treehouse": {
        "crop": (0.03, 0.015, 0.97, 0.94),
        "center": (0.5, 0.47),
        "grade": dict(saturation=1.06, contrast=1.025, brightness=1.06, warmth=0.06),
        "cream": 0.08,
        "vignette": 0.14,
    },
    "project-symbiosis": {
        "crop": (0.045, 0.02, 0.955, 0.945),
        "center": (0.5, 0.47),
        "grade": dict(saturation=1.06, contrast=1.03, brightness=1.03, warmth=0.09),
        "cream": 0.30,
        "vignette": 0.10,
    },
}

for stem, spec in specs.items():
    img = Image.open(RAW / f"{stem}-raw.jpg").convert("RGB")
    img = crop_norm(img, spec["crop"])
    img = ImageOps.fit(img, (1000, 1250), method=Image.Resampling.LANCZOS, centering=spec["center"])
    img = warm_grade(img, **spec["grade"])
    img = cream_paper(img, spec["cream"])
    img = tame_highlights(img, 0.84, 0.68)
    img = vignette(img, spec["vignette"], 0.5)
    img = sharpen(img, 1.3, 50)
    img = paper_tooth(img, 0.055)
    save(img, f"{stem}.jpg", quality=89)

print("done")
