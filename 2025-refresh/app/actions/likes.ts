"use server";

import { incrementLikes } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function addLike(slug: string, count: number = 1): Promise<{ success: boolean; likes: number }> {
  try {
    const newLikes = await incrementLikes(slug, count);
    
    // Revalidate the path to update cached data
    revalidatePath("/", "layout");
    revalidatePath(`/blog/${slug}`, "page");
    
    return { success: true, likes: newLikes };
  } catch (error) {
    console.error("Error adding like:", error);
    return { success: false, likes: 0 };
  }
}

