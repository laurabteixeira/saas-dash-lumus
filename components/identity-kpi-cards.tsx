"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  DollarSign 
} from "lucide-react"

interface IdentityKPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "up" | "down"
  description: string
  icon: React.ReactNode
  customChangeText?: string
}

function IdentityKPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  icon,
  customChangeText
}: IdentityKPICardProps) {
  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={changeType === "up" ? "text-green-600" : changeType === "down" ? "text-red-600" : "text-gray-500"}>
                {icon}
              </div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            {(change || customChangeText) && (
              <div className="flex items-center gap-1 text-sm mb-1">
                {customChangeText ? (
                  <span className={changeType === "down" ? "text-red-600" : "text-gray-600"}>
                    {customChangeText}
                  </span>
                ) : (
                  <>
                    <span className={changeType === "up" ? "text-green-600" : "text-red-600"}>
                      {changeType === "up" ? "+" : "-"}{change}
                    </span>
                    <span className="text-gray-500">vs mês anterior</span>
                  </>
                )}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IdentityKPICards() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <IdentityKPICard
          title="Taxa de Conclusão"
          value="92.5%"
          change="2.3%"
          changeType="up"
          description="Verificações concluídas com sucesso"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <IdentityKPICard
          title="Aprovação Pós Step-up"
          value="94.8%"
          change="1.8%"
          changeType="up"
          description="Pedidos aprovados após verificação"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <IdentityKPICard
          title="Impacto na Conversão"
          value="2.5%"
          customChangeText="Abandono durante step-up"
          changeType="down"
          description="Efeito no funil de checkout"
          icon={<TrendingDown className="w-5 h-5" />}
        />
        <IdentityKPICard
          title="Custo por Pedido"
          value="$1.85"
          change="$0.15"
          changeType="down"
          description="Custo médio de verificação"
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}
