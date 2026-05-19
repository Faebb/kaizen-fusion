import { httpClient } from "@/services";
import type { CheckoutFormValues } from "@/features";
import type { CartItemInterface } from "@/features";

export interface CreateOrderDTO {
  customerName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  paymentMethod: string;
  tipType: string;
  tipValue: number;
  items: Array<{ menuItemId: string; quantity: number; unitPrice: number }>;
  total: number;
}

export const createOrderService = async (
  form: CheckoutFormValues,
  cart: CartItemInterface[],
  total: number
) => {
  const body: CreateOrderDTO = {
    customerName: form.customerName,
    documentType: form.documentType,
    documentNumber: form.documentNumber,
    email: form.email,
    paymentMethod: form.paymentMethod,
    tipType: form.tipType,
    tipValue: form.tipValue,
    items: cart.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
    })),
    total,
  };

  const { data } = await httpClient.post("/api/orders", body);
  return data.data;
};
