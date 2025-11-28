"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { KPICards } from "@/components/kpi-cards"
import { StoreCards } from "@/components/integration/store-cards"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AnimationDiv from "@/components/animation/animation-div"
import { useStoresStore, Store } from "@/store/useStoresStore"
import { StorePolicyModal } from "@/components/modals/store-policy-modal"

export default function Home() {
  const { fetchStores } = useStoresStore()
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Integrações
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gerencie suas lojas e monitore a saúde das integrações.
              </p>
            </div>
            <AnimationDiv position="center">
              <Button variant="success" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Integração
              </Button>
            </AnimationDiv>
          </div>
          {/*<AnimationDiv position="left">
            <KPICards />
          </AnimationDiv>*/}
          <AnimationDiv position="left">
            <StoreCards onConfigurePolicies={handleConfigurePolicies} /> 
          </AnimationDiv>
          
        </div>
      </main>
      <StorePolicyModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        store={selectedStore}
      />
    </div>
  )
}
