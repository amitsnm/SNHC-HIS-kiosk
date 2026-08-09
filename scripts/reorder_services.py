# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")
m = re.search(r"export const services: Service\[\] = \[([\s\S]*?)\n\];", text)
if not m:
    raise SystemExit("services array not found")

body = m.group(1)
parts = re.findall(r"\n  \{[\s\S]*?\n  \},?", body)
objs = {}
for part in parts:
    idm = re.search(r'id: "([^"]+)"', part)
    if not idm:
        raise SystemExit(f"id missing in part: {part[:40]}")
    objs[idm.group(1)] = part.rstrip().rstrip(",")

order = [
    "registration",
    "appointment",
    "opd-token",
    "find-doctor",
    "print-report",
    "bill-payment",
    "pharmacy",
    "health-packages",
    "help",
]

missing = [i for i in order if i not in objs]
if missing:
    raise SystemExit(f"missing ids: {missing}")

new_body = ",\n".join(objs[i] for i in order)
new = text[: m.start(1)] + "\n" + new_body + "\n" + text[m.end(1) :]
p.write_text(new, encoding="utf-8")
print("reordered:", ", ".join(order))
