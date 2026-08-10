export type Lang = "en" | "hi" | "pa";

export type ServiceId =
  | "registration"
  | "print-report"
  | "bill-payment"
  | "appointment"
  | "opd-token"
  | "find-doctor"
  | "pharmacy"
  | "health-packages"
  | "help";

export type ServiceCopy = { title: string; subtitle: string };

export type ServiceIconName =
  | "user-plus"
  | "file"
  | "wallet"
  | "calendar"
  | "ticket"
  | "stethoscope"
  | "pill"
  | "heart"
  | "help";

export type Service = {
  id: ServiceId;
  accent: string;
  accentSoft: string;
  needsIdentity: boolean;
  icon: ServiceIconName;
  externalUrl?: string;
  en: ServiceCopy;
  hi: ServiceCopy;
  pa: ServiceCopy;
};

export const languages: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिंदी" },
  { id: "pa", label: "ਪੰਜਾਬੀ" },
];

export const services: Service[] = [

  {
    id: "registration",
    accent: "#1f7a8c",
    accentSoft: "#d7eef2",
    needsIdentity: false,
    icon: "user-plus",
    en: { title: "Registration", subtitle: "New / returning patient OPD registration" },
    hi: { title: "पंजीकरण", subtitle: "नए / पुराने मरीज़ का ओपीडी पंजीकरण" },
    pa: { title: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ", subtitle: "ਨਵੇਂ / ਪੁਰਾਣੇ ਮਰੀਜ਼ ਦਾ ਓਪੀਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ" },
  },

  {
    id: "appointment",
    accent: "#2f9e8a",
    accentSoft: "#dff5f0",
    needsIdentity: true,
    icon: "calendar",
    en: { title: "Book Appointment", subtitle: "Choose doctor, date and time slot" },
    hi: { title: "अपॉइंटमेंट", subtitle: "डॉक्टर, तारीख और समय चुनें" },
    pa: { title: "ਅਪਾਇੰਟਮੈਂਟ", subtitle: "ਡਾਕਟਰ, ਤਾਰੀਖ ਅਤੇ ਸਮਾਂ ਚੁਣੋ" },
  },

  {
    id: "opd-token",
    accent: "#e8a838",
    accentSoft: "#fff3d6",
    needsIdentity: true,
    icon: "ticket",
    en: { title: "OPD Token", subtitle: "Generate queue token for today" },
    hi: { title: "ओपीडी टोकन", subtitle: "आज की कतार के लिए टोकन लें" },
    pa: { title: "ਓਪੀਡੀ ਟੋਕਨ", subtitle: "ਅੱਜ ਦੀ ਕਤਾਰ ਲਈ ਟੋਕਨ ਲਓ" },
  },

  {
    id: "find-doctor",
    accent: "#6b7fd7",
    accentSoft: "#e9ecfb",
    needsIdentity: false,
    icon: "stethoscope",
    en: { title: "Find Doctor", subtitle: "Browse specialties and consultants" },
    hi: { title: "डॉक्टर खोजें", subtitle: "विशेषज्ञता और डॉक्टर देखें" },
    pa: { title: "ਡਾਕਟਰ ਲੱਭੋ", subtitle: "ਵਿਸ਼ੇਸ਼ਤਾ ਅਤੇ ਡਾਕਟਰ ਵੇਖੋ" },
  },

  {
    id: "print-report",
    accent: "#4b8fd4",
    accentSoft: "#e3effb",
    needsIdentity: true,
    icon: "file",
    en: { title: "Print Report", subtitle: "Lab, radiology & discharge reports" },
    hi: { title: "रिपोर्ट प्रिंट", subtitle: "लैब, रेडियोलॉजी और डिस्चार्ज रिपोर्ट" },
    pa: { title: "ਰਿਪੋਰਟ ਪ੍ਰਿੰਟ", subtitle: "ਲੈਬ, ਰੇਡੀਓਲੋਜੀ ਅਤੇ ਡਿਸਚਾਰਜ ਰਿਪੋਰਟਾਂ" },
  },

  {
    id: "bill-payment",
    accent: "#d96b4c",
    accentSoft: "#fbe8e2",
    needsIdentity: true,
    icon: "wallet",
    en: { title: "Bill Payment", subtitle: "Pay OPD, IPD or diagnostic bills" },
    hi: { title: "बिल भुगतान", subtitle: "ओपीडी, आईपीडी या जांच बिल चुकाएँ" },
    pa: { title: "ਬਿੱਲ ਭੁਗਤਾਨ", subtitle: "ਓਪੀਡੀ, ਆਈਪੀਡੀ ਜਾਂ ਜਾਂਚ ਬਿੱਲ ਭਰੋ" },
  },

  {
    id: "pharmacy",
    accent: "#2f8f6b",
    accentSoft: "#dff4eb",
    needsIdentity: true,
    icon: "pill",
    en: { title: "Pharmacy Order", subtitle: "View medicine slip & collect status" },
    hi: { title: "फार्मेसी", subtitle: "दवा पर्ची और कलेक्ट स्थिति देखें" },
    pa: { title: "ਫਾਰਮੇਸੀ", subtitle: "ਦਵਾਈ ਪਰਚੀ ਅਤੇ ਕੁਲੈਕਟ ਸਥਿਤੀ ਵੇਖੋ" },
  },

  {
    id: "health-packages",
    accent: "#c45c8a",
    accentSoft: "#f8e4ee",
    needsIdentity: false,
    icon: "heart",
    en: { title: "Health Packages", subtitle: "Preventive checkup and wellness packages" },
    hi: { title: "स्वास्थ्य पैकेज", subtitle: "प्रिवेंटिव चेकअप और वेलनेस पैकेज" },
    pa: { title: "ਸਿਹਤ ਪੈਕੇਜ", subtitle: "ਪ੍ਰੀਵੈਂਟਿਵ ਚੈੱਕਅੱਪ ਅਤੇ ਵੈਲਨੈੱਸ ਪੈਕੇਜ" },
  },

  {
    id: "help",
    accent: "#135466",
    accentSoft: "#dce9ed",
    needsIdentity: false,
    icon: "help",
    en: { title: "Help Desk", subtitle: "Directions, emergency & assistance" },
    hi: { title: "सहायता डेस्क", subtitle: "दिशा, आपातकाल और सहायता" },
    pa: { title: "ਮਦਦ ਡੈਸਕ", subtitle: "ਦਿਸ਼ਾ, ਐਮਰਜੈਂਸੀ ਅਤੇ ਸਹਾਇਤਾ" },
  }

];

export const copy = {
  en: {
    brand: "Sant Nirankari Health City",
    tagline: "Service with Humility",
    greeting: "Welcome",
    helpTitle: "How can we help you today?",
    prompt: "Keep handy your UHID for services access.",
    assistance: "Press Help Desk or Ask our Front Desk Staff.",
    emergency: "Emergency",
    back: "Back to Home",
    continue: "Proceed",
    identifyTitle: "Identify Patient",
    identifyHint: "Enter UHID or registered mobile number to continue.",
    uhid: "UHID / MRN",
    mobile: "Mobile Number",
    orScan: "Or tap to scan QR / barcode on your slip",
    scanCta: "Scan Patient QR",
    startFresh: "New patient? Start registration without UHID",
    clockLabel: "Today",
    readyNote: "Prototype screen — connect this step to your HIS workflow next.",
    address: "Nirankari Sarovar, Nirankari Chowk, Delhi – 110009",
    website: "www.nirankarihealthcity.org",
  },
  hi: {
    brand: "संत निरंकारी हेल्थ सिटी",
    tagline: "सेवा में विनम्रता",
    greeting: "स्वागत है",
    helpTitle: "आज हम आपकी कैसे मदद करें?",
    prompt: "सेवाओं के लिए अपना यूएचआईडी तैयार रखें।",
    assistance: "हेल्प डेस्क दबाएँ या फ्रंट डेस्क स्टाफ से पूछें।",
    emergency: "आपातकाल",
    back: "होम पर वापस",
    continue: "आगे बढ़ें",
    identifyTitle: "मरीज़ की पहचान",
    identifyHint: "आगे बढ़ने के लिए यूएचआईडी या मोबाइल नंबर दर्ज करें।",
    uhid: "यूएचआईडी / एमआरएन",
    mobile: "मोबाइल नंबर",
    orScan: "या पर्ची पर क्यूआर / बारकोड स्कैन करें",
    scanCta: "मरीज़ क्यूआर स्कैन",
    startFresh: "नए मरीज़? बिना यूएचआईडी पंजीकरण शुरू करें",
    clockLabel: "आज",
    readyNote: "प्रोटोटाइप स्क्रीन — अगला कदम अपने HIS वर्कफ़्लो से जोड़ें।",
    address: "निरंकारी सरोवर, निरंकारी चौक, दिल्ली – 110009",
    website: "www.nirankarihealthcity.org",
  },
  pa: {
    brand: "ਸੰਤ ਨਿਰੰਕਾਰੀ ਹੈਲਥ ਸਿਟੀ",
    tagline: "ਸੇਵਾ ਵਿੱਚ ਨਿਮਰਤਾ",
    greeting: "ਜੀ ਆਇਆਂ ਨੂੰ",
    helpTitle: "ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰੀਏ?",
    prompt: "ਸੇਵਾਵਾਂ ਲਈ ਆਪਣਾ ਯੂਐਚਆਈਡੀ ਹਾਜ਼ਰ ਰੱਖੋ।",
    assistance: "ਹੈਲਪ ਡੈਸਕ ਦਬਾਓ ਜਾਂ ਫਰੰਟ ਡੈਸਕ ਸਟਾਫ ਤੋਂ ਪੁੱਛੋ।",
    emergency: "ਐਮਰਜੈਂਸੀ",
    back: "ਘਰ ਵਾਪਸ",
    continue: "ਅੱਗੇ ਵਧੋ",
    identifyTitle: "ਮਰੀਜ਼ ਦੀ ਪਛਾਣ",
    identifyHint: "ਅੱਗੇ ਵਧਣ ਲਈ ਯੂਐਚਆਈਡੀ ਜਾਂ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    uhid: "ਯੂਐਚਆਈਡੀ / ਐਮਆਰਐਨ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    orScan: "ਜਾਂ ਪਰਚੀ ਉੱਤੇ ਕਿਊਆਰ / ਬਾਰਕੋਡ ਸਕੈਨ ਕਰੋ",
    scanCta: "ਮਰੀਜ਼ ਕਿਊਆਰ ਸਕੈਨ",
    startFresh: "ਨਵਾਂ ਮਰੀਜ਼? ਬਿਨਾਂ ਯੂਐਚਆਈਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ",
    clockLabel: "ਅੱਜ",
    readyNote: "ਪ੍ਰੋਟੋਟਾਈਪ ਸਕ੍ਰੀਨ — ਅਗਲਾ ਕਦਮ ਆਪਣੇ HIS ਵਰਕਫਲੋ ਨਾਲ ਜੋੜੋ।",
    address: "ਨਿਰੰਕਾਰੀ ਸਰੋਵਰ, ਨਿਰੰਕਾਰੀ ਚੌਕ, ਦਿੱਲੀ – 110009",
    website: "www.nirankarihealthcity.org",
  },
} as const;

export function localeFor(lang: Lang) {
  if (lang === "hi") return "hi-IN";
  if (lang === "pa") return "pa-IN";
  return "en-IN";
}
