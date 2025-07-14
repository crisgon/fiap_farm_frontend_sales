import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Sale } from "@/domain/repositories/SalesRepository";
import { useDeleteSaleMutation } from "@/hooks/Sales/useDeleteSaleMutation";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { defaultFormState } from "../..";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Sale[], Error>>;
  selectedSale: Partial<Sale>;
  setSelectedSale: React.Dispatch<React.SetStateAction<Partial<Sale>>>;
}

export default function DeleteDialog({
  isOpen,
  setIsOpen,
  selectedSale,
  setSelectedSale,
  refetch,
}: DeleteDialogProps) {
  const { mutate, isPending } = useDeleteSaleMutation();

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    mutate(selectedSale?.uid!, {
      onSuccess: () => {
        toast.success("Venda deletada com sucesso");
      },
      onError: () => {
        toast.error("Não foi possível deletar a venda");
      },
      onSettled: (_, error) => {
        if (!error) {
          refetch();
        }
        setIsOpen(false);
        setSelectedSale(defaultFormState);
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSelectedSale(defaultFormState);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar</DialogTitle>
          <DialogDescription className="mt-8 mb-6">
            Tem certeza de que deseja deletar essa venda?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-around">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setIsOpen(false);
              setSelectedSale(defaultFormState);
            }}
          >
            Fechar
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Carregando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
