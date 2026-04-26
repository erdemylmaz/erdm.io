import { useMemo, useState } from "react";
import { useT } from "../../content";
import type { Lang } from "../../lib/types";

type Props = { lang: Lang };
type Row = Record<string, string | number>;
type Table = { columns: string[]; rows: Row[] };

const TABLES: Record<string, Table> = {
  sections: {
    columns: ["id", "title", "kind", "position"],
    rows: [
      { id: "intro", title: "Hero", kind: "section", position: 1 },
      { id: "about", title: "About", kind: "section", position: 2 },
      { id: "experience", title: "Experience", kind: "section", position: 3 },
      { id: "projects", title: "Selected works", kind: "section", position: 4 },
      { id: "stack", title: "Tech stack", kind: "section", position: 5 },
      { id: "education", title: "Education", kind: "section", position: 6 },
      { id: "playground", title: "Playground", kind: "section", position: 7 },
      { id: "contact", title: "Contact", kind: "section", position: 8 },
    ],
  },
  projects: {
    columns: ["id", "title", "year", "stack", "url"],
    rows: [
      { id: "PLT-01", title: "Devredin Platform", year: "2024+", stack: "NestJS, Turborepo, Expo", url: "devredin.com" },
      { id: "MCP-02", title: "Devredin MCP Server", year: 2026, stack: "MCP SDK, Node.js, Postgres", url: "mcp.devredin.com" },
      { id: "BUS-03", title: "iyteulasim.com", year: 2024, stack: "Next.js, Postgres, Cloudflare", url: "iyteulasim.com" },
      { id: "SAN-05", title: "iyteyilbasi", year: 2025, stack: "Next.js, Postgres, Resend", url: "iyteyilbasi.com" },
      { id: "BNZ-06", title: "benzersor.com", year: 2026, stack: "redacted", url: "benzersor.com" },
    ],
  },
  experience: {
    columns: ["company", "role", "period", "url"],
    rows: [
      { company: "DevirVentures", role: "Software Engineer", period: "2025-present", url: "devredin.com" },
      { company: "benzersor", role: "Co-founder", period: "2025-present", url: "benzersor.com" },
      { company: "Research Ecosystems", role: "DevSecOps Intern", period: "2025", url: "researchecosystems.com" },
      { company: "AES Group", role: "Software Developer Intern", period: "2024", url: "aesgroup.com.tr" },
    ],
  },
  skills: {
    columns: ["category", "name", "note"],
    rows: [
      { category: "backend", name: "NestJS", note: "APIs, guards, queues, GraphQL" },
      { category: "data", name: "PostgreSQL", note: "schemas, replication, query design" },
      { category: "infra", name: "Cloudflare", note: "DNS, CDN, Workers, Pages" },
      { category: "seo", name: "Schema.org / JSON-LD", note: "structured data and rich results" },
      { category: "seo", name: "Programmatic SEO", note: "templates, keyword maps, indexing strategy" },
    ],
  },
};

const EXAMPLES = ["\\d", "\\d projects", "select * from projects", "select title, url from projects", "select * from skills where category = 'seo'"];

function runQuery(raw: string): { columns: string[]; rows: Row[]; message?: string; error?: string } {
  const query = raw.trim().replace(/;$/, "");
  const lower = query.toLowerCase();

  if (!query) return { columns: [], rows: [], message: "write a query first" };
  if (lower === "\\d") {
    return {
      columns: ["table", "columns"],
      rows: Object.entries(TABLES).map(([name, table]) => ({ table: name, columns: table.columns.join(", ") })),
    };
  }

  const describe = query.match(/^\\d\s+([a-z_]+)$/i);
  if (describe) {
    const table = TABLES[describe[1].toLowerCase()];
    if (!table) return { columns: [], rows: [], error: `relation "${describe[1]}" does not exist` };
    return {
      columns: ["column", "type"],
      rows: table.columns.map((column) => ({ column, type: column === "position" || column === "year" ? "integer/text" : "text" })),
    };
  }

  const match = query.match(/^select\s+(.+?)\s+from\s+([a-z_]+)(?:\s+where\s+([a-z_]+)\s*=\s*'?([^']+)'?)?$/i);
  if (!match) return { columns: [], rows: [], error: "only SELECT ... FROM table [WHERE column = 'value'] and \\d are allowed" };

  const [, columnPart, tableName, whereColumn, whereValue] = match;
  const table = TABLES[tableName.toLowerCase()];
  if (!table) return { columns: [], rows: [], error: `relation "${tableName}" does not exist` };

  const columns = columnPart.trim() === "*" ? table.columns : columnPart.split(",").map((c) => c.trim().toLowerCase());
  const badColumn = columns.find((column) => !table.columns.includes(column));
  if (badColumn) return { columns: [], rows: [], error: `column "${badColumn}" does not exist` };
  if (whereColumn && !table.columns.includes(whereColumn.toLowerCase())) {
    return { columns: [], rows: [], error: `column "${whereColumn}" does not exist` };
  }

  const rows = table.rows
    .filter((row) => !whereColumn || String(row[whereColumn.toLowerCase()]).toLowerCase() === whereValue.toLowerCase())
    .map((row) => Object.fromEntries(columns.map((column) => [column, row[column]])));

  return { columns, rows, message: rows.length ? `${rows.length} row(s)` : "0 rows" };
}

export function SqlPlayground({ lang }: Props) {
  const t = useT(lang).playground.sql;
  const [query, setQuery] = useState("select * from projects");
  const result = useMemo(() => runQuery(query), [query]);

  return (
    <div className="pg-mod span-7">
      <div className="head">
        <span>SQL · 02 · read only</span>
        <span className="dot">
          <i />
          <i />
          <i />
        </span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.desc}</p>
      <div className="sql-lab">
        <div className="sql-editor">
          <span className="sql-prompt">erdm=#</span>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            spellCheck={false}
            aria-label="SQL playground query"
          />
        </div>
        <div className="sql-examples">
          {EXAMPLES.map((example) => (
            <button key={example} type="button" onClick={() => setQuery(example)}>
              {example}
            </button>
          ))}
        </div>
        <div className="sql-result">
          {result.error ? (
            <div className="sql-error">ERROR: {result.error}</div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>{result.columns.map((column) => <th key={column}>{column}</th>)}</tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i}>
                      {result.columns.map((column) => <td key={column}>{row[column]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sql-message">{result.message}</div>
            </>
          )}
        </div>
      </div>
      <div className="pg-foot">{t.foot}</div>
    </div>
  );
}
