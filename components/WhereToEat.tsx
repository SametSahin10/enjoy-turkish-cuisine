import type { Place } from "@/lib/schema";

export function WhereToEat({ places }: { places: Place[] }) {
  if (places.length === 0) return null;

  // Surface sponsored places first (monetization-ready ordering).
  const ordered = [...places].sort(
    (a, b) => Number(b.sponsored) - Number(a.sponsored)
  );

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-stone-800">
        Where to Eat
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        Recommended spots to try this dish.
      </p>

      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ordered.map((place, i) => (
          <li
            key={`${place.name}-${i}`}
            className="rounded-xl bg-white p-5 ring-1 ring-sand-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-stone-800">{place.name}</h3>
                <p className="text-sm text-stone-500">{place.city}</p>
              </div>
              {place.sponsored && (
                <span className="shrink-0 rounded-full bg-turquoise-50 px-2.5 py-1 text-xs font-semibold text-turquoise-600 ring-1 ring-turquoise-500/30">
                  Sponsored
                </span>
              )}
            </div>
            {place.note && (
              <p className="mt-2 text-sm text-stone-600">{place.note}</p>
            )}
            {place.url && (
              <a
                href={place.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-3 inline-block text-sm font-medium text-paprika-600 hover:underline"
              >
                Visit website →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
