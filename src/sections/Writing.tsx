import { useT } from "../content";
import type { Lang } from "../lib/types";
import { navigate, postPath } from "../lib/router";
import {
  PORTS_CLI_POST_META,
  PortsCliPostVisual,
} from "./writing/PortsCliPost";

type Props = { lang: Lang };

const POSTS = [
  {
    meta: PORTS_CLI_POST_META,
    Visual: PortsCliPostVisual,
  },
] as const;

export function Writing({ lang }: Props) {
  const t = useT(lang).writing;

  return (
    <section id="writing" className="writing">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="line" />
          <span className="num">08</span>
          <span>{t.eyebrow}</span>
        </div>

        <h2
          className="display reveal"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 36px" }}
        >
          {t.h}
        </h2>

        <div className="post-grid reveal">
          {POSTS.map((p, i) => {
            const meta = lang === "tr" ? p.meta.tr : p.meta.en;
            const href = postPath(p.meta.slug);
            return (
              <a
                key={p.meta.slug}
                className="post-card"
                href={href}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  navigate(href);
                }}
                aria-label={meta.title}
                data-cursor="open"
              >
                <div className="post-card-visual">
                  <p.Visual />
                </div>
                <div className="post-card-body">
                  <div className="post-card-row">
                    <span>{p.meta.k}</span>
                    <span>
                      {p.meta.date} · {p.meta.minRead} {t.minRead}
                    </span>
                  </div>
                  <h3>{meta.title}</h3>
                  <p>{meta.excerpt}</p>
                  <div className="post-card-tags">
                    {p.meta.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                    <span className="post-card-cta">{t.readMore} →</span>
                  </div>
                </div>
                <span className="post-card-index">
                  {String(i + 1).padStart(2, "0")} / {String(POSTS.length).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
