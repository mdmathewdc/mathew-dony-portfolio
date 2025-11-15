import { getLikes } from "@/app/actions/likes";

interface LikeCountProps {
  slug: string;
}

export const LikeCount = async ({ slug }: LikeCountProps) => {
  const likes = await getLikes(slug);

  return <span>{likes} likes</span>;
};

