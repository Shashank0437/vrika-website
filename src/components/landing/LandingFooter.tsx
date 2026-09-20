import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PLATFORM_MODULES } from "@/components/landing/landing-data";
import styles from "./LandingFooter.module.css";

const EXPLORE_LINKS = [
  { href: "/about", label: "About VRIKA" },
  { href: "/docs", label: "Documentation" },
  { href: "/#business-value", label: "Why VRIKA" },
  { href: "/#faq", label: "Common questions" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-use", label: "Terms" },
  { href: "/security-disclosure", label: "Security" },
  { href: "/responsible-disclosure", label: "Responsible disclosure" },
] as const;

export function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="VRIKA home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo_with_text_with_shield.png" className="theme-logo-light" alt="" width={166} height={64} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo_with_white_text_shield.png" className="theme-logo-dark" alt="" width={166} height={64} />
            </Link>
            <p className={styles.tagline}>From discovery to defense.</p>
            <p className={styles.description}>Understand your risks. Focus your team.<br />Protect what matters.</p>
            <a href="#platform" className={styles.explore}>Explore VRIKA <ArrowUpRight size={16} aria-hidden /></a>
          </div>
          <nav className={styles.column} aria-label="Footer platform">
            <h2>Platform</h2>
            <ul>
              {PLATFORM_MODULES.map(({ id, title }) => (
                <li key={id}><a href={`/#${id}`}>{title}</a></li>
              ))}
            </ul>
          </nav>
          <nav className={styles.column} aria-label="Footer explore">
            <h2>Explore</h2>
            <ul>
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} VRIKA. All rights reserved.</p>
          <nav aria-label="Legal"><ul>{LEGAL_LINKS.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>
        </div>
      </div>
    </footer>
  );
}
