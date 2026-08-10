import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ServiceIcon } from "./components/ServiceIcon";
import {
  copy,
  languages,
  localeFor,
  services,
  type Lang,
  type Service,
} from "./data/services";
import "./App.css";

type Screen = "home" | "identify" | "ready" | "embed";

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

function BrandMark({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <img
      className="brand-logo"
      src="/snhc-logo.png"
      alt={t.brand}
      width={380}
      height={100}
      decoding="async"
    />
  );
}

function IdentityScreen({
  service,
  lang,
  onBack,
  onContinue,
}: {
  service: Service;
  lang: Lang;
  onBack: () => void;
  onContinue: () => void;
}) {
  const t = copy[lang];
  const label = service[lang];
  const [uhid, setUhid] = useState("");
  const [mobile, setMobile] = useState("");

  return (
    <section className="panel identify-panel" aria-labelledby="identify-title">
      <button type="button" className="back-btn" onClick={onBack}>
        ← {t.back}
      </button>

      <div className="identify-hero">
        <div
          className="identify-hero__icon"
          style={{ background: service.accentSoft, color: service.accent }}
        >
          <ServiceIcon name={service.icon} />
        </div>
        <div>
          <p className="eyebrow">{label.title}</p>
          <h2 id="identify-title">{t.identifyTitle}</h2>
          <p className="lede">{t.identifyHint}</p>
        </div>
      </div>

      <div className="identify-grid">
        <label className="field">
          <span>{t.uhid}</span>
          <input
            inputMode="text"
            autoComplete="off"
            placeholder="SNHC-00012345"
            value={uhid}
            onChange={(e) => setUhid(e.target.value)}
          />
        </label>
        <label className="field">
          <span>{t.mobile}</span>
          <input
            inputMode="numeric"
            autoComplete="off"
            placeholder="98XXXXXXXX"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>
      </div>

      <p className="or-scan">{t.orScan}</p>
      <button type="button" className="scan-btn" onClick={onContinue}>
        <span className="scan-btn__frame" />
        {t.scanCta}
      </button>

      <div className="identify-actions">
        <button type="button" className="ghost-btn" onClick={onBack}>
          {t.back}
        </button>
        <button
          type="button"
          className="primary-btn"
          onClick={onContinue}
          disabled={!uhid.trim() && mobile.trim().length < 10}
        >
          {t.continue}
        </button>
      </div>
    </section>
  );
}

function ReadyScreen({
  service,
  lang,
  onBack,
}: {
  service: Service;
  lang: Lang;
  onBack: () => void;
}) {
  const t = copy[lang];
  const label = service[lang];

  return (
    <section className="panel ready-panel">
      <button type="button" className="back-btn" onClick={onBack}>
        ← {t.back}
      </button>
      <div
        className="ready-card"
        style={{ "--accent": service.accent, "--accent-soft": service.accentSoft } as CSSProperties}
      >
        <div className="ready-card__icon">
          <ServiceIcon name={service.icon} />
        </div>
        <h2>{label.title}</h2>
        <p>{label.subtitle}</p>
        <p className="ready-note">{t.readyNote}</p>
        <button type="button" className="primary-btn" onClick={onBack}>
          {t.back}
        </button>
      </div>
    </section>
  );
}

function EmbedScreen({
  service,
  lang,
  onBack,
}: {
  service: Service;
  lang: Lang;
  onBack: () => void;
}) {
  const t = copy[lang];
  const label = service[lang];
  const [loading, setLoading] = useState(true);
  const url = service.externalUrl ?? "";

  useEffect(() => {
    setLoading(true);
  }, [url]);

  return (
    <section className="embed-shell" aria-label={label.title}>
      <div className="embed-bar">
        <button type="button" className="primary-btn embed-bar__back" onClick={onBack}>
          ← {t.back}
        </button>
        <div className="embed-bar__meta">
          <span className="embed-bar__eyebrow">{t.brand}</span>
          <h2 className="embed-bar__title">{label.title}</h2>
        </div>
        <p className="embed-bar__hint">{t.embedHint}</p>
      </div>

      <div className="embed-frame-wrap">
        {loading && <div className="embed-loading">{t.embedLoading}</div>}
        <iframe
          key={url}
          className="embed-frame"
          src={url}
          title={label.title}
          allow="payment; fullscreen; clipboard-read; clipboard-write"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoading(false)}
        />
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<Screen>("home");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const now = useClock();
  const t = copy[lang];
  const locale = localeFor(lang);

  const timeLabel = useMemo(
    () =>
      now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [now, locale],
  );

  const dateLabel = useMemo(
    () =>
      now.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    [now, locale],
  );

  function openService(service: Service) {
    setActiveService(service);
    if (service.externalUrl) {
      setScreen("embed");
      return;
    }
    setScreen(service.needsIdentity ? "identify" : "ready");
  }

  function goHome() {
    setScreen("home");
    setActiveService(null);
  }

  const isEmbed = screen === "embed" && activeService?.externalUrl;

  return (
    <div className={`kiosk${isEmbed ? " kiosk--embed" : ""}`}>
      {!isEmbed && (
        <header className="topbar">
          <div className="brand">
            <BrandMark lang={lang} />
          </div>

          <div className="topbar__actions">
            <div className="clock" aria-live="polite">
              <span className="clock__time">{timeLabel}</span>
              <span className="clock__date">
                {t.clockLabel} · {dateLabel}
              </span>
            </div>
            <div className="lang-switch" role="group" aria-label="Language">
              {languages.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`lang-btn${lang === option.id ? " is-active" : ""}`}
                  onClick={() => setLang(option.id)}
                  aria-pressed={lang === option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <a className="emergency-btn" href="tel:102">
              {t.emergency}
            </a>
          </div>
        </header>
      )}

      <main className={`stage${isEmbed ? " stage--embed" : ""}`}>
        {screen === "home" && (
          <section className="home" aria-labelledby="welcome-title">
            <div className="welcome">
              <h2 id="welcome-title" className="welcome__title">
                {t.helpTitle}
              </h2>
              <p className="welcome__prompt">{t.prompt}</p>
            </div>

            <div className="service-grid" role="list">
              {services.map((service, index) => {
                const label = service[lang];
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="listitem"
                    className="service-card"
                    style={
                      {
                        "--accent": service.accent,
                        "--accent-soft": service.accentSoft,
                        "--delay": `${index * 45}ms`,
                      } as CSSProperties
                    }
                    onClick={() => openService(service)}
                  >
                    <span className="service-card__num" aria-hidden>
                      {index + 1}
                    </span>
                    <span className="service-card__icon">
                      <ServiceIcon name={service.icon} />
                    </span>
                    <span className="service-card__copy">
                      <span className="service-card__title">{label.title}</span>
                      <span className="service-card__subtitle">{label.subtitle}</span>
                    </span>
                    <span className="service-card__chev" aria-hidden>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {screen === "identify" && activeService && (
          <IdentityScreen
            service={activeService}
            lang={lang}
            onBack={goHome}
            onContinue={() => setScreen("ready")}
          />
        )}

        {screen === "ready" && activeService && (
          <ReadyScreen service={activeService} lang={lang} onBack={goHome} />
        )}

        {screen === "embed" && activeService?.externalUrl && (
          <EmbedScreen service={activeService} lang={lang} onBack={goHome} />
        )}
      </main>

      {!isEmbed && (
        <footer className="footer">
          <span>{t.address}</span>
          <span className="footer__website">{t.website}</span>
          <span>{t.assistance}</span>
        </footer>
      )}
    </div>
  );
}
