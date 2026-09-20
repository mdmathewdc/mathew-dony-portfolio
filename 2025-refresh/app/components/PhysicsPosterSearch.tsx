"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Bug, Search, X } from "lucide-react";

type Movie = {
  id: string;
  title: string;
  year: number;
  poster: string;
  tags: string[];
};

type Flight = {
  from: Matter.Vector;
  target: Matter.Vector;
  fromAngle: number;
  fromScale: number;
  targetScale: number;
  startedAt: number;
  delay: number;
};

type ScaleFall = {
  fromScale: number;
  startedAt: number;
};

type PhysicsWorld = {
  engine: Matter.Engine;
  bodies: Map<string, Matter.Body>;
  targets: Map<string, Matter.Vector>;
  flights: Map<string, Flight>;
  scaleFalls: Map<string, ScaleFall>;
  scales: Map<string, number>;
  animationFrame: number;
  width: number;
  height: number;
  draggedId: string | null;
};

const INITIAL_QUERY = "";
const NO_RESULTS_QUERY = "underwater musicals";
const testQueries = [
  "mind bending sci-fi movies",
  "mind bending sci-fi movies after 2003",
  "animated movies before 2003",
];

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
    .sort((first, second) => second.score - first.score)
    .slice(0, 5)
    .map(({ movie }) => movie);
}

function Poster({ movie }: { movie: Movie }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return <div className="flex h-full flex-col justify-end bg-zinc-800 p-2 text-white"><span className="text-[9px] text-zinc-400">{movie.year}</span><span className="mt-1 text-xs leading-tight">{movie.title}</span></div>;
  }

  return (
    // Plain images avoid an unnecessary Next image-host configuration for this visual experiment.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setHasFailed(true)} className="h-full w-full object-cover" draggable={false} />
  );
}

