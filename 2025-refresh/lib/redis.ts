import { Redis } from "@upstash/redis";

// Initialize Upstash Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Helper function to get like count for a post
export async function getLikesFromRedis(slug: string): Promise<number> {
  const likes = await redis.get<number>(`post:likes:${slug}`);
  return likes ?? 0;
}

// Helper function to increment likes for a post
export async function incrementLikes(slug: string, count: number = 1): Promise<number> {
  const newLikes = await redis.incrby(`post:likes:${slug}`, count);
  return newLikes;
}

