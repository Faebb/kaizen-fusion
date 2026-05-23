import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared";
import { getMenuService } from "@/features";
import { useCurrentSlug } from "@/lib";

export const useMenuQuery = () => {
  const slug = useCurrentSlug();
  return useQuery({
    queryKey: [...queryKeys.menu.list(), slug] as const,
    queryFn: () => getMenuService(slug),
  });
};
