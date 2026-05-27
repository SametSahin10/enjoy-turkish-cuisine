import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/lib/schema";
import { CATEGORY_LABELS } from "@/lib/schema";

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/dishes/${dish.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        <Image
          src={dish.heroImage}
          alt={dish.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-turquoise-600">
          {CATEGORY_LABELS[dish.category]}
        </span>
        <h3 className="mt-1 font-display text-xl font-bold text-stone-800">
          {dish.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-stone-600">
          {dish.shortDescription}
        </p>
      </div>
    </Link>
  );
}
