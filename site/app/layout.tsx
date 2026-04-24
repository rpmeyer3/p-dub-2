import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { Cursor } from "@/components/cursor";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Meyer — Software & ML Engineer",
  description:
    "CS senior at UGA building machine-learning systems, data pipelines, and full-stack products. Available for full-time roles starting May 2026.",
  metadataBase: new URL("https://ryanmeyer.dev"),
  openGraph: {
    title: "Ryan Meyer — Software & ML Engineer",
    description:
      "Selected work, experience, and a little noise about building ML systems and full-stack products.",
    url: "https://ryanmeyer.dev",
    siteName: "Ryan Meyer",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="grain antialiased">
        <ThemeProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
