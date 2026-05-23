import { httpClient } from "@/services";
import type {
  AdminCategory,
  AdminMenuItem,
  AdminOrder,
  AdminReservation,
  AdminTable,
} from "./types";

// ─── Menu Categories ─────────────────────────────────────────────────────
export const listCategoriesService = async (): Promise<AdminCategory[]> => {
  const { data } = await httpClient.get("/api/admin/menu/categories");
  return data.data;
};

export const createCategoryService = async (body: {
  name: string;
  type: string;
  sortOrder?: number;
}): Promise<AdminCategory> => {
  const { data } = await httpClient.post("/api/admin/menu/categories", body);
  return data.data;
};

export const updateCategoryService = async (
  id: string,
  body: Partial<{ name: string; type: string; sortOrder: number }>,
): Promise<AdminCategory> => {
  const { data } = await httpClient.put(`/api/admin/menu/categories/${id}`, body);
  return data.data;
};

export const deleteCategoryService = async (id: string): Promise<void> => {
  await httpClient.delete(`/api/admin/menu/categories/${id}`);
};

// ─── Menu Items ──────────────────────────────────────────────────────────
export const listMenuItemsService = async (): Promise<AdminMenuItem[]> => {
  const { data } = await httpClient.get("/api/admin/menu/items");
  return data.data;
};

export const createMenuItemService = async (
  body: Omit<AdminMenuItem, "id">,
): Promise<AdminMenuItem> => {
  const { data } = await httpClient.post("/api/admin/menu/items", body);
  return data.data;
};

export const updateMenuItemService = async (
  id: string,
  body: Partial<Omit<AdminMenuItem, "id">>,
): Promise<AdminMenuItem> => {
  const { data } = await httpClient.put(`/api/admin/menu/items/${id}`, body);
  return data.data;
};

export const deleteMenuItemService = async (id: string): Promise<void> => {
  await httpClient.delete(`/api/admin/menu/items/${id}`);
};

// ─── Tables ──────────────────────────────────────────────────────────────
export const listTablesService = async (): Promise<AdminTable[]> => {
  const { data } = await httpClient.get("/api/admin/tables");
  return data.data;
};

export const createTableService = async (body: {
  tableNumber: number;
  tableType: string;
  capacity: number;
}): Promise<AdminTable> => {
  const { data } = await httpClient.post("/api/admin/tables", body);
  return data.data;
};

export const updateTableService = async (
  id: string,
  body: Partial<{
    tableNumber: number;
    tableType: string;
    capacity: number;
    isOccupied: boolean;
  }>,
): Promise<AdminTable> => {
  const { data } = await httpClient.put(`/api/admin/tables/${id}`, body);
  return data.data;
};

export const deleteTableService = async (id: string): Promise<void> => {
  await httpClient.delete(`/api/admin/tables/${id}`);
};

// ─── Orders ──────────────────────────────────────────────────────────────
export const listOrdersService = async (): Promise<AdminOrder[]> => {
  const { data } = await httpClient.get("/api/admin/orders");
  return data.data;
};

export const updateOrderStatusService = async (
  id: string,
  status: string,
): Promise<{ id: string; status: string }> => {
  const { data } = await httpClient.patch(`/api/admin/orders/${id}/status`, { status });
  return data.data;
};

// ─── Reservations ────────────────────────────────────────────────────────
export const listReservationsService = async (): Promise<AdminReservation[]> => {
  const { data } = await httpClient.get("/api/admin/reservations");
  return data.data;
};
