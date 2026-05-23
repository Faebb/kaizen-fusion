import { httpClient } from "@/services";
import type { ReservationRequestType, ReservationResponseType } from "@/features";

export const assignTableService = async (
  slug: string,
  body: ReservationRequestType,
): Promise<ReservationResponseType> => {
  const { data } = await httpClient.post(`/api/public/${slug}/reservations`, body);
  return data.data;
};
