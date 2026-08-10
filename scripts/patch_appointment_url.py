# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")

old = """    id: "appointment",
    accent: "#2f9e8a",
    accentSoft: "#dff5f0",
    needsIdentity: true,
    icon: "calendar","""

new = """    id: "appointment",
    accent: "#2f9e8a",
    accentSoft: "#dff5f0",
    needsIdentity: false,
    icon: "calendar",
    externalUrl: "https://nirankarihealthcity.karexpert.com/account-management/login","""

if "externalUrl: \"https://nirankarihealthcity.karexpert.com/account-management/login\"" in text:
    print("already patched")
else:
    if old not in text:
        raise SystemExit("appointment block not found")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")
    print("patched")
