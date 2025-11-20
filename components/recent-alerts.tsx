"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Alert {
  severity: "critical" | "high" | "medium"
  timestamp: string
  description: string
  integration?: string
}

export function RecentAlerts() {
  const alerts: Alert[] = [
    {
      severity: "critical",
      timestamp: "08/10/2025, 07:30:00",
      description: "Taxa de entrega de webhooks abaixo de 99% nas últimas 2h",
      integration: "int-shopify-001"
    },
    {
      severity: "critical",
      timestamp: "08/10/2025, 06:15:00",
      description: "Latência p95 de decisão acima de 1800ms"
    },
    {
      severity: "high",
      timestamp: "08/10/2025, 05:00:00",
      description: "Atraso na ingestão detectado: p95 = 145s"
    }
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">critical</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white border-transparent">high</Badge>
      case "medium":
        return <Badge className="bg-yellow-600 text-white border-transparent">medium</Badge>
      default:
        return null
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "high":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Alertas Recentes</CardTitle>
          <Link href="/observabilidade/alertas" className="text-sm text-gray-500 font-semibold hover:text-gray-600 hover:bg-green-500 hover:text-white rounded-md py-2 transition-colors durantion-300 px-4">
            Ver todos
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getSeverityBadge(alert.severity)}
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-900 mb-1">{alert.description}</p>
                {alert.integration && (
                  <p className="text-xs text-gray-500">Integração: {alert.integration}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
