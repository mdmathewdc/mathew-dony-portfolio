"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { articles } from "../data/articles";

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function BlogPage() {
  return (
    <main className="flex min-h-80vh flex-col items-center justify-center bg-[#0a0a0a] px-5 py-12 text-white sm:px-10">
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
        <div className="grid grid-cols-1 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <h2
                  className="text-lg font-medium text-white"
                  style={{ fontFamily: "var(--font-satoshi-regular)" }}
                >
                  {article.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span>{formatDate(article.publishedDate)}</span>
                  <span>•</span>
                  <span>{article.views.toLocaleString()} views</span>
                </div>
              </div>
              <p className="text-sm text-zinc-400 flex-1">{article.caption}</p>
              <Link
                href="#"
                className="text-xs text-zinc-400 hover:text-white hover:underline transition w-fit inline-flex items-center gap-1 group"
                style={{ fontFamily: "var(--font-satoshi-regular)" }}
              >
                Read more
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
