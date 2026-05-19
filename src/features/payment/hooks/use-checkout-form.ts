import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormValues } from "@/features";
import { useCartStore } from "@/features/cart/store/use-cart-store";
import { createOrderService } from "@/features/payment/services/order-service";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { queryKeys } from "@/shared";

export const useCheckoutForm = () => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const cart = useCartStore((s) => s.cart);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    const total = getTotal();
    let order;
    try {
      order = await createOrderService(data, cart, total);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      order = {
        customerName: data.customerName,
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        email: data.email,
        paymentMethod: data.paymentMethod,
        tipType: data.tipType,
        tipValue: data.tipValue ?? 0,
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        total,
      };
    }
    queryClient.setQueryData(queryKeys.order.create(), order);
    clearCart();
    navigate({ to: "/order-confirmation" });
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
