"use client"

import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useShopMetricsStore } from "@/store/useShopsMetricsStore"
import { ShoppingCart, CheckCircle2, DollarSign, TrendingUp, TrendingDown, BarChart3, Hand, PauseCircle, Search, Frown } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import router from "next/router"
import { Separator } from "../ui/separator"

interface ShopMetricsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shopId: string | null
}

export function ShopMetricsModal({ open, onOpenChange, shopId }: ShopMetricsModalProps) {
  const { shopMetrics, loading, error, fetchShopMetrics } = useShopMetricsStore()

  useEffect(() => {
    if (open && shopId) {
      fetchShopMetrics(shopId)
    }
  }, [open, shopId, fetchShopMetrics])

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(1)}k`
    }
    return `R$ ${value.toFixed(2)}`
  }

  const getChangeType = (value: number): "up" | "down" => {
    return value >= 0 ? "up" : "down"
  }

  if (!shopId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto bg-[#ffffff]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-gray-900" />
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Métricas da Loja
            </DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-gray-600">
              {shopMetrics?.name} | {shopMetrics?.shopId}
          </DialogDescription>

          <div className="text-gray-600 flex items-center mt-1">
            <Badge variant="success" className="mr-2">Ativa desde:</Badge>
            {formatDate(shopMetrics?.createdAt || "")}
          </div>
        </DialogHeader>

        {loading && !shopMetrics && (
          <div className="text-center py-8 text-gray-500">
            Carregando métricas...
          </div>
        )}

        {error && !shopMetrics && (
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        )}

        {shopMetrics?.totalOrders && shopMetrics?.totalOrders > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-blue-600">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Pedidos Atuais</h3>
                    </div>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-gray-900">{shopMetrics.numberOfCurrentOrders}</span>
                    </div>
                    {shopMetrics.ordersPercentageChange !== undefined && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className={getChangeType(shopMetrics.ordersPercentageChange) === "up" ? "text-green-600" : "text-red-600"}>
                          {getChangeType(shopMetrics.ordersPercentageChange) === "up" ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                          {shopMetrics.ordersPercentageChange}% vs período anterior
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Pedidos Aprovados</h3>
                    </div>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-gray-900">{shopMetrics.numberOfCurrentApprovedOrders}</span>
                    </div>
                    {shopMetrics.approvedOrdersPercentageChange !== undefined && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className={getChangeType(shopMetrics.approvedOrdersPercentageChange) === "up" ? "text-green-600" : "text-red-600"}>
                          {getChangeType(shopMetrics.approvedOrdersPercentageChange) === "up" ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                          {shopMetrics.approvedOrdersPercentageChange}% vs período anterior
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-amber-500">
                          <Hand className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Revisão Manual</h3>
                      </div>
                      {
                        shopMetrics.numberOfCurrentManualReviewOrders > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <Button variant="success" size="sm" onClick={() => {
                              router.push(`/resultados`)
                            }}>
                              <Search className="w-4 h-4 mr-2" />
                              Consultar
                            </Button>
                          </div>  
                        )
                      }
                    </div>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-gray-900">{shopMetrics.numberOfCurrentManualReviewOrders}</span>
                    </div>
                    {shopMetrics.manualReviewPercentageChange !== undefined && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className={getChangeType(shopMetrics.manualReviewPercentageChange) === "up" ? "text-green-600" : "text-red-600"}>
                          {getChangeType(shopMetrics.manualReviewPercentageChange) === "up" ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                          {shopMetrics.manualReviewPercentageChange}% vs período anterior
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-orange-600">
                        <PauseCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Em revisão</h3>
                    </div>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-gray-900">{shopMetrics.numberOfCurrentPendingOrders}</span>
                    </div>
                    {shopMetrics.numberOfCurrentPendingOrders > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">
                          Resultados disponíveis em breve...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-green-600">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600">Total Aprovado</h3>
                    </div>
                    <div className="mb-1">
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(shopMetrics.totalPriceOfApprovedOrders)}</span>
                    </div>
                    {shopMetrics.totalPriceApprovedPercentageChange !== undefined && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className={getChangeType(shopMetrics.totalPriceApprovedPercentageChange) === "up" ? "text-green-600" : "text-red-600"}>
                          {getChangeType(shopMetrics.totalPriceApprovedPercentageChange) === "up" ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                          {shopMetrics.totalPriceApprovedPercentageChange}% vs período anterior
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <Separator className="bg-[#e0e0e0] mb-6" />
            <Frown className="w-10 h-10 mx-auto mb-4" />
            <p>Ainda não há métricas disponíveis para esta loja.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

