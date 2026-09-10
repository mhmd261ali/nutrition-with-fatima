"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { dietitian, navigation } from "@/data/site-content";
import { BrandMark } from "@/components/ui/BrandMark";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { getBookingHref, isExternalBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { useLoading } from "@/components/motion/LoadingProvider";

export function Navbar() {
  const { ready } = useLoading();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border] duration-500",
        scrolled
          ? "border-b border-heading/10 bg-bg/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="site-container relative z-50 flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <BrandMark size="md" priority />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] font-medium text-heading">
              {dietitian.name}
            </span>
            <span className="truncate text-[12px] text-muted">
              {dietitian.englishTitle}
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 xl:flex"
          aria-label="التنقل الرئيسي"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative whitespace-nowrap text-[14px] text-heading/80 transition-colors hover:text-heading"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-heading/50 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <MagneticButton
            href={getBookingHref()}
            external={isExternalBooking()}
            className="min-h-11 px-5 py-2 text-sm"
          >
            احجزي استشارتك
          </MagneticButton>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-heading/15 text-heading xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-bg/96 fixed inset-0 z-40 flex flex-col px-6 pt-28 pb-10 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-1 flex-col gap-6" aria-label="تنقل الجوال">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.45 }}
                  className="text-3xl font-medium text-heading"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <MagneticButton
              href={getBookingHref()}
              external={isExternalBooking()}
              onClick={() => setOpen(false)}
              className="w-full"
            >
              احجزي استشارتك
            </MagneticButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
