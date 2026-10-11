import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Globe, Send, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(57,160,159,0.25),_transparent_22%),linear-gradient(180deg,#07111f_0%,#06131f_20%,#01070d_100%)] px-4 pb-10 pt-24 text-white">
      <div className="caustic absolute inset-x-0 top-0 h-[420px] opacity-60" />

      <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-[#01070d] to-transparent" />

      {Array.from({ length: 15 }).map((_, index) => (
        <span
          key={index}
          className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-white/10"
          style={{
            left: `${(index * 7 + 5) % 100}%`,
            animation: `bubbleRise ${8 + index * 0.6}s ease-in infinite`,
            animationDelay: `${index * 0.35}s`,
          }}
        />
      ))}

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
        <div className="relative flex w-full items-end justify-center">
          <div className="absolute inset-x-20 bottom-0 h-24 rounded-full bg-[radial-gradient(circle,_rgba(68,214,198,0.28),_transparent_60%)] blur-2xl" />
          <div className="relative w-[240px] md:w-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
              alt="Zayn in a black mask"
              width={720}
              height={920}
              className="floating-slow w-full object-contain"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.6rem] text-white/60">Deepest Sea of Knowledge</p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">Let&apos;s build something together</h2>
        </div>

        <div className="flex flex-col items-center gap-3 text-sm text-white/70 md:flex-row md:gap-7">
          <a href="mailto:hello@zaynraihan.com" className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4" />
            hello@zaynraihan.com
          </a>
          <div className="flex items-center gap-4 text-xl text-white/75">
            <a href="https://www.instagram.com" aria-label="Instagram" className="rounded-full border border-white/15 p-2 transition hover:border-white/35 hover:text-white">
              <Globe className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn" className="rounded-full border border-white/15 p-2 transition hover:border-white/35 hover:text-white">
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-[#ffdb53]/40 bg-[#ffdb53]/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2rem] text-[#ffdb53] shadow-[0_0_30px_rgba(255,219,83,0.18)]"
        >
          Start a Project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  );
}
