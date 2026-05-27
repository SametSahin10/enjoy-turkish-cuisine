import type { Dish } from "./schema";
import { siteConfig } from "./site";

// schema.org structured data for a dish page. We model the dish as an Article
// (it's editorial content, not a cookable recipe) and attach each "where to eat"
// place as a Restaurant for richer local results.
export function dishJsonLd(dish: Dish) {
  const url = `${siteConfig.url}/dishes/${dish.slug}`;
  const image = `${siteConfig.url}${dish.heroImage}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": url,
        headline: dish.title,
        description: dish.shortDescription,
        image,
        articleSection: dish.category,
        about: { "@type": "Thing", name: dish.title },
        isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
      },
      ...dish.places.map((place) => ({
        "@type": "Restaurant",
        name: place.name,
        servesCuisine: "Turkish",
        address: { "@type": "PostalAddress", addressLocality: place.city },
        ...(place.url ? { url: place.url } : {}),
        ...(place.note ? { description: place.note } : {}),
      })),
    ],
  };
}
