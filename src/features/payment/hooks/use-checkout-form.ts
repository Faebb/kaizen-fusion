import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  checkoutSchema,
  type CheckoutFormValues,
  createOrderService,
  type CreateOrderDTO,
  type OrderResponseType,
  type ReservationResponseType,
} from "@/features";
import { useCartStore } from "@/features/cart/store/use-cart-store";
import { queryKeys } from "@/shared";
import { showRemoveToast, showSuccessToast, useCurrentSlug } from "@/lib";

export const useCheckoutForm = () => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const slug = useCurrentSlug();

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (values) => {
    const reservation = queryClient.getQueryData<ReservationResponseType>(
      queryKeys.reservation.assign(),
    );

    const body: CreateOrderDTO = {
      reservationId: reservation?.reservationId,
      customerName: values.customerName,
      documentType: values.documentType,
      documentNumber: values.documentNumber,
      email: values.email,
      paymentMethod: values.paymentMethod,
      tipType: values.tipType,
      tipValue: Number(values.tipValue ?? 0),
      items: cart.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      })),
    };

    let order: OrderResponseType | null = null;
    try {
      order = await createOrderService(slug, body);
      showSuccessToast("Pedido confirmado", `#${order.id.slice(0, 8)}`);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      showRemoveToast("Error", "No se pudo procesar el pedido");
    }

    if (order) {
      queryClient.setQueryData(queryKeys.order.create(), order);
    }
    clearCart();
    navigate({ to: "/$slug/order-confirmation/$orderId", params: { slug, orderId: order?.id ?? "" } });
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
