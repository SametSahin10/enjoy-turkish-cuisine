import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — A Tourist's Guide to Turkish Food`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-sand-200 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="font-display text-xl font-bold text-paprika-600"
            >
              {siteConfig.name}
            </Link>
            <div className="flex gap-6 text-sm font-medium text-stone-600">
              <Link href="/" className="hover:text-paprika-600">
                Home
              </Link>
              <Link href="/#dishes" className="hover:text-paprika-600">
                Explore Dishes
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-sand-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-stone-500">
            <p>
              {siteConfig.name} — discover the flavors of Turkey. Made for
              travelers.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
