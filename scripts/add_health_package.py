# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "data" / "services.ts"
text = p.read_text(encoding="utf-8")

marker = '    id: "help",\n    accent: "#135466",'
if 'id: "health-packages"' in text and text.index('id: "health-packages"') < text.index(marker):
    print("already present")
    raise SystemExit(0)

insert = """  {
    id: "health-packages",
    accent: "#c45c8a",
    accentSoft: "#f8e4ee",
    needsIdentity: false,
    icon: "heart",
    en: { title: "Health Packages", subtitle: "Preventive checkup and wellness packages" },
    hi: { title: "स्वास्थ्य पैकेज", subtitle: "प्रिवेंटिव चेकअप और वेलनेस पैकेज" },
    pa: { title: "ਸਿਹਤ ਪੈਕੇ� "प्रिवेंटिव चेकअप और वेलनेस पैकेज" },
    pa: { title: "ਸਿਹਤ ਪੈਕੇਜ", subtitle: "ਪ੍ਰੀਵੈਂਟਿਵ ਚੈੱਕਅੱਪ ਅਤੇ ਵੈਲਨੈੱਸ ਪੈਕੇਜ" },
  },
  {
    id: "help",
    accent: "#135466","""

if marker not in text:
    raise SystemExit("help marker not found")

text = text.replace(
    '  {\n    id: "help",\n    accent: "#135466",',
    insert,
    1,
)
p.write_text(text, encoding="utf-8")
print("inserted health-packages")
