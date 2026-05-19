import type { ReservationRequestType, ReservationResponseType } from "@/features";
import { httpClient } from "@/services";

export const assignTableService = async (
  data: ReservationRequestType
): Promise<ReservationResponseType> => {
  const response = await httpClient.post("/api/reservations", data);
  return response.data.data;
};
