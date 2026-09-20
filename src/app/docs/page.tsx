import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const metadata: Metadata = {
  title: "Docs | Vrika",
};

export default function DocsPlaceholderPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 font-sans">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6"><ThemeToggle /></div>
      <h1 className="text-2xl font-bold text-on-surface">Documentation</h1>
      <p className="max-w-md text-center text-on-surface-variant">Docs content will link from here once ported.</p>
      <Link href="/" className="font-bold text-primary hover:underline">
        ← Back home
      </Link>
    </main>
  );
}
