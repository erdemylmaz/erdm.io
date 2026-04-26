// Icons + small SVG bits used across the site
const Icon = ({ name, size = 16 }) => {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "pin": return (<svg viewBox="0 0 24 24" {...s}><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>);
    case "book": return (<svg viewBox="0 0 24 24" {...s}><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17a3 3 0 0 1 3-3h12"/></svg>);
    case "cup": return (<svg viewBox="0 0 24 24" {...s}><path d="M5 8h12v6a5 5 0 0 1-10 0V8z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 3c0 1 1 1 1 2s-1 1-1 2"/><path d="M12 3c0 1 1 1 1 2s-1 1-1 2"/></svg>);
    case "globe": return (<svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>);
    case "arrow": return (<svg viewBox="0 0 24 24" {...s}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case "arrow-ne": return (<svg viewBox="0 0 24 24" {...s}><path d="M7 17 17 7M9 7h8v8"/></svg>);
    case "github": return (<svg viewBox="0 0 24 24" {...s}><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>);
    case "linkedin": return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="9" r="1.2"/><path d="M8 11v6M12 17v-3.5a2.5 2.5 0 0 1 5 0V17M12 11v6"/></svg>);
    case "x": return (<svg viewBox="0 0 24 24" {...s}><path d="M4 4l16 16M20 4 4 20"/></svg>);
    case "mail": return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>);
    case "spark": return (<svg viewBox="0 0 24 24" {...s}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4"/></svg>);
    case "db": return (<svg viewBox="0 0 24 24" {...s}><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>);
    case "term": return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/></svg>);
    case "chart": return (<svg viewBox="0 0 24 24" {...s}><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></svg>);
    default: return null;
  }
};

