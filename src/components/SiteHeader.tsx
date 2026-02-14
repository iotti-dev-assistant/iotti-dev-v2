import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/playground", label: "Playground" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-zinc-800/70 dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          iotti.dev
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-black dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
