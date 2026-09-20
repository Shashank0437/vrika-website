import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background px-6 py-20 text-center text-on-surface">
      <p className="font-mono text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-md text-on-surface-variant">The page you’re looking for isn’t available.</p>
      <Link href="/" className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        Back home
      </Link>
    </main>
  );
}
