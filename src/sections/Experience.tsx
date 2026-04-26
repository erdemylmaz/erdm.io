import { useEffect, useRef, useState } from "react";
import { useT } from "../content";
import type { Lang } from "../lib/types";

type Props = { lang: Lang };

export function Experience({ lang }: Props) {
  const t = useT(lang).exp;
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [t.items.length]);

  const cur = t.items[active];

  return (
    <section id="experience" className="exp-section">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="line" />
          <span className="num">03</span>
          <span>{t.eyebrow}</span>
        </div>
        <h2
          className="display reveal"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 60px" }}
        >
          {t.h}
        </h2>
        <div className="exp-grid">
          <div className="exp-sticky">
            <div className="exp-stack">
              {t.items.map((it, i) => (
                <div
                  key={i}
                  className={`exp-co ${
                    i === active ? "in" : i < active ? "out-up" : "out-down"
                  }`}
                >
                  <span>
                    {it.href ? (
                      <a href={it.href} target="_blank" rel="noreferrer noopener" data-cursor="open">
                        {it.where.split(" · ")[0]}
                      </a>
                    ) : (
                      it.where.split(" · ")[0]
                    )}
                  </span>
                  <span className="role-line">
                    <em>{it.role}</em> · {it.period}
                  </span>
                </div>
              ))}
            </div>
            <div className="exp-tags">
              {cur.tags.map((tag, i) => (
                <span key={i} className="exp-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="exp-list">
            {t.items.map((it, i) => (
              <article
                key={i}
                className="exp-item reveal"
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-idx={i}
              >
                <div className="meta">
                  <span>{it.period}</span>
                  <span>
                    {String(i + 1).padStart(2, "0")} / {String(t.items.length).padStart(2, "0")}
                  </span>
                </div>
                <h4>
                  {it.role}{" "}
                  <span className="where">
                    —{" "}
                    {it.href ? (
                      <a href={it.href} target="_blank" rel="noreferrer noopener" data-cursor="open">
                        {it.where}
                      </a>
                    ) : (
                      it.where
                    )}
                  </span>
                </h4>
                <ul>
                  {it.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
