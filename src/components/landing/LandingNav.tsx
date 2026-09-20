"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ContactUsModal } from "@/components/landing/ContactUsModal";
import { LandingHeroPrimaryCta } from "@/components/stitch/LandingAuthCta";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";
import { NAV_GROUPS } from "@/lib/nav-data";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function LandingNav() {
  const [elevated, setElevated] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenGroup(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const solid = elevated || openGroup !== null || mobileOpen;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const triggerClass = (active: boolean) =>
    `inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:text-primary"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-on-surface backdrop-blur-xl transition-colors duration-300 ${
        solid ? "border-outline-variant bg-background/95 shadow-sm" : "border-outline-variant/50 bg-background/80"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" aria-label="Vrika home" className="flex shrink-0 items-center" onClick={() => setOpenGroup(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_with_text_with_shield.png"
            alt=""
            className="theme-logo-light h-9 w-auto max-w-[94px] object-contain sm:h-14 sm:max-w-none md:h-16"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_with_white_text_shield.png"
            alt=""
            className="theme-logo-dark h-9 w-auto max-w-[94px] object-contain sm:h-14 sm:max-w-none md:h-16"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_GROUPS.map((group) => {
            const active = openGroup === group.id;
            return (
              <button
                key={group.id}
                type="button"
                aria-expanded={active}
                className={triggerClass(active)}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenGroup(group.id);
                }}
                onClick={() => setOpenGroup(active ? null : group.id)}
              >
                {group.label}
                <MaterialSymbol
                  name="expand_more"
                  className={`text-base transition-transform ${active ? "rotate-180" : ""}`}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="hidden shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim sm:inline-flex"
          >
            Book a demo
          </button>
          <LandingHeroPrimaryCta
            className="shrink-0 rounded-full border border-outline-variant px-3 py-2.5 text-xs font-bold text-primary transition-colors hover:bg-primary/5 sm:px-5 sm:text-sm"
          />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container lg:hidden"
          >
            <MaterialSymbol name={mobileOpen ? "close" : "menu"} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      {NAV_GROUPS.map((group) => {
        if (openGroup !== group.id) return null;
        return (
          <div
            key={group.id}
            className="hidden border-t border-outline-variant bg-surface-container-lowest shadow-[0_24px_48px_-32px_rgba(27,27,33,0.45)] lg:block"
            onMouseEnter={cancelClose}
          >
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
              {group.columns.map((col) => (
                <div key={col.heading}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">{col.heading}</p>
                  <ul className="mt-4 space-y-1">
                    {col.links.map((link) => (
                      <li key={`${col.heading}-${link.label}`}>
                        <a
                          href={link.href}
                          onClick={() => setOpenGroup(null)}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-container"
                        >
                          <span className="block text-sm font-semibold text-on-surface">{link.label}</span>
                          {link.desc ? (
                            <span className="mt-0.5 block text-xs leading-relaxed text-on-surface-variant">{link.desc}</span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {group.feature ? (
                <a
                  href={group.feature.href}
                  onClick={() => setOpenGroup(null)}
                  className="flex flex-col justify-between rounded-2xl border border-outline-variant bg-surface-container-low p-6 transition-colors hover:border-primary/45"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{group.feature.kicker}</p>
                    <p className="mt-3 text-lg font-bold leading-snug text-on-surface">{group.feature.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{group.feature.desc}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Explore the platform
                    <MaterialSymbol name="arrow_forward" className="text-lg" />
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        );
      })}

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-outline-variant bg-surface-container-lowest px-6 py-5 lg:hidden">
          {NAV_GROUPS.map((group) => {
            const expanded = mobileGroup === group.id;
            return (
              <div key={group.id} className="border-b border-outline-variant/70 py-1">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setMobileGroup(expanded ? null : group.id)}
                  className="flex w-full items-center justify-between py-3 text-left text-base font-bold text-on-surface"
                >
                  {group.label}
                  <MaterialSymbol
                    name="expand_more"
                    className={`text-xl text-primary transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
                {expanded ? (
                  <div className="pb-3">
                    {group.columns.map((col) => (
                      <div key={col.heading} className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">{col.heading}</p>
                        <ul className="mt-2 space-y-1">
                          {col.links.map((link) => (
                            <li key={`m-${col.heading}-${link.label}`}>
                              <a
                                href={link.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileGroup(null);
                                }}
                                className="block py-1.5 text-sm text-on-surface-variant transition-colors hover:text-primary"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setContactOpen(true);
            }}
            className="mt-5 w-full rounded-full border border-outline-variant px-5 py-3 text-sm font-bold text-on-surface transition-colors hover:border-primary/45 hover:text-primary"
          >
            Contact us
          </button>
        </div>
      ) : null}

      <ContactUsModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
