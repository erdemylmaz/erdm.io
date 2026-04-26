import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState<"" | "label" | "big" | "hover">("");

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;
    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const INTERACTIVE_SEL =
      'a, button, [role="button"], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])';
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const cursorEl = el?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        const v = cursorEl.getAttribute("data-cursor");
        if (v === "view" || v === "open" || v === "send") {
          setLabel(
            cursorEl.getAttribute("data-cursor-label") ||
              (v === "view" ? "View →" : v === "send" ? "Send →" : "Open →")
          );
          setVariant("label");
          return;
        }
        if (v === "big") {
          setVariant("big");
          setLabel("");
          return;
        }
      }
      if (el?.closest(INTERACTIVE_SEL)) {
        setVariant("hover");
        setLabel("");
        return;
      }
      setVariant("");
      setLabel("");
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${variant}`} />
      <div ref={ringRef} className={`cursor-ring ${variant}`}>
        {label}
      </div>
    </>
  );
}
