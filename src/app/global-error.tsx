'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-screen items-center justify-center bg-[#ebf2ee] px-6 font-sans text-[#003319]">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold">Application error</h1>
          <p className="mt-3 text-[#4a6f60]">
            A critical error occurred. Please refresh the page or try again later.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg bg-[#006633] px-6 py-3 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
