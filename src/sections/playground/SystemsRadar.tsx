import { useT } from "../../content";
import type { Lang } from "../../lib/types";

type Props = { lang: Lang };

const signals = [
  { x: 68, y: 24, label: "API", level: 3 },
  { x: 24, y: 38, label: "DB", level: 2 },
  { x: 76, y: 62, label: "CI", level: 1 },
  { x: 42, y: 78, label: "APP", level: 3 },
  { x: 54, y: 46, label: "Q", level: 2 },
];

export function SystemsRadar({ lang }: Props) {
  const t = useT(lang).playground.radar;

  return (
    <div className="pg-mod span-7">
      <div className="head">
        <span>RADAR · 01 · systems</span>
        <span style={{ color: "var(--ochre)" }}>sweeping</span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="radar" aria-hidden>
        <div className="radar-sweep" />
        <div className="radar-ring r1" />
        <div className="radar-ring r2" />
        <div className="radar-cross h" />
        <div className="radar-cross v" />
        {signals.map((signal) => (
          <span
            key={signal.label}
            className={`radar-dot l${signal.level}`}
            style={{ left: `${signal.x}%`, top: `${signal.y}%` }}
          >
            <b>{signal.label}</b>
          </span>
        ))}
      </div>
      <div className="radar-stats">
        <div>
          <b>18ms</b>
          <span>edge p50</span>
        </div>
        <div>
          <b>7</b>
          <span>queues</span>
        </div>
        <div>
          <b>3</b>
          <span>deploy lanes</span>
        </div>
      </div>
      <div className="pg-foot">{t.foot}</div>
    </div>
  );
}
