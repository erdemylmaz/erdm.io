import { useT } from "../content";
import type { Lang } from "../lib/types";
import { Icon } from "../components/Icon";

type Props = { lang: Lang };

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
          style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 0" }}
        >
          {t.h}
        </h2>
        <div className="empty reveal">
          <h3>{t.empty}</h3>
          <p>{t.emptyDesc}</p>
          <a className="btn ghost" href="#contact" data-cursor="send">
            {t.cta}
            <Icon name="arrow-ne" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
