export interface Article {
  title: string;
  caption: string;
  publishedDate: Date;
  slug: string;
}

export const articles: Article[] = [
  {
    title: "Orchestrating AI Agents to Create Memes",
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
