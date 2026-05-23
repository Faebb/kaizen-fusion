export interface ReservationRequestType {
  guests: number;
}

export interface ReservationResponseType {
  reservationId: string;
  tableId: string;
  waitTime: number;
  tableNumber: number;
  tableType: 'LOW' | 'HIGH' | 'VIP';
}

export interface ReservationCardTypes {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onAssign: () => void;
}
