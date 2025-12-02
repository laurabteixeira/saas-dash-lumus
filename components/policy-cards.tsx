"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pen, Globe, ShieldCheck, ScanFace } from "lucide-react"
import { Separator } from "./ui/separator"
import { useStoresStore } from "@/store/useStoresStore"

interface PolicyCardProps {
  id: string
  storeName: string
  platform: string
  status: string
  title: string
  currency: string
  policyId: string
  shopId: string
  blockedCountriesDestination: string[]
  blockedCountriesOrigin: string[]
  maxChargebacksPerCustomer: number
  maxRefundsPerCustomer: number
  biometricMinOrderAmount: number
}

function PolicyCard({ 
  id,
  storeName, 
  platform, 
  status, 
  title, 
  currency,
  blockedCountriesDestination,
  blockedCountriesOrigin,
  maxChargebacksPerCustomer,
  maxRefundsPerCustomer,
  biometricMinOrderAmount,
  policyId,
  shopId,
}: PolicyCardProps) {
  const router = useRouter()

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

  const handleEditPolicy = () => {
    router.push(`/politicas/${id}`)
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
                {status}
              </Badge>
              <span className="text-sm text-gray-800 font-semibold">
                {title}
              </span>
            </div>
            
            <Separator className="my-4 bg-[#e0e0e0]" />
            
            <div className="flex justify-between">
              <div className="space-y-2 mb-4">
                <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2"><Globe className="w-4 h-4" /> Restrições geográficas:</h3>
                <div className="flex items-center gap-2 mb-3">
                  {blockedCountriesOrigin.length > 0 ? (
                    <div>
                      <p className="text-sm text-gray-700">Não recebe pedidos de:</p>
                      <Badge variant="success" className="text-xs">
                        {blockedCountriesOrigin.join(", ")}
                      </Badge>
                    </div>
                  ): (
                    <div>
                      <p className="text-sm text-gray-700">Recebe pedidos de qualquer país.</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {blockedCountriesDestination.length > 0 ? (
                    <div>
                      <p className="text-sm text-gray-700">Não entrega pedidos em:</p>
                      <Badge variant="success" className="text-xs">
                        {blockedCountriesDestination.join(", ")}
                      </Badge>
                    </div>
                  ): (
                    <div>
                      <p className="text-sm text-gray-700">Entrega pedidos em qualquer país.</p>
                    </div>
                  )}
                </div>
              </div>


              <div className="space-y-2 mb-4">
                <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Limites de chargebacks e refunds:</h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-gray-700">Chargebacks por cliente: <span className="font-bold text-gray-900">{maxChargebacksPerCustomer}</span></p>
                  <p className="text-sm text-gray-700">Refunds por cliente: <span className="font-bold text-gray-900">{maxRefundsPerCustomer}</span></p>
                </div>

                <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2"><ScanFace className="w-4 h-4" /> Biometria:</h3>
                <p className="text-sm text-gray-700">Pedido requer biometria: <span className="font-bold text-gray-900">{currency} {biometricMinOrderAmount},00</span></p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex w-full items-center gap-2"
                onClick={handleEditPolicy}
              >
                <Pen className="w-4 h-4" />
                Alterar política
              </Button> 
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PolicyCards() {
  const { stores, loading, error } = useStoresStore()

  if (loading) {
    return (
      <div>
        <div className="text-center py-8 text-gray-500">
          Carregando políticas...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  if (stores.length === 0) {
    return (
      <div>
        <div className="text-center py-8 text-gray-500">
          Nenhuma política encontrada.
        </div>
      </div>
    )
  }

  // Map stores to policy cards
  const policies: PolicyCardProps[] = stores.map((store) => ({
    id: store.id,
    storeName: store.name,
    platform: store.platform,
    currency: store.currency,
    status: store.status,
    title: store.shopPolicy.title,
    blockedCountriesDestination: store.shopPolicy.blockedCountriesDestination,
    blockedCountriesOrigin: store.shopPolicy.blockedCountriesOrigin,
    maxChargebacksPerCustomer: store.shopPolicy.maxChargebacksPerCustomer,
    maxRefundsPerCustomer: store.shopPolicy.maxRefundsPerCustomer,
    biometricMinOrderAmount: store.shopPolicy.biometricMinOrderAmount,
    policyId: store.shopPolicy.id || store.shopId,
    shopId: store.shopId,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {policies.map((policy, index) => (
        <PolicyCard key={stores[index].shopId} {...policy} />
      ))}
    </div>
  )
}

