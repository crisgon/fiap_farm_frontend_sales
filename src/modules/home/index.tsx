// SalesPage.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle>Vendas - Home</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className="mb-2" variant="destructive">
            Vendas Ativas
          </Badge>
          <p>Bem-vindo ao módulo de vendas do seu sistema!</p>
          <Separator className="my-4" />
          <Alert>
            <AlertTitle>Dica</AlertTitle>
            <AlertDescription>
              Esta é uma tela de exemplo utilizando <strong>shadcn/ui</strong>{" "}
              para o micro frontend de vendas.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="default">Nova Venda</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { Home };
