import { useRef, useState } from "react";
import { useT } from "../../content";
import type { Lang } from "../../lib/types";
import { Icon } from "../../components/Icon";

type Props = { lang: Lang };
type Line = { type: "cmd" | "out"; text: string };

const CMDS: Record<string, string> = {
  help: "Available: whoami · about · ls · cat about.md · stack · contact · clear",
  whoami: "erdem.yılmaz — full-stack engineer, İzmir.",
  about: "Third year CS @ İYTE. Software engineer @ DevirVentures. Co-founder @ benzersor.",
  ls: "projects/  about.md  resume.pdf  playground/",
  "cat about.md": "Builds quiet systems. Studies database papers. Writes Java for fun.",
  stack: "TypeScript · NestJS · Postgres · Hetzner · AWS EC2/RDS · Cloudflare · Ansible",
  contact: "hi@erdm.io · github.com/erdemylmaz",
};

export function Terminal({ lang }: Props) {
  const t = useT(lang).playground.term;
  const [history, setHistory] = useState<Line[]>([
    { type: "out", text: "erdm.io shell · v0.1 · type 'help'" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (cmd: string) => {
    if (!cmd.trim()) return;
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const out = CMDS[cmd.trim().toLowerCase()] || `command not found: ${cmd}`;
    setHistory((h) =>
      [...h, { type: "cmd", text: cmd } as Line, { type: "out", text: out } as Line].slice(-12)
    );
  };

  return (
    <div className="pg-mod span-5" onClick={() => inputRef.current?.focus()}>
      <div className="head">
        <span>TERM · 04</span>
        <span>
          <Icon name="term" size={14} />
        </span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="term">
        {history.map((h, i) => (
          <div key={i} className="line">
            {h.type === "cmd" ? (
              <>
                <span className="prompt">$ </span>
                <span className="cmd">{h.text}</span>
              </>
            ) : (
              <span className="out">{h.text}</span>
            )}
          </div>
        ))}
        <div className="line input-line">
          <span className="prompt">$ </span>
          <span className="input-wrap">
            <span className="input-ghost">{input || " "}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submit(input);
                  setInput("");
                }
              }}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </span>
          <span className="blink" />
        </div>
      </div>
      <div className="pg-foot">{t.foot} · try: whoami</div>
    </div>
  );
}
