import { useCartSummary } from "@/features";
import { FloatingCart } from "@/shared";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentSlug } from "@/lib";

export function CartSummaryView() {
  const { total, hasItems } = useCartSummary();
  const navigate = useNavigate();
  const slug = useCurrentSlug();

  if (!hasItems) return null;

  return (
    <FloatingCart
      total={total}
      onClick={() => navigate({ to: "/$slug/cart", params: { slug } })}
    />
  );
}