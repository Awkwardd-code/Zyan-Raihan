import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/layout/Preloader";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zaynraihan.com"),
  title: {
    default: "Zayn Raihan | Creative Growth Partner",
    template: "%s | Zayn Raihan",
  },
  description:
    "Zayn Raihan helps founders and brands grow through creative strategy, content, digital marketing, and sharp web experiences.",
  openGraph: {
    title: "Zayn Raihan | Creative Growth Partner",
    description:
      "Creative brand strategy, digital marketing, web development, and content systems for ambitious businesses.",
    type: "website",
    siteName: "Zayn Raihan",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://zaynraihan.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayn Raihan | Creative Growth Partner",
    description:
      "Creative brand strategy, digital marketing, web development, and content systems for ambitious businesses.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[#07111f] text-white antialiased">
        <MotionProvider>
          <Preloader />
          <CustomCursor />
          {children}
        </MotionProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Person", "WebSite"],
              name: "Zayn Raihan",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://zaynraihan.com",
              sameAs: [
                "https://www.linkedin.com",
                "https://www.instagram.com",
                "https://www.behance.net",
              ],
              description:
                "Creative strategist, marketer, and web partner helping brands build momentum with strategic content, growth systems, and digital experiences.",
              creator: {
                "@type": "Person",
                name: "Zayn Raihan",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
