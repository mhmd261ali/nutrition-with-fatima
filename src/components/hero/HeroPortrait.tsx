"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { dietitian } from "@/data/site-content";
import { BrandMark } from "@/components/ui/BrandMark";

export function HeroPortrait() {
  const enabled = dietitian.portrait.enabled;

  return (
    <div
      data-cursor="view"
      className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
    >
      <div className="absolute -inset-4 rounded-[40px] border border-heading/10" />
      <div className="absolute -start-6 top-10 h-28 w-28 rounded-full border border-mist/80" />
      <div className="absolute -end-4 bottom-16 h-16 w-16 rounded-full bg-sand/70" />
      <div className="relative h-full overflow-hidden rounded-[36px] border border-heading/12 bg-surface">
        {enabled ? (
          <Image
            src={dietitian.portrait.src}
            alt={dietitian.portrait.alt}
            fill
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-cover object-[center_18%] transition-transform duration-700 hover:scale-[1.03]"
            priority
          />
        ) : (
          <AbstractPortrait />
        )}
      </div>
    </div>
  );
}

function AbstractPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#E6D7C3");
      gradient.addColorStop(0.5, "#C7D8E6");
      gradient.addColorStop(1, "#F3F6F4");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(93,127,130,0.18)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          width * 0.52,
          height * 0.46,
          70 + i * 28,
          90 + i * 32,
          -0.2,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative flex h-full min-h-[420px] items-end justify-center overflow-hidden bg-[linear-gradient(160deg,#E6D7C3_0%,#C7D8E6_48%,#F3F6F4_100%)]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative z-10 mb-16 flex flex-col items-center gap-4 px-6 text-center">
        <BrandMark size="lg" />
        <p className="text-lg font-medium text-heading">{dietitian.name}</p>
        <p className="text-[13px] text-heading/70">{dietitian.englishTitle}</p>
      </div>
    </div>
  );
}
