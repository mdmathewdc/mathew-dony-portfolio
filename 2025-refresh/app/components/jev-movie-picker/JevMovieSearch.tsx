"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RotateCcw, Search, Sparkles } from "lucide-react";

type Movie = {
  id: string;
  title: string;
  year: number;
  poster: string;
  tags: string[];
};

const INITIAL_QUERY = "mind bending sci-fi movies";

const movies: Movie[] = [
  { id: "inception", title: "Inception", year: 2010, poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", tags: ["mind-bending", "sci-fi", "dreams", "thriller"] },
  { id: "interstellar", title: "Interstellar", year: 2014, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", tags: ["mind-bending", "sci-fi", "space", "time"] },
  { id: "matrix", title: "The Matrix", year: 1999, poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", tags: ["mind-bending", "sci-fi", "simulation", "action"] },
  { id: "arrival", title: "Arrival", year: 2016, poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", tags: ["mind-bending", "sci-fi", "aliens", "time"] },
  { id: "eternal-sunshine", title: "Eternal Sunshine of the Spotless Mind", year: 2004, poster: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg", tags: ["mind-bending", "romance", "memory", "sci-fi"] },
  { id: "primer", title: "Primer", year: 2004, poster: "https://image.tmdb.org/t/p/w500/7RZ5yM20wLQmBaF08ZK7i3H3eqA.jpg", tags: ["mind-bending", "sci-fi", "time", "indie"] },
  { id: "moon", title: "Moon", year: 2009, poster: "https://image.tmdb.org/t/p/w500/3k8Cfz2p9c6F2WB3G5w4sw3h6F5.jpg", tags: ["sci-fi", "space", "isolation", "thriller"] },
  { id: "blade-runner", title: "Blade Runner 2049", year: 2017, poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", tags: ["sci-fi", "future", "neo-noir", "thriller"] },
  { id: "ex-machina", title: "Ex Machina", year: 2014, poster: "https://image.tmdb.org/t/p/w500/b7yj9ogdTB0QjhalKRR0yFsB5hK.jpg", tags: ["sci-fi", "ai", "thriller", "mind-bending"] },
  { id: "coherence", title: "Coherence", year: 2013, poster: "https://image.tmdb.org/t/p/w500/vqN3S01vVRdUAb8S5O9h5cUJZtM.jpg", tags: ["mind-bending", "sci-fi", "parallel-worlds", "thriller"] },
  { id: "memento", title: "Memento", year: 2000, poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg", tags: ["mind-bending", "memory", "thriller", "mystery"] },
  { id: "parasite", title: "Parasite", year: 2019, poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", tags: ["drama", "thriller", "satire"] },
  { id: "whiplash", title: "Whiplash", year: 2014, poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", tags: ["drama", "music", "intense"] },
  { id: "spirited-away", title: "Spirited Away", year: 2001, poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", tags: ["animation", "fantasy", "coming-of-age"] },
];

const aliases: Record<string, string[]> = {
  "mind-bending": ["mind bending", "mind-bending", "mindfuck", "trippy", "twisty"],
  "sci-fi": ["sci fi", "sci-fi", "science fiction", "space"],
  thriller: ["thriller", "tense", "suspense"],
  romance: ["romance", "romantic", "love"],
  animation: ["animation", "animated", "anime"],
};

function getResults(query: string) {
  const normalizedQuery = query.toLowerCase().trim();
  const afterYear = normalizedQuery.match(/after\s+(\d{4})/)?.[1];
  const beforeYear = normalizedQuery.match(/before\s+(\d{4})/)?.[1];
  const terms = Object.entries(aliases)
    .filter(([, phrases]) => phrases.some((phrase) => normalizedQuery.includes(phrase)))
    .map(([term]) => term);

  if (!normalizedQuery) return [];

  return movies
    .filter((movie) => (!afterYear || movie.year > Number(afterYear)) && (!beforeYear || movie.year < Number(beforeYear)))
    .map((movie) => ({
      movie,
      score: terms.reduce((score, term) => score + (movie.tags.includes(term) ? 10 : 0), 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score || second.movie.year - first.movie.year)
    .slice(0, 5)
    .map(({ movie }) => movie);
}

function MoviePoster({ movie, className = "" }: { movie: Movie; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative aspect-[2/3] overflow-hidden bg-[#262526] ${className}`}>
      {!failed ? (
        // Remote poster URLs keep the experiment self-contained without a Next image-host allowlist.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full flex-col justify-end bg-[#39373a] p-3 text-[#f5efdf]">
          <span className="text-xs uppercase tracking-[0.18em] text-[#d4d02d]">{movie.year}</span>
          <span className="mt-1 text-base leading-tight" style={{ fontFamily: "var(--font-satoshi-regular)" }}>{movie.title}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>
  );
}

export function JevMovieSearch() {
  const [input, setInput] = useState(INITIAL_QUERY);
  const [query, setQuery] = useState(INITIAL_QUERY);
  const shouldReduceMotion = useReducedMotion();
  const results = getResults(query);
  const deck = movies.filter((movie) => !results.some((result) => result.id === movie.id)).slice(0, 9);

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(input), 350);
    return () => window.clearTimeout(timeout);
  }, [input]);

  return (
    <section className="relative isolate min-h-[850px] overflow-hidden border border-[#454344] bg-[#171617] px-5 py-6 text-[#f5efdf] shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:min-h-[820px] sm:px-10 sm:py-9">
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(#77716a_0.6px,transparent_0.6px)] [background-size:9px_9px]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-6 border-b border-[#454344] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4d02d]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> JEV / Just Enough Vectors
            </p>
            <h1 className="mt-3 text-4xl leading-none sm:text-6xl" style={{ fontFamily: "var(--font-instrument-serif)" }}>A pile with opinions.</h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#b9b4aa]">Ask for a feeling. The right films rise. Add a constraint and watch relevance make a mess.</p>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex flex-1 items-center border border-[#625e58] bg-[#211f20] focus-within:border-[#d4d02d]">
            <Search className="ml-4 h-4 w-4 text-[#d4d02d]" aria-hidden="true" />
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="h-14 w-full bg-transparent px-3 text-base text-[#f5efdf] outline-none placeholder:text-[#827d75]"
              placeholder="Try: mind bending sci-fi movies after 2003"
              aria-label="Describe a movie you want to watch"
            />
          </label>
          <button type="button" onClick={() => setInput(INITIAL_QUERY)} className="flex h-14 items-center justify-center gap-2 border border-[#625e58] px-4 text-sm text-[#b9b4aa] transition hover:border-[#d4d02d] hover:text-[#f5efdf]" title="Reset movie query">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
          </button>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Suggested searches">
          {[INITIAL_QUERY, "mind bending sci-fi movies after 2003", "romantic movies", "animated movies before 2003"].map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setInput(suggestion)} className="border border-[#454344] px-3 py-1.5 text-xs text-[#b9b4aa] transition hover:border-[#d4d02d] hover:text-[#f5efdf]">{suggestion}</button>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#827d75]">
            <span>Top five, right now</span>
            <span>{results.length} matched</span>
          </div>
          <div className="grid min-h-[270px] grid-cols-2 gap-3 border-y border-[#454344] py-4 sm:grid-cols-5 sm:gap-4">
            <AnimatePresence initial={false} mode="popLayout">
              {results.map((movie, index) => (
                <motion.article
                  key={movie.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 260, rotate: (index - 2) * 7, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 360, rotate: index % 2 ? 16 : -16, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 230, damping: 22, delay: shouldReduceMotion ? 0 : index * 0.04 }}
                  className="relative overflow-hidden border border-[#625e58] bg-[#262526] shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                >
                  <MoviePoster movie={movie} />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-sm leading-tight text-white" style={{ fontFamily: "var(--font-satoshi-regular)" }}>{movie.title}</p>
                    <p className="mt-1 text-xs text-[#d4d02d]">{movie.year}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {!results.length && <p className="col-span-full self-center text-center text-sm text-[#b9b4aa]">Nothing climbed out of the pile. Try one of the suggested searches.</p>}
          </div>
        </div>

        <div className="relative h-56 overflow-hidden border-t border-[#454344] pt-4 sm:h-64">
          <p className="relative z-10 text-xs uppercase tracking-[0.16em] text-[#827d75]">Still in the pile</p>
          <AnimatePresence initial={false}>
            {deck.map((movie, index) => {
              const columns = 5;
              const column = index % columns;
              const row = Math.floor(index / columns);
              return (
                <motion.div
                  key={movie.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 90 }}
                  animate={{ opacity: 0.9, x: 0, y: 0, rotate: (index - 4) * 2.4 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 340, rotate: index % 2 ? 20 : -20 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  className="absolute top-9 w-24 border border-[#625e58] bg-[#262526] shadow-xl sm:w-32"
                  style={{ left: `calc(${column * 19}% + ${row * 3}px)`, zIndex: index }}
                  aria-hidden="true"
                >
                  <MoviePoster movie={movie} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <p className="text-[11px] leading-relaxed text-[#827d75]">Poster imagery via TMDb. JEV is a deterministic tagged retrieval experiment, not a production vector index.</p>
      </div>
    </section>
  );
}