// Generative pastel blob for hero — drifts and reacts to cursor
const HeroBlob = ({ accent = "#5a7a9e" }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (t) => {
      const k = (t - start) / 1000;
      if (ref.current) {
        const c = ref.current.querySelectorAll(".bl");
        c.forEach((n, i) => {
          const a = k * (0.12 + i * 0.04);
          const x = Math.sin(a + i) * 60;
          const y = Math.cos(a * 1.3 + i) * 40;
          n.style.transform = `translate(${x}px, ${y}px)`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <filter id="goo"><feGaussianBlur stdDeviation="60" /></filter>
        <radialGradient id="g1"><stop offset="0%" stopColor={accent} stopOpacity="0.55"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
        <radialGradient id="g2"><stop offset="0%" stopColor="#c89a5e" stopOpacity="0.4"/><stop offset="100%" stopColor="#c89a5e" stopOpacity="0"/></radialGradient>
        <radialGradient id="g3"><stop offset="0%" stopColor="#7a6f5e" stopOpacity="0.35"/><stop offset="100%" stopColor="#7a6f5e" stopOpacity="0"/></radialGradient>
      </defs>
      <g filter="url(#goo)">
        <circle className="bl" cx="280" cy="220" r="280" fill="url(#g1)" />
        <circle className="bl" cx="900" cy="180" r="240" fill="url(#g2)" />
        <circle className="bl" cx="700" cy="650" r="320" fill="url(#g3)" />
        <circle className="bl" cx="200" cy="640" r="200" fill="url(#g1)" />
      </g>
    </svg>
  );
};

// Hero name lockup with mask reveal + stagger
const HeroName = ({ variant }) => {
  const letters = "Erdem".split("");
  const v = variant || "mask";
  return (
    <h1 className="hero-name display">
      <span className="row">
        {letters.map((c, i) => (
          <span key={i} className={`word v-${v}`} style={{ animationDelay: `${0.06 * i + 0.1}s`, display: "inline-block" }}>{c}</span>
        ))}
      </span>
      <span className="row" style={{ marginTop: "-0.06em" }}>
        <em className="word v-emph" style={{ animationDelay: "0.6s", display: "inline-block" }}>Yıldırım.</em>
      </span>
    </h1>
  );
};

// Project visuals — bespoke editorial illustrations per card
const ProjVisual = ({ k }) => {
  if (k === "MCP-01") return (
    <div className="visual" style={{ background: "linear-gradient(160deg, #1f1b17, #2a2520)", color: "#e8e1d2", padding: "26px 24px", fontFamily: "var(--mono)", fontSize: 11.5, lineHeight: 1.65 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: "rgba(232,225,210,.4)", letterSpacing: ".14em", textTransform: "uppercase", fontSize: 10 }}>
        <span>mcp.devredin.com</span><span>● live</span>
      </div>
      <div style={{ color: "#c89a5e" }}>$ mcp inspect tools</div>
      <div style={{ color: "rgba(232,225,210,.7)" }}>→ list_active_listings</div>
      <div style={{ color: "rgba(232,225,210,.7)" }}>→ get_listing(id)</div>
      <div style={{ color: "rgba(232,225,210,.7)" }}>→ valuation_band(category, revenue)</div>
      <div style={{ color: "rgba(232,225,210,.7)" }}>→ weekly_report(week)</div>
      <div style={{ color: "rgba(232,225,210,.4)" }}>→ 8 more...</div>
      <div style={{ color: "#c89a5e", marginTop: 16 }}>$ mcp call valuation_band</div>
      <div style={{ color: "rgba(232,225,210,.7)" }}>{`{ category: "F&B", revenue: 1.2M }`}</div>
      <div style={{ color: "#9eb098" }}>{`✓ 2.4M – 3.1M (n=87)`}</div>
    </div>
  );
  if (k === "RPT-02") return (
    <div className="visual" style={{ background: "var(--paper-2)", padding: "30px 28px", display: "flex", gap: 18 }}>
      <div style={{ flex: 1, background: "var(--paper-3)", borderRadius: 3, padding: "14px", fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-soft)", lineHeight: 1.5 }}>
        <div style={{ marginBottom: 6, color: "var(--ink)", letterSpacing: ".1em" }}>RAW.SQL</div>
        <div>SELECT category, AVG(price)</div>
        <div>FROM listings WHERE</div>
        <div>active = true GROUP BY 1</div>
        <div style={{ borderTop: "1px solid var(--rule)", margin: "10px 0", paddingTop: 8 }}>
          <div>F&B · 2,140,000</div>
          <div>RETAIL · 1,820,000</div>
          <div>SERVICE · 980,000</div>
          <div>MFG · 4,210,000</div>
        </div>
      </div>
      <div style={{ flex: 1.2, background: "#fbf6ec", borderRadius: 3, padding: "18px 16px", boxShadow: "0 14px 30px -16px rgba(42,37,32,.25)" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 8.5, letterSpacing: ".18em", color: "var(--ink-soft)", textTransform: "uppercase" }}>Devredin Weekly · W14</div>
        <div style={{ font: "italic 19px/1.1 var(--display)", margin: "8px 0 6px", color: "var(--ink)" }}>F&B leads <em style={{ color: "var(--blue)" }}>another</em> quiet week</div>
        <div style={{ fontSize: 8.5, color: "var(--ink-2)", lineHeight: 1.55 }}>Average asking dipped 3.2% week-over-week. Manufacturing held. Service inched up — likely seasonal.</div>
        <div style={{ marginTop: 12, height: 30, background: "linear-gradient(to top, var(--blue-soft), transparent)", borderTop: "1px solid var(--blue)" }}/>
      </div>
    </div>
  );
  if (k === "VAL-03") return (
    <div className="visual" style={{ background: "var(--paper-2)", padding: "30px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Distribution · F&B · İzmir</div>
      <svg viewBox="0 0 400 160" style={{ width: "100%", height: "auto" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 20 + i * 15.5;
          const c = 80;
          const h = 8 + 110 * Math.exp(-Math.pow((i - 12) / 4.5, 2));
          return <rect key={i} x={x} y={150 - h} width={11} height={h} fill={i === 14 ? "#5a7a9e" : "rgba(90,122,158,.35)"} />;
        })}
        <line x1="20" y1="150" x2="392" y2="150" stroke="rgba(42,37,32,.2)" />
        <line x1="237" y1="20" x2="237" y2="150" stroke="#c89a5e" strokeDasharray="3 3" />
        <text x="240" y="30" fontFamily="var(--mono)" fontSize="9" fill="#c89a5e" letterSpacing=".1em">YOU · ₺2.4M</text>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-soft)", letterSpacing: ".1em", textTransform: "uppercase" }}>
        <span>n = 87</span><span>p25 ₺1.6M</span><span>p50 ₺2.1M</span><span>p75 ₺3.0M</span>
      </div>
    </div>
  );
  if (k === "MAP-04") return (
    <div className="visual" style={{ background: "var(--paper-3)", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="topo" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 Q20,5 40,20 M0,30 Q20,15 40,30 M0,10 Q20,-5 40,10" fill="none" stroke="rgba(42,37,32,.12)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#topo)"/>
        <path d="M40,260 C 80,200 140,180 180,140 S 280,80 360,40" fill="none" stroke="#5a7a9e" strokeWidth="2" strokeDasharray="0"/>
        <path d="M40,260 C 80,200 140,180 180,140 S 280,80 360,40" fill="none" stroke="#c89a5e" strokeWidth="2" strokeDasharray="160" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="320" to="0" dur="4s" repeatCount="indefinite"/>
        </path>
        {[ [60,240], [130,180], [220,120], [320,60] ].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
            <text x={x+12} y={y+4} fontFamily="var(--mono)" fontSize="9" fill="var(--ink-2)" letterSpacing=".08em">STOP {i+1}</text>
          </g>
        ))}
        <g>
          <circle cx="180" cy="140" r="8" fill="#c89a5e" stroke="#fff" strokeWidth="2"/>
          <circle cx="180" cy="140" r="14" fill="none" stroke="#c89a5e" opacity="0.4">
            <animate attributeName="r" from="8" to="22" dur="1.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.5" to="0" dur="1.6s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
      <div style={{ position: "absolute", left: 16, top: 16, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-2)", background: "rgba(255,255,255,.7)", padding: "6px 10px", borderRadius: 3 }}>İYTE Campus · LIVE</div>
    </div>
  );
  if (k === "SAN-05") return (
    <div className="visual" style={{ background: "linear-gradient(160deg, #c5d4c0, #e4d2b3)", padding: "30px 28px", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .5 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <text key={i} x={(i*47)%400} y={20 + (i*37)%280} fontFamily="var(--display)" fontStyle="italic" fontSize="22" fill="rgba(42,37,32,.12)" transform={`rotate(${(i*23)%30 - 15} ${(i*47)%400} ${20 + (i*37)%280})`}>♥</text>
        ))}
      </svg>
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-2)" }}>iyteyilbasi · 2024 / 25</div>
        <div style={{ font: "italic 56px/0.95 var(--display)", color: "var(--ink)", letterSpacing: "-.02em" }}>200+ <span style={{ color: "var(--ink-soft)" }}>matches,</span><br/>twice over.</div>
        <div style={{ display: "flex", gap: 20, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
          <span>YEAR 1 · 86</span><span>YEAR 2 · 142</span>
        </div>
      </div>
    </div>
  );
  if (k === "BNZ-06") return (
    <div className="visual" style={{ background: "var(--paper-3)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(42,37,32,.08) 0 1px, transparent 1px 14px)"
      }}/>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 12 }}>[ classified ]</div>
        <div style={{ font: "italic 52px/1 var(--display)", color: "var(--ink)" }}>benzersor</div>
        <div style={{ font: "italic 18px/1 var(--display)", color: "var(--ink-soft)", marginTop: 8 }}>coming '26</div>
      </div>
    </div>
  );
  return <div className="visual"/>;
};

Object.assign(window, { Icon, HeroBlob, HeroName, ProjVisual });
