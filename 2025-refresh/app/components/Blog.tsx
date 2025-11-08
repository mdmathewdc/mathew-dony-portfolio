import Link from "next/link";

const sampleArticles = [
  {
    title: "Building Scalable React Applications",
    caption: "Exploring patterns and best practices for creating maintainable React applications that scale with your team.",
  },
  {
    title: "The Future of Web Development",
    caption: "A deep dive into emerging technologies and trends shaping the future of web development.",
  },
  {
    title: "TypeScript Tips for Better Code",
    caption: "Practical TypeScript tips and tricks to improve type safety and developer experience.",
  },
  {
    title: "Optimizing Performance in Next.js",
    caption: "Learn how to optimize your Next.js applications for better performance and user experience.",
  },
  {
    title: "Design Systems in Practice",
    caption: "How to build and maintain design systems that work for both designers and developers.",
  },
  {
    title: "Testing Strategies for Modern Apps",
    caption: "Comprehensive guide to testing strategies that ensure quality and confidence in your codebase.",
  },
];

export const Blog = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-2 pl-10 sm:pl-8">
        <h2
          className="text-2xl font-medium text-white"
          style={{ fontFamily: "var(--font-satoshi-regular)" }}
        >
          Blog
        </h2>
        <p className="text-sm text-zinc-400">
          Thoughts, insights, and stories from my journey as a software engineer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleArticles.map((article, index) => (
          <article
            key={index}
            className="flex flex-col gap-4 pl-8"
          >
            <h3
              className="text-lg font-medium text-white"
              style={{ fontFamily: "var(--font-satoshi-regular)" }}
            >
              {article.title}
            </h3>
            <p className="text-sm text-zinc-400 flex-1">
              {article.caption}
            </p>
            <button
              className="px-6 py-3 rounded-[14px] border border-white/20 bg-white/5 text-white text-sm font-medium transition hover:border-white/40 hover:bg-white/10 w-fit"
              style={{ fontFamily: "var(--font-satoshi-regular)" }}
            >
              Read more
            </button>
          </article>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Link
          href="/blog"
          className="text-sm text-zinc-400 hover:text-white transition inline-flex items-center gap-2"
          style={{ fontFamily: "var(--font-satoshi-regular)" }}
        >
          View all articles
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

