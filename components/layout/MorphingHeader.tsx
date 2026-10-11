// DESIGN: Full-width at top → detaches into floating pill → collapses to icons → docks top-right.
// Layers of motion: scrim, ambient glow, label squeeze, icon rotation, dock overshoot.
"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Globe,
  House,
  Mail,
  Menu,
  Sparkles,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type HeaderState = "expanded" | "icons" | "docked";
type CTAState = "full" | "reduced" | "minimal";

const navItems = [
  { label: "Home", href: "/", icon: House, labelWidth: 60, collapseAt: 0.2 },
  { label: "Services", href: "/services", icon: Sparkles, labelWidth: 90, collapseAt: 0.28 },
  { label: "Work", href: "/work", icon: Briefcase, labelWidth: 50, collapseAt: 0.36 },
  { label: "Learn", href: "/learn", icon: GraduationCap, labelWidth: 60, collapseAt: 0.44 },
  { label: "About", href: "/about", icon: User, labelWidth: 60, collapseAt: 0.52 },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1C]";

function getCollapsedLabelCount(progress: number) {
  return navItems.filter(({ collapseAt }) => progress >= collapseAt + 0.05).length;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function useViewportWidth() {
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    const update = () => setWidth(document.documentElement.clientWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

export function MorphingHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotionSafe();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const viewportWidth = useViewportWidth();
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState<HeaderState>("expanded");
  const [ctaState, setCtaState] = useState<CTAState>("full");
  const [collapsedLabels, setCollapsedLabels] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setState(progress >= 0.88 ? "docked" : progress >= 0.6 ? "icons" : "expanded");
    setCtaState(progress < 0.35 ? "full" : progress < 0.85 ? "reduced" : "minimal");
    setCollapsedLabels(getCollapsedLabelCount(progress));
  });

  const fullWidth = viewportWidth;
  const detachedWidth = Math.min(1020, Math.max(viewportWidth - 32, 0));
  const collapsedWidth = Math.min(440, Math.max(viewportWidth - 32, 0));
  const iconWidth = Math.min(340, Math.max(viewportWidth - 32, 0));
  const dockedWidth = Math.min(220, Math.max(viewportWidth - 32, 0));
  const width = useTransform(
    scrollYProgress,
    [0, 0.04, 0.2, 0.6, 0.82, 0.88, 1],
    [
      fullWidth,
      detachedWidth,
      detachedWidth,
      collapsedWidth,
      iconWidth,
      dockedWidth,
      dockedWidth,
    ],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.04, 0.6, 0.88, 1],
    [
      0,
      (viewportWidth - detachedWidth) / 2,
      (viewportWidth - collapsedWidth) / 2,
      (viewportWidth - iconWidth) / 2,
      viewportWidth - 24 - dockedWidth,
    ],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.04, 0.6, 0.88, 1],
    [80, 68, 56, 46, 44],
  );
  const headerTop = useTransform(scrollYProgress, [0, 0.04, 0.08, 1], [0, 28, 24, 24]);
  const headerPadding = useTransform(
    scrollYProgress,
    [0, 0.04, 0.6, 0.88, 1],
    isMobile ? [16, 16, 12, 12, 12] : [40, 24, 16, 12, 12],
  );
  const headerRadius = useTransform(scrollYProgress, [0, 0.04, 1], [0, 9999, 9999]);
  const topBorderOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const bottomBorderOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.04, 1],
    ["rgba(10,15,28,0.72)", "rgba(10,15,28,0.88)", "rgba(10,15,28,0.88)"],
  );
  const avatarSize = useTransform(scrollYProgress, [0, 0.04, 0.5, 1], [44, 44, 34, 26]);
  const navGap = useTransform(scrollYProgress, [0, 0.04, 0.2, 0.6, 1], [48, 40, 32, 28, 24]);
  const internalGap = useTransform(
    scrollYProgress,
    [0, 0.04, 0.6, 0.88, 1],
    isMobile ? [8, 8, 8, 8, 8] : [64, 40, 24, 16, 12],
  );
  const scrimOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1], [0, 0.35, 0.25]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);
  const navOpacity = useTransform(scrollYProgress, [0.82, 0.88], [1, 0]);
  const dockLabelOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);
  const ctaWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.82, 0.88, 1],
    [200, 200, 40, 40, 36, 36],
  );
  const ctaHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.82, 0.88, 1],
    [40, 40, 40, 40, 36, 36],
  );
  const geometryTransition = prefersReducedMotion
    ? { duration: 0.15, ease: "linear" as const }
    : { type: "spring" as const, stiffness: 240, damping: 32, mass: 0.7 };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = useCallback((restoreFocus = false) => {
    setSidebarOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile && sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen || !isMobile) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab" || !sidebarOpen || !isMobile) return;
      const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (!first || !last) return;

      if (
        event.shiftKey &&
        (activeElement === first || !sidebarRef.current?.contains(activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || !sidebarRef.current?.contains(activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, isMobile, closeMenu]);

  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    sidebarRef.current
      ?.querySelector<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
      ?.focus();
  }, [isMobile, sidebarOpen]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ opacity: scrimOpacity }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-32 bg-gradient-to-b from-[#0A0F1C]/90 via-[#0A0F1C]/40 to-transparent"
      />

      <motion.header
        role="banner"
        aria-label="Primary navigation"
        style={{
          x,
          width,
          height,
          left: 0,
          top: headerTop,
          paddingInline: headerPadding,
          borderRadius: headerRadius,
          backgroundColor,
          willChange: "transform",
        }}
        transition={state === "docked" && !prefersReducedMotion
          ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          : geometryTransition}
        className="fixed z-[100] flex max-w-[100vw] items-center overflow-visible border-x border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_40px_-10px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <motion.div
          aria-hidden="true"
          style={{ opacity: prefersReducedMotion ? 0 : glowOpacity, scale: glowScale }}
          className="pointer-events-none absolute -inset-5 -z-10 rounded-full"
        >
          <div className={!prefersReducedMotion ? "h-full w-full animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-[#F5C518]/20 blur-3xl" : "h-full w-full rounded-full bg-[#F5C518]/20 blur-3xl"} />
        </motion.div>
        <span className="sr-only" aria-live="polite">
          Navigation {state === "docked"
            ? "docked to top right"
            : state === "icons"
              ? "showing icons only"
              : collapsedLabels > 0
                ? "partially collapsed"
                : "expanded"}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          {state === "docked" ? (
            <StatusChip
              key="status-chip"
              labelOpacity={dockLabelOpacity}
              focusRing={focusRing}
              reducedMotion={prefersReducedMotion ?? false}
            />
          ) : (
            <motion.div
              key="header-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={prefersReducedMotion
                ? { duration: 0.15, ease: "linear" }
                : { duration: 0.2, ease: [0.22, 1, 0.3, 1] }}
              className="relative z-10 flex w-full min-w-0 items-center"
              style={{ gap: internalGap }}
            >
              <AnimatedAvatar
                size={avatarSize}
                monochrome={state !== "expanded"}
                focusRing={focusRing}
              />
              {isMobile ? (
                <div className="ml-auto flex items-center gap-3">
                  <MenuButton
                    buttonRef={menuButtonRef}
                    isOpen={sidebarOpen}
                    onClick={() => setSidebarOpen((open) => !open)}
                    focusRing={focusRing}
                    panelId="mobile-sidebar"
                  />
                  <CTAButton
                    state={ctaState}
                    width={ctaWidth}
                    height={ctaHeight}
                    focusRing={focusRing}
                    reducedMotion={prefersReducedMotion ?? false}
                  />
                </div>
              ) : (
                <>
                  <NavLinks
                    progress={scrollYProgress}
                    pathname={pathname}
                    navGap={navGap}
                    navOpacity={navOpacity}
                    docked={false}
                    focusRing={focusRing}
                  />
                  <CTAButton
                    state={ctaState}
                    width={ctaWidth}
                    height={ctaHeight}
                    focusRing={focusRing}
                    reducedMotion={prefersReducedMotion ?? false}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          aria-hidden="true"
          style={{ opacity: topBorderOpacity }}
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]"
        />
        <motion.div
          aria-hidden="true"
          style={{ opacity: bottomBorderOpacity }}
          className="pointer-events-none absolute -bottom-px left-6 right-6 h-px bg-white/[0.08]"
        />
      </motion.header>

      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.2 }}
              className="fixed inset-0 z-[140] bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => closeMenu(true)}
            />
            <motion.aside
              id="mobile-sidebar"
              ref={sidebarRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: prefersReducedMotion ? 0 : "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: prefersReducedMotion ? 0 : "100%", opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15, ease: "linear" }
                  : { type: "spring", stiffness: 260, damping: 32, mass: 0.7 }
              }
              className="fixed right-0 top-0 z-[150] flex h-[100dvh] w-[70vw] max-w-[100vw] flex-col overflow-y-auto border-l border-white/[0.08] bg-[rgba(10,15,28,0.98)] px-6 py-8 text-white shadow-[-30px_0_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
            >
              <div className="flex items-center justify-between">
                <BrandMark size={48} focusRing={focusRing} />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => closeMenu(true)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 ${focusRing}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="mt-12 flex-1">
                {[...navItems, { label: "Contact", href: "mailto:hello@zaynraihan.com", icon: Mail }].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : index * 0.04,
                      duration: prefersReducedMotion ? 0.15 : 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => closeMenu()}
                      className={`group flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-2xl text-white transition-all hover:pl-2 hover:text-[#F5C518] ${focusRing}`}
                    >
                      <span className="flex items-center gap-4">
                        <item.icon
                          size={20}
                          strokeWidth={1.75}
                          className={isActive(item.href) ? "text-[#F5C518]" : "text-white/60"}
                        />
                        {item.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#F5C518]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C518]/25 bg-[#F5C518]/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F5C518]">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5C518]">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#F5C518]/70" />
                  </span>
                  Available for work
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/" aria-label="Website" className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 ${focusRing}`}>
                    <Globe className="h-4 w-4" />
                  </Link>
                  <Link href="/services" aria-label="Services" className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 ${focusRing}`}>
                    <Sparkles className="h-4 w-4" />
                  </Link>
                  <Link href="/work" aria-label="Work" className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 ${focusRing}`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a href="mailto:hello@zaynraihan.com" aria-label="Email" className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 ${focusRing}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                  <Link href="/about" aria-label="About" className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 ${focusRing}`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <a
                  href="mailto:hello@zaynraihan.com"
                  className={`block text-xs text-white/60 transition-colors hover:text-[#F5C518] ${focusRing}`}
                >
                  hello@zaynraihan.com
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function BrandMark({
  size,
  focusRing: ring,
}: {
  size: number;
  focusRing: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F5C518] via-[#E5A800] to-[#B37A00] font-display font-semibold text-black ${ring}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      Z
    </span>
  );
}

function AnimatedAvatar({
  size,
  focusRing: ring,
  monochrome = false,
}: {
  size: MotionValue<number>;
  focusRing: string;
  monochrome?: boolean;
}) {
  const fontSize = useTransform(size, (value) => value * 0.4);
  return (
    <motion.div
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full p-px ${
        monochrome
          ? "border border-white/[0.12] bg-white/[0.08]"
          : "bg-gradient-to-br from-[#F5C518] via-[#E5A800] to-[#B37A00]"
      }`}
    >
      <Link
        href="/"
        aria-label="Zayn Raihan home"
        className={`flex h-full w-full items-center justify-center rounded-full font-display font-semibold ${
          monochrome ? "text-white/80" : "text-black"
        } ${ring}`}
      >
        <motion.span style={{ fontSize }}>Z</motion.span>
      </Link>
    </motion.div>
  );
}

function NavLinks({
  progress,
  pathname,
  navGap,
  navOpacity,
  docked,
  focusRing: ring,
}: {
  progress: MotionValue<number>;
  pathname: string;
  navGap: MotionValue<number>;
  navOpacity: MotionValue<number>;
  docked: boolean;
  focusRing: string;
}) {
  return (
    <motion.nav
      aria-label="Primary"
      aria-hidden={docked}
      className="min-w-0 flex-1 items-center justify-center"
      style={{ gap: navGap, opacity: navOpacity, display: docked ? "none" : "flex" }}
    >
      {navItems.map(({ href, label, icon: Icon, labelWidth, collapseAt }) => {
        return (
          <NavLink
            key={href}
            href={href}
            label={label}
            icon={Icon}
            labelWidth={labelWidth}
            collapseAt={collapseAt}
            active={pathname === href || pathname.startsWith(`${href}/`)}
            progress={progress}
            focusRing={ring}
          />
        );
      })}
    </motion.nav>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  labelWidth,
  collapseAt,
  active,
  progress,
  focusRing: ring,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  labelWidth: number;
  collapseAt: number;
  active: boolean;
  progress: MotionValue<number>;
  focusRing: string;
}) {
  const width = useTransform(
    progress,
    [0, collapseAt, collapseAt + 0.05, 1],
    [labelWidth, labelWidth, 0, 0],
  );
  const opacity = useTransform(
    progress,
    [0, collapseAt, collapseAt + 0.05, 1],
    [1, 1, 0, 0],
  );
  const iconLabelGap = useTransform(
    progress,
    [0, 0.6, 1],
    [10, 0, 0],
  );
  const labelY = useTransform(
    progress,
    [collapseAt, collapseAt + 0.05],
    [0, 6],
  );
  const iconRotate = useTransform(
    progress,
    [collapseAt, collapseAt + 0.05],
    [-8, 0],
  );

  return (
    <motion.div className="shrink-0">
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        tabIndex={progress.get() >= 0.88 ? -1 : 0}
        className={`group relative inline-flex items-center whitespace-nowrap rounded-sm font-mono uppercase tracking-[0.18em] transition-colors duration-200 ${ring}`}
      >
        <motion.span style={{ gap: iconLabelGap }} className="inline-flex items-center">
          <motion.span style={{ rotate: iconRotate }} className="inline-flex shrink-0">
            <Icon
              size={14}
              strokeWidth={1.75}
              className={`shrink-0 transition-colors duration-200 ${
                active ? "text-[#F5C518]" : "text-white/60 group-hover:text-white"
              }`}
            />
          </motion.span>
          <motion.span
            aria-hidden="true"
            style={{ width, opacity, y: labelY }}
            className={`relative inline-block overflow-visible whitespace-nowrap text-[12px] ${
              active ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            {label}
            {active && (
              <motion.span
                layoutId="nav-underline"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#F5C518]"
              />
            )}
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  );
}

function StatusChip({
  labelOpacity,
  focusRing: ring,
  reducedMotion,
}: {
  labelOpacity: MotionValue<number>;
  focusRing: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={reducedMotion
        ? { duration: 0.15, ease: "linear" }
        : { duration: 0.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full"
    >
      <Link
        href="/contact"
        aria-label="Contact — available for work"
        className={`flex h-full w-full items-center gap-3 whitespace-nowrap ${ring}`}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] font-display text-[10px] font-semibold text-white/85">
          Z
        </span>
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5C518] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F5C518]" />
        </span>
        <motion.span
          style={{ opacity: labelOpacity }}
          className="overflow-hidden font-mono text-[9px] uppercase tracking-[0.14em] text-white/80"
        >
          Available for work
        </motion.span>
      </Link>
    </motion.div>
  );
}

function CTAButton({
  state,
  width,
  height,
  focusRing: ring,
  reducedMotion,
}: {
  state: CTAState;
  width: MotionValue<number>;
  height: MotionValue<number>;
  focusRing: string;
  reducedMotion: boolean;
}) {
  const transition = reducedMotion
    ? { duration: 0.15, ease: "linear" as const }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      style={{ width, height }}
      className="relative flex shrink-0 items-center justify-center"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={transition}
          className="absolute inset-0"
        >
          <Link
            href="/contact"
            aria-label={state === "minimal" ? "Available for work" : "Start a project"}
            className={`flex h-full w-full items-center justify-center rounded-full ${ring} ${
              state === "minimal"
                ? "hover:bg-white/[0.06]"
                : "bg-[#F5C518] text-black transition-colors hover:bg-[#F5C518]/90"
            }`}
          >
            {state === "full" ? (
              <span className="inline-flex items-center gap-2 whitespace-nowrap px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-black">
                <Mail size={14} className="shrink-0" />
                Start a Project
              </span>
            ) : state === "reduced" ? (
              <ArrowUpRight size={16} aria-hidden="true" />
            ) : (
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5C518] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F5C518]" />
              </span>
            )}
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

type MenuButtonProps = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onClick: () => void;
  focusRing: string;
  panelId: string;
  size?: number;
};

function MenuButton({
  buttonRef,
  isOpen,
  onClick,
  focusRing: ring,
  panelId,
  size = 40,
}: MenuButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={onClick}
      className={`flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/75 transition-colors hover:bg-white/10 ${ring}`}
      style={{ width: size, height: size }}
    >
      {isOpen ? <X size={16} /> : <Menu size={16} />}
    </button>
  );
}
