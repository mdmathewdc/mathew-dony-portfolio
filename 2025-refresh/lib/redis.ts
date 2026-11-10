import { Redis } from "@upstash/redis";
import { unstable_cache } from "next/cache";

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Upstash Redis client if credentials are present
export const redis = url && token ? new Redis({ url, token }) : null;

// Helper function to get like count for a post
export async function getLikesFromRedis(slug: string): Promise<number> {
  if (!redis) {
    return 0;
  }

  // Wrap the Redis call with unstable_cache for better performance
  const getCachedLikes = unstable_cache(
    async (postSlug: string) => {
      try {
        const likes = await redis.get<number>(`post:likes:${postSlug}`);
        return likes ?? 0;
      } catch (error) {
        console.error(`Error fetching likes for ${postSlug}:`, error);
        return 0;
      }
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
  if (!redis) {
    return 0;
  }
  try {
    const newLikes = await redis.incrby(`post:likes:${slug}`, count);
    return newLikes;
  } catch (error) {
    console.error(`Error incrementing likes for ${slug}:`, error);
    return 0;
  }
}

