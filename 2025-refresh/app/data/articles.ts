export interface Article {
  title: string;
  caption: string;
  views: number;
  publishedDate: Date;
}

export const articles: Article[] = [
  {
    title: "Building Scalable React Applications",
    caption:
      "Exploring patterns and best practices for creating maintainable React applications that scale with your team.",
    views: 1247,
    publishedDate: new Date("2024-01-15"),
  },
  {
    title: "The Future of Web Development",
    caption:
      "A deep dive into emerging technologies and trends shaping the future of web development.",
    views: 2156,
    publishedDate: new Date("2024-02-20"),
  },
  {
    title: "TypeScript Tips for Better Code",
    caption:
      "Practical TypeScript tips and tricks to improve type safety and developer experience.",
    views: 892,
    publishedDate: new Date("2024-03-10"),
  },
  {
    title: "Optimizing Performance in Next.js",
    caption:
      "Learn how to optimize your Next.js applications for better performance and user experience.",
    views: 1834,
    publishedDate: new Date("2024-04-05"),
  },
];

