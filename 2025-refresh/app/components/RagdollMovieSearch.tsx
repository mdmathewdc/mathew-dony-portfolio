"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";

type Movie = {
  id: string;
  title: string;
  year: number;
  poster: string;
  tags: string[];
};

type Position = { x: number; y: number; rotate: number; scale?: number };

const INITIAL_QUERY = "mind bending sci-fi movies";

const movies: Movie[] = [
  { id: "inception", title: "Inception", year: 2010, poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", tags: ["mind-bending", "sci-fi", "dreams", "thriller"] },
  { id: "interstellar", title: "Interstellar", year: 2014, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", tags: ["mind-bending", "sci-fi", "space", "time"] },
  { id: "matrix", title: "The Matrix", year: 1999, poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", tags: ["mind-bending", "sci-fi", "simulation", "action"] },
  { id: "arrival", title: "Arrival", year: 2016, poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", tags: ["mind-bending", "sci-fi", "aliens", "time"] },
  { id: "eternal-sunshine", title: "Eternal Sunshine of the Spotless Mind", year: 2004, poster: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg", tags: ["mind-bending", "romance", "memory", "sci-fi"] },
  { id: "primer", title: "Primer", year: 2004, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/xEoq2WmDzpzxhkHEsmOYOg6BPg6.jpg", tags: ["mind-bending", "sci-fi", "time", "indie"] },
  { id: "moon", title: "Moon", year: 2009, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/35IU0Mq0zFsN1mYwDGts5mKc77n.jpg", tags: ["sci-fi", "space", "isolation", "thriller"] },
  { id: "blade-runner", title: "Blade Runner 2049", year: 2017, poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", tags: ["sci-fi", "future", "neo-noir", "thriller"] },
  { id: "ex-machina", title: "Ex Machina", year: 2014, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg", tags: ["sci-fi", "ai", "thriller", "mind-bending"] },
  { id: "coherence", title: "Coherence", year: 2013, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/ezUtb9m5DeLwL2gxi4gktzNCvQv.jpg", tags: ["mind-bending", "sci-fi", "parallel-worlds", "thriller"] },
  { id: "memento", title: "Memento", year: 2000, poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg", tags: ["mind-bending", "memory", "thriller", "mystery"] },
  { id: "parasite", title: "Parasite", year: 2019, poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", tags: ["drama", "thriller", "satire"] },
  { id: "whiplash", title: "Whiplash", year: 2014, poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", tags: ["drama", "music", "intense"] },
  { id: "spirited-away", title: "Spirited Away", year: 2001, poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", tags: ["animation", "fantasy", "coming-of-age"] },
];

const pile: Position[] = [
  { x: -430, y: 210, rotate: -26 }, { x: -325, y: 160, rotate: 16 }, { x: -220, y: 237, rotate: -33 }, { x: -114, y: 179, rotate: 25 },
  { x: -12, y: 266, rotate: -15 }, { x: 88, y: 175, rotate: 31 }, { x: 193, y: 249, rotate: -24 }, { x: 300, y: 167, rotate: 17 },
  { x: 409, y: 245, rotate: -29 }, { x: -375, y: 335, rotate: 24 }, { x: -258, y: 305, rotate: -11 }, { x: -144, y: 375, rotate: 34 },
  { x: 13, y: 340, rotate: -31 }, { x: 150, y: 353, rotate: 18 },
];

const aliases: Record<string, string[]> = {
  "mind-bending": ["mind bending", "mind-bending", "mindfuck", "trippy", "twisty"],
  "sci-fi": ["sci fi", "sci-fi", "science fiction", "space"],
  thriller: ["thriller", "tense", "suspense", "crime"],
  romance: ["romance", "romantic", "love"],
  animation: ["animation", "animated", "anime"],
};

function searchMovies(query: string) {
  const normalized = query.toLowerCase().trim();
  const after = normalized.match(/after\s+(\d{4})/)?.[1];
  const before = normalized.match(/before\s+(\d{4})/)?.[1];
  const decade = normalized.match(/(?:the\s+)?(\d{2})s/)?.[1];
  const terms = Object.entries(aliases).filter(([, phrases]) => phrases.some((phrase) => normalized.includes(phrase))).map(([term]) => term);

  if (!normalized) return [];

  return movies
    .filter((movie) => (!after || movie.year > Number(after)) && (!before || movie.year < Number(before)) && (!decade || String(movie.year).startsWith(decade)))
    .map((movie) => ({ movie, score: terms.reduce((score, term) => score + (movie.tags.includes(term) ? 10 : 0), 0) }))
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score || second.movie.year - first.movie.year)
    .slice(0, 5)
    .map(({ movie }) => movie);
}

function Poster({ movie }: { movie: Movie }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return <div className="flex h-full flex-col justify-end bg-zinc-800 p-2 text-white"><span className="text-[9px] text-zinc-400">{movie.year}</span><span className="mt-1 text-xs leading-tight">{movie.title}</span></div>;
  }

  return (
    // Plain images avoid an unnecessary Next image-host configuration for this small visual experiment.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setHasFailed(true)} className="h-full w-full object-cover" draggable={false} />
  );
}

function useStageWidth() {
  const [width, setWidth] = useState(900);

  useEffect(() => {
    const update = () => setWidth(Math.min(window.innerWidth - 32, 900));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

export function RagdollMovieSearch() {
  const [input, setInput] = useState(INITIAL_QUERY);
  const [query, setQuery] = useState(INITIAL_QUERY);
  const stageWidth = useStageWidth();
  const shouldReduceMotion = useReducedMotion();
  const isCompact = stageWidth < 600;
  const posterWidth = isCompact ? 62 : 96;
  const results = searchMovies(query);

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(input), 300);
    return () => window.clearTimeout(timeout);
  }, [input]);

  const resultPosition = (index: number): Position => {
    const gap = isCompact ? 10 : 18;
    const rowWidth = results.length * posterWidth + Math.max(0, results.length - 1) * gap;
    return { x: -rowWidth / 2 + posterWidth / 2 + index * (posterWidth + gap), y: 0, rotate: 0 };
  };

  const pilePosition = (index: number): Position => {
    const position = pile[index];
    const ratio = isCompact ? 0.62 : Math.min(1, (stageWidth - 32) / 860);
    return { ...position, x: position.x * ratio, y: position.y * (isCompact ? 0.85 : 1), scale: isCompact ? 0.85 : 1 };
  };

  return (
    <section className="min-h-screen overflow-hidden bg-[#e8f0ea] px-4 pb-0 pt-16 text-[#173b33] sm:pt-20">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="relative mx-auto max-w-[760px]">
          <label className="flex h-20 items-center rounded-[27px] border border-[#aac5b8] bg-[#fffdf7] px-5 shadow-[0_12px_28px_rgba(34,73,61,0.12)] transition focus-within:border-[#e6533c] focus-within:shadow-[0_14px_32px_rgba(230,83,60,0.16)] sm:h-24 sm:px-7">
            <Search className="mr-3 h-5 w-5 shrink-0 text-[#e6533c] sm:mr-4 sm:h-6 sm:w-6" strokeWidth={1.8} aria-hidden="true" />
            <input value={input} onChange={(event) => setInput(event.target.value)} className="h-full min-w-0 flex-1 bg-transparent text-xl text-[#173b33] outline-none placeholder:text-[#78958b] sm:text-[29px]" placeholder="What do you feel like watching?" aria-label="Search for movies" />
            {input && <button type="button" onClick={() => setInput("")} className="ml-2 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f0ea] text-[#49766a] transition hover:bg-[#e6533c] hover:text-white sm:h-10 sm:w-10" aria-label="Clear movie search"><X className="h-4 w-4" strokeWidth={2} /></button>}
          </label>
        </div>

        <div className="relative mx-auto mt-5 h-[440px] max-w-[900px] sm:mt-2 sm:h-[505px]">
          <p className="sr-only" aria-live="polite">{results.length} movies found</p>
          {movies.map((movie, index) => {
            const resultIndex = results.findIndex((result) => result.id === movie.id);
            const isResult = resultIndex >= 0;
            const target = isResult ? resultPosition(resultIndex) : pilePosition(index);

            return (
              <motion.article
                key={movie.id}
                initial={false}
                animate={{ x: target.x, y: target.y, rotate: target.rotate, scale: target.scale ?? 1, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: isResult ? 240 : 125, damping: isResult ? 24 : 13, mass: isResult ? 0.7 : 1.1 }}
                className={`absolute left-1/2 top-0 aspect-[2/3] overflow-hidden rounded-[3px] bg-zinc-300 shadow-[0_3px_5px_rgba(20,59,49,0.28)] ${isResult ? "z-30" : "z-10"}`}
                style={{ width: posterWidth, marginLeft: -posterWidth / 2, transformOrigin: "50% 130%" }}
              >
                <Poster movie={movie} />
              </motion.article>
            );
          })}
          {!results.length && input && <p className="absolute inset-x-0 top-12 z-30 text-center text-sm text-[#49766a]">Nothing surfaced for that one.</p>}
        </div>
      </div>
    </section>
  );
}