# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")

if "embedHint" in text:
    print("already present")
    raise SystemExit(0)


def u(*codes: int) -> str:
    return "".join(chr(c) for c in codes)


pa_hint = u(
    0x0A15, 0x0A3F, 0x0A13, 0x0A38, 0x0A15, 0x20, 0x0A35, 0x0A3F, 0x0A71, 0x0A1A, 0x20,
    0x0A30, 0x0A39, 0x0A4B, 0x20, 0x2014, 0x20, 0x0A38, 0x0A2E, 0x0A3E, 0x0A2A, 0x0A24,
    0x20, 0x0A24, 0x0A4B, 0x0A02, 0x20, 0x0A2C, 0x0A3E, 0x0A05, 0x0A26, 0x20, 0x0A18,
    0x0A30, 0x20, 0x0A35, 0x0A3E, 0x0A2A, 0x0A38, 0x20, 0x0A1C, 0x0A3E, 0x0A13, 0x0964,
)
pa_load = u(
    0x0A05, 0x0A2A, 0x0A3E, 0x0A07, 0x0A70, 0x0A1F, 0x0A2E, 0x0A48, 0x0A02, 0x0A1F, 0x20,
    0x0A2A, 0x0A4B, 0x0A30, 0x0A1F, 0x0A32, 0x20, 0x0A32, 0x0A4B, 0x0A21, 0x20, 0x0A39,
    0x0A4B, 0x20, 0x0A30, 0x0A3F, 0x0A39, 0x0A3E, 0x20, 0x0A39, 0x0A48, 0x2026,
)

text = text.replace(
    '    readyNote: "Prototype screen — connect this step to your HIS workflow next.",',
    '    embedHint: "Stay in kiosk — use Back to Home when finished.",\n'
    '    embedLoading: "Loading appointment portal…",\n'
    '    readyNote: "Prototype screen — connect this step to your HIS workflow next.",',
    1,
)

text = text.replace(
    '    readyNote: "प्रोटोटाइप स्क्रीन — अगला कदम अपने HIS वर्कफ़्लो से जोड़ें।",',
    '    embedHint: "कियोस्क में रहें — समाप्त होने पर होम पर वापस जाएँ।",\n'
    '    embedLoading: "अपॉइंटमेंट पोर्टल लोड हो रहा है…",\n'
    '    readyNote: "प्रोटोटाइप स्क्रीन — अगला कदम अपने HIS वर्कफ़्लो से जोड़ें।",',
    1,
)

text, n = re.subn(
    r'(    readyNote: "ਪ੍ਰੋਟੋਟਾਈਪ[^"]+",)',
    f'    embedHint: "{pa_hint}",\n    embedLoading: "{pa_load}",\n\\1',
    text,
    count=1,
)
if n != 1:
    raise SystemExit("punjabi readyNote not found")

p.write_text(text, encoding="utf-8")
print("embed copy added")
