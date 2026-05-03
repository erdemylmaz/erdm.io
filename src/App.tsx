import { useEffect, useState } from "react";
import type { Lang } from "./lib/types";
import { useRoute } from "./lib/router";
import { useLenis, getLenis } from "./hooks/useLenis";
import { useActiveSection } from "./hooks/useActiveSection";
import { useReveal } from "./hooks/useReveal";
import { Cursor } from "./components/Cursor";
import { TopBar } from "./components/TopBar";
import { Rail } from "./components/Rail";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Stack } from "./sections/Stack";
import { Education } from "./sections/Education";
import { Playground } from "./sections/playground/Playground";
import { Writing } from "./sections/Writing";
import { Footer } from "./sections/Footer";
import { PostPage } from "./pages/PostPage";

const ACCENT = "#6e7a8a"; // slate

const SECTION_IDS = [
  "intro",
  "about",
  "experience",
  "projects",
  "stack",
  "education",
  "playground",
  "writing",
  "contact",
];

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("erdm.lang");
    if (saved === "en" || saved === "tr") return saved;
  } catch {}
  const nav = navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("tr") ? "tr" : "en";
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const route = useRoute();

  const setLang = (v: Lang) => {
    setLangState(v);
    try {
      localStorage.setItem("erdm.lang", v);
    } catch {}
    document.documentElement.lang = v;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  if (route.kind === "post") {
    return <PostPage slug={route.slug} lang={lang} setLang={setLang} />;
  }

  return <Home lang={lang} setLang={setLang} />;
}

function Home({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  useLenis(true);
  const active = useActiveSection(SECTION_IDS, [lang]);
  useReveal([lang]);

  // ~ key opens playground
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toUpperCase();
      if (e.key === "~" && tag !== "INPUT" && tag !== "TEXTAREA") {
        const el = document.getElementById("playground");
        if (!el) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: 0 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Cursor />
      <TopBar lang={lang} setLang={setLang} />
      <Rail lang={lang} active={active} onJump={jump} />
      <main>
        <Hero lang={lang} accent={ACCENT} />
        <About lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Stack lang={lang} />
        <Education lang={lang} />
        <Playground lang={lang} />
        <Writing lang={lang} />
        <Footer lang={lang} />
      </main>
    </>
  );
}
