import { Hero } from "./components/Hero";
import { Articles } from "./components/Articles";
import { articles } from "./data/articles";
import { getLikes } from "@/lib/likes";

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Fetch likes for all articles on the server
  const articlesWithLikes = await Promise.all(
    articles.slice(0, 4).map(async (article) => ({
      ...article,
      likes: await getLikes(article.slug),
    }))
  );

  return (
    <main className="flex min-h-80vh flex-col items-center justify-center bg-[#0a0a0a] px-5 py-12 text-white sm:px-10 gap-14">
      <Hero />
      <Articles articlesWithLikes={articlesWithLikes} />
    </main>
  );
}
