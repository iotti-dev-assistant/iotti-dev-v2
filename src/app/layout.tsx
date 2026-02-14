import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iotti.dev"),
  title: {
    default: "Edu Iotti",
    template: "%s · Edu Iotti",
  },
  description: "Personal site v2 for iotti.dev — blog + UI playground.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://iotti.dev",
    title: "Edu Iotti",
    description: "Personal site v2 for iotti.dev — blog + UI playground.",
  },
  twitter: {
    card: "summary",
    title: "Edu Iotti",
    description: "Personal site v2 for iotti.dev — blog + UI playground.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-zinc-50 text-zinc-900 antialiased dark:bg-black dark:text-zinc-50`}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
