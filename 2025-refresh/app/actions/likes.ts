"use server";

import { getLikesFromRedis, incrementLikes } from "@/lib/redis";

export async function getLikes(slug: string): Promise<number> {
  try {
    const likes = await getLikesFromRedis(slug);
    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return 0;
  }
}

export async function addLike(slug: string, count: number = 1): Promise<{ success: boolean; likes: number }> {
  try {
    const newLikes = await incrementLikes(slug, count);
    return { success: true, likes: newLikes };
  } catch (error) {
    console.error("Error adding like:", error);
    return { success: false, likes: 0 };
  }
}

