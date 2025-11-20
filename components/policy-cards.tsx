"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, AlertCircle, BarChart3, TrendingUp, Circle } from "lucide-react"
import { Separator } from "./ui/separator"

interface PolicyCardProps {
  storeName: string
  platform: string
  status: "active" | "canary"
  statusValue?: string
  version: string
  policyId: string
  details: {
    bot: string
    biometria: string
    vpn: string
    documento: string
  }
  metrics: {
    aprovacao: string
    stepup: string
    latencia: string
  }
  hasAlarms?: boolean
}

function PolicyCard({ 
  storeName, 
  platform, 
  status, 
  statusValue,
  version, 
  policyId, 
  details, 
  metrics,
  hasAlarms
}: PolicyCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "canary":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {storeName} - {platform}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={getStatusVariant(status) as any} className="text-xs">
                {status === "canary" ? `Canary ${statusValue}` : "Ativa"}
              </Badge>
              <span className="text-sm text-gray-600">
                {version} - {policyId}
              </span>
            </div>
            <div className="space-y-1 mb-4">
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <Circle fill="#1DBE63" className="w-2 h-2 text-[#1DBE63]" />
                <span className="font-medium">Bot:</span> {details.bot}
              </div>
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <Circle fill="#1DBE63" className="w-2 h-2 text-[#1DBE63]" />
                <span className="font-medium">Biometria:</span> {details.biometria}
              </div>
              <div className="text-sm text-gray-700 flex items-center gap-2">
              <Circle fill="#1DBE63" className="w-2 h-2 text-[#1DBE63]" />
                <span className="font-medium">VPN:</span> {details.vpn}
              </div>
              <div className="text-sm text-gray-700 flex items-center gap-2">
              <Circle fill="#1DBE63" className="w-2 h-2 text-[#1DBE63]" />
                <span className="font-medium">Documento:</span> {details.documento}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Aprovação</p>
                <p className="text-sm font-semibold text-green-600">{metrics.aprovacao}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Step-up</p>
                <p className="text-sm font-semibold text-gray-900">{metrics.stepup}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Latência P95</p>
                <p className="text-sm font-semibold text-gray-900">{metrics.latencia}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Button variant="outline" size="sm" className="flex w-full items-center gap-2">
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </Button> 
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
              </Button> 
              {hasAlarms && (
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Alarmes
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PolicyCards() {
  const policies: PolicyCardProps[] = [
    {
      storeName: "Loja Exemplo",
      platform: "Shopify",
      status: "active",
      version: "Versão 3",
      policyId: "pol_001",
      details: {
        bot: "aggressive",
        biometria: "sim",
        vpn: "stepup",
        documento: "sim"
      },
      metrics: {
        aprovacao: "87.5%",
        stepup: "15.6%",
        latencia: "1247ms"
      }
    },
    {
      storeName: "Fashion Store",
      platform: "WooCommerce",
      status: "canary",
      statusValue: "25%",
      version: "Versão 1",
      policyId: "pol_002",
      details: {
        bot: "basic",
        biometria: "sim",
        vpn: "monitor",
        documento: "não"
      },
      metrics: {
        aprovacao: "92.1%",
        stepup: "9.3%",
        latencia: "982ms"
      },
      hasAlarms: true
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {policies.map((policy, index) => (
        <PolicyCard key={index} {...policy} />
      ))}
    </div>
  )
}

