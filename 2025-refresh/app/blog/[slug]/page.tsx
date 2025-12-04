import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getAllBlogSlugs } from "@/lib/mdx";
import { BlogPostLayout } from "@/app/components/BlogPostLayout";
import { MDXComponents } from "@/app/components/MDXComponents";
import { getLikes } from "@/lib/likes";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImage = post.frontmatter.image || "/og.png";

  return {
    title: `${post.frontmatter.title} | Mathew Dony`,
    description: post.frontmatter.caption,
    openGraph: {
      title: `${post.frontmatter.title} | Mathew Dony`,
      description: post.frontmatter.caption,
      images: [ogImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.frontmatter.title} | Mathew Dony`,
      description: post.frontmatter.caption,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Fetch likes on the server 
  const initialLikes = await getLikes(slug);

  return (
    <BlogPostLayout
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      slug={slug}
      initialLikes={initialLikes}
    >
      <MDXRemote
        source={post.content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
    </BlogPostLayout>
  );
}

