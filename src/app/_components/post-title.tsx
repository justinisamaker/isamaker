import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-xl md:text-4xl text-blue-950 mb-2 font-light md:w-3/4 leading-normal">
      {children}
    </h1>
  );
}
