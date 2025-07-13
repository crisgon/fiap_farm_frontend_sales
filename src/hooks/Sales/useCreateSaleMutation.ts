import type { Sale } from "@/domain/repositories/SalesRepository";
import { createSale } from "@/domain/usecases/SalesUseCases";
import { useMutation } from "@tanstack/react-query";

export function useCreateSaleMutation() {
  return useMutation({
    mutationFn: (sale: Partial<Sale>) => createSale(sale),
  });
}
