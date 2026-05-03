import { useEffect, useState } from "react";
import { useT } from "../content";
import type { Lang } from "../lib/types";
import {
  PortsCliPost,
  PORTS_CLI_POST_META,
  PortsCliPostVisual,
} from "./writing/PortsCliPost";

type Props = { lang: Lang };

const POSTS = [
  {
    meta: PORTS_CLI_POST_META,
    Visual: PortsCliPostVisual,
    Body: PortsCliPost,
  },
] as const;

function getSlugFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/^#post\/(.+)$/);
  return m ? m[1] : null;
}

function usePostSlug(): string | null {
  const [slug, setSlug] = useState<string | null>(getSlugFromHash);
  useEffect(() => {
    const onChange = () => setSlug(getSlugFromHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return slug;
}

function openPost(slug: string) {
  window.location.hash = `post/${slug}`;
  requestAnimationFrame(() => {
    document.getElementById("writing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function closePost() {
  history.pushState(null, "", "#writing");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  requestAnimationFrame(() => {
    document.getElementById("writing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function Writing({ lang }: Props) {
  const t = useT(lang).writing;
  const slug = usePostSlug();
  const activePost = slug ? POSTS.find((p) => p.meta.slug === slug) : null;

  return (
    <section id="writing" className="writing">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="line" />
          <span className="num">08</span>
          <span>{t.eyebrow}</span>
        </div>

        {activePost ? (
          <PostView lang={lang} post={activePost} backLabel={t.postsLabel === "İlk yazı" ? "← Geri" : "← Back"} />
        ) : (
          <>
            <h2
              className="display reveal"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 36px" }}
            >
              {t.h}
            </h2>
            <div className="post-grid reveal">
              {POSTS.map((p, i) => {
                const meta = lang === "tr" ? p.meta.tr : p.meta.en;
                return (
                  <button
                    key={p.meta.slug}
                    className="post-card"
                    type="button"
                    onClick={() => openPost(p.meta.slug)}
                    aria-label={meta.title}
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
                        <span className="post-card-cta">
                          {t.readMore} →
                        </span>
                      </div>
                    </div>
                    <span className="post-card-index">
                      {String(i + 1).padStart(2, "0")} / {String(POSTS.length).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

type PostViewProps = {
  lang: Lang;
  post: (typeof POSTS)[number];
  backLabel: string;
};

function PostView({ lang, post, backLabel }: PostViewProps) {
  const Body = post.Body;
  return (
    <div className="post-view reveal">
      <button type="button" className="post-back" onClick={closePost}>
        {backLabel}
      </button>
      <Body lang={lang} />
    </div>
  );
}
