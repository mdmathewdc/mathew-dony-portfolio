import { choice, noul, TypeSafeClient } from "@typesafe-ai/sdk";
import { jevCatalogState, jevMovieById, jevMovies, type JevMovie } from "@/lib/jev/movies";

const TOP_K = 5;
const EXISTS_THRESHOLD = 0.35;
const MIN_RELEVANCE = 0.03;

const movieCriteria = Object.fromEntries(jevMovies.map((movie) => [movie.id, null]));

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

  const response = await client.systemOne(
    {
      state: jevCatalogState,
      questions: {
        where: choice(`Which movie best matches this viewing request: "${trimmed}"?`, movieCriteria),
        exists: noul(`Does any movie in the catalog reasonably match this viewing request: "${trimmed}"?`, {
          true: "At least one listed movie fits the genre, tone, and any year constraints",
          false: "No listed movie addresses this request",
        }),
      },
    },
    { signal },
  );

  const exists = response.answers.exists.noul;
  if (exists < EXISTS_THRESHOLD) return { movies: [], exists };

  const movies = Object.entries(response.answers.where.probabilities)
    .sort(([, first], [, second]) => second - first)
    .filter(([, score]) => score >= MIN_RELEVANCE)
    .slice(0, TOP_K)
    .flatMap(([id]) => {
      const movie = jevMovieById.get(id);
      return movie ? [movie] : [];
    });

  return { movies, exists };
}
