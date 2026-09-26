import { noul, TypeSafeClient } from "@typesafe-ai/sdk";
import { jevCatalogState, jevMovies, type JevMovie } from "@/lib/jev/movies";

const TOP_K = 5;
const EXISTS_THRESHOLD = 0.35;
const MATCH_THRESHOLD = 0.7;

export type JevSearchResponse = {
  movies: JevMovie[];
  exists: number;
};

export async function searchJevMovies(query: string, signal?: AbortSignal): Promise<JevSearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) return { movies: [], exists: 0 };

  const client = new TypeSafeClient({
    apiKey: process.env.TYPESAFE_API_KEY,
    defaultModel: process.env.TYPESAFE_DEFAULT_MODEL ?? "jev-latest",
    timeout: 30_000,
  });

  const questions = Object.fromEntries([
    ...jevMovies.map((movie) => [
      movie.id,
      noul(`Does "${movie.title}" (${movie.year}) directly satisfy this viewing request: "${trimmed}"?`, {
        true: "This specific movie satisfies the actor, genre, plot, and year constraints",
        false: "This movie is only loosely associated or misses a stated constraint",
      }),
    ] as const),
    [
      "exists",
      noul(`Does any movie in the catalog reasonably match this viewing request: "${trimmed}"?`, {
        true: "At least one listed movie fits the genre, tone, and any year constraints",
        false: "No listed movie addresses this request",
      }),
    ] as const,
  ]);

  const response = await client.systemOne({ state: jevCatalogState, questions }, { signal });

  const { answers } = response;
  const exists = answers.exists?.noul ?? 0;
  if (exists < EXISTS_THRESHOLD) return { movies: [], exists };

  const movies = jevMovies
    .flatMap((movie) => {
      const match = answers[movie.id]?.noul ?? 0;
      return match >= MATCH_THRESHOLD ? [{ movie, match }] : [];
    })
    .sort((first, second) => second.match - first.match)
    .slice(0, TOP_K)
    .map(({ movie }) => movie);

  return { movies, exists };
}
