"""Restore the treehouse project plate and the paper-grain texture."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(r"E:\deepseek文件\portfolio")
OUT = ROOT / "public" / "images" / "generated" / "v2"

# Neutral paper grain, generated locally (the original texture file was lost).
rng = np.random.default_rng(20261029)
noise = rng.normal(128, 16, (256, 256)).clip(0, 255).astype(np.uint8)
grain = Image.fromarray(noise, "L").filter(ImageFilter.GaussianBlur(0.55))
grain.save(ROOT / "public" / "images" / "grain.png", optimize=True)
GRAIN = grain

def paper_tooth(img, opacity=0.06):
    g = ImageOps.fit(GRAIN, img.size, method=Image.Resampling.BICUBIC)
    g = ImageEnhance.Contrast(g).enhance(1.12)
    g = Image.merge("RGB", (g, g, g))
    return Image.blend(img, ImageChops.multiply(img, g), opacity)

def warm_grade(img, saturation=1.06, contrast=1.025, brightness=1.06, warmth=0.06):
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    warm = Image.new("RGB", img.size, (246, 232, 202))
    return Image.blend(img, warm, warmth)

def cream_paper(img, strength=0.08, color=(242, 236, 221)):
    paper = Image.new("RGB", img.size, color)
    return Image.blend(img, ImageChops.multiply(img, paper), strength)

def vignette(img, strength=0.14, radius=0.5):
    w, h = img.size
    x = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    y = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    r = np.sqrt((x * 0.92) ** 2 + (y * 0.92) ** 2)
    vig = np.clip(1.0 - np.maximum(r - radius, 0) * strength, 0.78, 1.0)[..., None]
    arr = np.asarray(img).astype(np.float32) * vig
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

def tame_highlights(img, threshold=0.84, factor=0.68):
    arr = np.asarray(img).astype(np.float32) / 255.0
    over = np.clip((arr - threshold) / (1.0 - threshold), 0, 1)
    arr = arr - over * (1.0 - factor) * (arr - threshold) * 0.55
    return Image.fromarray(np.clip(arr * 255, 0, 255).astype(np.uint8), "RGB")

def crop_norm(img, box):
    w, h = img.size
    l, t, r, b = box
    return img.crop((round(l * w), round(t * h), round(r * w), round(b * h)))

img = Image.open(ROOT / "design" / "raw-v2" / "project-treehouse-raw.jpg").convert("RGB")
img = crop_norm(img, (0.03, 0.015, 0.97, 0.94))
img = ImageOps.fit(img, (1000, 1250), method=Image.Resampling.LANCZOS, centering=(0.5, 0.47))
img = warm_grade(img)
img = cream_paper(img)
img = tame_highlights(img)
img = vignette(img)
img = img.filter(ImageFilter.UnsharpMask(radius=1.3, percent=50, threshold=3))
img = paper_tooth(img, 0.055)
img.save(OUT / "project-treehouse.jpg", "JPEG", quality=89, optimize=True, progressive=True)
print("treehouse", img.size, (OUT / "project-treehouse.jpg").stat().st_size)
print("grain", grain.size, (ROOT / "public" / "images" / "grain.png").stat().st_size)
