"use client";

import { useState, useEffect, useRef } from "react";
import { addLike } from "@/app/actions/likes";
import { HeartButton } from "@/app/components/ui/heart-button";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

const BATCH_DELAY = 500; // milliseconds
const MAX_CLICKS = 9;

export const LikeButton = ({ slug, initialLikes }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [userLikes, setUserLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [pendingLikes, setPendingLikes] = useState(0);
  const batchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Batch API call effect
  useEffect(() => {
    if (pendingLikes > 0) {
      // Clear any existing timer
      if (batchTimerRef.current) {
        clearTimeout(batchTimerRef.current);
      }

      // Set new timer to batch the request
      batchTimerRef.current = setTimeout(async () => {
        setIsLiking(true);
        const result = await addLike(slug, pendingLikes);

        if (result.success) {
          // Update with the actual count from server
          setLikes(result.likes);
        } else {
          // Revert on error
          setLikes((prev: number) => prev - pendingLikes);
          setUserLikes((prev: number) => prev - pendingLikes);
        }

        setPendingLikes(0);
        setIsLiking(false);
      }, BATCH_DELAY);
    }

    // Cleanup timer on unmount
    return () => {
      if (batchTimerRef.current) {
        clearTimeout(batchTimerRef.current);
      }
    };
  }, [pendingLikes, slug]);

  const handleLike = (count: number) => {
    // Optimistic update
    const newTotalLikes = likes + 1;
    setLikes(newTotalLikes);
    setUserLikes(count);
    setPendingLikes((prev) => prev + 1);
  };

  return (
    <div className="flex items-center">
      <HeartButton
        maxClicks={MAX_CLICKS}
        initialCount={userLikes}
        onChange={handleLike}
        className="scale-90"
      />
      <span className="text-sm text-zinc-400">{likes}</span>
    </div>
  );
};

