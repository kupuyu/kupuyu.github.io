from PIL import Image

path = "public/images/generated/portrait-peng.jpg"
img = Image.open(path).convert("RGB")
w, h = img.size
# The source copy of the generated portrait still carries a faint dark raster
# border on the top and sides. Trim just enough to remove it without touching
# the illustration framing.
left = round(w * 0.016)
top = round(h * 0.016)
right = w - round(w * 0.016)
bottom = h - round(h * 0.008)
img = img.crop((left, top, right, bottom)).resize((800, 1000), Image.Resampling.LANCZOS)
img.save(path, "JPEG", quality=90, optimize=True, progressive=True)
print(f"cropped portrait: {img.size[0]}x{img.size[1]}")
