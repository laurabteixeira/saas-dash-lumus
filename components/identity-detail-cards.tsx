"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  TrendingUp, 
  Zap 
} from "lucide-react"

interface DetailCardProps {
  title: string
  metrics: { label: string; value: string }[]
  target: string
  icon: React.ReactNode
}

function DetailCard({ title, metrics, target, icon }: DetailCardProps) {
  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="text-green-600">
            {icon}
          </div>
        </div>
        <div className="space-y-2 mb-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">{metric.label}:</span>
              <span className="text-lg font-bold text-gray-900">{metric.value}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {target}
        </div>
      </CardContent>
    </Card>
  )
}

export function IdentityDetailCards() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DetailCard
          title="Latência Biometria"
          metrics={[
            { label: "p95", value: "6800ms" },
            { label: "p99", value: "9200ms" }
          ]}
          target="Alvo: ≤ 8000ms"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <DetailCard
          title="Latência Documento"
          metrics={[
            { label: "p95", value: "7500ms" },
            { label: "p99", value: "10200ms" }
          ]}
          target="Alvo: ≤ 9000ms"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <DetailCard
          title="Qualidade de Serviço"
          metrics={[
            { label: "Webhook Success", value: "99.4%" },
            { label: "Taxa de Erro", value: "0.8%" }
          ]}
          target="Alvo: < 1% erros"
          icon={<Zap className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}
