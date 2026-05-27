export const siteConfig = {
  name: "Enjoy Turkish Cuisine",
  shortName: "Turkish Cuisine",
  description:
    "A traveler's guide to the foods and desserts of Türkiye: what they are, how they're eaten, and where to find the best.",
  // Override via NEXT_PUBLIC_SITE_URL (e.g. when a custom domain is added).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://enjoy-turkish-cuisine.vercel.app",
} as const;
