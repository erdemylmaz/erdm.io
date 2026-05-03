import { useMemo, useState } from "react";
import { useT } from "../../content";
import type { Lang } from "../../lib/types";

type Props = { lang: Lang };
type SortKey = "path" | "port" | "age";
type Row = {
  port: number;
  proto: string;
  pid: number;
  command: string;
  parent: string;
  path: string;
  ageSec: number;
  age: string;
};

const ROWS: Row[] = [
  { port: 3000, proto: "TCP", pid: 15711, command: "node", parent: "node", path: "~/code/web-app", ageSec: 27 * 60, age: "27m" },
  { port: 3030, proto: "TCP", pid: 12405, command: "node", parent: "node", path: "~/code/api", ageSec: 29 * 60, age: "29m" },
  { port: 5432, proto: "TCP", pid: 23514, command: "ssh", parent: "launchd", path: "~/code/infra", ageSec: 10 * 86400 + 5 * 3600, age: "10d5h" },
  { port: 6379, proto: "TCP", pid: 23514, command: "ssh", parent: "launchd", path: "~/code/infra", ageSec: 10 * 86400 + 5 * 3600, age: "10d5h" },
  { port: 8081, proto: "TCP", pid: 13497, command: "node", parent: "node", path: "~/code/mobile", ageSec: 14 * 60, age: "14m" },
  { port: 51606, proto: "TCP", pid: 91160, command: "workerd", parent: "launchd", path: "~/code/edge-app", ageSec: 9 * 86400 + 2 * 3600, age: "9d2h" },
];

function sortRows(rows: Row[], key: SortKey): Row[] {
  const copy = [...rows];
  copy.sort((a, b) => {
    if (key === "path") {
      if (a.path !== b.path) return a.path.localeCompare(b.path);
      return a.port - b.port;
    }
    if (key === "port") return a.port - b.port;
    return b.ageSec - a.ageSec;
  });
  return copy;
}

function formatTable(rows: Row[]): string {
  const header = ["PORT", "PROTO", "PID", "COMMAND", "PARENT", "PATH", "AGE"];
  const cells = rows.map((r) => [
    String(r.port),
    r.proto,
    String(r.pid),
    r.command,
    r.parent,
    r.path,
    r.age,
  ]);
  const widths = header.map((h, i) =>
    Math.max(h.length, ...cells.map((c) => c[i].length))
  );
  const fmt = (cols: string[]) =>
    cols.map((c, i) => c.padEnd(widths[i])).join("  ");
  return [fmt(header), ...cells.map(fmt)].join("\n");
}

const SORT_LABEL: Record<SortKey, string> = {
  path: "sort: path",
  port: "sort: port",
  age: "sort: age:desc",
};

export function PortsCli({ lang }: Props) {
  const t = useT(lang).playground.ports;
  const [sortKey, setSortKey] = useState<SortKey>("path");
  const sorted = useMemo(() => sortRows(ROWS, sortKey), [sortKey]);
  const output = useMemo(() => formatTable(sorted), [sorted]);

  return (
    <div className="pg-mod span-7">
      <div className="head">
        <span>PORTS · 01 · cli</span>
        <span style={{ color: "var(--ochre)" }}>v0.3.0</span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="ports-controls">
        {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
          <button
            key={k}
            className={`ports-pill${sortKey === k ? " on" : ""}`}
            onClick={() => setSortKey(k)}
            type="button"
          >
            {SORT_LABEL[k]}
          </button>
        ))}
      </div>
      <pre className="ports-out">{output}</pre>
      <div className="pg-foot">
        {t.foot}{" "}
        <a
          href="https://portscli.com"
          target="_blank"
          rel="noreferrer noopener"
          className="ports-repo-link"
        >
          portscli.com ↗
        </a>
      </div>
    </div>
  );
}
