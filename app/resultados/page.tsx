"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ResultsKPICards } from "@/components/results-kpi-cards"
import { RejectionReasons } from "@/components/rejection-reasons"
import { ResultsTable } from "@/components/results-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Download, Search } from "lucide-react"
import AnimationDiv from "@/components/animation/animation-div"

export default function ResultadosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [decisionFilter, setDecisionFilter] = useState<string>("all")

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/resultados" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Resultados
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Compras e decisões de risco & identidade
              </p>
            </div>
            <AnimationDiv position="center">
            <div className="flex items-center gap-2">
              <Button variant="success" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
            </AnimationDiv>
          </div>
          
          <AnimationDiv position="left">
          <ResultsKPICards />
          <RejectionReasons />
          
          <div className="flex items-center bg-[#f3f1ec] hover:shadow-lg shadow-sm transition-shadow duration-300 border border-[#e0e0e0] px-6 py-4 rounded-lg gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por Order ID ou nome da loja..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={decisionFilter} onValueChange={setDecisionFilter}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Todas as decisões" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                    <SelectItem
                    value="all"
                    className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white"
                    >
                        Todas as decisões
                    </SelectItem>

                    <SelectItem
                    value="aprovado"
                    className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white"
                    >
                        Aprovado
                    </SelectItem>

                    <SelectItem
                    value="analise"
                    className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white"
                    >
                        Em análise
                    </SelectItem>

                    <SelectItem
                    value="aguardando_biometria"
                    className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white"
                    >
                        Aguardando Biometria
                    </SelectItem>

                    <SelectItem
                    value="revisao_manual"
                    className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white"
                    >
                        Revisão Manual
                    </SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          <ResultsTable searchQuery={searchQuery} decisionFilter={decisionFilter} />
          </AnimationDiv>
        </div>
      </main>
    </div>
  )
}

