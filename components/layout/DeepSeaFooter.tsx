// FOOTER: Deepest Sea of Knowledge — layered descent into the deep.
// 5 layers: gradient, caustics, bubbles, masked character, content.
"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import {
  ArrowUpRight,
  AtSign,
  Camera,
  CodeXml,
  Mail,
  Palette,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, type MouseEvent, type ReactNode } from "react";

const socialLinks = [
  { label: "X", href: "https://x.com", icon: AtSign },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Send },
  { label: "Instagram", href: "https://www.instagram.com", icon: Camera },
  { label: "Dribbble", href: "https://dribbble.com", icon: Palette },
  { label: "GitHub", href: "https://github.com", icon: CodeXml },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020810]";

function createBubbles() {
  return Array.from({ length: 20 }, (_, id) => {
    const random = (seed: number) => {
      const value = Math.sin((id + 1) * seed) * 10000;
      return value - Math.floor(value);
    };

    return {
      id,
      left: `${(random(12.9898) * 100).toFixed(2)}%`,
      size: `${(4 + random(78.233) * 12).toFixed(2)}px`,
      delay: random(39.425) * 8,
      duration: 12 + random(54.317) * 10,
      drift: (random(93.117) - 0.5) * 40,
    };
  });
}

export function DeepSeaFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(footerRef, { once: true, margin: "100px" });
  const prefersReducedMotion = useReducedMotion() ?? false;
  const bubbles = useMemo(() => createBubbles(), []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      role="contentinfo"
      aria-label="Contact and site information"
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#041020_0%,#071a30_20%,#0a2240_45%,#08192e_70%,#020810_100%)] text-[#F5F5F0]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-0 h-[800px] w-[1400px] max-w-none -translate-x-1/2"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(245,197,24,0.06) 40deg, transparent 80deg, rgba(120,180,255,0.04) 140deg, transparent 200deg, rgba(245,197,24,0.05) 280deg, transparent 360deg)",
            filter: "blur(60px)",
            opacity: 0.5,
          }}
          animate={prefersReducedMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 120, repeat: Infinity, ease: "linear" }
          }
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[800px] w-[1400px] max-w-none -translate-x-1/2"
          style={{
            background:
              "conic-gradient(from 220deg at 50% 0%, transparent 0deg, rgba(120,180,255,0.04) 50deg, transparent 100deg, rgba(245,197,24,0.04) 180deg, transparent 240deg, rgba(120,180,255,0.03) 310deg, transparent 360deg)",
            filter: "blur(80px)",
            opacity: 0.3,
          }}
          animate={prefersReducedMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 90, repeat: Infinity, ease: "linear" }
          }
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        {bubbles.map(({ id, left, size, delay, duration, drift }) => (
          <motion.span
            key={id}
            className="absolute bottom-[-20px] rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
            style={{ left, width: size, height: size }}
            animate={
              prefersReducedMotion
                ? { opacity: 0 }
                : isInView
                  ? {
                      y: [0, -900],
                      x: [0, drift, 0, -drift, 0],
                      opacity: [0, 0.8, 0.8, 0],
                    }
                  : { opacity: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : duration,
              delay: prefersReducedMotion ? 0 : delay,
              repeat: isInView && !prefersReducedMotion ? Infinity : 0,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-[3] h-[400px] w-[min(500px,100vw)] -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-[100px]"
        animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-[4] h-[55vh] min-h-[280px] w-[min(420px,70vw)] max-h-[620px] -translate-x-1/2"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 60 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <motion.div
          className="relative h-full w-full"
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, -10, 0] }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src="/zayn-masked-character.svg"
            alt=""
            fill
            sizes="(max-width: 768px) 70vw, 420px"
            className="object-contain object-bottom opacity-90"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pb-36 pt-28 md:px-16 md:pt-32"
        variants={prefersReducedMotion ? reducedMotionContainerVariants : containerVariants}
      >
        <motion.div
          variants={prefersReducedMotion ? reducedMotionItemVariants : itemVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F5C518]">
            ✦ Deepest Sea of Knowledge
          </p>
          <h2 className="font-display text-[clamp(2.75rem,8vw,6rem)] uppercase leading-[0.95] tracking-[-0.04em] text-white">
            Let&apos;s dive into the deep
          </h2>
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? reducedMotionItemVariants : itemVariants}
          className="mt-12 flex flex-col items-center text-center"
        >
          <a
            href="mailto:hello@zaynraihan.com"
            aria-label="Email hello at zaynraihan.com"
            className={`group relative inline-flex items-center gap-3 font-display text-2xl tracking-tight text-white transition-colors hover:text-[#F5F5F0] sm:text-3xl ${focusRing}`}
          >
            <Mail className="h-5 w-5 shrink-0 text-[#F5C518]" aria-hidden="true" />
            <span className="relative">
              hello@zaynraihan.com
              <span className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-[#F5C518] transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </a>

          <nav aria-label="Social links" className="mt-8 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <SocialIcon
                key={label}
                label={label}
                href={href}
                reducedMotion={prefersReducedMotion}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
            ))}
          </nav>
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? reducedMotionItemVariants : itemVariants}
          className="absolute bottom-28 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/70 backdrop-blur-xl md:left-16 md:translate-x-0"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <motion.span
              className="absolute inset-0 rounded-full bg-emerald-400"
              animate={prefersReducedMotion ? { opacity: 1 } : { scale: [1, 1.4], opacity: [1, 0.4] }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
              }
            />
          </span>
          Available for work
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? reducedMotionItemVariants : itemVariants}
          className="mt-auto grid w-full grid-cols-1 items-center gap-4 border-t border-white/[0.06] pt-8 text-center font-mono text-xs text-white/40 md:grid-cols-3 md:text-left"
        >
          <p>© 2025 Zayn Raihan. All rights reserved.</p>
          <p className="md:text-center">Built with Next.js · Motion · MongoDB</p>
          <div className="md:text-right">
            <BackToTop onClick={scrollToTop} />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

const reducedMotionItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

const reducedMotionContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

function SocialIcon({
  label,
  href,
  reducedMotion,
  children,
}: {
  label: string;
  href: string;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const x = useSpring(useMotionValue(0), { stiffness: 360, damping: 24 });
  const y = useSpring(useMotionValue(0), { stiffness: 360, damping: 24 });

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
    const relativeY = (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
    x.set(relativeX * 6);
    y.set(relativeY * 6);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{ x, y }}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-colors duration-200 hover:border-[#F5C518] hover:bg-[#F5C518] hover:text-black ${focusRing}`}
    >
      {children}
    </motion.a>
  );
}

function BackToTop({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#F5C518] ${focusRing}`}
    >
      Back to top
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
}
