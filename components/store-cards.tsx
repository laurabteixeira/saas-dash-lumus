"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreVertical } from "lucide-react"

interface StoreCardProps {
  platform: string
  status: "active" | "paused" | "failed"
  url: string
  id: string
  lastSync: string
  policy?: string
  currency: string
}

function StoreCard({ platform, status, url, id, lastSync, policy, currency }: StoreCardProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "shopify":
        return "rose"
      case "woocommerce":
        return "purple"
      case "magento":
        return "orange"
      case "wix":
        return "blue"
      default:
        return "default"
    }
  }

  const getStatusBorder = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-500"
      case "paused":
        return "border-amber-500"
      case "failed":
        return "border-red-500"
      default:
        return "border-gray-300"
    }
  }  

  const getStatusDot = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-amber-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={getPlatformColor(platform) as any} className="text-xs">
              {platform}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs flex items-center gap-1 ${getStatusBorder(status)}`}
            >
              <span className={`w-2 h-2 rounded-full ${getStatusDot(status)}`}></span>
              {status}
            </Badge>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-gray-900">{url}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">ID: {id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Última sincronização: {lastSync}</p>
          </div>
          {policy && (
            <div>
              <p className="text-xs text-gray-500">Política ativa: {policy}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500">Moeda: {currency}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StoreCards() {
  const stores: StoreCardProps[] = [
    {
      platform: "shopify",
      status: "active",
      url: "loja-exemplo.myshopify.com",
      id: "int_abc123",
      lastSync: "há 5 minutos",
      policy: "v3 e Canary 10%",
      currency: "BRL",
    },
    {
      platform: "woocommerce",
      status: "active",
      url: "shop.exemplo.com.br",
      id: "int_def456",
      lastSync: "há 2 horas",
      policy: "v2",
      currency: "USD",
    },
    {
      platform: "magento",
      status: "paused",
      url: "store.exemplo.com",
      id: "int_ghi789",
      lastSync: "há 1 dia",
      policy: "v1",
      currency: "EUR",
    },
    {
      platform: "wix",
      status: "failed",
      url: "minhaloja.wixsite.com/loja",
      id: "int_jkl012",
      lastSync: "há 3 dias",
      currency: "BRL",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Lojas Conectadas ({stores.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((store) => (
          <StoreCard key={store.id} {...store} />
        ))}
      </div>
    </div>
  )
}

