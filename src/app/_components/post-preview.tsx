import Link from 'next/link';
import CoverImage from './cover-image';

type Props = {
  title: string;
  coverImage: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, excerpt, slug }: Props) {
  return (
    <Link href={`/posts/${slug}`} className="group block">
      <article className="flex h-[20rem] flex-col overflow-hidden border border-slate-900 bg-white shadow-sm transition-all duration-200 ease-in-out">
        <div className="px-6 py-4 bg-white border-b border-slate-900">
          <h3 className="text-base font-semibold text-slate-900 leading-tight">
            {title}
          </h3>
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden">
          <CoverImage
            slug={slug}
            title={title}
            src={coverImage}
            fill
            className="object-cover"
          />

          <div className="project-overlay absolute inset-0 bg-slate-800/90 transition-all duration-200 ease-in-out top-full group-hover:top-0" />

          <div className="project-info absolute inset-x-0 top-full p-6 text-white transition-all duration-200 ease-in-out group-hover:top-0 z-20">
            <p className="text-sm leading-relaxed mb-4">{excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold view-post hover:text-blue-300 transition-colors duration-150">
              View post
              <span className="view-post-arrow transition-all duration-200 -ml-1">&rArr;</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
