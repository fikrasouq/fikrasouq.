import type { Metadata } from "next";
import "@/app/globals.css";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "FikraSouq | سوق الأفكار",
  description: "منصة عربية لبيع وشراء الأفكار وباقات التنفيذ الجاهزة بأسلوب startup احترافي",
};

const themeInitScript = `
  (function () {
    try {
      var storedTheme = window.localStorage.getItem('fikrasouq-theme');
      var theme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="relative min-h-screen overflow-hidden">
          <ScrollProgress />
          <div className="pointer-events-none absolute inset-0 bg-glow opacity-80" />
          <SiteHeader />
          <main className="relative z-10 pb-20">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
