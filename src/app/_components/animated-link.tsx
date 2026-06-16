export default function AnimatedLink({
  href,
  children,
  className,
  iconAlignment = "right",
}: {
  href: string;
  children: string;
  className?: string;
  iconAlignment?: "left" | "right";
}) {
  return (
    <a
      href={href}
      target="_new"
      className={`hover:text-blue-300 transition-colors duration-200 group no-underline ${className}`}
    >
      {iconAlignment === 'left' && (
        <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block mr-1">
          &lArr;
        </span>
      )}
      {children}
      {iconAlignment === 'right' && (
        <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block ml-1">
          &rArr;
        </span>
      )}
    </a>
  );
}
