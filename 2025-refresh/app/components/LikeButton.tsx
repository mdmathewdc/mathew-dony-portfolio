"use client";

import { useState, useEffect } from "react";
import { addLike } from "@/app/actions/likes";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

const MAX_LIKES_PER_POST = 12;

export const LikeButton = ({ slug, initialLikes }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [userLikes, setUserLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Load user's like count from sessionStorage on mount
  useEffect(() => {
    const storedLikes = sessionStorage.getItem("post-likes");
    if (storedLikes) {
      try {
        const likesData = JSON.parse(storedLikes);
        setUserLikes(likesData[slug] || 0);
      } catch (error) {
        console.error("Error parsing likes from sessionStorage:", error);
      }
    }
  }, [slug]);

  const handleLike = async () => {
    if (userLikes >= MAX_LIKES_PER_POST || isLiking) return;

    setIsLiking(true);

    // Optimistic update
    const newUserLikes = userLikes + 1;
    const newTotalLikes = likes + 1;
    setLikes(newTotalLikes);
    setUserLikes(newUserLikes);

    // Update sessionStorage
    const storedLikes = sessionStorage.getItem("post-likes");
    const likesData = storedLikes ? JSON.parse(storedLikes) : {};
    likesData[slug] = newUserLikes;
    sessionStorage.setItem("post-likes", JSON.stringify(likesData));

    // Call server action
    const result = await addLike(slug);

    if (result.success) {
      // Update with the actual count from server
      setLikes(result.likes);
    } else {
      // Revert on error
      setLikes(likes);
      setUserLikes(userLikes);
      const revertData = storedLikes ? JSON.parse(storedLikes) : {};
      revertData[slug] = userLikes;
      sessionStorage.setItem("post-likes", JSON.stringify(revertData));
    }

    setIsLiking(false);
  };

  const remainingLikes = MAX_LIKES_PER_POST - userLikes;
  const isMaxReached = userLikes >= MAX_LIKES_PER_POST;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={isMaxReached || isLiking}
        className={`flex items-center gap-2 text-sm transition ${
          isMaxReached
            ? "text-zinc-600 cursor-not-allowed"
            : "text-zinc-400 hover:text-red-400 cursor-pointer"
        }`}
        aria-label="Like post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={userLikes > 0 ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          className="w-5 h-5"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>{likes} likes</span>
      </button>
      {!isMaxReached && userLikes > 0 && (
        <span className="text-xs text-zinc-500">
          {remainingLikes} more
        </span>
      )}
      {isMaxReached && (
        <span className="text-xs text-zinc-500">Max reached</span>
      )}
    </div>
  );
};

