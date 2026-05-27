import type { MetadataRoute } from "next";
import { getDishSlugs } from "@/lib/dishes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const dishes = getDishSlugs().map((slug) => ({
    url: `${siteConfig.url}/dishes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dishes,
  ];
}
