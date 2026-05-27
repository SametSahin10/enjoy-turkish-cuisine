export function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  return (
    <video
      className="w-full rounded-2xl bg-black ring-1 ring-sand-200"
      controls
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={`${title} video`}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
