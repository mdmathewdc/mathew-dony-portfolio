import { articles } from "../data/articles";
import { getLikes } from "../actions/likes";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPage() {
  // Fetch likes for all articles on the server
  const articlesWithLikes = await Promise.all(
    articles.map(async (article) => ({
      ...article,
      likes: await getLikes(article.slug),
    }))
  );

  return <BlogPageClient articlesWithLikes={articlesWithLikes} />;
}
