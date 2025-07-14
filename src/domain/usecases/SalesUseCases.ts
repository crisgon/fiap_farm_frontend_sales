import { request } from "@/infrastructure/api/client";
import type { Sale } from "../repositories/SalesRepository";

export const getSales = (): Promise<Sale[]> => {
  return request<Sale[]>("GET", "sales");
};

export const updateSale = (sale: Sale): Promise<Sale> => {
  return request<Sale>("PUT", `sales/${sale.uid}`, sale);
};

export const createSale = (sale: Partial<Sale>): Promise<Sale> => {
  return request<Sale>("POST", "sales", sale);
};

export const deleteSale = (saleId: string): Promise<{ success: boolean }> => {
  return request<{ success: boolean }>("DELETE", `sales/${saleId}`);
};
