"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Inbox, 
  Clock, 
  CheckCircle, 
  Star 
} from "lucide-react"

interface SupportKPICardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function SupportKPICard({ 
  title, 
  value, 
  description, 
  icon
}: SupportKPICardProps) {
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
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SupportKPICards() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SupportKPICard
          title="Backlog Total"
          value="30"
          description="12 abertos · 3 escalados"
          icon={<Inbox className="w-5 h-5" />}
        />
        <SupportKPICard
          title="FRT (p90)"
          value="180 min"
          description="p50: 45 min"
          icon={<Clock className="w-5 h-5" />}
        />
        <SupportKPICard
          title="SLA Atingido"
          value="92.5%"
          description="3 violados"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <SupportKPICard
          title="CSAT Médio"
          value="4.2/5"
          description="5.3% reabertos"
          icon={<Star className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}
