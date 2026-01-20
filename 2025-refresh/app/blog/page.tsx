import Link from "next/link";
import { articles } from "../data/articles";
import { getLikes } from "@/lib/likes";

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default async function BlogPage() {
  // Fetch likes for all articles on the server
  const articlesWithLikes = await Promise.all(
    articles.map(async (article) => ({
      ...article,
      likes: await getLikes(article.slug),
    }))
  );

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0a0a0a] px-5 py-12 text-white sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="flex justify-start pb-4">
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-white transition inline-flex items-center gap-1"
            style={{ fontFamily: "var(--font-satoshi-regular)" }}
          >
            <svg
              className="w-5 h-5 pt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M5 12L11 6M5 12L11 18" />
            </svg>
            Home
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 order-1">
            <div className="grid grid-cols-1 gap-6">
              {articlesWithLikes.map((article, index) => (
                <article key={index} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Link href={`/blog/${article.slug}`}>
                      <h2
                        className="text-lg font-medium text-white hover:underline transition cursor-pointer"
                        style={{ fontFamily: "var(--font-satoshi-regular)" }}
                      >
                        {article.title}
                      </h2>
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span>{formatDate(article.publishedDate)}</span>
                      <span>•</span>
                      <span>{article.likes} likes</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 flex-1">
                    {article.caption}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs text-zinc-400 hover:text-white hover:underline transition w-fit inline-flex items-center gap-1 group"
                    style={{ fontFamily: "var(--font-satoshi-regular)" }}
                  >
                    Read more
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
