# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")

pa_title = "".join(chr(c) for c in [0x0A38, 0x0A3F, 0x0A39, 0x0A24, 0x20, 0x0A2A, 0x0A48, 0x0A15, 0x0A47, 0x0A1C])
pa_sub = "".join(
    chr(c)
    for c in [
        0x0A2A, 0x0A4D, 0x0A30, 0x0A40, 0x0A35, 0x0A48, 0x0A02, 0x0A1F, 0x0A3F, 0x0A35, 0x20,
        0x0A1A, 0x0A48, 0x0A71, 0x0A15, 0x0A05, 0x0A71, 0x0A2A, 0x20, 0x0A05, 0x0A24, 0x0A47, 0x20,
        0x0A35, 0x0A48, 0x0A32, 0x0A28, 0x0A48, 0x0A71, 0x0A38, 0x20, 0x0A2A, 0x0A48, 0x0A15, 0x0A47, 0x0A1C,
    ]
)

bad_start = '    pa: { title: "ਸਿਹਤ'
# Replace corrupted pa block inside health-packages
import re

pattern = re.compile(
    r'    id: "health-packages",[\s\S]*?    id: "help",',
    re.M,
)

replacement = f'''    id: "health-packages",
    accent: "#c45c8a",
    accentSoft: "#f8e4ee",
    needsIdentity: false,
    icon: "heart",
    en: {{ title: "Health Packages", subtitle: "Preventive checkup and wellness packages" }},
    hi: {{ title: "स्वास्थ्य पैकेज", subtitle: "प्रिवेंटिव चेकअप और वेलनेस पैकेज" }},
    pa: {{ title: "{pa_title}", subtitle: "{pa_sub}" }},
  }},
  {{
    id: "help",'''

new_text, n = pattern.subn(replacement, text, count=1)
if n != 1:
    raise SystemExit(f"replace failed: {n}")
p.write_text(new_text, encoding="utf-8")
print("fixed", pa_title)
