import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function isMdxFile(fileName: string) {
  return fileName.endsWith(".mdx") || fileName.endsWith(".md");
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && isMdxFile(e.name))
    .map((e) => e.name);

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(POSTS_DIR, fileName);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        description: data.description ? String(data.description) : undefined,
      } satisfies BlogPostMeta;
    }),
  );

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostSourceBySlug(slug: string): Promise<string> {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  return await fs.readFile(fullPath, "utf8");
}
