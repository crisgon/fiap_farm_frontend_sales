import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductsQuery } from "@/hooks/Products/useProductsQuery";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  SaleStatus,
  SaleStatusMap,
  type Sale,
} from "@/domain/repositories/SalesRepository";
import { defaultFormState } from "../..";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useCreateSaleMutation } from "@/hooks/Sales/useCreateSaleMutation";
import { useUpdateSaleMutation } from "@/hooks/Sales/useUpdateSaleMutation";
import { toast } from "sonner";

interface CreateDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Sale[], Error>>;
  selectedSale: Partial<Sale>;
  setSelectedSale: React.Dispatch<React.SetStateAction<Partial<Sale>>>;
}

export function CreateDialog({
  isOpen = false,
  setIsOpen,
  refetch,
  selectedSale,
  setSelectedSale,
}: CreateDialogProps) {
  const { data: products, isLoading: productsLoading } = useProductsQuery();
  const [open, setOpen] = useState(false);

  const { mutate: createSale, isPending: createIsPending } =
    useCreateSaleMutation();
  const { mutate: updateSale, isPending: updateIsPending } =
    useUpdateSaleMutation();

  const [data, setData] = useState<Partial<Sale>>(selectedSale);
  const isFormInvalid =
    !data.quantity || !data.productId || !data.unitPrice || !data.cost;

  const handleSubmit = () => {
    if (!data.uid) {
      createSale(data, {
        onSuccess: () => {
          toast.success("Venda criada com sucesso");
        },
        onError: () => {
          toast.error("Não foi possível criar a venda");
        },
        onSettled: (_, error) => {
          if (!error) {
            refetch();
          }
          setIsOpen(false);
          setSelectedSale(defaultFormState);
        },
      });
    } else {
      updateSale(data as Sale, {
        onSuccess: () => {
          toast.success("Venda atualizada com sucesso");
        },
        onError: () => {
          toast.error("Não foi possível criar a venda");
        },
        onSettled: (_, error) => {
          if (!error) {
            refetch();
          }
          setIsOpen(false);
          setSelectedSale(defaultFormState);
        },
      });
    }
  };

  const buttonLabel = data?.uid
    ? updateIsPending
      ? "Salvando..."
      : "Salvar"
    : createIsPending
    ? "Criando..."
    : "Criar";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setData(defaultFormState);
        setSelectedSale(defaultFormState);
      }}
    >
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar venda</DialogTitle>
          </DialogHeader>
          {productsLoading ? (
            <div className="flex justify-center items-center my-4">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="grid gap-6 my-6">
                <div className="grid gap-3">
                  <Label htmlFor="productId">Produto *</Label>
                  <Select
                    name="productId"
                    value={data.productId}
                    onValueChange={(option) => {
                      setData((prev) => ({
                        ...prev,
                        productId: option,
                      }));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Selecione o produto"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product) => (
                        <SelectItem key={product.uid} value={product.uid}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col justify-between gap-4">
                    <Label htmlFor="quantity">Quantidade *</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={data.quantity}
                      onChange={(event) => {
                        setData((prev) => ({
                          ...prev,
                          quantity: Number(event.target.value),
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-4">
                    <Label htmlFor="unitPrice">Valor unitário *</Label>
                    <Input
                      id="unitPrice"
                      name="unitPrice"
                      type="number"
                      value={data.unitPrice}
                      onChange={(event) => {
                        setData((prev) => ({
                          ...prev,
                          unitPrice: Number(event.target.value),
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-4">
                    <Label htmlFor="cost">Custo de produção *</Label>
                    <Input
                      id="cost"
                      name="cost"
                      type="number"
                      value={data.cost}
                      onChange={(event) => {
                        setData((prev) => ({
                          ...prev,
                          cost: Number(event.target.value),
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="productId">Status da venda</Label>
                    <Select
                      name="status"
                      value={data.status}
                      onValueChange={(option) => {
                        setData((prev) => ({
                          ...prev,
                          status: option as SaleStatus,
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="text-foreground text-sm native:text-lg"
                          placeholder="Status da venda"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(SaleStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {SaleStatusMap[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="productId">Data da venda</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-48 justify-between font-normal"
                        >
                          {data.saleDate
                            ? new Date(data.saleDate).toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            data.saleDate ? new Date(data.saleDate) : undefined
                          }
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setData((prev) => ({
                              ...prev,
                              saleDate: date,
                            }));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      setData(defaultFormState);
                      setSelectedSale(defaultFormState);
                    }}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isFormInvalid || updateIsPending || createIsPending}
                >
                  {buttonLabel}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
