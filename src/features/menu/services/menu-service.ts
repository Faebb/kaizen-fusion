import { httpClient } from "@/services";
import type { MenuCategoryInterface, MenuItemType } from "@/features";

export const getMenuService = async (slug: string): Promise<MenuCategoryInterface[]> => {
  const { data } = await httpClient.get(`/api/public/${slug}/menu`);
  return data.data;
};

export const getMenuItemService = async (slug: string, id: string): Promise<MenuItemType> => {
  const { data } = await httpClient.get(`/api/public/${slug}/menu/items/${id}`);
  return data.data;
};
