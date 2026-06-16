export default function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_new"
      className={`hover:text-blue-300 transition-colors duration-200 group ${className}`}
    >
      {children}{' '}
      <span className="group-hover:ml-1 transition-all duration-200">
        &rArr;
      </span>
    </a>
  );
}
