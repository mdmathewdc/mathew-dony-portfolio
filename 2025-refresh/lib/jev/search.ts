import { choice, noul, TypeSafeClient, type ChoiceResponse, type NoulResponse } from "@typesafe-ai/sdk";
import { jevCatalogState, jevMovies, type JevMovie } from "@/lib/jev/movies";

const TOP_K = 5;
const EXISTS_THRESHOLD = 0.35;
const MATCH_THRESHOLD = 0.7;

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

  const matchQuestions = Object.fromEntries(
    jevMovies.map((movie) => [
      movie.id,
      noul(`Does "${movie.title}" (${movie.year}) directly satisfy this viewing request: "${trimmed}"?`, {
        true: "This specific movie satisfies the actor, genre, plot, and year constraints",
        false: "This movie is only loosely associated or misses a stated constraint",
      }),
    ]),
  );

  const response = await client.systemOne(
    {
      state: jevCatalogState,
      questions: {
        ...matchQuestions,
        where: choice(`Which movie best matches this viewing request: "${trimmed}"?`, movieCriteria),
        exists: noul(`Does any movie in the catalog reasonably match this viewing request: "${trimmed}"?`, {
          true: "At least one listed movie fits the genre, tone, and any year constraints",
          false: "No listed movie addresses this request",
        }),
      },
    },
    { signal },
  );

  const { where, exists } = response.answers;
  if (exists.noul < EXISTS_THRESHOLD) return { movies: [], exists: exists.noul };

  const answers: Record<string, ChoiceResponse | NoulResponse | undefined> = response.answers;
  const movies = jevMovies
    .flatMap((movie) => {
      const answer = answers[movie.id];
      return answer?.type === "noul" && answer.noul >= MATCH_THRESHOLD ? [{ movie, match: answer.noul }] : [];
    })
    .sort(
      (first, second) =>
        second.match - first.match || (where.probabilities[second.movie.id] ?? 0) - (where.probabilities[first.movie.id] ?? 0),
    )
    .slice(0, TOP_K)
    .map(({ movie }) => movie);

  return { movies, exists: exists.noul };
}
