"use client";

import { useState, useEffect } from "react";
import { getLikes } from "@/app/actions/likes";

interface ClientLikeCountProps {
  slug: string;
}

export const ClientLikeCount = ({ slug }: ClientLikeCountProps) => {
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    getLikes(slug).then(setLikes);
  }, [slug]);

  if (likes === null) {
    return <span>... likes</span>;
  }

  return <span>{likes} likes</span>;
};

