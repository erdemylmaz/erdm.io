import type { Lang } from "../lib/types";

type Props = { lang: Lang; setLang: (l: Lang) => void };

export function TopBar({ lang, setLang }: Props) {
  return (
    <header className="topbar">
      <a className="brand" href="#intro" aria-label="erdm.io home">
        erdm<span className="dot">.</span>
        <em>io</em>
      </a>
      <div className="lang">
        <button
          className={lang === "en" ? "on" : ""}
          onClick={() => setLang("en")}
          data-cursor="view"
          data-cursor-label="EN"
          aria-pressed={lang === "en"}
        >
          EN
        </button>
        <button
          className={lang === "tr" ? "on" : ""}
          onClick={() => setLang("tr")}
          data-cursor="view"
          data-cursor-label="TR"
          aria-pressed={lang === "tr"}
        >
          TR
        </button>
      </div>
    </header>
  );
}
