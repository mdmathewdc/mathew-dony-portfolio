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

const categories = [
  "React",
  "Career",
  "General",
  "CSS",
  "Java",
  "Node.js",
  "AI",
];

export default function BlogPage() {
  return (
    <main className="flex min-h-80vh flex-col items-center justify-center bg-[#0a0a0a] px-5 py-12 text-white sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
          className="flex justify-start pb-4"
        >
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
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 order-1">
            <div className="grid grid-cols-1 gap-6">
              {articles.map((article, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Link href={`/blog/${article.slug}`}>
                      <h2
                        className="text-lg font-medium text-white hover:underline transition cursor-pointer"
                        style={{ fontFamily: "var(--font-satoshi-regular)" }}
                      >
                        {article.title}
                      </h2>
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span>{formatDate(article.publishedDate)}</span>
                      <span>•</span>
                      <span>6969 views</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 flex-1">
                    {article.caption}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs text-zinc-400 hover:text-white hover:underline transition w-fit inline-flex items-center gap-1 group"
                    style={{ fontFamily: "var(--font-satoshi-regular)" }}
                  >
                    Read more
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
