import { request } from "@/infrastructure/api/client";
import type { Product } from "../repositories/ProductsRepository";

export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>("GET", "products");
};
