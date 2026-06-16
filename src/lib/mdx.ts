import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { BlogImage } from "@/app/_components/blog-image";
import { HalfImage } from "@/app/_components/half-image";
import { ParagraphWithPicture } from "@/app/_components/paragraph-with-picture";

const components = {
  BlogImage,
  HalfImage,
  ParagraphWithPicture,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    },
  });

  return content;
}
