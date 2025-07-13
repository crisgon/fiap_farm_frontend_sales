import type { Sale } from "@/domain/repositories/SalesRepository";
import { updateSale } from "@/domain/usecases/SalesUseCases";
import { useMutation } from "@tanstack/react-query";

export function useUpdateSaleMutation() {
  return useMutation({
    mutationFn: (sale: Sale) => updateSale(sale),
  });
}
