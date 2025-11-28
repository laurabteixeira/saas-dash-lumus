"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useStoreStore } from "@/store/useStoresStore"
import { Sidebar } from "@/components/sidebar"
import { StorePolicyForm } from "@/components/policy/store-policy-form"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function EditStorePolicyPage() {
  const { store, fetchStore, loading, error } = useStoreStore()
  const params = useParams() as { storeId: string }
  const formSubmitRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (params.storeId && !store) {
      fetchStore(params.storeId)
    }
  }, [params.storeId, fetchStore])

  const handleSave = () => {
    if (formSubmitRef.current) {
      formSubmitRef.current()
    }
  }

  if (loading && !store) {
    return <div>Carregando...</div>
  }

  if (error && !store) {
    return <div>Erro ao carregar loja</div>
  }

  if (!store) {
    return <div>Loja não encontrada</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/politicas" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Editar Políticas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {store.name} - {store.shopDomain}
              </p>
            </div>
            <Button variant="success" onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Salvar atualizações
            </Button>
          </div>
          <StorePolicyForm store={store} onSubmitRef={formSubmitRef} />
        </div>
      </main>
    </div>
  )
}
