import { deleteSale } from "@/domain/usecases/SalesUseCases";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSaleMutation() {
  return useMutation({
    mutationFn: (saleId: string) => deleteSale(saleId),
  });
}
