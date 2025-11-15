"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface BlogPostLayoutProps {
  title: string;
  date: string;
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
  children,
}: BlogPostLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#0a0a0a] px-5 py-12 text-white sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <h1
            className="text-3xl"
            style={{ fontFamily: "var(--font-satoshi-regular)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-zinc-400">
            by{" "}
            <Link
              href="/"
              className="hover:text-white hover:underline transition"
            >
              Mathew Dony
            </Link>
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span>6969 views</span>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="prose prose-invert prose-zinc max-w-none"
        >
          {children}
        </motion.article>
      </div>
    </main>
  );
};
