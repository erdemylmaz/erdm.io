import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "../content";
import type { Lang } from "../lib/types";
import { ProjVisual } from "../components/ProjVisual";

gsap.registerPlugin(ScrollTrigger);

type Props = { lang: Lang };

export function Projects({ lang }: Props) {
  const t = useT(lang).proj;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 760 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        const trackWidth = track.scrollWidth;
        const vw = window.innerWidth;
        return Math.max(trackWidth - vw + 80, 0);
      };

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: stickyRef.current,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [isMobile, t.items.length]);

  return (
    <section
      id="projects"
      className={`proj-section${isMobile ? " mobile" : ""}`}
      ref={sectionRef}
    >
      <div ref={stickyRef} className="proj-sticky">
        <div className="proj-header reveal">
          <div>
            <div className="eyebrow">
              <span className="line" />
              <span className="num">04</span>
              <span>{t.eyebrow}</span>
            </div>
            <h2 className="display" style={{ marginTop: 18 }}>
              {t.h}
            </h2>
          </div>
          <div className="meta">{t.meta}</div>
        </div>
        <div className="proj-track-wrap">
          <div className="proj-track" ref={trackRef}>
            {t.items.map((p, i) => {
              const Card = p.href ? "a" : "article";
              const cardProps = p.href
                ? {
                    href: p.href,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    "data-cursor": "open",
                  }
                : { "data-cursor": "view" };
              return (
                <Card key={i} className="proj-card" {...cardProps}>
                  <ProjVisual k={p.k} />
                  <div className="body">
                    <div className="index-row">
                      <span>{p.k}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="stack-row">
                      {p.stack.map((s, j) => (
                        <span key={j}>{s}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        {!isMobile && (
          <div className="proj-progress">
            <span>
              {String(
                Math.min(t.items.length, Math.round(progress * (t.items.length - 1)) + 1)
              ).padStart(2, "0")}{" "}
              / {String(t.items.length).padStart(2, "0")}
            </span>
            <div
              className="bar"
              style={{ ["--p" as string]: `${progress * 100}%` } as React.CSSProperties}
            />
            <span>{Math.round(progress * 100)}%</span>
          </div>
        )}
      </div>
    </section>
  );
}
