import { Order } from "@/store/useOrdersStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { User } from "lucide-react"
import { Separator } from "../ui/separator"

interface CustomerDetailsProps {
  order: Order
}

const getScoreColorClasses = (score: string): string => {
  switch (score?.toUpperCase()) {
    case "A":
      return "border-green-500 text-green-500"
    case "B":
      return "border-yellow-500 text-yellow-500"
    case "C":
      return "border-amber-500 text-amber-500"
    case "D":
      return "border-orange-500 text-orange-500"
    case "E":
      return "border-rose-500 text-rose-500"
    case "F":
      return "border-red-500 text-red-500"
    default:
      return "border-green-500 text-green-500"
  }
}

export const CustomerDetails = ({ order }: CustomerDetailsProps) => {
  return (
    <div className="h-full">
      <Card className="bg-[#f3f1ec] border-[#e0e0e0] h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User />
            <div>
                Resumo do Cliente
            </div>
          </CardTitle>
          <Separator className="mt-4 bg-[#e0e0e0]" />
        </CardHeader>
        <CardContent className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
                <div className="space-y-3 flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">Customer ID:</p>
                        <div>{order.customer.platformCustomerId}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Nome:</p>
                        <div>{order.customer.name}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Email:</p>
                        <div className="break-words">{order.customer.email ? order.customer.email : "Não informado"}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Telefone:</p>
                        <div>{order.customer.phone ? order.customer.phone : "Não informado"}</div>
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">País:</p>
                        <div>{order.customer.countryLast}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Score:</p>
                        <div className="flex items-center">
                            {order.customer.scoreGrade ? (
                                <div
                                    className={`w-8 h-8 rounded-full border-2 text-sm flex items-center justify-center font-bold text-lg ${getScoreColorClasses(order.customer.scoreGrade)}`}
                                >
                                    {order.customer.scoreGrade}
                                </div>
                            ) : (
                                <span className="text-gray-400">-</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Tem biometria:</p>
                        <div>{order.customer.hasBiometry ? "Sim" : "Não"}</div>
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    <div>
                        <p className="text-sm text-muted-foreground">Número de pedidos:</p>
                        <div>{order.customer.ordersCount}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Número de chargebacks:</p>
                        <div>{order.customer.chargebackCount}</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Número de refunds:</p>
                        <div>{order.customer.refundCount}</div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}