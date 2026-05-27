import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { dishFrontmatterSchema, type Dish } from "./schema";

const DISHES_DIR = path.join(process.cwd(), "content", "dishes");

function readDishFile(fileName: string): Dish {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(DISHES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const parsed = dishFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/dishes/${fileName}:\n${parsed.error.toString()}`
    );
  }

  return { slug, content, ...parsed.data };
}

export function getDishSlugs(): string[] {
  return fs
    .readdirSync(DISHES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getAllDishes(): Dish[] {
  return fs
    .readdirSync(DISHES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readDishFile)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getDishBySlug(slug: string): Dish | null {
  const mdx = path.join(DISHES_DIR, `${slug}.mdx`);
  const md = path.join(DISHES_DIR, `${slug}.md`);
  if (fs.existsSync(mdx)) return readDishFile(`${slug}.mdx`);
  if (fs.existsSync(md)) return readDishFile(`${slug}.md`);
  return null;
}
