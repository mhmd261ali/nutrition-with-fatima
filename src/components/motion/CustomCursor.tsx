"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

export function CustomCursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [onImage, setOnImage] = useState(false);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!fine) return;

    const move = (event: MouseEvent) => {
      pos.current = { x: event.clientX, y: event.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], input, textarea");
      const media = target.closest("[data-cursor='view']");
      setHovering(Boolean(interactive));
      setOnImage(Boolean(media));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] h-2 w-2 rounded-full bg-heading mix-blend-multiply transition-[width,height,background] duration-200"
        style={{
          width: hovering || onImage ? 14 : 8,
          height: hovering || onImage ? 14 : 8,
          marginLeft: hovering || onImage ? -7 : -4,
          marginTop: hovering || onImage ? -7 : -4,
        }}
      />
      <div
        ref={label}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] -mt-8 mr-3 text-[11px] tracking-widest text-heading transition-opacity duration-200"
        style={{
          opacity: onImage ? 1 : 0,
          marginInlineStart: 14,
        }}
      >
        عرض
      </div>
    </>
  );
}
