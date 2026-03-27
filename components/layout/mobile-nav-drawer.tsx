"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type NavItem = {
  href: string;
  label: string;
};

export function MobileNavDrawer({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="motion-button inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-lg text-white lg:hidden"
        aria-label="فتح القائمة"
      >
        ≡
      </button>

      <div
        className={`fixed inset-0 z-50 bg-ink-950/72 backdrop-blur-sm transition ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[60] flex w-[88vw] max-w-sm flex-col border-l border-white/10 bg-[rgba(7,10,16,0.94)] p-5 shadow-2xl backdrop-blur-xl transition duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-4">
          <BrandMark compact />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="motion-button rounded-full border border-white/12 px-3 py-1.5 text-sm text-mist-200"
          >
            إغلاق
          </button>
        </div>

        <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">منصة عربية لأفكار قابلة للبيع والتنفيذ</p>
          <p className="mt-2 text-sm leading-7 text-mist-300">واجهة startup فاخرة تدعم RTL وتعرض الأفكار كباقات ذات قيمة عملية.</p>
        </div>

        <nav className="mt-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl border border-transparent px-4 py-3 text-sm text-mist-100 transition hover:border-brand-400/20 hover:bg-brand-400/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <ThemeToggle />
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/auth/login" onClick={() => setOpen(false)} className="motion-button rounded-full border border-white/12 px-4 py-3 text-center text-sm text-mist-100">
              تسجيل الدخول
            </Link>
            <Link href="/sell" onClick={() => setOpen(false)} className="motion-button rounded-full bg-gradient-to-l from-brand-400 via-brand-500 to-brand-700 px-4 py-3 text-center text-sm font-bold text-ink-950">
              بع فكرتك
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
