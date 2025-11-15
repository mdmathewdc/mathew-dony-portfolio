'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const extractCodeContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractCodeContent).join('');
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return extractCodeContent(props.children);
      }
    }
    return '';
  };

  const handleCopy = async () => {
    const code = extractCodeContent(children);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-zinc-700"
        aria-label="Copy code"
      >
        {copied ? (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
      <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    </div>
  );
};

