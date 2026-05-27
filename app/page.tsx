import { Hero } from "@/components/Hero";
import { DishExplorer } from "@/components/DishExplorer";
import { getAllDishes } from "@/lib/dishes";

export default function HomePage() {
  const dishes = getAllDishes();

  return (
    <>
      <Hero />

      <section id="dishes" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-stone-800">
            Explore Turkish Dishes
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-stone-600">
            Browse iconic mains, street food, and desserts. Tap any dish to
            learn its story and where to find the best.
          </p>
        </div>

        <DishExplorer dishes={dishes} />
      </section>
    </>
  );
}
