"""Prepare the generated artwork for the portfolio.

The image service returns small, softly-painted frames with a watermark.
This script trims them to useful crops, warms the palette toward the site's
cream/forest grade, adds a light paper tooth, and writes the final masters
used by the React app.
"""

from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps
import numpy as np

ROOT = Path(r"E:\deepseek文件\portfolio")
RAW = ROOT / "public" / "images" / "generated"
OUT = ROOT / "public" / "images" / "generated"
OUT.mkdir(parents=True, exist_ok=True)
GRAIN = Image.open(ROOT / "public" / "images" / "grain.png").convert("L")


def paper_grain(size, opacity=0.055):
    grain = ImageOps.fit(GRAIN, size, method=Image.Resampling.BICUBIC)
    grain = ImageEnhance.Contrast(grain).enhance(1.15)
    return grain


def paper_tooth(img, opacity=0.055):
    size = img.size
    grain = paper_grain(size, opacity)
    grain_rgb = Image.merge("RGB", (grain, grain, grain))
    # Multiply is less milky than a flat overlay; keep it very quiet.
    return Image.blend(img, ImageChops.multiply(img, grain_rgb), opacity)


def warm_grade(img, saturation=1.08, contrast=1.045, brightness=1.015, warmth=0.05):
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    if warmth:
        warm = Image.new("RGB", img.size, (246, 228, 190))
        img = Image.blend(img, warm, warmth)
    # A quiet vignette helps the cream type sit on the hero.
    w, h = img.size
    x = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    y = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    r = np.sqrt((x * 0.86) ** 2 + (y * 0.86) ** 2)
    vig = np.clip(1.0 - np.maximum(r - 0.48, 0) * 0.20, 0.78, 1.0)[..., None]
    arr = np.asarray(img).astype(np.float32) * vig
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def add_light(img, center=(0.58, 0.20), radius=0.55, strength=0.22, color=(255, 226, 160)):
    w, h = img.size
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = center[0] * w, center[1] * h
    d = np.sqrt(((xx - cx) / (radius * w)) ** 2 + ((yy - cy) / (radius * h)) ** 2)
    mask = np.clip(1.0 - d, 0, 1) ** 2
    glow = np.zeros((h, w, 3), dtype=np.float32)
    glow[:] = color
    arr = np.asarray(img).astype(np.float32)
    arr = arr + glow * (mask[..., None] * strength * 255)
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def sharpen(img, radius=1.3, percent=62):
    return img.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=3))


def tame_highlights(img, threshold=0.8, factor=0.55):
    """Roll off already-clipped AI sky highlights without flattening the image."""
    arr = np.asarray(img).astype(np.float32) / 255.0
    over = np.clip((arr - threshold) / (1.0 - threshold), 0, 1)
    arr = arr - over * (1.0 - factor) * (arr - threshold) * 0.55
    return Image.fromarray(np.clip(arr * 255, 0, 255).astype(np.uint8), "RGB")


def crop_norm(img, box):
    w, h = img.size
    l, t, r, b = box
    return img.crop((round(l * w), round(t * h), round(r * w), round(b * h)))


def save(img, name, quality=88):
    path = OUT / name
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{name:32} {img.width}x{img.height}  {path.stat().st_size / 1024:.0f} KB")


# Hero ---------------------------------------------------------------------
hero = Image.open(RAW / "hero-forest-raw.jpg").convert("RGB")
hero = crop_norm(hero, (0.0, 0.0, 1.0, 0.925))  # watermark strip
hero = ImageOps.fit(hero, (1920, 1080), method=Image.Resampling.LANCZOS, centering=(0.55, 0.47))
hero = warm_grade(hero, saturation=1.1, contrast=1.05, brightness=1.05, warmth=0.055)
hero = tame_highlights(hero, 0.76, 0.58)
hero = sharpen(hero, 1.4, 52)
hero = paper_tooth(hero, 0.065)
save(hero, "hero-forest.jpg", quality=90)

# Small crop for the video source / mobile.
hero_small = hero.resize((1280, 720), Image.Resampling.LANCZOS)
hero_small.save(ROOT / "qa" / "hero-poster-1280.jpg", "JPEG", quality=88, optimize=True)

# Projects -----------------------------------------------------------------
project_specs = {
    "project-forest-song": {
        "crop": (0.0, 0.0, 1.0, 0.925),
        "center": (0.5, 0.44),
        "light": (0.56, 0.18, 0.30, 0.11),
    },
    "project-forest-spirit": {
        "crop": (0.035, 0.035, 0.965, 0.965),
        "center": (0.5, 0.46),
        "light": (0.58, 0.17, 0.26, 0.07),
    },
    "project-treehouse": {
        "crop": (0.035, 0.02, 0.965, 0.94),
        "center": (0.5, 0.47),
        "light": (0.52, 0.17, 0.26, 0.08),
    },
    "project-symbiosis": {
        "crop": (0.045, 0.025, 0.945, 0.94),
        "center": (0.5, 0.47),
        "light": (0.55, 0.25, 0.24, 0.07),
    },
}

for stem, spec in project_specs.items():
    img = Image.open(RAW / f"{stem}-raw.jpg").convert("RGB")
    img = crop_norm(img, spec["crop"])
    img = ImageOps.fit(img, (1000, 1250), method=Image.Resampling.LANCZOS, centering=spec["center"])
    img = warm_grade(img, saturation=1.09, contrast=1.04, brightness=1.025, warmth=0.038)
    img = tame_highlights(img, 0.82, 0.62)
    img = sharpen(img, 1.25, 50)
    img = paper_tooth(img, 0.05)
    save(img, f"{stem}.jpg", quality=88)

# Portrait -----------------------------------------------------------------
portrait = Image.open(RAW / "portrait-peng-raw.jpg").convert("RGB")
portrait = crop_norm(portrait, (0.13, 0.055, 0.875, 0.95))
portrait = ImageOps.fit(
    portrait,
    (800, 1000),
    method=Image.Resampling.LANCZOS,
    centering=(0.5, 0.02),
)
portrait = warm_grade(portrait, saturation=1.03, contrast=1.025, brightness=1.04, warmth=0.055)
portrait = tame_highlights(portrait, 0.84, 0.7)
portrait = sharpen(portrait, 1.2, 45)
portrait = paper_tooth(portrait, 0.055)
save(portrait, "portrait-peng.jpg", quality=90)

print("done")
