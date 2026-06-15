import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-2xl font-bold mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}
