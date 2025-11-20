"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Clock, DollarSign } from "lucide-react"

interface PolicyKPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "up" | "down"
  description: string
  icon: React.ReactNode
  target?: string
  status?: string
}

function PolicyKPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  icon, 
  target,
  status
}: PolicyKPICardProps) {
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
                  {changeType === "up" ? "+" : "-"}{change} vs. período anterior
                </span>
              </div>
            )}
            {status && (
              <div className="text-sm text-green-600 font-medium mb-1">
                {status}
              </div>
            )}
            {target && (
              <div className="text-sm text-gray-500">
                {target}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PolicyKPICards() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PolicyKPICard
          title="Taxa de Aprovação"
          value="88.3%"
          change="2.3%"
          changeType="up"
          description="Últimos 7 dias"
          icon={<Shield className="w-5 h-5" />}
        />
        <PolicyKPICard
          title="Step-up Rate"
          value="13.4%"
          change="0.8%"
          changeType="down"
          description="Challenge + Biometria + Documento"
          icon={<Zap className="w-5 h-5" />}
        />
        <PolicyKPICard
          title="Latência P95"
          value="1189ms"
          status="Dentro do SLA"
          target="Alvo: ≤ 1500ms"
          description=""
          icon={<Clock className="w-5 h-5" />}
        />
        <PolicyKPICard
          title="Custo Estimado"
          value="R$ 529.80"
          change="12.5%"
          changeType="up"
          description="Biometria + Documento"
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}

