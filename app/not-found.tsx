import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <span className="text-7xl font-bold text-brand">404</span>

        <h1 className="text-3xl font-bold text-ink mt-5">Page not found</h1>

        <p className="text-sm text-faint leading-relaxed mt-3 mb-7">
          {"The page you're looking for doesn't exist or may have been moved."}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
