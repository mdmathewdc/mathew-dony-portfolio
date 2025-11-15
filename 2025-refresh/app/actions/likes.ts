"use server";

import { incrementLikes } from "@/lib/redis";

export async function addLike(slug: string, count: number = 1): Promise<{ success: boolean; likes: number }> {
  try {
    const newLikes = await incrementLikes(slug, count);
    return { success: true, likes: newLikes };
  } catch (error) {
    console.error("Error adding like:", error);
    return { success: false, likes: 0 };
  }
}

