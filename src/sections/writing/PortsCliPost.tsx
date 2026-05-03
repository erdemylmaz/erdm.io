import type { Lang } from "../../lib/types";

type Props = { lang: Lang };

export const PORTS_CLI_POST_META = {
  slug: "ports-cli",
  k: "POST-01",
  date: "2026-05-03",
  minRead: 6,
  repo: "https://github.com/erdemylmaz/ports-cli",
  tags: ["macOS", "Go", "CLI", "open source"],
  en: {
    title: "Naming was the hard part",
    subtitle:
      "Why I built ports — a small Go CLI for macOS — instead of installing yet another menu-bar app.",
    excerpt:
      "I had eight things bound to dev ports, five of them mine, three of them I couldn't identify. Every existing tool I tried was either a heavy GUI or buried the answer I actually needed under a wall of columns.",
  },
  tr: {
    title: "Zor olan kısım isim koymaktı",
    subtitle:
      "macOS için yazdığım küçük Go CLI'sı 'ports'u — bir menü çubuğu uygulaması daha kurmak yerine — neden kendim yazdım.",
    excerpt:
      "Sekiz şey dev portlarına bağlanmıştı, beşi benim, üçünü tanımlayamıyordum. Denediğim her mevcut araç ya ağır bir GUI'ydi ya da gerçekten ihtiyacım olan cevabı bir sürü kolonun altında gömüyordu.",
  },
} as const;

