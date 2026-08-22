"use client";

import { getAppUrl } from "@/lib/app-url";

/** Hero CTA: Redirects to Vrika app login / workspace */
export function LandingHeroPrimaryCta({ className }: { className?: string }) {
  return (
    <a href={getAppUrl("/login")} className={className}>
      Login
    </a>
  );
}

type AuthLinkProps = {
  href: string;
  signedInHref?: string;
  className?: string;
  children: React.ReactNode;
};

export function LandingAuthLink({ href, className, children }: AuthLinkProps) {
  const target = href.startsWith("http") ? href : getAppUrl(href);
  return (
    <a href={target} className={className}>
      {children}
    </a>
  );
}
