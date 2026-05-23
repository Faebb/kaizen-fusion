import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryService,
  createMenuItemService,
  createTableService,
  deleteCategoryService,
  deleteMenuItemService,
  deleteTableService,
  listCategoriesService,
  listMenuItemsService,
  listOrdersService,
  listReservationsService,
  listTablesService,
  updateCategoryService,
  updateMenuItemService,
  updateOrderStatusService,
  updateTableService,
} from "./admin-service";
import { showRemoveToast, showSuccessToast } from "@/lib";
import type { AdminMenuItem } from "./types";

const adminKey = (resource: string) => ["admin", resource] as const;

const failure = (message: string) => () => showRemoveToast("Error", message);

// ─── Categories ──────────────────────────────────────────────────────────
export const useAdminCategories = () =>
  useQuery({ queryKey: adminKey("categories"), queryFn: listCategoriesService });

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCategoryService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("categories") });
      showSuccessToast("Categoría creada");
    },
    onError: failure("No se pudo crear la categoría"),
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      body: Partial<{ name: string; type: string; sortOrder: number }>;
    }) => updateCategoryService(args.id, args.body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("categories") });
      showSuccessToast("Categoría actualizada");
    },
    onError: failure("No se pudo actualizar la categoría"),
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("categories") });
      qc.invalidateQueries({ queryKey: adminKey("menu-items") });
      showSuccessToast("Categoría eliminada");
    },
    onError: failure("No se pudo eliminar la categoría"),
  });
};

// ─── Menu Items ──────────────────────────────────────────────────────────
export const useAdminMenuItems = () =>
  useQuery({ queryKey: adminKey("menu-items"), queryFn: listMenuItemsService });

export const useCreateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createMenuItemService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("menu-items") });
      showSuccessToast("Ítem creado");
    },
    onError: failure("No se pudo crear el ítem"),
  });
};

export const useUpdateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; body: Partial<Omit<AdminMenuItem, "id">> }) =>
      updateMenuItemService(args.id, args.body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("menu-items") });
      showSuccessToast("Ítem actualizado");
    },
    onError: failure("No se pudo actualizar el ítem"),
  });
};

export const useDeleteMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMenuItemService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("menu-items") });
      showSuccessToast("Ítem eliminado");
    },
    onError: failure("No se pudo eliminar el ítem"),
  });
};

// ─── Tables ──────────────────────────────────────────────────────────────
export const useAdminTables = () =>
  useQuery({ queryKey: adminKey("tables"), queryFn: listTablesService });

export const useCreateTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTableService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("tables") });
      showSuccessToast("Mesa creada");
    },
    onError: failure("No se pudo crear la mesa"),
  });
};

export const useUpdateTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: string;
      body: Partial<{
        tableNumber: number;
        tableType: string;
        capacity: number;
        isOccupied: boolean;
      }>;
    }) => updateTableService(args.id, args.body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("tables") });
      showSuccessToast("Mesa actualizada");
    },
    onError: failure("No se pudo actualizar la mesa"),
  });
};

export const useDeleteTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTableService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("tables") });
      showSuccessToast("Mesa eliminada");
    },
    onError: failure("No se pudo eliminar la mesa"),
  });
};

// ─── Orders ──────────────────────────────────────────────────────────────
export const useAdminOrders = () =>
  useQuery({ queryKey: adminKey("orders"), queryFn: listOrdersService });

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; status: string }) =>
      updateOrderStatusService(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKey("orders") });
      showSuccessToast("Estado actualizado");
    },
    onError: failure("No se pudo actualizar el estado"),
  });
};

// ─── Reservations ────────────────────────────────────────────────────────
export const useAdminReservations = () =>
  useQuery({ queryKey: adminKey("reservations"), queryFn: listReservationsService });
