"use client";

import { CustomCursor } from "@/components/motion/CustomCursor";
import { LoadingProvider } from "@/components/motion/LoadingProvider";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <SmoothScroll>
        <a
          href="#main"
          className="bg-heading text-bg sr-only z-[90] px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:right-3 focus:rounded-full"
        >
          تخطي إلى المحتوى
        </a>
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </SmoothScroll>
    </LoadingProvider>
  );
}
