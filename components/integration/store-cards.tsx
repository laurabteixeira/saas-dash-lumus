"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, MoreVertical, Settings } from "lucide-react"
import { useStoresStore, Store } from "@/store/useStoresStore"
import { formatDate } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StoreCardProps {
  platform: string
  status: "active" | "paused" | "failed"
  url: string
  id: string
  lastSync?: string
  policy?: string
  currency?: string
  onConfigurePolicies: () => void
}

function StoreCard({ platform, status, url, id, lastSync, policy, currency, onConfigurePolicies }: StoreCardProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "shopify":
        return "rose"
      case "nuvemshop":
        return "blue"
      case "magento":
        return "purple"
      case "wix":
        return "orange"
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-none">
              <DropdownMenuItem 
                onClick={onConfigurePolicies}
              >
                <Settings className="w-4 h-4 mr-2" /> Ver políticas
              </DropdownMenuItem>
              <DropdownMenuItem  
                onClick={() => {}}
              >
                <BarChart3 className="w-4 h-4 mr-2" /> Ver estatísticas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-gray-900">{url}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">ID: {id}</p>
          </div>
          {lastSync && (
            <div>
              <p className="text-xs text-gray-500">Integrado em: {formatDate(lastSync)}</p>
            </div>
          )}
          {policy && (
            <div>
              <p className="text-xs text-gray-500">Política ativa: {policy}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500">Moeda: {currency || "USD"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StoreCardsProps {
  onConfigurePolicies: (store: Store) => void
}

export function StoreCards({ onConfigurePolicies }: StoreCardsProps) {
  const { stores, loading, error } = useStoresStore()

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Lojas Conectadas
        </h2>
        <div className="text-center py-8 text-gray-500">
          Carregando lojas...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Lojas Conectadas
        </h2>
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  if (stores.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Lojas Conectadas (0)
        </h2>
        <div className="text-center py-8 text-gray-500">
          Nenhuma loja conectada ainda.
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Lojas Conectadas ({stores.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((store) => (
          <StoreCard 
            key={store.shopId} 
            platform={(store.platform).toLowerCase() as string}
            status={store.status as "active" | "paused" | "failed"}
            url={store.shopDomain}
            id={store.shopId}
            lastSync={store.createdAt}
            policy={store.shopPolicy.title}
            currency={store.currency}
            onConfigurePolicies={() => onConfigurePolicies(store)}
          />
        ))}
      </div>
    </div>
  )
}

