"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { PolicyCards } from "@/components/policy/policy-cards"
import AnimationDiv from "@/components/animation/animation-div"
import { useStoresStore } from "@/store/useStoresStore"
import { useEffect } from "react"
import { MobileMenu } from "@/components/navigation/mobile-menu"

export default function PoliticasPage() {
  const { fetchStores } = useStoresStore()

  useEffect(() => {
    fetchStores()
  }, [fetchStores])
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPath="/politicas" />
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MobileMenu currentPath="/politicas" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Políticas de Risco
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Confira as políticas de risco de cada loja e edite-as conforme necessário
                </p>
              </div>
            </div>
          </div>
          
          <AnimationDiv position="left">
            <PolicyCards />
          </AnimationDiv>
        </div>
      </main>
    </div>
  )
}

