"use client";

import React, { useState, useEffect, useRef } from "react";

const placeholders = [
  "What's happening with you?",
  "How are you feeling today?",
  "What's on your mind?",
  "Tell me about your day...",
  "What's the vibe right now?",
];

export function MemeGenerator() {
  const [feeling, setFeeling] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldAnimate = !isFocused && !feeling;
  const prevShouldAnimateRef = useRef(shouldAnimate);

  // Reset animation state when starting fresh
  useEffect(() => {
    if (shouldAnimate && !prevShouldAnimateRef.current) {
      setDisplayedPlaceholder("");
      setPlaceholderIndex(0);
      setIsDeleting(false);
    }
    prevShouldAnimateRef.current = shouldAnimate;
  }, [shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const currentPlaceholder = placeholders[placeholderIndex];
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 300;

    const animate = () => {
      if (!isDeleting) {
        if (displayedPlaceholder.length < currentPlaceholder.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedPlaceholder(currentPlaceholder.slice(0, displayedPlaceholder.length + 1));
          }, typeSpeed);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseBeforeDelete);
        }
      } else {
        if (displayedPlaceholder.length > 0) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1));
          }, deleteSpeed);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(false);
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          }, pauseBeforeType);
        }
      }
    };

    animate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedPlaceholder, isDeleting, placeholderIndex, shouldAnimate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim()) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);
    setImageLoaded(false);

    try {
      const response = await fetch(
        "https://orchestrator-meme-agent.vercel.app/generate-meme",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feeling: feeling.trim() }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate meme");
      }

      const data = await response.json();
      setImageUrl(data.meme_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 overflow-hidden max-w-[600px] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            id="feeling-input"
            type="text"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? "What's happening with you?" : undefined}
            className="w-full px-4 py-3 bg-white border border-zinc-700 rounded-lg text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            style={{ fontFamily: "var(--font-satoshi-light)" }}
            disabled={loading}
          />
          {shouldAnimate && (
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
              style={{ fontFamily: "var(--font-satoshi-light)" }}
            >
              {displayedPlaceholder}
              <span className="animate-pulse">|</span>
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !feeling.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-satoshi-regular)" }}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating your meme...
            </>
          ) : (
            "Generate Meme"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {(loading || (imageUrl && !imageLoaded)) && (
        <div className="mt-6 flex justify-center">
          <div className="rounded-lg overflow-hidden bg-zinc-800 w-full max-h-[500px] aspect-square">
            <div className="animate-pulse bg-zinc-700 w-full h-full">
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-12 h-12 text-zinc-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {imageUrl && (
        <div className={`mt-6 flex justify-center ${!imageLoaded ? "hidden" : ""}`}>
          <div className="rounded-lg overflow-hidden bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Generated meme"
              className="max-w-full h-auto max-h-[500px]"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
