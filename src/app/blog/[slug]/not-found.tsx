import Link from "next/link";
import { Container } from "@/components/Container";

export default function BlogNotFound() {
  return (
    <Container>
      <h1 className="text-2xl font-semibold tracking-tight">Post not found</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        That post doesn&apos;t exist.
      </p>
      <p className="mt-6">
        <Link href="/blog" className="underline">
          Back to blog
        </Link>
      </p>
    </Container>
  );
}
