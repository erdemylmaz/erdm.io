import { useEffect } from "react";
import type { Lang } from "../lib/types";
import { navigate } from "../lib/router";
import { Cursor } from "../components/Cursor";
import { Footer } from "../sections/Footer";
import { useReveal } from "../hooks/useReveal";
import {
  PortsCliPost,
  PORTS_CLI_POST_META,
} from "../sections/writing/PortsCliPost";

type PostEntry = {
  slug: string;
  meta: typeof PORTS_CLI_POST_META;
  Body: (props: { lang: Lang }) => JSX.Element;
};

const POSTS: PostEntry[] = [
  {
    slug: PORTS_CLI_POST_META.slug,
    meta: PORTS_CLI_POST_META,
    Body: PortsCliPost,
  },
];

type Props = {
  slug: string;
  lang: Lang;
  setLang: (l: Lang) => void;
};

export function PostPage({ slug, lang, setLang }: Props) {
  const post = POSTS.find((p) => p.slug === slug);
  useReveal([lang, slug]);

  useEffect(() => {
    if (!post) return;
    const meta = lang === "tr" ? post.meta.tr : post.meta.en;
    document.title = `${meta.title} — erdm.io`;
    return () => {
      document.title = "Erdem Yılmaz · erdm.io";
    };
  }, [post, lang]);

  if (!post) return <PostNotFound lang={lang} setLang={setLang} />;

  const meta = lang === "tr" ? post.meta.tr : post.meta.en;
  const tBack = lang === "tr" ? "← Yazılara dön" : "← Back to writing";
  const tMin = lang === "tr" ? "dk okuma" : "min read";

  return (
    <>
      <Cursor />
      <header className="post-topbar">
        <a
          className="brand"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          aria-label="erdm.io home"
        >
          erdm<span className="dot">.</span>
          <em>io</em>
        </a>
        <a
          className="post-topbar-back"
          href="/#writing"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { hash: "#writing", scrollTo: "preserve" });
            requestAnimationFrame(() => {
              document.getElementById("writing")?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
          }}
          data-cursor="view"
        >
          {tBack}
        </a>
        <div className="lang">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>
            EN
          </button>
          <button className={lang === "tr" ? "on" : ""} onClick={() => setLang("tr")} aria-pressed={lang === "tr"}>
            TR
          </button>
        </div>
      </header>

      <main className="post-page">
        <div className="post-page-meta reveal">
          <span className="post-page-tag">{post.meta.k}</span>
          <span>{post.meta.date}</span>
          <span>·</span>
          <span>
            {post.meta.minRead} {tMin}
          </span>
          <span>·</span>
          <a href={post.meta.repo} target="_blank" rel="noreferrer noopener">
            github.com/erdemylmaz/ports-cli ↗
          </a>
        </div>
        <h1 className="post-page-title reveal">{meta.title}</h1>
        <p className="post-page-sub reveal">{meta.subtitle}</p>
        <div className="post-page-tags reveal">
          {post.meta.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="post-page-divider" />
        <post.Body lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  );
}

function PostNotFound({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const tBack = lang === "tr" ? "← Ana sayfaya dön" : "← Back to home";
  const tTitle = lang === "tr" ? "Yazı bulunamadı" : "Post not found";
  const tDesc =
    lang === "tr"
      ? "Aradığın yazı taşınmış ya da silinmiş olabilir."
      : "The post you're looking for has been moved or removed.";
  return (
    <>
      <header className="post-topbar">
        <a
          className="brand"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          erdm<span className="dot">.</span>
          <em>io</em>
        </a>
        <div className="lang">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
            EN
          </button>
          <button className={lang === "tr" ? "on" : ""} onClick={() => setLang("tr")}>
            TR
          </button>
        </div>
      </header>
      <main className="post-page post-404">
        <h1>{tTitle}</h1>
        <p>{tDesc}</p>
        <a
          className="btn ghost"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          {tBack}
        </a>
      </main>
    </>
  );
}
