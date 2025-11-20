"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Activity, 
  Bot, 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Link as LinkIcon, 
  Database, 
  DollarSign,
  AlertTriangle
} from "lucide-react"

interface ObservabilityKPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "up" | "down"
  description: string
  icon: React.ReactNode
  target?: string
  timeframe?: string
  breakdown?: string
}

function ObservabilityKPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  icon, 
  target,
  timeframe,
  breakdown
}: ObservabilityKPICardProps) {
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
            {breakdown && (
              <div className="text-sm text-gray-600 mb-1">
                {breakdown}
              </div>
            )}
            {change && (
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className={changeType === "up" ? "text-green-600" : "text-red-600"}>
                  {changeType === "up" ? "+" : "-"}{change}
                </span>
                {timeframe && (
                  <span className="text-gray-500">{timeframe}</span>
                )}
              </div>
            )}
            {target && (
              <div className="text-sm text-gray-500 mt-1">
                {target}
              </div>
            )}
            {!change && !target && timeframe && (
              <div className="text-sm text-gray-500 mt-1">
                {timeframe}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ObservabilityKPICards() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ObservabilityKPICard
          title="Sessões Analisadas"
          value="125.840"
          change="12.5%"
          changeType="up"
          timeframe="Últimas 24h"
          description="Total de sessões processadas"
          icon={<Activity className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Taxa Bot/VPN"
          value="12.4% / 8.7%"
          change="2.1%"
          changeType="down"
          description="Bot / VPN detectados"
          icon={<Bot className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Step-up Rate"
          value="26.8%"
          change="3.2%"
          changeType="up"
          breakdown="Challenge 15.2% | Bio 8.5% | Doc 3.1%"
          description="Taxa de step-up aplicado"
          icon={<Shield className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Aprovação Checkout"
          value="94.2%"
          change="1.8%"
          changeType="up"
          description="Taxa de aprovação"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Conversão"
          value="87.8%"
          change="2.3%"
          changeType="up"
          description="Checkout → Pedido pago"
          icon={<Activity className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Latência p95"
          value="1240ms"
          change="50ms"
          changeType="down"
          target="Alvo ≤ 1500ms"
          description="Latência percentil 95"
          icon={<Clock className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Webhooks 1ª Tentativa"
          value="98.9%"
          change="0.3%"
          changeType="down"
          description="Sucesso na entrega"
          icon={<LinkIcon className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Ingestão Lag p95"
          value="85s"
          change="15s"
          changeType="down"
          description="Atraso de processamento"
          icon={<Database className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Custo Estimado"
          value="R$4.250"
          change="320"
          changeType="up"
          timeframe="Últimas 24h"
          description="Verificações de identidade"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <ObservabilityKPICard
          title="Alertas Abertos"
          value="3"
          change=""
          changeType="up"
          timeframe="Últimas 24h"
          description="2 crítico | 1 alto"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}
