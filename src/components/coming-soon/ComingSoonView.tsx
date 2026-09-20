import Link from "next/link";
import type { ComingSoonBackNav } from "@/lib/coming-soon-routes";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function ComingSoonView({ backNav }: { backNav: ComingSoonBackNav }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-background px-6 font-sans text-on-surface antialiased">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6"><ThemeToggle /></div>
      <h1 className="text-center text-[clamp(3.25rem,12vw,9rem)] font-black leading-[0.92] tracking-[-0.04em] text-primary">
        Coming soon
      </h1>
      <Link
        href={backNav.href}
        className="mt-14 text-base font-semibold text-primary underline decoration-2 underline-offset-4 hover:opacity-80"
      >
        {backNav.label}
      </Link>
    </main>
  );
}
