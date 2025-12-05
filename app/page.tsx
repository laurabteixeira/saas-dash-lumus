"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { StoreCards } from "@/components/integration/store-cards"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AnimationDiv from "@/components/animation/animation-div"
import { useStoresStore, Store } from "@/store/useStoresStore"
import { StorePolicyModal } from "@/components/modals/store-policy-modal"
import { ShopMetricsModal } from "@/components/modals/shop-metrics-modal"
import { MobileMenu } from "@/components/navigation/mobile-menu"

export default function Home() {
  const { fetchStores } = useStoresStore()
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)

  useEffect(() => {
    fetchStores()
  }, [fetchStores])

  const handleConfigurePolicies = (store: Store) => {
    setSelectedStore(store)
    setIsModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setSelectedStore(null)
    }
  }

  const handleViewMetrics = (shopId: string) => {
    setSelectedShopId(shopId)
    setIsMetricsModalOpen(true)
  }

  const handleMetricsModalClose = (open: boolean) => {
    setIsMetricsModalOpen(open)
    if (!open) {
      setSelectedShopId(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/" />
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <MobileMenu currentPath="/" />
              <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Integrações
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Gerencie suas lojas e monitore a saúde das integrações.
              </p>
              </div>
            </div>
            <AnimationDiv position="center">
              <Button variant="success" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Integração
              </Button>
            </AnimationDiv>
          </div>
          <AnimationDiv position="left">
            <StoreCards 
              onConfigurePolicies={handleConfigurePolicies}
              onViewMetrics={handleViewMetrics}
            /> 
          </AnimationDiv>
          
        </div>
      </main>
      <StorePolicyModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        store={selectedStore}
      />
      <ShopMetricsModal
        open={isMetricsModalOpen}
        onOpenChange={handleMetricsModalClose}
        shopId={selectedShopId}
      />
    </div>
  )
}
