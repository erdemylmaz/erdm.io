import { useT } from "../content";
import type { Lang } from "../lib/types";
import { Icon } from "../components/Icon";
import type { ReactNode } from "react";

type Props = { lang: Lang };
type InlineLink = { label: string; href: string };

function InlineLinks({ text, links }: { text: string; links: InlineLink[] }) {
  const orderedLinks = [...links].sort((a, b) => b.label.length - a.label.length);
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const next = orderedLinks.reduce<null | { index: number; link: InlineLink }>((match, link) => {
      const index = remaining.indexOf(link.label);
      if (index === -1) return match;
      if (!match || index < match.index) return { index, link };
      return match;
    }, null);

    if (!next) {
      parts.push(remaining);
      break;
    }

    if (next.index > 0) parts.push(remaining.slice(0, next.index));
    parts.push(
      <a
        key={`${next.link.href}-${key++}`}
        className="about-inline-link"
        href={next.link.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {next.link.label}
      </a>,
    );
    remaining = remaining.slice(next.index + next.link.label.length);
  }

  return <>{parts}</>;
}

export function About({ lang }: Props) {
  const t = useT(lang).about;
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="line" />
          <span className="num">02</span>
          <span>{t.eyebrow}</span>
        </div>
        <div className="about-grid" style={{ marginTop: 60 }}>
          <div className="reveal">
            <div className="portrait">
              <div className="ph-label">FIG. 01 · PORTRAIT</div>
              <div className="portrait-photo" />
              <div className="portrait-cells" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
              <div className="figure-num">01</div>
            </div>
            <div className="caption">
              <span>{t.caption[0]}</span>
              <span>{t.caption[1]}</span>
            </div>
          </div>
          <div className="about-copy reveal">
            <h2 className="display">{t.h}</h2>
            <p>
              <InlineLinks text={t.p1} links={t.links} />
            </p>
            <p>{t.p2}</p>
            <div className="fact-pills">
              {t.facts.map((f, i) => {
                const content = (
                  <>
                    <span className="ico">
                      <Icon name={f.icon} size={14} />
                    </span>
                    {f.label}
                  </>
                );
                return f.href ? (
                  <a
                    key={i}
                    className="fact-pill linked"
                    href={f.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {content}
                  </a>
                ) : (
                  <span key={i} className="fact-pill">
                    {content}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