export function PhysicsPosterSearch() {
  const [input, setInput] = useState(INITIAL_QUERY);
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [showTestControls, setShowTestControls] = useState(true);
  const [stageSize, setStageSize] = useState({ width: 900, height: 505 });
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRefs = useRef(new Map<string, HTMLElement>());
  const physicsRef = useRef<PhysicsWorld | null>(null);
  const initialLiftRef = useRef(false);
  const results = searchMovies(query);
  const resultKey = results.map((movie) => movie.id).join(",");
  const isCompact = stageSize.width < 600;
  const posterWidth = isCompact ? 38 : 58;
  const posterHeight = posterWidth * 1.5;
  const showNoResults = input.trim().length > 0 && input === query && results.length === 0;

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(input), 300);
    return () => window.clearTimeout(timeout);
  }, [input]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setStageSize((current) => current.width === width && current.height === height ? current : { width, height });
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || stageSize.width < 1) return;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.05, scale: 0.001 } });
    const bodies = new Map<string, Matter.Body>();
    const floor = Matter.Bodies.rectangle(stageSize.width / 2, stageSize.height + 34, stageSize.width + 160, 68, { isStatic: true, friction: 0.9 });
    const leftWall = Matter.Bodies.rectangle(-34, stageSize.height / 2, 68, stageSize.height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(stageSize.width + 34, stageSize.height / 2, 68, stageSize.height * 2, { isStatic: true });

    movies.forEach((movie, index) => {
      const body = Matter.Bodies.rectangle(
        stageSize.width * (0.2 + ((index * 0.17) % 0.6)),
        posterHeight * 0.8 + (index % 4) * 12,
        posterWidth,
        posterHeight,
        {
          restitution: 0.08,
          friction: 0.85,
          frictionAir: 0.012,
          density: 0.0018,
          chamfer: { radius: 2 },
        }
      );
      Matter.Body.setAngle(body, ((index * 37) % 32 - 16) * (Math.PI / 180));
      bodies.set(movie.id, body);
    });

    Matter.Composite.add(engine.world, [floor, leftWall, rightWall, ...bodies.values()]);
    const physics: PhysicsWorld = { engine, bodies, targets: new Map(), flights: new Map(), scaleFalls: new Map(), scales: new Map(), animationFrame: 0, width: stageSize.width, height: stageSize.height, draggedId: null };
    physicsRef.current = physics;
    initialLiftRef.current = false;

    const syncPosters = () => {
      bodies.forEach((body, movieId) => {
        const poster = posterRefs.current.get(movieId);
        if (!poster) return;
        const scales = physics.scales ?? (physics.scales = new Map());
        const scale = scales.get(movieId) ?? 1;
        poster.style.transform = `translate3d(${body.position.x - posterWidth / 2}px, ${body.position.y - posterHeight / 2}px, 0) rotate(${body.angle}rad) scale(${scale})`;
        poster.style.zIndex = physics.targets.has(movieId) ? "30" : "10";
      });
    };

    const tick = () => {
      const now = window.performance.now();
      const flights = physics.flights ?? (physics.flights = new Map());
      const scaleFalls = physics.scaleFalls ?? (physics.scaleFalls = new Map());
      const scales = physics.scales ?? (physics.scales = new Map());
      flights.forEach((flight, movieId) => {
        const body = bodies.get(movieId);
        if (!body) {
          flights.delete(movieId);
          return;
        }

        const progress = Math.min(1, Math.max(0, (now - flight.startedAt - flight.delay) / 460));
        if (progress === 0) return;
        const eased = 1 - Math.pow(1 - progress, 3);
        Matter.Body.setPosition(body, {
          x: flight.from.x + (flight.target.x - flight.from.x) * eased,
          y: flight.from.y + (flight.target.y - flight.from.y) * eased,
        });
        Matter.Body.setAngle(body, flight.fromAngle * (1 - eased));
        scales.set(movieId, flight.fromScale + (flight.targetScale - flight.fromScale) * eased);

        if (progress === 1) {
          Matter.Body.setPosition(body, flight.target);
          Matter.Body.setAngle(body, 0);
          scales.set(movieId, flight.targetScale);
          flights.delete(movieId);
        }
      });

      scaleFalls.forEach((fall, movieId) => {
        const progress = Math.min(1, (now - fall.startedAt) / 520);
        const eased = 1 - Math.pow(1 - progress, 3);
        scales.set(movieId, fall.fromScale + (1 - fall.fromScale) * eased);
        if (progress === 1) scaleFalls.delete(movieId);
      });

      Matter.Engine.update(engine, 1000 / 60);
      syncPosters();
      physics.animationFrame = window.requestAnimationFrame(tick);
    };

    syncPosters();
    physics.animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(physics.animationFrame);
      Matter.Composite.clear(engine.world, false, true);
      Matter.Engine.clear(engine);
      if (physicsRef.current === physics) physicsRef.current = null;
    };
  }, [posterHeight, posterWidth, stageSize]);

  useEffect(() => {
    const physics = physicsRef.current;
    if (!physics) return;

    const liftResults = () => {
      const activeIds = new Set(results.map((movie) => movie.id));
      const gap = isCompact ? 10 : 18;
      const resultScale = 1.5;
      const resultPosterWidth = posterWidth * resultScale;
      const rowWidth = results.length * resultPosterWidth + Math.max(0, results.length - 1) * gap;
      const flights = physics.flights ?? (physics.flights = new Map());
      const scaleFalls = physics.scaleFalls ?? (physics.scaleFalls = new Map());
      const scales = physics.scales ?? (physics.scales = new Map());

      physics.bodies.forEach((body, movieId) => {
        if (!activeIds.has(movieId)) {
          const wasTargeted = physics.targets.delete(movieId);
          flights.delete(movieId);
          scaleFalls.delete(movieId);
          if (body.isStatic) Matter.Body.setStatic(body, false);
          body.collisionFilter.mask = 0xFFFFFFFF;
          body.frictionAir = 0.012;
          if (wasTargeted) {
            scaleFalls.set(movieId, {
              fromScale: scales.get(movieId) ?? 1,
              startedAt: window.performance.now(),
            });
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2.5, y: 1.6 });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
          } else {
            scales.set(movieId, 1);
          }
          return;
        }

        const resultIndex = results.findIndex((movie) => movie.id === movieId);
        const target = {
          x: physics.width / 2 - rowWidth / 2 + resultPosterWidth / 2 + resultIndex * (resultPosterWidth + gap),
          y: posterHeight * 0.75 + 4,
        };
        const previousTarget = physics.targets.get(movieId);
        physics.targets.set(movieId, target);
        if (!previousTarget || Math.hypot(previousTarget.x - target.x, previousTarget.y - target.y) > 2) {
          scaleFalls.delete(movieId);
          flights.set(movieId, {
            from: { x: body.position.x, y: body.position.y },
            target,
            fromAngle: body.angle,
            fromScale: scales.get(movieId) ?? 1,
            targetScale: resultScale,
            startedAt: window.performance.now(),
            delay: resultIndex * 55,
          });
          Matter.Body.setStatic(body, true);
          body.collisionFilter.mask = 0;
        }
      });
    };

    if (!initialLiftRef.current) {
      initialLiftRef.current = true;
      const timeout = window.setTimeout(liftResults, 550);
      return () => window.clearTimeout(timeout);
    }

    liftResults();
  }, [isCompact, posterHeight, posterWidth, resultKey, results]);

  const getPointerPosition = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const physics = physicsRef.current;
    if (!physics) return;
    const hit = Matter.Query.point([...physics.bodies.values()], getPointerPosition(event)).at(-1);
    if (!hit) return;
    const movieId = [...physics.bodies.entries()].find(([, body]) => body === hit)?.[0];
    if (!movieId || physics.targets.has(movieId)) return;
    physics.draggedId = movieId;
    if (hit.isStatic) Matter.Body.setStatic(hit, false);
    Matter.Body.setVelocity(hit, { x: 0, y: 0 });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const physics = physicsRef.current;
    if (!physics?.draggedId) return;
    const body = physics.bodies.get(physics.draggedId);
    if (!body) return;
    Matter.Body.setPosition(body, getPointerPosition(event));
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
  };

  const releasePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const physics = physicsRef.current;
    if (!physics?.draggedId) return;
    const body = physics.bodies.get(physics.draggedId);
    if (body?.isStatic) Matter.Body.setStatic(body, false);
    physics.draggedId = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8f0ea] px-4 pb-0 pt-8 text-[#173b33] sm:pt-10">
      <button
        type="button"
        onClick={() => setShowTestControls((visible) => !visible)}
        aria-pressed={showTestControls}
        className="absolute right-4 top-3 z-40 flex h-8 items-center gap-1.5 border border-[#aac5b8] bg-[#fffdf7]/80 px-2.5 text-xs text-[#49766a] transition hover:border-[#e6533c] hover:text-[#e6533c]"
        title="Toggle debug query controls"
      >
        <Bug className="h-3.5 w-3.5" aria-hidden="true" />
        Debug
      </button>
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col">
        {showTestControls && <div className="mx-auto mb-4 flex max-w-[440px] flex-wrap justify-center gap-2 sm:mb-5">
          <button
            type="button"
            onClick={() => setInput("")}
            aria-pressed={!input}
            className="border border-[#aac5b8] bg-[#fffdf7]/65 px-3 py-1.5 text-xs text-[#49766a] transition hover:border-[#e6533c] hover:text-[#e6533c] aria-pressed:border-[#e6533c] aria-pressed:bg-[#e6533c] aria-pressed:text-white"
          >
            Empty
          </button>
          <button
            type="button"
            onClick={() => setInput(NO_RESULTS_QUERY)}
            aria-pressed={input === NO_RESULTS_QUERY}
            className="border border-[#aac5b8] bg-[#fffdf7]/65 px-3 py-1.5 text-xs text-[#49766a] transition hover:border-[#e6533c] hover:text-[#e6533c] aria-pressed:border-[#e6533c] aria-pressed:bg-[#e6533c] aria-pressed:text-white"
          >
            No results
          </button>
          {testQueries.map((testQuery) => (
            <button
              key={testQuery}
              type="button"
              onClick={() => setInput(testQuery)}
              aria-pressed={input === testQuery}
              className="border border-[#aac5b8] bg-[#fffdf7]/65 px-3 py-1.5 text-xs text-[#49766a] transition hover:border-[#e6533c] hover:text-[#e6533c] aria-pressed:border-[#e6533c] aria-pressed:bg-[#e6533c] aria-pressed:text-white"
            >
              {testQuery}
            </button>
          ))}
        </div>}
        <div className="relative mx-auto w-full max-w-[590px]">
          <label className="flex h-11 items-center rounded-[16px] border border-[#aac5b8] bg-[#fffdf7] px-4 shadow-[0_12px_28px_rgba(34,73,61,0.12)] transition focus-within:border-[#e6533c] focus-within:shadow-[0_14px_32px_rgba(230,83,60,0.16)] sm:h-12 sm:px-5">
            <Search className="mr-3 h-3.5 w-3.5 shrink-0 text-[#e6533c] sm:mr-4 sm:h-4 sm:w-4" strokeWidth={1.8} aria-hidden="true" />
            <input value={input} onChange={(event) => setInput(event.target.value)} className="h-full min-w-0 flex-1 bg-transparent py-0 text-base leading-none text-[#173b33] outline-none placeholder:text-[#78958b] sm:text-lg md:text-xl" placeholder="What do you feel like watching?" aria-label="Search for movies" />
            {input && <button type="button" onClick={() => setInput("")} className="ml-2 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e8f0ea] text-[#49766a] transition hover:bg-[#e6533c] hover:text-white sm:h-7 sm:w-7" aria-label="Clear movie search"><X className="h-3 w-3" strokeWidth={2} /></button>}
          </label>
        </div>

        <div ref={stageRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={releasePointer} onPointerCancel={releasePointer} className="relative mx-auto mt-5 min-h-[240px] w-full flex-1 touch-none select-none overflow-hidden sm:mt-2">
          <p className="sr-only" aria-live="polite">{results.length} movies found</p>
          {movies.map((movie) => (
            <article key={movie.id} ref={(node) => { if (node) posterRefs.current.set(movie.id, node); else posterRefs.current.delete(movie.id); }} className="absolute left-0 top-0 aspect-[2/3] overflow-hidden rounded-[3px] bg-zinc-300 shadow-[0_3px_5px_rgba(20,59,49,0.28)] will-change-transform" style={{ width: posterWidth }}>
              <Poster movie={movie} />
            </article>
          ))}
          {showNoResults && <p className="pointer-events-none absolute inset-x-0 top-10 z-30 text-center text-sm text-[#49766a]" aria-live="polite">The pile came up empty.</p>}
        </div>
      </div>
    </section>
  );
}