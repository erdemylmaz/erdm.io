import { useT } from "../content";
import type { Lang } from "../lib/types";

type Props = { lang: Lang };

function CampusMap({ lang }: Props) {
  const isTr = lang === "tr";
  const buildings = [
    { x: 110, y: 265, w: 88, h: 32, n: "MATH" },
    { x: 238, y: 248, w: 118, h: 38, n: "CENG" },
    { x: 408, y: 216, w: 92, h: 34, n: "LIB" },
    { x: 545, y: 172, w: 124, h: 38, n: "TECH" },
    { x: 650, y: 292, w: 104, h: 34, n: "DORM" },
    { x: 735, y: 170, w: 96, h: 30, n: "ARCH" },
  ];

  return (
    <div className="campus-map" aria-label={isTr ? "İYTE kampüs illüstrasyonu" : "IZTECH campus illustration"}>
      <svg viewBox="0 0 920 520" role="img">
        <title>{isTr ? "İYTE kampüs yerleşiminden esinlenen harita" : "Map inspired by the IZTECH campus layout"}</title>
        <defs>
          <linearGradient id="hillGrad" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#b9c4aa" />
            <stop offset="1" stopColor="#7e9278" />
          </linearGradient>
          <linearGradient id="fieldGrad" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#e4e3d5" />
            <stop offset="1" stopColor="#d4d1bf" />
          </linearGradient>
          <path id="campusRoute" d="M45 384 C120 365 142 318 220 334 S352 382 410 320 S506 236 610 258 S762 333 854 248" />
        </defs>

        <rect width="920" height="520" rx="12" fill="url(#fieldGrad)" />
        <path d="M0 136 C78 74 130 118 190 72 C252 25 308 142 372 95 C454 34 495 92 552 68 C616 41 660 122 724 78 C810 19 854 80 920 52 L920 0 L0 0Z" fill="url(#hillGrad)" opacity=".75" />
        <path d="M0 188 C96 118 162 176 236 118 C308 60 390 190 466 126 C548 58 608 150 686 104 C772 52 832 116 920 86 L920 0 L0 0Z" fill="#4f6f55" opacity=".25" />

        {[150, 260, 335].map((x, i) => (
          <g className="wind" key={x} style={{ animationDelay: `${i * -0.55}s` }}>
            <line x1={x} y1="38" x2={x} y2="116" />
            <circle cx={x} cy="58" r="4" />
            <path d={`M${x} 58 l0 -34`} />
            <path d={`M${x} 58 l30 18`} />
            <path d={`M${x} 58 l-30 18`} />
          </g>
        ))}

        <path className="road" d="M-30 390 C80 350 132 318 220 334 S352 382 410 320 S506 236 610 258 S762 333 950 210" />
        <path className="road road-secondary" d="M468 318 C455 235 497 190 568 174 S706 192 824 158" />
        <path className="road road-secondary" d="M612 258 C610 330 660 372 790 358" />
        <use className="route" href="#campusRoute" />

        {buildings.map((b) => (
          <g className="building" key={b.n}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" />
            <path d={`M${b.x} ${b.y + 10} h${b.w}`} />
            <path d={`M${b.x + b.w * 0.28} ${b.y} v${b.h}`} />
            <path d={`M${b.x + b.w * 0.62} ${b.y} v${b.h}`} />
            <text x={b.x + b.w / 2} y={b.y + b.h + 17}>{b.n}</text>
          </g>
        ))}

        {Array.from({ length: 90 }).map((_, i) => {
          const x = 36 + ((i * 73) % 830);
          const y = 175 + ((i * 47) % 248);
          const s = 0.72 + ((i * 17) % 6) / 18;
          return (
            <g className="tree" key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <line x1="0" y1="9" x2="0" y2="20" />
              <circle cx="0" cy="6" r="7" />
            </g>
          );
        })}

        <g className="campus-pin" transform="translate(280 238)">
          <circle r="18" />
          <circle r="5" />
        </g>
        <circle className="route-dot" r="7">
          <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#campusRoute" />
          </animateMotion>
        </circle>
      </svg>

      <div className="campus-caption">
        <span>{isTr ? "İYTE · Urla" : "IZTECH · Urla"}</span>
        <b>{isTr ? "kampüs, yokuşlar, yollar" : "campus, hills, long walks"}</b>
      </div>
    </div>
  );
}

export function Education({ lang }: Props) {
  const t = useT(lang).edu;
  const trimmed = t.school.replace(t.schoolEm, "").trim() || t.school;

  return (
    <section id="education" className="edu-section">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="line" />
          <span className="num">06</span>
          <span>{t.eyebrow}</span>
        </div>
        <h2
          className="display reveal"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 60px" }}
        >
          {t.h}
        </h2>
        <div className="edu-card reveal">
          <div>
            <div className="school">
              <em>{t.schoolEm}</em>
              <br />
              {trimmed}
            </div>
            <div className="deg">{t.degree}</div>
            <div className="gpa">
              {t.gpa.map((g, i) => (
                <div key={i}>
                  {g.label}
                  <br />
                  <b>{g.value}</b>
                </div>
              ))}
            </div>
            <div className="learning">
              <div className="label">{t.learningLabel}</div>
              <div className="ticker">
                <div className="reel">
                  {t.learning.map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <CampusMap lang={lang} />
        </div>
      </div>
    </section>
  );
}
