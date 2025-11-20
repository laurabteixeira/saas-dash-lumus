"use client"

import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { 
  Shield, 
  Globe, 
  Users, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  DollarSign 
} from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "up" | "down"
  description: string
  icon: React.ReactNode
  target?: string
  timeframe?: string
}

function KPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  icon, 
  target,
  timeframe 
}: KPICardProps) {
  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-gray-500">{icon}</div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            {change && (
              <div className="flex items-center gap-1 text-sm">
                <span className={changeType === "up" ? "text-green-600" : "text-red-600"}>
                  {changeType === "up" ? "↑" : "↓"} {change}
                </span>
                <span className="text-gray-500">vs. semana anterior</span>
              </div>
            )}
            {target && (
              <div className="text-sm text-gray-500 mt-1">
                Alvo: {target}
              </div>
            )}
            {timeframe && (
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

export function KPICards() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">KPIs Globais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Bot Rate"
          value="12.3%"
          change="2.1%"
          changeType="down"
          description="Sessões bloqueadas/desafiadas"
          icon={<Shield className="w-5 h-5" />}
        />
        <KPICard
          title="VPN/Proxy Rate"
          value="8.7%"
          change="0.5%"
          changeType="up"
          description="Detecção de anonimizadores"
          icon={<Globe className="w-5 h-5" />}
        />
        <KPICard
          title="Step-up Rate"
          value="5.2%"
          change="0.8%"
          changeType="down"
          description="Challenge/biometria/documento"
          icon={<Users className="w-5 h-5" />}
        />
        <KPICard
          title="Aprovação Checkout"
          value="94.8%"
          change="1.2%"
          changeType="up"
          description="Approve vs decline/review"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="Latência Média"
          value="1.2s"
          target="≤ 1.5s"
          description="Decisão no checkout"
          icon={<Clock className="w-5 h-5" />}
        />
        <KPICard
          title="Erros Webhook"
          value="0.3%"
          timeframe="Últimas 24h"
          description="Falhas de entrega"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <KPICard
          title="Conversão"
          value="89.2%"
          change="0.9%"
          changeType="up"
          description="Checkout → order.paid"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="Custo Step-up"
          value="R$ 3.2k"
          timeframe="Mês atual"
          description="Biometria + documento"
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}

