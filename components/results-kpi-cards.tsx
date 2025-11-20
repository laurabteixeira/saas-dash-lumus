"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, DollarSign } from "lucide-react"

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
                  {changeType === "up" ? "+" : ""}{change} vs período anterior
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
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultsKPICard
          title="Taxa de Aprovação"
          value="72.5%"
          change="2.3%"
          changeType="up"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <ResultsKPICard
          title="Taxa de Recusa"
          value="18.2%"
          change="1.2%"
          changeType="down"
          icon={<XCircle className="w-5 h-5" />}
        />
        <ResultsKPICard
          title="Latência p95"
          value="1450ms"
          target="Dentro do SLO (≤1500ms)"
          icon={<Clock className="w-5 h-5" />}
        />
        <ResultsKPICard
          title="Valor Aprovado"
          value="R$ 2846k"
          change="12.5%"
          changeType="up"
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}

