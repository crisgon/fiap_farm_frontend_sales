import { getProducts } from "@/domain/usecases/ProductsUseCases";
import { useQuery } from "@tanstack/react-query";

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}
