import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  captionHref?: string;
  size?: "large" | "small";
};

export function BlogImage({ src, alt, caption, captionHref, size = "large" }: Props) {
  return (
    <div
      className={`w-full mt-5 mb-8 ${size === "large" ? "mt-8" : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full shadow-sm mb-4"
      />
      {caption && (
        captionHref ? (
          <a
            href={captionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-right text-slate-dark text-xs"
          >
            {caption}
          </a>
        ) : (
          <span className="block w-full text-right text-slate-dark text-xs">
            {caption}
          </span>
        )
      )}
    </div>
  );
}
