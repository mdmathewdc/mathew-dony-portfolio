export interface Article {
  title: string;
  caption: string;
  views: number;
  publishedDate: Date;
  slug: string;
  category: string;
}

export const articles: Article[] = [
  {
    title: "Building Scalable React Applications",
    caption:
      "Exploring patterns and best practices for creating maintainable React applications that scale with your team.",
    views: 1247,
    publishedDate: new Date("2024-01-15"),
    slug: "building-scalable-react-applications",
    category: "React",
  },
];