export function PortsCliPostVisual() {
  return (
    <svg
      viewBox="0 0 600 360"
      preserveAspectRatio="xMidYMid slice"
      className="post-card-svg"
      aria-label="ports cli illustration"
    >
      <defs>
        <linearGradient id="postcardgrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1f1b17" />
          <stop offset="1" stopColor="#0d0b0a" />
        </linearGradient>
        <pattern id="scanlines" width="6" height="6" patternUnits="userSpaceOnUse">
          <path
            d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2"
            stroke="rgba(232,225,210,.045)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="600" height="360" fill="url(#postcardgrad)" />
      <rect width="600" height="360" fill="url(#scanlines)" />

      <g transform="translate(38, 56)">
        <text
          fontFamily="var(--mono)"
          fontSize="11"
          letterSpacing=".18em"
          fill="rgba(232,225,210,.4)"
        >
          $ ports
        </text>
      </g>

      <g transform="translate(38, 110)">
        <text
          fontFamily="var(--display)"
          fontStyle="italic"
          fontSize="92"
          fill="#e8e1d2"
          letterSpacing="-.02em"
        >
          ports
        </text>
        <text
          x="0"
          y="40"
          fontFamily="var(--display)"
          fontSize="22"
          fill="rgba(232,225,210,.45)"
        >
          a small CLI, a clean name.
        </text>
      </g>

      <g transform="translate(38, 230)">
        {[
          { w: 320, port: ":3000", path: "web-app" },
          { w: 280, port: ":3030", path: "api" },
          { w: 360, port: ":5432", path: "infra" },
          { w: 300, port: ":51606", path: "edge-app" },
        ].map((row, i) => (
          <g key={i} transform={`translate(0, ${i * 22})`}>
            <rect
              width={row.w}
              height={14}
              rx={2}
              fill="rgba(232,225,210,.06)"
              stroke="rgba(232,225,210,.08)"
            />
            <circle cx={9} cy={7} r={3} fill={i < 2 ? "#b8966a" : "rgba(232,225,210,.28)"} />
            <text
              x={22}
              y={11}
              fontFamily="var(--mono)"
              fontSize={9.5}
              fill="#b8966a"
              letterSpacing=".06em"
            >
              {row.port}
            </text>
            <text
              x={64}
              y={11}
              fontFamily="var(--mono)"
              fontSize={9.5}
              fill="rgba(232,225,210,.55)"
            >
              ~/code/{row.path}
            </text>
          </g>
        ))}
      </g>

      <g transform="translate(440, 110)" opacity="0.85">
        <circle cx={60} cy={60} r={56} fill="none" stroke="rgba(184,150,106,.35)" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx={60} cy={60} r={36} fill="none" stroke="rgba(184,150,106,.5)" strokeWidth="1" />
        <circle cx={60} cy={60} r={6} fill="#b8966a" />
        <text
          x={60}
          y={140}
          fontFamily="var(--mono)"
          fontSize={9.5}
          letterSpacing=".18em"
          textAnchor="middle"
          fill="rgba(232,225,210,.4)"
        >
          PROJECT-AWARE
        </text>
      </g>
    </svg>
  );
}

function MessyLsofIllustration() {
  const lines = [
    { c: "node", port: ":3000", path: "?", live: true },
    { c: "node", port: ":3030", path: "?", live: true },
    { c: "node", port: ":4173", path: "?", live: true },
    { c: "ssh", port: ":5432", path: "?", live: false },
    { c: "node", port: ":5173", path: "?", live: true },
    { c: "ssh", port: ":6379", path: "?", live: false },
    { c: "node", port: ":8081", path: "?", live: true },
    { c: "?", port: ":51606", path: "?", live: false },
  ];
  return (
    <figure className="post-fig">
      <div className="post-fig-pair">
        <div className="post-fig-card dark">
          <div className="post-fig-tag">$ lsof -i -P -n | grep LISTEN</div>
          <div className="post-fig-rows">
            {lines.map((l, i) => (
              <div key={i} className="post-fig-row dim">
                <span className="dot mute" />
                <span className="cmd">{l.c}</span>
                <span className="num">{l.port}</span>
                <span className="path q">{l.path}</span>
              </div>
            ))}
          </div>
          <div className="post-fig-cap">eight rows. which one is which project?</div>
        </div>
        <div className="post-fig-arrow" aria-hidden>
          →
        </div>
        <div className="post-fig-card dark">
          <div className="post-fig-tag accent">$ ports</div>
          <div className="post-fig-rows">
            {[
              { c: "node", port: ":3000", path: "~/code/web-app", live: true },
              { c: "node", port: ":3030", path: "~/code/api", live: true },
              { c: "node", port: ":4173", path: "~/code/erdm.io", live: true },
              { c: "ssh", port: ":5432", path: "~/code/infra", live: false },
              { c: "node", port: ":5173", path: "~/code/erdm.io", live: true },
              { c: "ssh", port: ":6379", path: "~/code/infra", live: false },
              { c: "node", port: ":8081", path: "~/code/mobile", live: true },
              { c: "workerd", port: ":51606", path: "~/code/edge-app", live: false },
            ].map((l, i) => (
              <div key={i} className="post-fig-row">
                <span className={`dot ${l.live ? "live" : "old"}`} />
                <span className="cmd">{l.c}</span>
                <span className="num">{l.port}</span>
                <span className="path">{l.path}</span>
              </div>
            ))}
          </div>
          <div className="post-fig-cap">same data, with the answer attached.</div>
        </div>
      </div>
    </figure>
  );
}

function SingleFileIllustration() {
  return (
    <figure className="post-fig">
      <svg
        viewBox="0 0 600 200"
        className="post-fig-svg"
        aria-label="single Go file architecture"
      >
        <defs>
          <linearGradient id="filegrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#1f1b17" />
            <stop offset="1" stopColor="#2a2520" />
          </linearGradient>
        </defs>
        <rect width="600" height="200" fill="var(--paper-3)" rx="6" />
        <g transform="translate(40, 30)">
          <rect width="140" height="140" fill="url(#filegrad)" rx="6" />
          <text
            x="70"
            y="62"
            fontFamily="var(--mono)"
            fontSize="11"
            fill="rgba(232,225,210,.55)"
            letterSpacing=".14em"
            textAnchor="middle"
          >
            cmd/ports/
          </text>
          <text
            x="70"
            y="86"
            fontFamily="var(--display)"
            fontSize="22"
            fill="#e8e1d2"
            textAnchor="middle"
          >
            main.go
          </text>
          <text
            x="70"
            y="108"
            fontFamily="var(--mono)"
            fontSize="10"
            fill="#b8966a"
            textAnchor="middle"
          >
            ~600 lines
          </text>
        </g>
        <g
          transform="translate(220, 50)"
          fontFamily="var(--mono)"
          fontSize="11"
          fill="var(--ink-2)"
        >
          <text y="0">no third-party deps</text>
          <text y="22">no daemon</text>
          <text y="44">no config file</text>
          <text y="66">no SQLite</text>
          <text y="88">no LaunchAgent</text>
          <text y="110">just lsof + ps + go</text>
        </g>
        <g transform="translate(440, 60)">
          <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(184,150,106,.4)" strokeWidth="1.5" strokeDasharray="3 4" />
          <text
            x="60"
            y="55"
            fontFamily="var(--display)"
            fontStyle="italic"
            fontSize="22"
            fill="var(--ochre)"
            textAnchor="middle"
          >
            one
          </text>
          <text
            x="60"
            y="78"
            fontFamily="var(--display)"
            fontStyle="italic"
            fontSize="22"
            fill="var(--ochre)"
            textAnchor="middle"
          >
            file
          </text>
        </g>
      </svg>
    </figure>
  );
}

function DistributionIllustration() {
  const channels = [
    { name: "Homebrew", cmd: "brew tap erdemylmaz/ports-cli\nbrew install ports", icon: "🍺" },
    { name: "npm", cmd: "npm install -g\n@erdemyilmaz/ports-cli", icon: "📦" },
    { name: "go install", cmd: "go install\ngithub.com/erdemylmaz/\nports-cli/cmd/ports@latest", icon: "Go" },
  ];
  return (
    <figure className="post-fig">
      <div className="post-fig-trio">
        {channels.map((c) => (
          <div key={c.name} className="post-fig-chan">
            <div className="post-fig-chan-h">
              <span className="post-fig-chan-icon">{c.icon}</span>
              <span className="post-fig-chan-name">{c.name}</span>
            </div>
            <pre className="post-fig-chan-cmd">{c.cmd}</pre>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function PortsCliPost({ lang }: Props) {
  const isTR = lang === "tr";

  if (isTR) {
    return (
      <article className="post">
        <header className="post-head">
          <div className="post-meta">
            <time>2026-05-03</time>
            <span>·</span>
            <span>6 dk okuma</span>
            <span>·</span>
            <a href={PORTS_CLI_POST_META.repo} target="_blank" rel="noreferrer noopener">
              github.com/erdemylmaz/ports-cli ↗
            </a>
          </div>
          <h1>{PORTS_CLI_POST_META.tr.title}</h1>
          <p className="post-sub">{PORTS_CLI_POST_META.tr.subtitle}</p>
        </header>

        <div className="post-body">
          <p className="post-lede">
            Bir akşam <code>:3000</code>'i boşaltmaya çalışırken sekiz farklı şey
            dev portlarına bağlıydı. Beşi benimdi, üçünü tanımlayamıyordum.{" "}
            <code>lsof -i -P -n | grep LISTEN</code> bana <em>port</em> ve{" "}
            <em>komut</em> verdi ama gerçekten istediğim cevabı vermedi: <em>bu node hangi projeye ait?</em>
          </p>

          <MessyLsofIllustration />

          <h2>Var olanlara baktım</h2>
          <p>
            Tipik döngü: <em>"port monitor mac"</em> ara, GitHub yıldızlarına bak,
            tarama. Bulduklarım iki kutuya düşüyordu — ya bütün bir SwiftUI menü
            çubuğu uygulaması (yetersiz değil ama sadece port adına bakmak için
            <code>codesign</code>'sız bir <code>.app</code> indirmek istemedim), ya
            da Linux'tan sökülmüş, çalışan dizini hiç göstermeyen TUI'lar. Mevcut
            seçeneklerin hiçbiri benim asıl sorduğum soruyu — <em>bu node hangi
            projeden geliyor?</em> — temiz bir şekilde çözmüyordu.
          </p>

          <p>
            Bir de şu vardı: <strong>isim</strong>. <code>port-monitor-darwin</code>,{" "}
            <code>mac-port-tracker</code>, <code>net-watch</code>… kimse{" "}
            <code>ports</code>'u almamıştı. Tek heceli, dosya komutu hızında, biri
            <code>--help</code> görmeden ne yaptığını biliyor. Bu kadar açık bir
            ismin alınmamış olması, onu yazmak için yeterince iyi bir gerekçeydi.
          </p>

          <h2>Yazmak yüklemekten kolaydı</h2>
          <p>
            Birkaç saat Claude Code ile çalışınca temel CLI hazırdı. Tek dosyalık
            bir Go programı, üçüncü parti bağımlılığı yok. Bütün bilgi zaten{" "}
            <code>lsof</code> ve <code>ps</code>'in çıktısında — sadece doğru
            sütunları göstermek ve ilgi çekici filtreler eklemek meselesiydi.
          </p>

          <SingleFileIllustration />

          <h2>Asıl mesele "proje farkındalığı"ydı</h2>
          <p>
            Tek değişiklik her şeyi değiştirdi: her satır artık o işlemin{" "}
            <strong>çalışma dizinini</strong> de gösteriyor. Aniden{" "}
            <code>node</code>, <em>"hangi node?"</em> değil,{" "}
            <code>~/code/web-app</code> oldu. Buradan diğer şeyler de doğal akıyor:
            varsayılan olarak path'e göre sıralama (aynı projenin portları yan
            yana), <code>--dir ~/code/web-app</code> ile filtreleme, ve aynı
            bayrakla <code>kill --dir</code> ile bütün bir projeyi kapatma.
          </p>

          <p>
            Birkaç başka yargı: GUI uygulamaları varsayılan olarak gizli (Spotify,
            Chrome, Figma — orada olduklarını biliyorsun), yaş{" "}
            <code>ps -o lstart=</code>'tan geliyor (zombi dev sunucuları aramak
            için <code>--sort age:desc</code>), ve port numarasıyla{" "}
            <code>kill</code>/<code>pause</code>/<code>resume</code> — pid aramaya
            gerek yok.
          </p>

          <h2>Dağıtım: brew, npm, go install</h2>
          <p>
            Tool ne kadar küçük olursa olsun, kurulum sürtünmesi her şeyi öldürür.
            Üç kanaldan kurulabiliyor:
          </p>

          <DistributionIllustration />

          <p>
            Homebrew kişisel bir tap'ta:{" "}
            <a
              href="https://github.com/erdemylmaz/homebrew-ports-cli"
              target="_blank"
              rel="noreferrer noopener"
            >
              erdemylmaz/homebrew-ports-cli
            </a>
            . npm paketi <code>postinstall</code> sırasında doğru platform
            binary'sini GitHub Releases'tan indiren ince bir sarmalayıcı —{" "}
            <code>esbuild</code> ve <code>swc</code> ile aynı desen.{" "}
            <code>go install</code> ise sıfır iş gerektirdi, Go ekosistemi onu
            bedavaya getiriyor.
          </p>

          <h2>Kapsam, bilerek</h2>
          <p>
            Yapmadığım şeyler: arka plan daemon, kalıcı geçmiş, TUI, menü çubuğu
            uygulaması, Linux desteği. Bunları eklemek aracın karakterini
            değiştirir — ve bunu yapmak yerine ufak bir aracı küçük tutmayı
            tercih ederim. Kaynak{" "}
            <a href={PORTS_CLI_POST_META.repo} target="_blank" rel="noreferrer noopener">
              GitHub'da
            </a>{" "}
            (MIT). Sonraki <em>küçük</em> ihtiyacın ne ise, kendin yazmanı
            öneririm.
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="post">
      <header className="post-head">
        <div className="post-meta">
          <time>2026-05-03</time>
          <span>·</span>
          <span>6 min read</span>
          <span>·</span>
          <a href={PORTS_CLI_POST_META.repo} target="_blank" rel="noreferrer noopener">
            github.com/erdemylmaz/ports-cli ↗
          </a>
        </div>
        <h1>{PORTS_CLI_POST_META.en.title}</h1>
        <p className="post-sub">{PORTS_CLI_POST_META.en.subtitle}</p>
      </header>

      <div className="post-body">
        <p className="post-lede">
          One evening I tried to free <code>:3000</code> and found eight things
          bound to dev ports. Five of them were mine. Three I couldn't identify.
          <code>lsof -i -P -n | grep LISTEN</code> told me the <em>port</em> and
          the <em>command</em>, but not the answer I actually wanted: <em>which
          project is this node from?</em>
        </p>

        <MessyLsofIllustration />

        <h2>I looked at what existed</h2>
        <p>
          The usual loop: search "macOS port monitor," scan the GitHub stars,
          read code. Most of what I found fell into two buckets — either a full
          SwiftUI menu-bar app (overkill, and I didn't want to install an
          unsigned <code>.app</code> just to see what's on a port), or TUIs
          ported from Linux that don't show working directory at all. None of
          them cleanly solved the question I was actually asking: <em>which
          project is this node from?</em>
        </p>

        <p>
          And then there was the <strong>name</strong>.{" "}
          <code>port-monitor-darwin</code>, <code>mac-port-tracker</code>,{" "}
          <code>net-watch</code>… nobody had taken <code>ports</code>. One
          syllable, fast as a file command, you know what it does before
          reading <code>--help</code>. A name that obvious being unclaimed felt
          like reason enough to write it.
        </p>

        <h2>Writing it was easier than installing one</h2>
        <p>
          A few hours pairing with Claude Code and the core CLI was done. One
          Go file, no third-party dependencies. The information is already
          there in <code>lsof</code> and <code>ps</code> output — it was just a
          matter of showing the right columns and adding the filters that
          actually matter.
        </p>

        <SingleFileIllustration />

        <h2>Project-aware was the whole answer</h2>
        <p>
          One change unlocked the rest: every row also shows the{" "}
          <strong>working directory</strong> of the process. Suddenly{" "}
          <code>node</code> isn't <em>"which node?"</em> — it's{" "}
          <code>~/code/web-app</code>. From there everything else falls out
          naturally: sort by path by default (same-project ports group
          together), filter with <code>--dir ~/code/web-app</code>, and{" "}
          <code>kill --dir</code> to shut down a whole project with the same
          flag.
        </p>

        <p>
          A few other opinions: GUI apps hidden by default (Spotify, Chrome,
          Figma — you know they're there), age computed from{" "}
          <code>ps -o lstart=</code> (use <code>--sort age:desc</code> to hunt
          zombie dev servers), and <code>kill</code>/<code>pause</code>/
          <code>resume</code> by port number — no pid lookup ritual.
        </p>

        <h2>Distribution: brew, npm, go install</h2>
        <p>
          However small the tool is, install friction kills it. Three channels:
        </p>

        <DistributionIllustration />

        <p>
          Homebrew lives in a personal tap:{" "}
          <a
            href="https://github.com/erdemylmaz/homebrew-ports-cli"
            target="_blank"
            rel="noreferrer noopener"
          >
            erdemylmaz/homebrew-ports-cli
          </a>
          . The npm package is a thin wrapper that downloads the right platform
          binary from GitHub Releases on <code>postinstall</code> — same
          pattern as <code>esbuild</code> and <code>swc</code>.{" "}
          <code>go install</code> needed zero work, the Go ecosystem gives it
          for free.
        </p>

        <h2>Scope, on purpose</h2>
        <p>
          Things I didn't do: background daemon, persistent history, TUI,
          menu-bar app, Linux support. Each of those would change the
          tool's character — and I'd rather keep a small tool small than turn
          it into the thing I rejected at the start. Source on{" "}
          <a href={PORTS_CLI_POST_META.repo} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>{" "}
          (MIT). Whatever your next <em>small</em> need is, I recommend writing
          it yourself.
        </p>
      </div>
    </article>
  );
}
