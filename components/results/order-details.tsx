import { Order } from "@/store/useOrdersStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { formatDate } from "@/lib/utils"
import { Package } from "lucide-react"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

interface OrderDetailsProps {
  order: Order
}

const getDecisionVariant = (tag: string): "success" | "yellow" | "orange" | "purple" => {
  switch (tag.toUpperCase()) {
    case "APPROVED":
      return "success"
    case "PENDING":
      return "yellow"
    case "WAITING_BIOMETRY":
      return "purple"
    case "MANUAL_REVIEW":
      return "orange"
    default:
      return "success"
  }
}

const getPlatformVariant = (tag: string): "blue" | "rose" => {
    switch (tag.toUpperCase()) {
      case "NUVEMSHOP":
        return "blue"
      case "SHOPIFY":
        return "rose"
      default:
        return "rose"
    }
  }

export const OrderDetails = ({ order }: OrderDetailsProps) => {

  return (
    <div className="h-full">
      <Card className="bg-[#f3f1ec] border-[#e0e0e0] h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <Package />
                <div>
                    Resumo do Pedido
                </div>
            </div>
            {order.tag.toUpperCase() === "MANUAL_REVIEW" && (
              <div>
                  <Button variant="success" className="w-full sm:w-auto">Aprovar Pedido</Button>
              </div>
            )}
          </CardTitle>
          <Separator className="mt-4 bg-[#e0e0e0]" />
        </CardHeader>
        <CardContent className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
                <div className="space-y-3 flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">Order ID:</p>
                        <div>{order.platformOrderId}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Plataforma:</p>
                        <div><Badge variant={getPlatformVariant(order.platform)}>{order.platform}</Badge></div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Itens:</p>
                        <div className="break-words">{order.items.map((item: any) => item).join(", ")}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total:</p>
                        <div>$ {order.totalPriceCents}</div>
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">País de destino:</p>
                        <div>{order.countryDestCode}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Status:</p>
                        <div><Badge variant={getDecisionVariant(order.status)}>{order.status}</Badge></div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Tag:</p>
                        <div><Badge variant="success">{order.tag}</Badge></div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Aprovação:</p>
                        <div>{order.approvedBy || "-"}</div>
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">Data de criação:</p>
                        <div>{formatDate(order.createdAt)}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Última atualização:</p>
                        <div>{formatDate(order.updatedAt)}</div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}