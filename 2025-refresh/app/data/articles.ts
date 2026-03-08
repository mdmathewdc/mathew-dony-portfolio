export interface Article {
  title: string;
  caption: string;
  publishedDate: Date;
  slug: string;
}

export const articles: Article[] = [
  {
    title: "Querying My Life with a Vector Database",
    caption:
      "A hands-on experiment with pgvector, embeddings and RAG",
    publishedDate: new Date("2026-03-08"),
    slug: "querying-my-life-with-a-vector-database",
  },
  {
    title: "Is AI Quietly Killing Open Source?",
    caption:
      "How LLMs are reshaping the open source business model and what comes next",
    publishedDate: new Date("2026-01-11"),
    slug: "is-ai-quietly-killing-open-source",
  },
  {
    title: "Orchestrating AI Agents to create Memes",
    caption:
      "Building an agent orchestrator system using Langchain and MCP servers",
    publishedDate: new Date("2025-12-05"),
    slug: "orchestrating-ai-agents-to-create-memes",
  },
  {
    title: "Rewriting my website from scratch",
    caption: "It was time to add a blog!",
    publishedDate: new Date("2025-11-16"),
    slug: "rewriting-my-website-from-scratch",
  },
];
