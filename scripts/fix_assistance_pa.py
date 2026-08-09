# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")

# ਹੈਲਪ ਡੈਸਕ ਦਬਾਓ ਜਾਂ ਫਰੰਟ ਡੈਸਕ ਸਟਾਫ �ਾਂ ਫਰੰਟ ਡੈਸਕ ਸਟਾਫ ਤੋਂ ਪੁੱਛੋ।
pa = "".join(
    chr(c)
    for c in [
        0x0A39, 0x0A48, 0x0A32, 0x0A2A, 0x20, 0x0A21, 0x0A48, 0x0A38, 0x0A15, 0x20,
        0x0A26, 0x0A2C, 0x0A3E, 0x0A13, 0x20, 0x0A1C, 0x0A3E, 0x0A02, 0x20,
        0x0A2B, 0x0A30, 0x0A70, 0x0A1F, 0x20, 0x0A21, 0x0A48, 0x0A38, 0x0A15, 0x20,
        0x0A38, 0x0A1F, 0x0A3E, 0x0A2B, 0x20, 0x0A24, 0x0A4B, 0x0A02, 0x20,
        0x0A2A, 0x0A41, 0x0A71, 0x0A1B, 0x0A4B, 0x0964,
    ]
)

old = None
for line in text.splitlines():
    if line.strip().startswith("assistance:") and "ਹੈਲਪ" in line:
        old = line
        break

if not old:
    raise SystemExit("punjabi assistance line not found")

new = f'    assistance: "{pa}",'
text = text.replace(old, new, 1)
p.write_text(text, encoding="utf-8")
print("updated")
