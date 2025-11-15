import { Redis } from "@upstash/redis";
import { unstable_cache } from "next/cache";

// Initialize Upstash Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Helper function to get like count for a post
export async function getLikesFromRedis(slug: string): Promise<number> {
  // Wrap the Redis call with unstable_cache for better performance
  const getCachedLikes = unstable_cache(
    async (postSlug: string) => {
      const likes = await redis.get<number>(`post:likes:${postSlug}`);
      return likes ?? 0;
    },
    [`likes-${slug}`], // Cache key
    {
      revalidate: 60, // Revalidate every 60 seconds
    }
  );
  
  return getCachedLikes(slug);
}

// Helper function to increment likes for a post
export async function incrementLikes(slug: string, count: number = 1): Promise<number> {
  const newLikes = await redis.incrby(`post:likes:${slug}`, count);
  return newLikes;
}

