"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, TrendingUp, Copy } from "lucide-react"

interface ScenarioCardProps {
  title: string
  status: "completo" | "processando"
  store: string
  platform: string
  policy: string
  dateRange: string
  sample: string
  timestamp: string
}

function ScenarioCard({ 
  title, 
  status, 
  store, 
  platform, 
  policy, 
  dateRange, 
  sample, 
  timestamp 
}: ScenarioCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completo":
        return "success"
      case "processando":
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <div className="mb-3">
              <Badge variant={getStatusVariant(status) as any} className="text-xs">
                {status === "completo" ? "Completo" : "Processando"}
              </Badge>
            </div>
            <div className="space-y-1 mb-4">
              <p className="text-sm text-gray-700">
                {store} ({platform})
              </p>
              <p className="text-sm text-gray-700">
                {policy} • {dateRange} • {sample}
              </p>
              <p className="text-xs text-gray-500">
                {timestamp}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Abrir
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Comparar
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ScenarioCards() {
  const scenarios: ScenarioCardProps[] = [
    {
      title: "Teste Política v3 - Black Friday",
      status: "completo",
      store: "Loja Principal",
      platform: "Shopify",
      policy: "Política v3",
      dateRange: "31/12/2024 - 31/01/2025",
      sample: "100% da amostra",
      timestamp: "15/01/2025, 07:00:00"
    },
    {
      title: "Política v4 - Ajustes de Threshold",
      status: "completo",
      store: "Loja Principal",
      platform: "Shopify",
      policy: "Política v4",
      dateRange: "31/12/2024 - 31/01/2025",
      sample: "100% da amostra",
      timestamp: "16/01/2025, 11:00:00"
    },
    {
      title: "Teste Regional - São Paulo",
      status: "processando",
      store: "Loja Teste",
      platform: "WooCommerce",
      policy: "Política v2",
      dateRange: "01/01/2025 - 31/01/2025",
      sample: "50% da amostra",
      timestamp: "19/11/2025, 12:30:00"
    }
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Cenários Salvos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario, index) => (
          <ScenarioCard key={index} {...scenario} />
        ))}
      </div>
    </div>
  )
}

