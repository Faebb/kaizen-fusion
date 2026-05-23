export interface AdminCategory {
  id: string;
  name: string;
  type: string;
  sortOrder: number;
  _count?: { items: number };
}

export interface AdminMenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface AdminTable {
  id: string;
  tableNumber: number;
  tableType: 'LOW' | 'HIGH' | 'VIP';
  capacity: number;
  isOccupied: boolean;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  paymentMethod: string;
  subtotal: number;
  tipValue: number;
  total: number;
  status: string;
  createdAt: string;
  items: {
    menuItemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
}

export interface AdminReservation {
  id: string;
  guests: number;
  waitTime: number;
  tableId: string;
  createdAt: string;
  table: AdminTable;
}

export const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERED', 'CANCELLED'] as const;
export type OrderStatus = typeof ORDER_STATUSES[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'En cola',
  CONFIRMED: 'Confirmado',
  PREPARING: 'Preparando',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
};

export const TABLE_TYPES = ['LOW', 'HIGH', 'VIP'] as const;
export type TableType = typeof TABLE_TYPES[number];

export const TABLE_TYPE_LABELS: Record<TableType, string> = {
  LOW: 'Baja',
  HIGH: 'Alta',
  VIP: 'VIP',
};
