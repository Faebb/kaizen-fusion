import { httpClient } from "@/services";

export interface CreateOrderItemDTO {
  menuItemId: string;
  quantity: number;
}

export interface CreateOrderDTO {
  reservationId?: string;
  customerName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  paymentMethod: "card" | "cash";
  tipType: "fixed" | "custom";
  tipValue: number;
  items: CreateOrderItemDTO[];
}

export interface OrderResponseType {
  id: string;
  customerName: string;
  email: string;
  paymentMethod: string;
  subtotal: number;
  tipValue: number;
  total: number;
  status: string;
  items: {
    menuItemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  createdAt: string;
}

export const createOrderService = async (
  slug: string,
  body: CreateOrderDTO,
): Promise<OrderResponseType> => {
  const { data } = await httpClient.post(`/api/public/${slug}/orders`, body);
  return data.data;
};

export const getOrderService = async (
  slug: string,
  id: string,
): Promise<OrderResponseType> => {
  const { data } = await httpClient.get(`/api/public/${slug}/orders/${id}`);
  return data.data;
};
