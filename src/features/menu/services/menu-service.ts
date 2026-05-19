import type { MenuCategoryInterface } from "@/features";
import { httpClient } from "@/services";

export const getMenuService = async (): Promise<MenuCategoryInterface[]> => {
  const { data } = await httpClient.get("/api/menu");
  return data.data;
};
