import { useEffect, useRef } from "react";

type Props = { accent?: string };

export function HeroBlob({ accent = "#6e7a8a" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const waveRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();

    const wavePath = (k: number, amp: number, freq: number, phase: number, baseY: number) => {
      // build a smooth sine path across viewBox 0..1200
      const points: string[] = [];
      const steps = 24;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * 1200;
        const y = baseY + Math.sin((i / steps) * freq * Math.PI * 2 + phase + k) * amp;
        points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return points.join(" ");
    };

    const loop = (t: number) => {
      const k = (t - start) / 1000;
      const c = ref.current?.querySelectorAll<SVGCircleElement>(".bl");
      c?.forEach((n, i) => {
        const a = k * (0.14 + i * 0.05);
        const x = Math.sin(a + i) * 70;
        const y = Math.cos(a * 1.25 + i) * 50;
        n.style.transform = `translate(${x}px, ${y}px)`;
      });
      const waves = waveRefs.current;
      if (waves[0]) waves[0].setAttribute("d", wavePath(k * 0.35, 28, 1.5, 0, 540));
      if (waves[1]) waves[1].setAttribute("d", wavePath(k * 0.25, 36, 1.2, 1.6, 600));
      if (waves[2]) waves[2].setAttribute("d", wavePath(k * 0.18, 22, 1.8, 3.1, 660));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <radialGradient id="g1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2">
          <stop offset="0%" stopColor="#b8966a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#b8966a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g3">
          <stop offset="0%" stopColor="#7a6f5e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7a6f5e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="auroraFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="auroraOchre" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8966a" stopOpacity="0" />
          <stop offset="50%" stopColor="#b8966a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#b8966a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Goo'd colored blobs */}
      <g filter="url(#goo)">
        <circle className="bl" cx="280" cy="220" r="280" fill="url(#g1)" />
        <circle className="bl" cx="900" cy="180" r="240" fill="url(#g2)" />
        <circle className="bl" cx="700" cy="650" r="320" fill="url(#g3)" />
        <circle className="bl" cx="200" cy="640" r="200" fill="url(#g1)" />
      </g>

      {/* Animated wave lines — soft, low opacity */}
      <g style={{ mixBlendMode: "multiply" }}>
        <path
          ref={(el) => {
            if (el) waveRefs.current[0] = el;
          }}
          fill="none"
          stroke="url(#auroraFade)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <path
          ref={(el) => {
            if (el) waveRefs.current[1] = el;
          }}
          fill="none"
          stroke="url(#auroraOchre)"
          strokeWidth="1"
          opacity="0.55"
        />
        <path
          ref={(el) => {
            if (el) waveRefs.current[2] = el;
          }}
          fill="none"
          stroke="url(#auroraFade)"
          strokeWidth="0.8"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
