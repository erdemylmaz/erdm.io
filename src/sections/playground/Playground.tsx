import { useT } from "../../content";
import type { Lang } from "../../lib/types";
import { ReplViz } from "./ReplViz";
import { SqlPlayground } from "./SqlPlayground";
import { SystemsRadar } from "./SystemsRadar";
import { Terminal } from "./Terminal";

type Props = { lang: Lang };

export function Playground({ lang }: Props) {
  const t = useT(lang).playground;
  return (
    <section id="playground" className="playground">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="line" />
          <span className="num">07</span>
          <span>{t.eyebrow}</span>
        </div>
        <h2 className="display reveal">{t.h}</h2>
        <p className="lede reveal">{t.lede}</p>
        <div className="pg-grid">
          <SystemsRadar lang={lang} />
          <ReplViz lang={lang} />
          <SqlPlayground lang={lang} />
          <Terminal lang={lang} />
        </div>
      </div>
    </section>
  );
}
