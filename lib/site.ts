export const siteConfig = {
  name: "Enjoy Turkish Cuisine",
  shortName: "Turkish Cuisine",
  description:
    "A traveler's guide to the foods and desserts of Turkey — what they are, how they're eaten, and where to find the best.",
  // Override in production via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://enjoy-turkish-cuisine.example",
} as const;
