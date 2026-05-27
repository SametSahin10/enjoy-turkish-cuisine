import Image from "next/image";

export function MediaGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden rounded-xl bg-sand-100 ring-1 ring-sand-200"
        >
          <Image
            src={src}
            alt={`${title}, photo ${i + 1}`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
