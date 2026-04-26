import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "../content";
import type { Lang } from "../lib/types";
import { getLenis } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

type Props = { lang: Lang };

const SIZES = [44, 36, 52, 32, 40, 56, 34];

// vh of scroll space per extra category (beyond the first)
const PER_CAT_VH = 75;

export function Stack({ lang }: Props) {
  const t = useT(lang).stack;
  const [activeCat, setActiveCat] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const cur = t.categories[activeCat];
  const N = t.categories.length;

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1101px)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (!isDesktop) {
      section.style.minHeight = "";
      return;
    }

    section.style.minHeight = `calc(100vh + ${(N - 1) * PER_CAT_VH}vh)`;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(N - 1, Math.max(0, Math.round(self.progress * (N - 1))));
          setActiveCat(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [N, lang]);

  const onPick = (i: number) => {
    setActiveCat(i);
    const section = sectionRef.current;
    if (!section || N < 2) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const range = rect.height - window.innerHeight;
    const target = sectionTop + (range * i) / (N - 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { immediate: false });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="stack" className="stack-section" ref={sectionRef}>
      <div className="stack-pin">
        <div className="wrap">
          <div className="eyebrow reveal">
            <span className="line" />
            <span className="num">05</span>
            <span>{t.eyebrow}</span>
          </div>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "18px 0 28px" }}
          >
            {t.h}
          </h2>
          <div className="stack-grid">
            <div className="stack-cats" role="tablist" aria-label="Stack categories">
              {t.categories.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === activeCat}
                  className={i === activeCat ? "on" : ""}
                  onClick={() => onPick(i)}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <div className="stack-items" key={cur.id}>
              {cur.items.map((it, i) => (
                <span
                  key={i}
                  className="stack-item"
                  tabIndex={0}
                  style={{ fontSize: SIZES[i % SIZES.length] }}
                >
                  {it.name}
                  <span className="note">{it.note}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="stack-progress" aria-hidden>
            <span>
              {String(activeCat + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
            <div
              className="bar"
              style={{ ["--p" as string]: `${(activeCat / (N - 1)) * 100}%` } as React.CSSProperties}
            />
            <span>{cur.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
