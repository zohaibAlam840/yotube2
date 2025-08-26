// File: components/hooks.js
"use client";
import { useEffect, useState, useRef } from "react";

export function useTypewriter(texts = [], typingSpeed = 60, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let mounted = true;
    let i = 0;
    const run = async () => {
      const current = texts[index % texts.length] ?? "";
      for (i = 0; i <= current.length && mounted; i++) {
        setDisplay(current.slice(0, i));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, typingSpeed));
      }
      if (!mounted) return;
      // pause
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, pause));
      // delete
      for (i = current.length; i >= 0 && mounted; i--) {
        setDisplay(current.slice(0, i));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, typingSpeed / 2));
      }
      if (!mounted) return;
      setIndex((s) => s + 1);
    };

    run();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  return display;
}

export function useCountUp(value, duration = 900) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const from = Number(display) || 0;
    const to = Number(value) || 0;
    if (from === to) return;
    const anim = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const cur = Math.round(from + (to - from) * p);
      setDisplay(cur);
      if (p < 1) rafRef.current = requestAnimationFrame(anim);
    };
    rafRef.current = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return display;
}

export function useLoadInter() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("inter-font")) return;
    const l = document.createElement("link");
    l.id = "inter-font";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap";
    document.head.appendChild(l);
    document.documentElement.style.setProperty("--brand-red", "#ff2b2b");
    document.documentElement.style.setProperty("--brand-blue", "#2563EB");
    document.documentElement.style.setProperty("--brand-text", "#0f172a");
    document.documentElement.style.setProperty("--muted", "#64748b");
  }, []);
}

export const formatN = (n) => (typeof n === "number" ? n.toLocaleString() : n);


