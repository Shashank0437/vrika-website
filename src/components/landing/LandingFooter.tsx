import { Icon } from "@iconify/react";
import Link from "next/link";
import { BRAND_TAGLINE } from "@/components/landing/landing-data";
import { FOOTER_PLATFORM_LINKS, FOOTER_RESOURCE_LINKS } from "@/lib/coming-soon-routes";

const FOOTER_COPYRIGHT = "© 2026 Vrika. All rights reserved.";

const FOOTER_LEGAL_LINKS = [
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/security-disclosure", label: "Security Disclosure" },
  { href: "/responsible-disclosure", label: "Responsible Disclosure" },
] as const;

const FOOTER_SOLUTION_LINKS = [
  { href: "/#use-cases", label: "Continuous penetration testing" },
  { href: "/#use-cases", label: "Attack surface management" },
  { href: "/#use-cases", label: "Cloud security posture management" },
  { href: "/#use-cases", label: "Red team automation" },
] as const;

const FOOTER_COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/#business-value", label: "Business value" },
  { href: "/#faq", label: "FAQ" },
] as const;

const FOOTER_SOCIAL_DECOR = [
  { icon: "simple-icons:x", label: "X" },
  { icon: "simple-icons:linkedin", label: "LinkedIn" },
  { icon: "simple-icons:instagram", label: "Instagram" },
  { icon: "simple-icons:youtube", label: "YouTube" },
  { icon: "simple-icons:github", label: "GitHub" },
] as const;

function FooterColumn({ heading, links }: { heading: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">{heading}</h4>
      <ul className="space-y-2.5 text-sm text-on-surface-variant">
        {links.map((link) => (
          <li key={`${heading}-${link.label}`}>
            <Link href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest px-6 pb-12 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo_with_text_with_shield.png" alt="Vrika" className="h-20 w-auto object-contain md:h-24" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-surface-variant">
              AI-powered offensive security orchestration and continuous cloud protection — governed, auditable, and built for
              security-conscious organizations.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{BRAND_TAGLINE}</p>
          </div>
          <FooterColumn heading="Platform" links={FOOTER_PLATFORM_LINKS} />
          <FooterColumn heading="Solutions" links={FOOTER_SOLUTION_LINKS} />
          <FooterColumn heading="Resources" links={FOOTER_RESOURCE_LINKS} />
          <FooterColumn heading="Company" links={FOOTER_COMPANY_LINKS} />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-outline-variant pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-wrap items-center text-xs leading-relaxed text-on-surface-variant">
            <span>{FOOTER_COPYRIGHT}</span>
            {FOOTER_LEGAL_LINKS.map((item) => (
              <span key={item.href} className="inline-flex items-center">
                <span className="mx-2 select-none text-outline-variant" aria-hidden>
                  |
                </span>
                <Link href={item.href} className="transition-colors hover:text-primary hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-5 text-on-surface-variant">
            {FOOTER_SOCIAL_DECOR.map(({ icon, label }) => (
              <span key={label} className="inline-flex opacity-60" aria-label={label} title={label}>
                <Icon icon={icon} className="size-5" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
