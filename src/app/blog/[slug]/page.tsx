import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getAllPostsMeta, getPostSourceBySlug } from "@/lib/blog";
import { renderMdx } from "@/lib/mdx";

type Frontmatter = {
  title?: string;
  date?: string;
  description?: string;
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllPostsMeta();
  const meta = posts.find((p) => p.slug === slug);

  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let source: string;
  try {
    source = await getPostSourceBySlug(slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = await renderMdx<Frontmatter>(source);

  return (
    <Container>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="mb-2">{frontmatter.title ?? slug}</h1>
          {frontmatter.date ? (
            <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">
              {frontmatter.date}
            </p>
          ) : null}
        </header>
        {content}
      </article>
    </Container>
  );
}
