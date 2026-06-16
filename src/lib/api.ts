import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const mdxPath = join(postsDirectory, `${realSlug}.mdx`);
  const mdPath = join(postsDirectory, `${realSlug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  // Posts are sorted newest first, so "next" is the newer post (index - 1)
  // and "previous" is the older post (index + 1)
  const nextPost = index > 0 ? { slug: posts[index - 1].slug, title: posts[index - 1].title } : null;
  const previousPost = index < posts.length - 1 ? { slug: posts[index + 1].slug, title: posts[index + 1].title } : null;

  return { nextPost, previousPost };
}
