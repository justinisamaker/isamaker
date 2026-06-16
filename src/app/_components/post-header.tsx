import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type Props = {
  title: string;
  date: string;
};

export function PostHeader({ title, date }: Props) {
  return (
    <>
      <div className="border-b border-slate-900 mt-10 md:mt-0 mb-8 md:mb-10">
        <PostTitle>{title}</PostTitle>
        <div className="mb-6 text-sm text-blue-800">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
