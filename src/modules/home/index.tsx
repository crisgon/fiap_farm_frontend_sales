import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSalesQuery } from "@/hooks/Sales/useSalesQuery";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateDialog } from "./components/CreateDialog";
import { SaleStatus, type Sale } from "@/domain/repositories/SalesRepository";
import DeleteDialog from "./components/DeleteDialog";
import { Card, CardContent } from "@/components/ui/card";

export const defaultFormState = {
  quantity: undefined,
  productId: "",
  createdAt: new Date(),
  saleDate: new Date(),
  unitPrice: undefined,
  cost: undefined,
  status: SaleStatus.ACTIVE,
};

function Home() {
  const { data, isLoading, refetch, isPending } = useSalesQuery();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const [editableSale, setEditableSale] =
    useState<Partial<Sale>>(defaultFormState);

  return (
    <div className="flex flex-col items-center min-h-screen bg-muted/50 p-6">
      <div className="flex flex-row w-full max-w-5xl h-full justify-between items-center">
        <h3 className="font-bold text-3xl text-primary">Vendas</h3>
        <Button
          size="lg"
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <PlusCircle />
          Adicionar venda
        </Button>
      </div>
      <Card className="w-full max-w-5xl  mt-8">
        <CardContent>
          {isLoading || isPending ? (
            <div className="flex justify-center items-center my-4">
              <Spinner />
            </div>
          ) : !data?.length ? (
            <span>Não foram encontrados registros</span>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Produto</TableHead>
                  <TableHead className="text-center">
                    Quantidade vendida
                  </TableHead>
                  <TableHead className="text-center">Valor unitário</TableHead>

                  <TableHead className="text-center">
                    Custo de produção
                  </TableHead>
                  <TableHead className="text-center">Valor de venda</TableHead>
                  <TableHead className="text-center">Data da venda</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((sale) => (
                  <TableRow key={sale.uid}>
                    <TableCell className="font-medium">
                      {sale.product?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {sale.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {(sale.unitPrice ? sale.unitPrice : 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center text-destructive">
                      {(
                        (sale.cost ? sale.cost / 10 : 0) * sale.quantity
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center text-primary">
                      {(
                        (sale.unitPrice ? sale.unitPrice / 10 : 0) *
                        sale.quantity
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {sale.saleDate
                        ? new Date(sale.saleDate).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        flexDirection: "row",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditableSale({
                            ...sale,
                          });
                          setModalIsOpen(true);
                        }}
                      >
                        <Pencil color="#198155" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditableSale({ ...sale });
                          setDeleteModalIsOpen(true);
                        }}
                      >
                        <Trash2 color="#ef4444" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {modalIsOpen && (
        <CreateDialog
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          refetch={refetch}
          selectedSale={editableSale}
          setSelectedSale={setEditableSale}
        />
      )}
      {deleteModalIsOpen && (
        <DeleteDialog
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          refetch={refetch}
          selectedSale={editableSale}
          setSelectedSale={setEditableSale}
        />
      )}
    </div>
  );
}

export { Home };
