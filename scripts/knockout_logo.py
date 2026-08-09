from PIL import Image

src = r"C:\Users\IT\Desktop\Kiosk\public\snhc-logo.png"
img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, _a = pixels[x, y]
        if r < 28 and g < 28 and b < 28:
            pixels[x, y] = (r, g, b, 0)

img.save(src)
print(f"{w}x{h} transparent ready")
