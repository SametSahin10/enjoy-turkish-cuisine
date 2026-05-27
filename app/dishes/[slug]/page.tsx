import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDishBySlug, getDishSlugs } from "@/lib/dishes";
import { CATEGORY_LABELS } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { MediaGallery } from "@/components/MediaGallery";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WhereToEat } from "@/components/WhereToEat";
import { DishAnimation } from "@/components/animations/DishAnimation";
import { dishJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getDishSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) return {};

  const url = `${siteConfig.url}/dishes/${dish.slug}`;
  return {
    title: dish.title,
    description: dish.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: dish.title,
      description: dish.shortDescription,
      url,
      images: [{ url: dish.heroImage, alt: dish.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: dish.title,
      description: dish.shortDescription,
      images: [dish.heroImage],
    },
  };
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dishJsonLd(dish)) }}
      />

      <nav className="mb-6 text-sm text-stone-500">
        <Link href="/" className="hover:text-paprika-600">
          Home
        </Link>{" "}
        / <span className="text-stone-700">{dish.title}</span>
      </nav>

      <header>
        <span className="text-xs font-semibold uppercase tracking-wide text-turquoise-600">
          {CATEGORY_LABELS[dish.category]}
          {dish.region ? ` · ${dish.region}` : ""}
        </span>
        <h1 className="mt-1 font-display text-4xl font-bold text-stone-800">
          {dish.title}
        </h1>
        <p className="mt-3 text-lg text-stone-600">{dish.shortDescription}</p>
      </header>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-sand-100 ring-1 ring-sand-200">
        <Image
          src={dish.heroImage}
          alt={dish.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      {dish.animation && (
        <div className="mt-6">
          <DishAnimation id={dish.animation} />
        </div>
      )}

      {dish.video && (
        <div className="mt-6">
          <VideoPlayer
            src={dish.video}
            poster={dish.heroImage}
            title={dish.title}
          />
        </div>
      )}

      <div className="prose prose-stone mt-8 max-w-none prose-headings:font-display prose-a:text-paprika-600">
        <MDXRemote source={dish.content} />
      </div>

      {dish.gallery.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-stone-800">
            Gallery
          </h2>
          <div className="mt-4">
            <MediaGallery images={dish.gallery} title={dish.title} />
          </div>
        </section>
      )}

      <WhereToEat places={dish.places} />
    </article>
  );
}
