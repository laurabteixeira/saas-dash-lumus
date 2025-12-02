"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertTriangle, CheckCircle2, HeartMinus, HeartPlus, Download } from "lucide-react"
import { useOrderStore } from "@/store/useOrdersStore"
import { OrderDetails } from "@/components/results/order-details"
import { CustomerDetails } from "@/components/results/customer-details"
import { RiskDetails } from "@/components/results/risk-details"
import { Separator } from "@/components/ui/separator"

export default function OrderDetailPage() {
  const params = useParams() as { orderId: string }
  const router = useRouter()
  const { order, fetchOrder, loading, error } = useOrderStore()

  useEffect(() => {
    console.log("params.storeId", params.orderId)
    if (params.orderId) {
      fetchOrder(params.orderId)
    }
    console.log("order", order)
  }, [params.orderId, fetchOrder])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPath="/resultados" />
        <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 text-gray-500">Carregando...</div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPath="/resultados" />
        <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 text-red-500">{error || "Pedido não encontrado"}</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/resultados" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/resultados")} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Detalhes do Pedido
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.platformOrderId} - {order.shop?.name || order.shopId}
                </p>
              </div>
            </div>
            <div>
              <Button variant="success">
                <Download className="w-5 h-5 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <OrderDetails order={order} />
            <CustomerDetails order={order} />
          </div>
          {order.riskResults?.ip && order.riskResults.ip.trim() !== "" ? (
            <RiskDetails order={order} />
          ) : (
            <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
              <CardContent className="py-8">
                <div className="text-center text-gray-600">
                  Análise ainda em andamento...
                </div>
              </CardContent>
            </Card>
          )}

          {(order.riskResults?.scorePenalties?.length > 0 || order.riskResults?.scoreBonuses?.length > 0) && (
            <div className="grid grid-cols-1 mt-6 lg:grid-cols-2 gap-6 mb-6">
              {order.riskResults?.scorePenalties?.length > 0 && (
                <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <HeartMinus />
                      Penalidades
                    </CardTitle>
                    <Separator className="mt-4 bg-[#e0e0e0]" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {order.riskResults.scorePenalties.map((penalty, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {penalty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {order.riskResults?.scoreBonuses?.length > 0 && (
                <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <HeartPlus />
                      Bônus
                    </CardTitle>
                    <Separator className="mt-4 bg-[#e0e0e0]" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {order.riskResults.scoreBonuses.map((bonus, index) => (
                        <Badge key={index} variant="success" className="text-xs">
                          {bonus}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

