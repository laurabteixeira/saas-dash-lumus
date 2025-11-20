"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, CheckCircle2, Zap, Clock } from "lucide-react"

interface SimulatorKPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "up" | "down"
  description?: string
  icon: React.ReactNode
  target?: string
}

function SimulatorKPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  icon, 
  target
}: SimulatorKPICardProps) {
  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-green-600">{icon}</div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            {change && (
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className={changeType === "up" ? "text-green-600" : "text-red-600"}>
                  {changeType === "up" ? "+" : ""}{change} vs mês anterior
                </span>
              </div>
            )}
            {target && (
              <div className="text-sm text-gray-500 mt-1">
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

export function SimulatorKPICards() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimulatorKPICard
          title="Checkouts (30d)"
          value="37.500"
          description="Volume total simulado"
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <SimulatorKPICard
          title="Taxa de Aprovação"
          value="95.2%"
          change="2.3%"
          changeType="up"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <SimulatorKPICard
          title="Step-up Rate"
          value="20.5%"
          description="Challenge + Biometria + Documento"
          icon={<Zap className="w-5 h-5" />}
        />
        <SimulatorKPICard
          title="Latência p95"
          value="1150ms"
          target="≤1500ms"
          icon={<Clock className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}

