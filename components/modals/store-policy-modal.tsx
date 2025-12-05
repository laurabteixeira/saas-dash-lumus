"use client"

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Store } from "@/store/useStoresStore"
import { formatDate } from "@/lib/utils"
import { FileText, Pen, ScanFace, ShieldCheck, Users } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

interface StorePolicyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  store: Store | null
}

export function StorePolicyModal({ open, onOpenChange, store }: StorePolicyModalProps) {
  const router = useRouter()  
  if (!store) return null

  const policy = store.shopPolicy

  const handleEdit = () => {
    onOpenChange(false)
    router.push(`/politicas/${store.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto bg-[#ffffff]">
        <DialogHeader className="pt-3">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Políticas da Loja
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {store.name} - {store.shopDomain}
              </DialogDescription>
            </div>
            <div>
              <Button variant="success" className="flex items-center gap-2" onClick={handleEdit}>
                <Pen className="w-4 h-4" />
                  Editar
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" /> Informações da Política
            </h3>
            <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="space-y-2 mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Título:</span>
                    <span className="text-sm font-medium text-gray-900">{policy.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Criada em:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(policy.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Atualizada em:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(policy.updatedAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-[#eaeaea]" />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2" /> Configurações de Bloqueio
            </h3>
            <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="space-y-3 mt-6">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Países de Destino Bloqueados:
                    </span>
                    {policy.blockedCountriesDestination && policy.blockedCountriesDestination.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {policy.blockedCountriesDestination.map((country, index) => (
                          <Badge key={index} variant="success" className="text-xs">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">Nenhum país bloqueado</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Países de Origem Bloqueados:
                    </span>
                    {policy.blockedCountriesOrigin && policy.blockedCountriesOrigin.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {policy.blockedCountriesOrigin.map((country, index) => (
                          <Badge key={index} variant="success" className="text-xs">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">Nenhum país bloqueado</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>

          <Separator className="bg-[#eaeaea]" />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" /> Limites do Cliente
            </h3>

            <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <span className="text-sm text-gray-600">Máximo de Chargebacks:</span>
                    <p className="text-lg font-semibold text-gray-900">
                      {policy.maxChargebacksPerCustomer}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Máximo de Reembolsos:</span>
                    <p className="text-lg font-semibold text-gray-900">
                      {policy.maxRefundsPerCustomer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-[#eaeaea]" />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <ScanFace className="w-4 h-4 mr-2" /> Configurações de Biometria
            </h3>
            <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="mt-6">
                  <span className="text-sm text-gray-600">Valor Mínimo para Biometria:</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {store.currency} {policy.biometricMinOrderAmount.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

