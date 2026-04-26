import { useT } from "../../content";
import type { Lang } from "../../lib/types";
import { Icon } from "../../components/Icon";

type Props = { lang: Lang };

export function ReplViz({ lang }: Props) {
  const t = useT(lang).playground.repl;
  return (
    <div className="pg-mod span-5">
      <div className="head">
        <span>REPL · 03</span>
        <span>
          <Icon name="db" size={14} />
        </span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="repl" aria-hidden>
        <div className="lag-line" />
        <div className="pulse" />
        <div className="pulse" />
        <div className="pulse" />
        <div className="node primary">
          <div className="box">
            <Icon name="db" size={20} />
            <span>primary</span>
          </div>
          <div className="label">writer</div>
        </div>
        <div className="node">
          <div className="box">
            <Icon name="db" size={20} />
            <span>replica</span>
          </div>
          <div className="label">reader</div>
        </div>
      </div>
      <div className="repl-meta">
        <span>WAL · streaming</span>
        <span>
          lag · <b>0.4s</b>
        </span>
        <span>
          throughput · <b>2.1k/s</b>
        </span>
      </div>
      <div className="pg-foot">{t.foot}</div>
    </div>
  );
}
