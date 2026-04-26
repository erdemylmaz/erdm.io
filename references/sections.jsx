// erdm.io — section components
// All components share window scope after Object.assign at bottom

const useT = (lang) => (window.CONTENT[lang] || window.CONTENT.en);

// ───────── custom cursor ─────────
const Cursor = () => {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const [label, setLabel] = React.useState("");
  const [variant, setVariant] = React.useState(""); // "", "label", "big"

  React.useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;
    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        const v = t.getAttribute("data-cursor");
        if (v === "view" || v === "open" || v === "send") { setLabel(t.getAttribute("data-cursor-label") || (v === "view" ? "View →" : v === "send" ? "Send →" : "Open →")); setVariant("label"); }
        else if (v === "big") { setVariant("big"); setLabel(""); }
        else { setVariant(""); setLabel(""); }
      } else { setVariant(""); setLabel(""); }
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);
  return (<>
    <div ref={dotRef} className="cursor-dot" />
    <div ref={ringRef} className={`cursor-ring ${variant}`}>{label}</div>
  </>);
};

// ───────── side rail nav ─────────
const Rail = ({ lang, active, onJump }) => {
  const t = useT(lang);
  return (
    <nav className="rail" aria-label="Section navigation">
      {t.nav.map((n, i) => (
        <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}
           data-cursor="view" data-cursor-label="↗"
           onClick={(e) => { e.preventDefault(); onJump(n.id); }}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <span>{n.label}</span>
        </a>
      ))}
    </nav>
  );
};

// ───────── top bar ─────────
const TopBar = ({ lang, setLang }) => (
  <header className="topbar">
    <div className="brand">erdm<span className="dot">.</span><em>io</em></div>
    <div className="lang">
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} data-cursor="view" data-cursor-label="EN">EN</button>
      <button className={lang === "tr" ? "on" : ""} onClick={() => setLang("tr")} data-cursor="view" data-cursor-label="TR">TR</button>
    </div>
  </header>
);

// ───────── HERO ─────────
const Hero = ({ lang, accent, heroVariant }) => {
  const t = useT(lang).hero;
  const letters = "Erdem".split("");
  return (
    <section id="intro" className="hero">
      <div className="blob"><HeroBlob accent={accent} /></div>
      <div className="wrap hero-grid">
        <h1 className={`hero-name display variant-${heroVariant}`}>
          <span className="row">
            {letters.map((c, i) => (
              <span key={`a-${heroVariant}-${i}`} className={`letter v-${heroVariant}`} style={{ animationDelay: `${0.06 * i + 0.1}s` }}>{c}</span>
            ))}
          </span>
          <span className="row" style={{ marginTop: "-0.04em" }}>
            <em className={`letter v-${heroVariant} accent`} style={{ animationDelay: `${letters.length * 0.06 + 0.2}s` }}>Yıldırım<span style={{ color: "var(--accent)" }}>.</span></em>
          </span>
        </h1>
        <div className="hero-meta">
          <div className="status-pill"><span className="pulse" />{t.status}</div>
          <div className="role">{t.role}</div>
          <div className="tag">{t.tagline}</div>
          <div className="cta-row">
            <a className="btn" href="#projects" data-cursor="view" data-cursor-label="↓">{t.cta1}<span className="arrow"><Icon name="arrow" size={14}/></span></a>
            <a className="btn ghost" href="#contact" data-cursor="send">{t.cta2}<span className="arrow"><Icon name="arrow-ne" size={14}/></span></a>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <span>{t.foot1}</span>
        <span style={{ fontStyle: "italic", fontFamily: "var(--display)", textTransform: "none", letterSpacing: 0, fontSize: 14 }}>{t.year}</span>
        <span className="scroll">{t.foot2}<span className="line"/></span>
      </div>
    </section>
  );
};

