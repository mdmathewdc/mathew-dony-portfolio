import { getAllBlogPosts } from "@/lib/mdx";

export interface Article {
  title: string;
  caption: string;
  publishedDate: Date;
  slug: string;
}

export const articles: Article[] = getAllBlogPosts().map((post) => ({
  title: post.frontmatter.title,
  caption: post.frontmatter.caption,
  publishedDate: new Date(post.frontmatter.date),
  slug: post.slug,
}));
