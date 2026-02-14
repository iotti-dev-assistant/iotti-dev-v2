import { Container } from "@/components/Container";

export const metadata = {
  title: "Background effect",
  description: "Placeholder background-effect experiment.",
};

export default function BackgroundEffectPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">Background effect</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Placeholder implementation.
      </p>

      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-10 dark:border-zinc-800/70 dark:bg-zinc-950">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-xl font-semibold tracking-tight">
              Demo surface
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              This is a static placeholder. Replace with the real background
              effect implementation.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Notes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            Start simple: one CSS-only effect, then iterate to Canvas/WebGL if
            needed.
          </li>
          <li>
            Keep performance in mind (avoid expensive paints, respect reduced
            motion).
          </li>
          <li>
            Inspiration: ralphstarter.ai (see README for a link).
          </li>
        </ul>
      </section>
    </Container>
  );
}
