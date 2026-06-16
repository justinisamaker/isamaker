import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  title: string;
  src: string;
  slug?: string;
  className?: string;
  fill?: boolean;
};

const CoverImage = ({ title, src, slug, className, fill }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(
        'shadow-sm',
        {
          'w-full h-auto': !fill,
          'object-cover': fill,
        },
        className,
        {
          'hover:shadow-lg transition-shadow duration-200': slug,
        },
      )}
      {...(fill
        ? { fill: true, sizes: '100vw' }
        : { width: 1300, height: 630 })}
    />
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
