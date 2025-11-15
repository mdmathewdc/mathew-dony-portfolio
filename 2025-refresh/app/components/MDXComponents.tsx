import React from "react";
import Link from "next/link";

// Utility function to generate slug from heading text
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// Extract text content from React children
const getTextContent = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) {
      return getTextContent(props.children);
    }
  }
  return "";
};

export const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-4xl font-medium text-white mb-6 mt-8"
      style={{ fontFamily: "var(--font-satoshi-regular)" }}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const textContent = getTextContent(children);
    const id = slugify(textContent);
    
    return (
      <h2
        id={id}
        className="text-2xl font-medium text-white mb-4 mt-10 group scroll-mt-20 relative"
        style={{ fontFamily: "var(--font-satoshi-regular)" }}
        {...props}
      >
        <a href={`#${id}`} className="no-underline inline-flex items-center">
          {children}
          <span className="ml-2 md:ml-0 md:absolute md:-left-5 md:top-1/2 md:-translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 text-xl">
            #
          </span>
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-medium text-white mb-3 mt-6"
      style={{ fontFamily: "var(--font-satoshi-regular)" }}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-xl font-medium text-white mb-3 mt-4"
      style={{ fontFamily: "var(--font-satoshi-regular)" }}
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-md text-zinc-300 mb-4 leading-relaxed"
      style={{ fontFamily: "var(--font-satoshi-light)" }}
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    const Component = isExternal ? "a" : Link;
    
    return (
      <Component
        href={href || "#"}
        className="text-green-500 hover:text-green-400 underline transition-colors"
        style={{ fontFamily: "var(--font-satoshi-regular)" }}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </Component>
    );
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="text-zinc-300 leading-relaxed"
      style={{ fontFamily: "var(--font-satoshi-light)" }}
      {...props}
    >
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-green-500 pl-4 py-2 my-4 text-zinc-400 italic bg-zinc-900/50 rounded-r"
      style={{ fontFamily: "var(--font-instrument-serif)" }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className;
    
    if (isInline) {
      return (
        <code
          className="bg-zinc-900 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-zinc-800 my-8" {...props} />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-zinc-800" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2 text-left text-sm font-medium text-white bg-zinc-900"
      style={{ fontFamily: "var(--font-satoshi-regular)" }}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2 text-sm text-zinc-300"
      style={{ fontFamily: "var(--font-satoshi-light)" }}
      {...props}
    >
      {children}
    </td>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className="font-medium text-white"
      style={{ fontFamily: "var(--font-satoshi-regular)" }}
      {...props}
    >
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em
      className="italic text-zinc-300"
      style={{ fontFamily: "var(--font-instrument-serif)" }}
      {...props}
    >
      {children}
    </em>
  ),
};

