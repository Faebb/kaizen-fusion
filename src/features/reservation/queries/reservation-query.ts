import { queryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignTableService, type ReservationRequestType } from "@/features";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentSlug } from "@/lib";

export const useAssignTableMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const slug = useCurrentSlug();

  return useMutation({
    mutationKey: queryKeys.reservation.assign(),

    mutationFn: (data: ReservationRequestType) => assignTableService(slug, data),

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.reservation.assign(), data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.reservation.all,
      });

      navigate({ to: "/confirmation" });
    },
  });
};
