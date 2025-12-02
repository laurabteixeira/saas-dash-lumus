"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, DollarSign } from "lucide-react"
import { useOrdersMetricsStore } from "@/store/useOrdersMetricsStore"

interface ResultsKPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "up" | "down"
  description?: string
  icon: React.ReactNode
  target?: string
}

function ResultsKPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  icon, 
  target
}: ResultsKPICardProps) {
  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={changeType === "up" || !changeType ? "text-green-600" : changeType === "down" ? "text-red-600" : "text-gray-500"}>
                {icon}
              </div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            {change && (
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className={changeType === "up" ? "text-green-600" : "text-red-600"}>
                  {change} vs período anterior
                </span>
              </div>
            )}
            {target && (
              <div className="text-sm text-green-600 font-medium mt-1">
                {target}
              </div>
            )}
            {description && (
              <p className="text-xs text-gray-500 mt-2">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResultsKPICards() {
  const { ordersMetrics, loading, error, fetchOrdersMetrics } = useOrdersMetricsStore()

  useEffect(() => {
    fetchOrdersMetrics()
  }, [fetchOrdersMetrics])

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(1)}k`
    }
    return `R$ ${value.toFixed(2)}`
  }

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`
  }

  const formatDelta = (delta: number): string => {
    return `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`
  }

  if (loading) {
    return (
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#f3f1ec] border-[#e0e0e0]">
              <CardContent className="p-6">
                <div className="text-center py-4 text-gray-500">
                  Carregando...
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-8">
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  if (!ordersMetrics) {
    return (
      <div className="mb-8">
        <div className="text-center py-8 text-gray-500">
          Nenhuma métrica disponível
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultsKPICard
          title="Taxa de Aprovação"
          value={formatPercentage(ordersMetrics.approvalRate)}
          change={ordersMetrics.approvalRateDelta ? formatDelta(ordersMetrics.approvalRateDelta) : undefined}
          changeType={ordersMetrics.approvalRateDelta >= 0 ? "up" : "down"}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <ResultsKPICard
          title="Taxa de Recusa"
          value={formatPercentage(ordersMetrics.disapprovalRate)}
          change={ordersMetrics.disapprovalRateDelta ? formatDelta(ordersMetrics.disapprovalRateDelta) : undefined}
          changeType={ordersMetrics.disapprovalRateDelta >= 0 ? "down" : "up"}
          icon={<XCircle className="w-5 h-5" />}
        />
        <ResultsKPICard
          title="Valor Aprovado"
          value={formatCurrency(ordersMetrics.totalApprovedAmountCurrent)}
          change={ordersMetrics.totalApprovedAmountDeltaPercent ? formatDelta(ordersMetrics.totalApprovedAmountDeltaPercent) : undefined}
          changeType={ordersMetrics.totalApprovedAmountDeltaPercent >= 0 ? "up" : "down"}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}

