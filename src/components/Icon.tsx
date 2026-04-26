import type { IconName } from "../lib/types";

type Props = { name: IconName; size?: number };

export function Icon({ name, size = 16 }: Props) {
  const s = {
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "pin":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" />
          <path d="M4 17a3 3 0 0 1 3-3h12" />
        </svg>
      );
    case "cup":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 8h12v6a5 5 0 0 1-10 0V8z" />
          <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
          <path d="M8 3c0 1 1 1 1 2s-1 1-1 2" />
          <path d="M12 3c0 1 1 1 1 2s-1 1-1 2" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "arrow-ne":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8" cy="9" r="1.2" />
          <path d="M8 11v6M12 17v-3.5a2.5 2.5 0 0 1 5 0V17M12 11v6" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 4l16 16M20 4 4 20" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4" />
        </svg>
      );
    case "db":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "term":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m7 9 3 3-3 3M13 15h4" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 20V8M10 20V4M16 20v-8M22 20H2" />
        </svg>
      );
    default:
      return null;
  }
}
