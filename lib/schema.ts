import { z } from "zod";

export const CATEGORIES = ["main", "dessert", "street-food"] as const;

export const placeSchema = z.object({
  name: z.string(),
  city: z.string(),
  note: z.string().optional(),
  url: z.string().url().optional(),
  sponsored: z.boolean().default(false),
});

// Frontmatter for a dish. The flavorProfile / protein / dishType / adventurousness
// fields are optional metadata that power the future "What should I eat?" quiz.
export const dishFrontmatterSchema = z.object({
  title: z.string(),
  category: z.enum(CATEGORIES),
  shortDescription: z.string(),
  region: z.string().optional(),
  heroImage: z.string(),
  gallery: z.array(z.string()).default([]),
  video: z.string().optional(),
  // Optional signature animation id, resolved against the animation registry.
  animation: z.string().optional(),
  // Optional signature "how it's made" video (autoplay-on-view loop).
  signatureVideo: z.string().optional(),
  places: z.array(placeSchema).default([]),
  // Quiz groundwork (optional, unused by MVP UI):
  tags: z.array(z.string()).default([]),
  flavorProfile: z.enum(["sweet", "savory"]).optional(),
  protein: z.enum(["meat", "seafood", "vegetarian"]).optional(),
  dishType: z.enum(["street-food", "sit-down"]).optional(),
  adventurousness: z.number().int().min(1).max(5).optional(),
});

export type Place = z.infer<typeof placeSchema>;
export type DishFrontmatter = z.infer<typeof dishFrontmatterSchema>;

export type Dish = DishFrontmatter & {
  slug: string;
  content: string;
};

export const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
  main: "Main Dishes",
  dessert: "Desserts",
  "street-food": "Street Food",
};
