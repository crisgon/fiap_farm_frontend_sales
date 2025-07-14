import { getSales } from "@/domain/usecases/SalesUseCases";
import { useQuery } from "@tanstack/react-query";

export function useSalesQuery() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });
}
