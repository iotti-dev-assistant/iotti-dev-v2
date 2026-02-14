import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <Container>
      <h1 className="text-4xl font-semibold tracking-tight">Edu Iotti</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Personal site v2 for iotti.dev — blog + UI playground.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/blog"
          className="rounded-2xl border border-zinc-200/70 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <div className="text-lg font-medium">Blog</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            MDX posts.
          </div>
        </Link>

        <Link
          href="/playground"
          className="rounded-2xl border border-zinc-200/70 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <div className="text-lg font-medium">Playground</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            UI experiments.
          </div>
        </Link>
      </div>
    </Container>
  );
}
