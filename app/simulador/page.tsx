import { Sidebar } from "@/components/sidebar"
import { SimulatorKPICards } from "@/components/simulator-kpi-cards"
import { ScenarioCards } from "@/components/scenario-cards"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SimuladorPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/simulador" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Simulador de Políticas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Teste o impacto de políticas em dados históricos sem afetar produção
              </p>
            </div>
            <Button variant="success" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Cenário
            </Button>
          </div>
          
          <SimulatorKPICards />
          <ScenarioCards />
        </div>
      </main>
    </div>
  )
}

