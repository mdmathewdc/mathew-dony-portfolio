export interface Article {
  title: string;
  caption: string;
  publishedDate: Date;
  slug: string;
}

export const articles: Article[] = [
  {
    title: "Rewriting my website from scratch",
    caption:
      "It was time to add a blog!",
    publishedDate: new Date("2025-11-16"),
    slug: "rewriting-my-website-from-scratch",
  },
];
