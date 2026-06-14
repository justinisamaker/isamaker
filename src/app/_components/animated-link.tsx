export default function AnimatedLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <a
      href={href}
      target="_new"
      className="hover:text-blue-300 transition-colors duration-200 group"
    >
      {children}{' '}
      <span className="group-hover:ml-1 transition-all duration-200">
        &rArr;
      </span>
    </a>
  );
}
