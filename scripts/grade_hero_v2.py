from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps
import numpy as np

ROOT = Path(r"E:\deepseek文件\portfolio")
src = Image.open(ROOT / "design" / "raw-v2" / "hero-6721-raw.jpg").convert("RGB")
grain = Image.open(ROOT / "public" / "images" / "grain.png").convert("RGB")

# Remove the generator watermark and any thin edge artifacts.
w, h = src.size
src = src.crop((0, 0, w, int(h * 0.952)))
src = ImageOps.fit(src, (1920, 1080), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def warm_grade(im, brightness, saturation, contrast, shadow_lift, tint_strength, glow_strength):
    im = ImageEnhance.Brightness(im).enhance(brightness)
    im = ImageEnhance.Color(im).enhance(saturation)
    im = ImageEnhance.Contrast(im).enhance(contrast)

    arr = np.asarray(im).astype(np.float32) / 255.0
    # Lift the deepest greens without touching the bright center.
    shadow_lift = np.clip(shadow_lift, 0, 0.3)
    arr = arr + (1.0 - arr) * shadow_lift * (1.0 - arr.mean(axis=2, keepdims=True)) * 0.55
    arr = np.clip(arr, 0, 1)

    # Warm cream tint, strongest in the mids.
    tint = np.array([0.96, 0.91, 0.72], dtype=np.float32)
    lum = arr.mean(axis=2, keepdims=True)
    mid = 1.0 - np.abs(lum - 0.56) / 0.56
    mid = np.clip(mid, 0, 1) * tint_strength
    arr = arr * (1 - mid) + (arr * 0.55 + tint * 0.45) * mid

    # Soft golden core around the sun shaft.
    yy, xx = np.mgrid[0:arr.shape[0], 0:arr.shape[1]]
    cx, cy = arr.shape[1] * 0.50, arr.shape[0] * 0.33
    dist = np.sqrt(((xx - cx) / (arr.shape[1] * 0.43)) ** 2 + ((yy - cy) / (arr.shape[0] * 0.60)) ** 2)
    halo = np.clip(1 - dist, 0, 1) ** 2 * glow_strength
    warm = np.array([1.0, 0.86, 0.55], dtype=np.float32)
    arr = arr + (warm - arr) * halo[..., None]

    out = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))

    # Paper tooth, subtle and only in the midtones.
    texture = grain.resize(out.size, Image.Resampling.BILINEAR)
    out = Image.blend(out, ImageChops.soft_light(out, texture), 0.20)
    return out.filter(ImageFilter.UnsharpMask(radius=2.0, percent=92, threshold=3))


variants = {
    "a": dict(brightness=1.14, saturation=1.13, contrast=1.02, shadow_lift=0.10, tint_strength=0.22, glow_strength=0.14),
    "b": dict(brightness=1.20, saturation=1.18, contrast=1.00, shadow_lift=0.14, tint_strength=0.30, glow_strength=0.20),
    "c": dict(brightness=1.10, saturation=1.10, contrast=1.06, shadow_lift=0.08, tint_strength=0.18, glow_strength=0.10),
}
outdir = ROOT / "design" / "hero-grades"
outdir.mkdir(exist_ok=True)
for name, params in variants.items():
    out = warm_grade(src, **params)
    path = outdir / f"hero-grade-{name}.jpg"
    out.save(path, quality=90, optimize=True, progressive=True)
    print(path, path.stat().st_size // 1024, "KB")