// ───────── ABOUT ─────────
const About = ({ lang }) => {
  const t = useT(lang).about;
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow"><span className="line"/><span className="num">02</span><span>{t.eyebrow}</span></div>
        <div className="about-grid" style={{ marginTop: 60 }}>
          <div>
            <div className="portrait">
              <div className="ph-label">FIG. 01 · PORTRAIT</div>
              <svg className="silhouette" viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet">
                <defs>
                  <linearGradient id="silG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(42,37,32,.18)"/>
                    <stop offset="100%" stopColor="rgba(42,37,32,.55)"/>
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="78" rx="34" ry="40" fill="url(#silG)"/>
                <path d="M30,240 C 30,170 60,140 100,140 C 140,140 170,170 170,240 Z" fill="url(#silG)"/>
              </svg>
              <div className="figure-num">01</div>
            </div>
            <div className="caption">
              <span>{t.caption[0]}</span>
              <span>{t.caption[1]}</span>
            </div>
          </div>
          <div className="about-copy">
            <h2 className="display">{t.h}</h2>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <div className="fact-pills">
              {t.facts.map((f, i) => (
                <span key={i} className="fact-pill"><span className="ico"><Icon name={f.icon} size={14}/></span>{f.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────── EXPERIENCE (sticky company morph) ─────────
const Experience = ({ lang }) => {
  const t = useT(lang).exp;
  const sectionRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number(e.target.getAttribute("data-idx"));
          setActive(idx);
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
    itemRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [t.items.length]);

  const cur = t.items[active];

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <div className="wrap">
        <div className="eyebrow"><span className="line"/><span className="num">03</span><span>{t.eyebrow}</span></div>
        <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 60px" }}>{t.h}</h2>
        <div className="exp-grid">
          <div className="exp-sticky">
            <div className="exp-stack">
              {t.items.map((it, i) => (
                <div key={i} className={`exp-co ${i === active ? "in" : i < active ? "out-up" : "out-down"}`}>
                  <span>{it.where.split(" · ")[0]}</span>
                  <span className="role-line"><em>{it.role}</em> · {it.period}</span>
                </div>
              ))}
            </div>
            <div className="exp-tags">
              {cur.tags.map((tag, i) => (<span key={i} className="exp-tag">{tag}</span>))}
            </div>
          </div>
          <div className="exp-list">
            {t.items.map((it, i) => (
              <article key={i} className="exp-item" ref={(el) => (itemRefs.current[i] = el)} data-idx={i}>
                <div className="meta"><span>{it.period}</span><span>{String(i + 1).padStart(2, "0")} / {String(t.items.length).padStart(2, "0")}</span></div>
                <h4>{it.role} <span className="where">— {it.where}</span></h4>
                <ul>{it.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────── PROJECTS (horizontal scroll) ─────────
const Projects = ({ lang }) => {
  const t = useT(lang).proj;
  const wrapRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [pinHeight, setPinHeight] = React.useState(0);

  React.useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const vw = window.innerWidth;
      const scrollDist = trackWidth - vw + 80;
      setPinHeight(Math.max(scrollDist, 0));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const top = rect.top;
      const total = pinHeight;
      const progressPx = Math.max(0, Math.min(total, -top));
      const ratio = total > 0 ? progressPx / total : 0;
      trackRef.current.style.transform = `translateX(${-progressPx}px)`;
      setProgress(ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pinHeight]);

  return (
    <section id="projects" className="proj-section" ref={sectionRef} style={{ height: `calc(100vh + ${pinHeight}px)` }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div className="proj-header">
          <div>
            <div className="eyebrow"><span className="line"/><span className="num">04</span><span>{t.eyebrow}</span></div>
            <h2 className="display" style={{ marginTop: 18 }}>{t.h}</h2>
          </div>
          <div className="meta">{t.meta}</div>
        </div>
        <div className="proj-track-wrap" ref={wrapRef}>
          <div className="proj-track" ref={trackRef}>
            {t.items.map((p, i) => (
              <article key={i} className="proj-card" data-cursor="view">
                <ProjVisual k={p.k}/>
                <div className="body">
                  <div className="index-row"><span>{p.k}</span><span>{p.year}</span></div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="stack-row">{p.stack.map((s, j) => <span key={j}>{s}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="proj-progress">
          <span>{String(Math.min(t.items.length, Math.round(progress * (t.items.length - 1)) + 1)).padStart(2, "0")} / {String(t.items.length).padStart(2, "0")}</span>
          <div className="bar" style={{ "--p": `${progress * 100}%` }}/>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </section>
  );
};

// ───────── STACK ─────────
const Stack = ({ lang }) => {
  const t = useT(lang).stack;
  const [activeCat, setActiveCat] = React.useState(0);
  const cur = t.categories[activeCat];
  // size weights for visual rhythm (display sizes per item index)
  const sizes = [56, 44, 64, 38, 48, 72, 40];
  return (
    <section id="stack" className="stack-section">
      <div className="wrap">
        <div className="eyebrow"><span className="line"/><span className="num">05</span><span>{t.eyebrow}</span></div>
        <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 80px" }}>{t.h}</h2>
        <div className="stack-grid">
          <div className="stack-cats">
            {t.categories.map((c, i) => (
              <button key={c.id} className={i === activeCat ? "on" : ""} onClick={() => setActiveCat(i)}>{c.title}</button>
            ))}
          </div>
          <div className="stack-items" key={cur.id}>
            {cur.items.map((it, i) => (
              <span key={i} className="stack-item" style={{ fontSize: sizes[i % sizes.length] }}>
                {it.name}
                <span className="note">{it.note}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────── EDUCATION ─────────
const Education = ({ lang }) => {
  const t = useT(lang).edu;
  return (
    <section id="education" className="edu-section">
      <div className="wrap">
        <div className="eyebrow"><span className="line"/><span className="num">06</span><span>{t.eyebrow}</span></div>
        <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 60px" }}>{t.h}</h2>
        <div className="edu-card">
          <div>
            <div className="school"><em>{t.schoolEm}</em><br/>{t.school.replace(t.schoolEm, "").trim() || t.school}</div>
            <div className="deg">{t.degree}</div>
            <div className="gpa">
              {t.gpa.map((g, i) => (<div key={i}>{g.label}<br/><b>{g.value}</b></div>))}
            </div>
            <div className="learning">
              <div className="label">{t.learningLabel}</div>
              <div className="ticker">
                <div className="reel">{t.learning.map((l, i) => <span key={i}>{l}</span>)}</div>
              </div>
            </div>
          </div>
          <div className="courses-list">
            {t.courses.map((c, i) => (
              <div key={i} className="course-row">
                <span className="code">{c.code}</span>
                <span className="name">{c.name}</span>
                <span className="course-term">{c.term}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────── PLAYGROUND ─────────
const Valuation = ({ lang }) => {
  const t = useT(lang).playground.val;
  const [cat, setCat] = React.useState("F&B");
  const [region, setRegion] = React.useState("İzmir");
  const [rev, setRev] = React.useState(1200);
  const base = { "F&B": 1.8, "Retail": 1.5, "Service": 0.9, "Manufacturing": 3.2 }[cat] || 1.8;
  const low = (rev * base * 0.85 / 1000).toFixed(1);
  const high = (rev * base * 1.25 / 1000).toFixed(1);
  const center = ((+low + +high) / 2).toFixed(1);
  const pos = Math.min(95, Math.max(5, 30 + (rev - 1200) / 30));
  return (
    <div className="pg-mod span-7">
      <div className="head"><span>VAL · 02</span><span className="dot"><i/><i/><i/></span></div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="val">
        <div className="row"><label>Category</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option>F&B</option><option>Retail</option><option>Service</option><option>Manufacturing</option>
          </select>
        </div>
        <div className="row"><label>Region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option>İzmir</option><option>İstanbul</option><option>Ankara</option><option>Bursa</option>
          </select>
        </div>
        <div className="row"><label>Annual revenue (₺K)</label>
          <input type="range" min="200" max="5000" step="50" value={rev} onChange={(e) => setRev(+e.target.value)} />
        </div>
        <div className="dist"><div className="marker" style={{ left: `${pos}%` }}/></div>
        <div className="out">
          <div><div className="label">Estimated band</div></div>
          <div className="num">₺{low}M <em>—</em> ₺{high}M</div>
        </div>
      </div>
      <div className="pg-foot">{t.foot}</div>
    </div>
  );
};

const ReplViz = ({ lang }) => {
  const t = useT(lang).playground.repl;
  return (
    <div className="pg-mod span-5">
      <div className="head"><span>REPL · 03</span><span><Icon name="db" size={14}/></span></div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="repl">
        <div className="lag-line"/>
        <div className="pulse"/>
        <div className="pulse"/>
        <div className="pulse"/>
        <div className="node primary"><div className="box"><Icon name="db" size={20}/><span>primary</span></div><div className="label">writer</div></div>
        <div className="node"><div className="box"><Icon name="db" size={20}/><span>replica</span></div><div className="label">reader</div></div>
      </div>
      <div className="repl-meta"><span>WAL · streaming</span><span>lag · <b>0.4s</b></span><span>throughput · <b>2.1k/s</b></span></div>
      <div className="pg-foot">{t.foot}</div>
    </div>
  );
};

const PulseWidget = ({ lang }) => {
  const t = useT(lang).playground.pulse;
  // generate 24*7 cells with deterministic-ish heatmap
  const cells = Array.from({ length: 24 * 7 }).map((_, i) => {
    const seed = (Math.sin(i * 1.7) + 1) / 2;
    const noise = (Math.sin(i * 0.31) + 1) / 2;
    const v = seed * 0.6 + noise * 0.4;
    const lvl = v < 0.2 ? 0 : v < 0.4 ? 1 : v < 0.6 ? 2 : v < 0.8 ? 3 : 4;
    return lvl;
  });
  return (
    <div className="pg-mod span-7">
      <div className="head"><span>PULSE · 01 · mcp.devredin.com</span><span style={{ color: "var(--ochre)" }}>● live</span></div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="pulse-grid">
        {cells.map((l, i) => <i key={i} className={l ? `l${l}` : ""}/>)}
      </div>
      <div className="pulse-stats">
        <div className="pulse-stat"><div className="num">1,261</div><div className="lab">active listings</div></div>
        <div className="pulse-stat"><div className="num">142</div><div className="lab">new this week</div></div>
        <div className="pulse-stat"><div className="num">38</div><div className="lab">avg category size</div></div>
      </div>
      <div className="pg-foot">{t.foot}</div>
    </div>
  );
};

const Terminal = ({ lang }) => {
  const t = useT(lang).playground.term;
  const [history, setHistory] = React.useState([
    { type: "out", text: "erdm.io shell · v0.1 · type 'help'" },
  ]);
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef(null);
  const cmds = {
    help: "Available: whoami · about · ls · cat about.md · stack · contact · clear",
    whoami: "erdem.yıldırım — full-stack engineer, İzmir.",
    about: "Third year CS @ İYTE. CTO @ Devredin.",
    ls: "projects/  about.md  resume.pdf  playground/",
    "cat about.md": "Builds quiet systems. Studies database papers. Plans road trips.",
    stack: "TypeScript · Postgres · Cloudflare · React · Node · Spring",
    contact: "hi@erdm.io · github/erdmio",
  };
  const submit = (cmd) => {
    if (!cmd.trim()) return;
    if (cmd === "clear") { setHistory([]); return; }
    const out = cmds[cmd.trim().toLowerCase()] || `command not found: ${cmd}`;
    setHistory((h) => [...h, { type: "cmd", text: cmd }, { type: "out", text: out }].slice(-12));
  };
  return (
    <div className="pg-mod span-5" onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="head"><span>TERM · 04</span><span><Icon name="term" size={14}/></span></div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="term">
        {history.map((h, i) => (
          <div key={i} className="line">
            {h.type === "cmd" ? (<><span className="prompt">$ </span><span className="cmd">{h.text}</span></>) : (<span className="out">{h.text}</span>)}
          </div>
        ))}
        <div className="line">
          <span className="prompt">$ </span>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { submit(input); setInput(""); } }}
                 style={{ background: "transparent", border: 0, color: "#e8e1d2", fontFamily: "var(--mono)", fontSize: 12.5, outline: "none", width: "70%" }} />
          <span className="blink"/>
        </div>
      </div>
      <div className="pg-foot">{t.foot} · try: whoami</div>
    </div>
  );
};

const Playground = ({ lang }) => {
  const t = useT(lang).playground;
  return (
    <section id="playground" className="playground">
      <div className="wrap">
        <div className="eyebrow"><span className="line"/><span className="num">07</span><span>{t.eyebrow}</span></div>
        <h2 className="display">{t.h}</h2>
        <p className="lede">{t.lede}</p>
        <div className="pg-grid">
          <PulseWidget lang={lang}/>
          <ReplViz lang={lang}/>
          <Valuation lang={lang}/>
          <Terminal lang={lang}/>
        </div>
      </div>
    </section>
  );
};

// ───────── WRITING ─────────
const Writing = ({ lang }) => {
  const t = useT(lang).writing;
  return (
    <section id="writing" className="writing">
      <div className="wrap">
        <div className="eyebrow"><span className="line"/><span className="num">08</span><span>{t.eyebrow}</span></div>
        <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "30px 0 0" }}>{t.h}</h2>
        <div className="empty">
          <h3>{t.empty}</h3>
          <p>{t.emptyDesc}</p>
          <a className="btn ghost" href="#contact" data-cursor="send">{t.cta}<Icon name="arrow-ne" size={14}/></a>
        </div>
      </div>
    </section>
  );
};

// ───────── CONTACT / FOOTER ─────────
const Footer = ({ lang }) => {
  const t = useT(lang).contact;
  return (
    <footer id="contact" className="footer">
      <div className="big display">{t.bigTop}<br/><em>{t.bigBottom}</em></div>
      <div className="footer-grid">
        <div>
          <h5>WRITE TO ME</h5>
          <a href={`mailto:${t.email}`} data-cursor="send" style={{ font: "italic 32px/1 var(--display)", color: "var(--paper)", textTransform: "none", letterSpacing: "-.01em" }}>{t.email}</a>
        </div>
        <div>
          <h5>ELSEWHERE</h5>
          <a href="#" data-cursor="open">{t.socials.gh}</a>
          <a href="#" data-cursor="open">{t.socials.li}</a>
          <a href="#" data-cursor="open">{t.socials.tw}</a>
        </div>
        <div>
          <h5>SECTIONS</h5>
          <a href="#projects">Projects</a>
          <a href="#playground">Playground</a>
          <a href="#about">About</a>
        </div>
        <div>
          <h5>NOW</h5>
          <div className="now-playing"><span className="pulse-d"/><span style={{ textTransform: "none", letterSpacing: 0, fontFamily: "var(--display)", fontStyle: "italic", fontSize: 16 }}>{t.now}</span></div>
        </div>
      </div>
      <div className="colophon">
        <span>{t.colophon}</span>
        <span>erdm.io · 2026</span>
      </div>
    </footer>
  );
};

Object.assign(window, {
  Cursor, Rail, TopBar,
  Hero, About, Experience, Projects, Stack, Education, Playground, Writing, Footer,
});
