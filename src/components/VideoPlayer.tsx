interface Props {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className }: Props) {
  return (
    <video controls aria-label="Video Player" className={className}>
      <source src={src} type="video/mp4" />
      Your browser does not support this video tag.
    </video>
  );
}
