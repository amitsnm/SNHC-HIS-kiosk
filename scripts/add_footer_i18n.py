# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")

def u(*codes: int) -> str:
    return "".join(chr(c) for c in codes)

# निरंकारी सरोवर, निरंकारी चौक, दिल्ली – 110009
hi_address = "निरंकारी सरोवर, निरंकारी चौक, दिल्ली – 110009"

# ਨਿਰੰਕਾਰੀ ਸਰੋਵਰ, � निरंकारी चौक, दिल्ली – 110009"

# ਨਿਰੰਕਾਰੀ ਸਰੋਵਰ, ਨਿਰੰਕਾਰੀ ਚੌਕ, ਦਿੱਲੀ – 110009
pa_address = u(
    0x0A28, 0x0A3F, 0x0A30, 0x0A70, 0x0A15, 0x0A3E, 0x0A30, 0x0A40, 0x20,
    0x0A38, 0x0A30, 0x0A4B, 0x0A35, 0x0A30, 0x2C, 0x20,
    0x0A28, 0x0A3F, 0x0A30, 0x0A70, 0x0A15, 0x0A3E, 0x0A30, 0x0A40, 0x20,
    0x0A1A, 0x0A4C, 0x0A15, 0x2C, 0x20,
    0x0A26, 0x0A3F, 0x0A71, 0x0A32, 0x0A40, 0x20, 0x2013, 0x20, 0x31, 0x31, 0x30, 0x30, 0x30, 0x39,
)

website = "www.nirankarihealthcity.org"
website_url = "https://nirankarihealthcity.org/"

# Remove existing address/website keys if partially added
text = re.sub(r"\n\s*address:.*", "", text)
text = re.sub(r"\n\s*website:.*", "", text)
text = re.sub(r"\n\s*websiteUrl:.*", "", text)

replacements = [
    (
        '    readyNote: "Prototype screen — connect this step to your HIS workflow next.",\n  },',
        f'''    readyNote: "Prototype screen — connect this step to your HIS workflow next.",
    address: "Nirankari Sarovar, Nirankari Chowk, Delhi – 110009",
    website: "{website}",
    websiteUrl: "{website_url}",
  }},''',
    ),
    (
        '    readyNote: "प्रोटोटाइप स्क्रीन — अगला कदम अपने HIS वर्कफ़्लो से जोड़ें।",\n  },',
        f'''    readyNote: "प्रोटोटाइप स्क्रीन — अगला कदम अपने HIS वर्कफ़्लो से जोड़ें।",
    address: "{hi_address}",
    website: "{website}",
    websiteUrl: "{website_url}",
  }},''',
    ),
]

# Punjabi readyNote line - match dynamically
pa_ready_re = re.compile(
    r'(    readyNote: "ਪ੍ਰੋਟੋਟਾਈਪ[^"]+",)\n  \},',
)

if pa_ready_re.search(text):
    text = pa_ready_re.sub(
        rf'''\1
    address: "{pa_address}",
    website: "{website}",
    websiteUrl: "{website_url}",
  }},''',
        text,
        count=1,
    )
else:
    raise SystemExit("punjabi readyNote not found")

for old, new in replacements:
    if old not in text:
        raise SystemExit(f"missing block: {old[:40]}")
    text = text.replace(old, new, 1)

p.write_text(text, encoding="utf-8")
print("footer i18n added")
