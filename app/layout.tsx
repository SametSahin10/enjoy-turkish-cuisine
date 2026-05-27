import type { Metadata } from "next";
import {
  Inter,
  Poppins,
  Nunito,
  Outfit,
  Fraunces,
  Space_Grotesk,
} from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { FontSwitcher } from "@/components/FontSwitcher";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const fontVars = [
  inter.variable,
  poppins.variable,
  nunito.variable,
  outfit.variable,
  fraunces.variable,
  spaceGrotesk.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: A Tourist's Guide to Turkish Food`,
    template: `%s | ${siteConfig.name}`,
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
    <html
      lang="en"
      data-theme="bosphorus"
      data-font="poppins"
      className={fontVars}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var f=localStorage.getItem('font');if(f){document.documentElement.dataset.font=f}}catch(e){}`,
          }}
        />
      </head>
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
              {siteConfig.name}. Discover the flavors of Türkiye. Made for
              travelers.
            </p>
          </div>
        </footer>

        <FontSwitcher />
      </body>
    </html>
  );
}
