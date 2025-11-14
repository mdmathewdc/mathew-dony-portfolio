"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface BlogPostLayoutProps {
  title: string;
  date: string;
  category: string;
  views: number;
  children: React.ReactNode;
}

const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const BlogPostLayout = ({
  title,
  date,
  category,
  views,
  children,
}: BlogPostLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#0a0a0a] px-5 py-12 text-white sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex justify-start"
        >
          <Link
            href="/blog"
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
            Back to Blog
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-4 border-b border-zinc-800 pb-8"
        >
          <h1
            className="text-4xl md:text-5xl font-medium text-white"
            style={{ fontFamily: "var(--font-satoshi-regular)" }}
          >
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span
              className="px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              {category}
            </span>
            <span>•</span>
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span>{views.toLocaleString()} views</span>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="prose prose-invert prose-zinc max-w-none"
        >
          {children}
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex justify-start border-t border-zinc-800 pt-8"
        >
          <Link
            href="/blog"
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
            Back to Blog
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

