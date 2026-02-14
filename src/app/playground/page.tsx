import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Playground",
  description: "UI experiments and prototypes.",
};

const experiments = [
  {
    href: "/playground/background-effect",
    title: "Background effect",
    description: "Placeholder experiment + notes.",
  },
] as const;

export default function PlaygroundPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        A gallery of UI experiments.
      </p>

      <ul className="mt-8 space-y-6">
        {experiments.map((exp) => (
          <li key={exp.href} className="space-y-1">
            <Link href={exp.href} className="text-lg font-medium hover:underline">
              {exp.title}
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {exp.description}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
