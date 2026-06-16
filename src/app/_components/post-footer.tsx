import Link from "next/link";

type Props = {
  title: string;
  externalLink?: string;
  nextPost?: { slug: string; title: string } | null;
  previousPost?: { slug: string; title: string } | null;
};

export function PostFooter({ title, externalLink, nextPost, previousPost }: Props) {
  return (
    <footer className="max-w-2xl mx-auto">
      {externalLink && (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-8 bg-slate-dark text-white text-center p-4 hover:bg-slate-600 transition-colors"
        >
          View the live version of {title} &raquo;
        </a>
      )}
      <hr className="my-8 border-gray-200" />
      <ul className="grid grid-cols-2 list-none m-0 p-0">
        <li className="text-left">
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`} className="text-slate-dark hover:underline">
              &larr; {nextPost.title}
            </Link>
          )}
        </li>
        <li className="text-right">
          {previousPost && (
            <Link href={`/posts/${previousPost.slug}`} className="text-slate-dark hover:underline">
              {previousPost.title} &rarr;
            </Link>
          )}
        </li>
      </ul>
    </footer>
  );
}
