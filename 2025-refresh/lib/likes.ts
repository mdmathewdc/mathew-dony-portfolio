import { getLikesFromRedis } from "./redis";

export async function getLikes(slug: string): Promise<number> {
  try {
    const likes = await getLikesFromRedis(slug);
    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return 0;
  }
}

