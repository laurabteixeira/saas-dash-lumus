"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Inbox, 
  CheckCircle
} from "lucide-react"
import { useTicketsStore } from "@/store/useTicketsStore"

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
  const { tickets, loading } = useTicketsStore()

  const kpis = useMemo(() => {
    const totalTickets = tickets.length
    const pendingTickets = tickets.filter(t => t.status.toUpperCase() === "PENDING").length
    const resolvedTickets = tickets.filter(t => t.status.toUpperCase() === "RESOLVED").length
    const closedTickets = tickets.filter(t => t.status.toUpperCase() === "CLOSED").length

    const completedTickets = tickets.filter(t => 
      t.status.toUpperCase() === "RESOLVED" || t.status.toUpperCase() === "CLOSED"
    )
    
    const ticketsWithGoodSla = completedTickets.filter(t => {
      const slaStatus = t.slaStatus?.toUpperCase()
      return slaStatus === "FAST" || slaStatus === "NORMAL"
    }).length

    const slaPercentage = completedTickets.length > 0
      ? ((ticketsWithGoodSla / completedTickets.length) * 100).toFixed(1)
      : "0"

    const criticalSlaCount = completedTickets.filter(t => {
      const slaStatus = t.slaStatus?.toUpperCase()
      return slaStatus === "CRITICAL"
    }).length

    return {
      totalTickets,
      pendingTickets,
      resolvedTickets,
      closedTickets,
      slaPercentage,
      criticalSlaCount,
      completedTicketsCount: completedTickets.length
    }
  }, [tickets])

  if (loading) {
    return (
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2].map((i) => (
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

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SupportKPICard
          title="Todos os Tickets"
          value={kpis.totalTickets.toString()}
          description={`${kpis.pendingTickets} abertos · ${kpis.resolvedTickets} resolvidos`}
          icon={<Inbox className="w-5 h-5" />}
        />
        <SupportKPICard
          title="SLA Atingido"
          value={`${kpis.slaPercentage}%`}
          description={kpis.criticalSlaCount > 0 ? `${kpis.criticalSlaCount} críticos` : "Sem violações"}
          icon={<CheckCircle className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}
