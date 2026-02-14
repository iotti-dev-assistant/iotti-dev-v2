import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Blog",
  description: "Writing and notes.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta();

  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        MDX-powered posts.
      </p>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="space-y-1">
            <Link
              href={`/blog/${post.slug}`}
              className="text-lg font-medium hover:underline"
            >
              {post.title}
            </Link>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {post.date}
            </div>
            {post.description ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Container>
  );
}
