import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  captionHref?: string;
  children: React.ReactNode;
};

export function ParagraphWithPicture({
  src,
  alt,
  caption,
  captionHref,
  children,
}: Props) {
  return (
    <div className="my-8">
      <div className="md:float-right md:ml-8 md:mb-4 md:w-1/2">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className="w-full border border-black"
        />
        {caption && (
          captionHref ? (
            <a
              href={captionHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-right text-slate-dark text-xs mt-3"
            >
              {caption}
            </a>
          ) : (
            <span className="block w-full text-right text-slate-dark text-xs mt-3">
              {caption}
            </span>
          )
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
