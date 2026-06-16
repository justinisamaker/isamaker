import Image from "next/image";

type Props = {
  src1: string;
  alt1: string;
  caption1?: string;
  captionHref1?: string;
  src2: string;
  alt2: string;
  caption2?: string;
  captionHref2?: string;
};

export function HalfImage({
  src1, alt1, caption1, captionHref1,
  src2, alt2, caption2, captionHref2,
}: Props) {
  const images = [
    { src: src1, alt: alt1, caption: caption1, captionHref: captionHref1 },
    { src: src2, alt: alt2, caption: caption2, captionHref: captionHref2 },
  ];

  return (
    <div className="w-full mt-5 mb-8 grid grid-cols-2 gap-8">
      {images.map((img) => (
        <div key={img.src}>
          <Image
            src={img.src}
            alt={img.alt}
            width={600}
            height={400}
            className="w-full shadow-sm mb-4"
          />
          {img.caption && (
            img.captionHref ? (
              <a
                href={img.captionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-right text-slate-dark text-xs mt-1"
              >
                {img.caption}
              </a>
            ) : (
              <span className="block w-full text-right text-slate-dark text-xs mt-1">
                {img.caption}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
}
