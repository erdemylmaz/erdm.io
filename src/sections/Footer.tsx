import { useT } from "../content";
import type { Lang } from "../lib/types";

type Props = { lang: Lang };

export function Footer({ lang }: Props) {
  const t = useT(lang).contact;
  return (
    <footer id="contact" className="footer">
      <div className="big display">
        {t.bigTop}
        <br />
        <em>{t.bigBottom}</em>
      </div>
      <div className="footer-grid">
        <div>
          <h5>WRITE TO ME</h5>
          <a
            href={`mailto:${t.email}`}
            data-cursor="send"
            style={{
              font: "italic 32px/1 var(--display)",
              color: "var(--paper)",
              textTransform: "none",
              letterSpacing: "-.01em",
            }}
          >
            {t.email}
          </a>
        </div>
        <div>
          <h5>ELSEWHERE</h5>
          <a href={t.socialsHref.gh} target="_blank" rel="noreferrer noopener" data-cursor="open">
            {t.socials.gh}
          </a>
          <a href={t.socialsHref.li} target="_blank" rel="noreferrer noopener" data-cursor="open">
            {t.socials.li}
          </a>
          <a href={t.socialsHref.ig} target="_blank" rel="noreferrer noopener" data-cursor="open">
            {t.socials.ig}
          </a>
        </div>
        <div>
          <h5>SECTIONS</h5>
          <a href="#projects">Projects</a>
          <a href="#playground">Playground</a>
          <a href="#about">About</a>
        </div>
        <div>
          <h5>NOW</h5>
          <div className="now-playing">
            <span className="pulse-d" />
            <span
              style={{
                textTransform: "none",
                letterSpacing: 0,
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 16,
              }}
            >
              {t.now}
            </span>
          </div>
        </div>
      </div>
      <div className="colophon">
        <span>{t.colophon}</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
