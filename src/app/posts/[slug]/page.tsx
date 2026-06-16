import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/api";
import { renderMDX } from "@/lib/mdx";
import Container from "@/app/_components/container";
import { PostHeader } from "@/app/_components/post-header";
import { PostFooter } from "@/app/_components/post-footer";
import { SITE_NAME } from "@/lib/constants";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await renderMDX(post.content || "");
  const { nextPost, previousPost } = getAdjacentPosts(params.slug);

  return (
    <main>
      <Container>
        <article className="mb-32 prose mx-auto">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
          />
          <div className="max-w-2xl mx-auto text-lg leading-relaxed">
            {content}
          </div>
          <PostFooter
            title={post.title}
            externalLink={post.externalLink}
            nextPost={nextPost}
            previousPost={previousPost}
          />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${SITE_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
