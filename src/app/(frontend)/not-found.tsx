import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="font-mono text-sm font-bold tracking-widest text-brand-primary uppercase">
          404
        </p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-text-primary">Page not found</h1>
        <p className="mt-3 text-text-secondary">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-lg bg-brand-primary px-6 py-3 font-heading text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
