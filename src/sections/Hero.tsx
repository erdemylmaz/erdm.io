import { useT } from "../content";
import type { Lang } from "../lib/types";
import { HeroBlob } from "../components/HeroBlob";
import { Icon } from "../components/Icon";

type Props = { lang: Lang; accent: string };

export function Hero({ lang, accent }: Props) {
  const t = useT(lang).hero;
  const letters = t.first.split("");
  return (
    <section id="intro" className="hero">
      <div className="blob">
        <HeroBlob accent={accent} />
      </div>
      <div className="wrap hero-grid">
        <h1 className="hero-name display variant-blur">
          <span className="row">
            {letters.map((c, i) => (
              <span
                key={`a-${i}`}
                className="letter v-blur"
                style={{ animationDelay: `${0.06 * i + 0.1}s` }}
              >
                {c}
              </span>
            ))}
          </span>
          <span className="row" style={{ marginTop: "-0.04em" }}>
            <em
              className="letter v-blur accent"
              style={{ animationDelay: `${letters.length * 0.06 + 0.2}s` }}
            >
              {t.last}
              <span style={{ color: "var(--accent)" }}>.</span>
            </em>
          </span>
        </h1>
        <div className="hero-meta">
          {t.status && (
            <div className="status-pill">
              <span className="pulse" />
              {t.status}
            </div>
          )}
          <div className="role">{t.role}</div>
          <div className="tag">{t.tagline}</div>
          <div className="cta-row">
            <a className="btn" href="#projects" data-cursor="view" data-cursor-label="↓">
              {t.cta1}
              <span className="arrow">
                <Icon name="arrow" size={14} />
              </span>
            </a>
            <a className="btn ghost" href="#contact" data-cursor="send">
              {t.cta2}
              <span className="arrow">
                <Icon name="arrow-ne" size={14} />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <span>{t.foot1}</span>
        <span
          style={{
            fontStyle: "italic",
            fontFamily: "var(--display)",
            textTransform: "none",
            letterSpacing: 0,
            fontSize: 14,
          }}
        >
          {t.year}
        </span>
        <span className="scroll">
          {t.foot2}
          <span className="line" />
        </span>
      </div>
    </section>
  );
}
