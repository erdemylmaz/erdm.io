import type { Lang } from "../lib/types";
import { useT } from "../content";

type Props = { lang: Lang; active: string; onJump: (id: string) => void };

export function Rail({ lang, active, onJump }: Props) {
  const t = useT(lang);
  return (
    <nav className="rail" aria-label="Section navigation">
      {t.nav.map((n, i) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          className={active === n.id ? "active" : ""}
          data-cursor="view"
          data-cursor-label="↗"
          onClick={(e) => {
            e.preventDefault();
            onJump(n.id);
          }}
        >
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <span>{n.label}</span>
        </a>
      ))}
    </nav>
  );
}
