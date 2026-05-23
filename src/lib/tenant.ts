import { useParams } from "@tanstack/react-router";

export const useCurrentSlug = (): string => {
  const { slug } = useParams({ from: "/$slug" });
  return slug;
};
