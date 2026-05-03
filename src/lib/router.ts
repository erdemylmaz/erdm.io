import { useEffect, useState } from "react";

export type Route =
  | { kind: "home" }
  | { kind: "post"; slug: string };

const POST_RE = /^\/notes\/([^/]+)\/?$/;
const ROUTE_EVENT = "erdm:route";

function parsePath(pathname: string): Route {
  const m = pathname.match(POST_RE);
  if (m) return { kind: "post", slug: decodeURIComponent(m[1]) };
  return { kind: "home" };
}

function getCurrentRoute(): Route {
  if (typeof window === "undefined") return { kind: "home" };
  return parsePath(window.location.pathname);
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(getCurrentRoute);
  useEffect(() => {
    const sync = () => setRoute(getCurrentRoute());
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);
  return route;
}

export function navigate(path: string, opts: { hash?: string; scrollTo?: "top" | "preserve" } = {}) {
  const url = path + (opts.hash ?? "");
  if (window.location.pathname + window.location.hash === url) return;
  window.history.pushState(null, "", url);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  if ((opts.scrollTo ?? "top") === "top") {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

export function postPath(slug: string): string {
  return `/notes/${slug}`;
}
