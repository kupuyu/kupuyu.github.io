from PIL import Image, ImageEnhance, ImageFilter, ImageChops, ImageOps
from pathlib import Path
import numpy as np

src = Image.open(r"E:\deepseek文件\portfolio\public\images\generated\project-treehouse-raw.jpg").convert("RGB")
# Trim watermark strip and a little off each edge.
w, h = src.size
src = src.crop((10, 8, w - 10, h - 64))
w, h = src.size
# resize 4:5-ish card master
target = (1000, 1250)
src = ImageOps.fit(src, target, method=Image.Resampling.LANCZOS, centering=(0.5, 0.46))

grain = Image.open(r"E:\deepseek文件\portfolio\public\images\grain.png").convert("L").resize(target)
grain_rgb = Image.merge("RGB", (grain, grain, grain))

def grade(img):
    img = ImageEnhance.Color(img).enhance(1.12)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = ImageEnhance.Brightness(img).enhance(1.015)
    # warm paper tint
    warm = Image.new("RGB", img.size, (244, 226, 188))
    img = Image.blend(img, warm, 0.05)
    return img

def papercut(img, strength=0.45, poster=5, blur=1.1):
    smooth = img.filter(ImageFilter.GaussianBlur(blur))
    img2 = Image.blend(img, smooth, 0.55)
    img2 = ImageOps.posterize(img2, poster)
    img2 = grade(img2)

    # relief: dark edge shifted down-right, light edge shifted up-left
    lum = img2.convert("L").filter(ImageFilter.GaussianBlur(1.2))
    dark = lum.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(1.0))
    dark = ImageOps.invert(dark)  # white background, dark edges
    shadow = ImageChops.offset(dark, 2, 2)
    light = ImageChops.invert(ImageChops.offset(dark, -2, -2))

    # base multiplied by shadow then screen the light edge
    shadow_rgb = Image.merge("RGB", (shadow, shadow, shadow))
    out = ImageChops.multiply(img2, shadow_rgb)
    light_rgb = Image.merge("RGB", (light, light, light))
    out = Image.blend(out, ImageChops.screen(out, light_rgb), strength * 0.55)
    # texture
    out = Image.blend(out, ImageChops.multiply(out, grain_rgb), 0.14)
    out = ImageEnhance.Contrast(out).enhance(1.02)
    return out

grade(src).save(r"E:\deepseek文件\portfolio\qa\treehouse-grade.jpg", quality=90)
papercut(src, 0.35).save(r"E:\deepseek文件\portfolio\qa\treehouse-paper-soft.jpg", quality=90)
papercut(src, 0.7).save(r"E:\deepseek文件\portfolio\qa\treehouse-paper-strong.jpg", quality=90)
print("done")
