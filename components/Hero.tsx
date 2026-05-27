import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-paprika-600 via-paprika-500 to-turquoise-600">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-white sm:py-28">
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
          Taste Your Way Through Türkiye
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
          From sizzling İskender to syrup-soaked Künefe, discover the iconic
          dishes and desserts of Turkish cuisine, learn what makes each one
          special, and find the best places to try them.
        </p>
        <Link
          href="#dishes"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-paprika-600 shadow-lg transition hover:bg-sand-50"
        >
          Explore the Dishes
        </Link>
      </div>
    </section>
  );
}
