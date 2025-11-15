export interface Article {
  title: string;
  caption: string;
  views: number;
  publishedDate: Date;
  slug: string;
}

export const articles: Article[] = [
  {
    title: "Rewriting my website from scratch",
    caption:
      "It was time to add a blog!",
    views: 1247,
    publishedDate: new Date("2025-11-15"),
    slug: "rewriting-my-website-from-scratch",
  },
];
