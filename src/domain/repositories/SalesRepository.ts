import type { Product } from "./ProductsRepository";

export interface Sale {
  uid?: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  saleDate: Date;
  userId: string;
  unitPrice: number;
  cost: number;
  createdAt?: Date;
  status?: SaleStatus;
  product: Product;
}

export const SaleStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
  FAILED: "FAILED",
} as const;

export const SaleStatusMap = {
  ACTIVE: "Ativa",
  INACTIVE: "Inativa",
  PENDING: "Pendente",
  COMPLETED: "Completa",
  CANCELLED: "Cancelada",
  REFUNDED: "Estornada",
  FAILED: "Falha",
} as const;

export type SaleStatus = (typeof SaleStatus)[keyof typeof SaleStatus];
