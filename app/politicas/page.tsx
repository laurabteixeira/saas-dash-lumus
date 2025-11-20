"use client"

import { Sidebar } from "@/components/sidebar"
import { PolicyKPICards } from "@/components/policy-kpi-cards"
import { PolicyCards } from "@/components/policy-cards"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { File, FileSearch, List, Plus, TestTube } from "lucide-react"

export default function PoliticasPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPath="/politicas" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Políticas de Risco
              </h1>
              <p className="text-gray-600">
                Crie, teste e publique regras de detecção de fraude e step-up de identidade
              </p>
            </div>
            <Button variant="success" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Política
            </Button>
          </div>
          
          <PolicyKPICards />
          
          <div className="flex items-center gap-4 justify-center pb-6">
            <Button variant="outline" className="group cursor-pointer flex hover:bg-[#1DBE63] hover:text-white flex-col h-full p-4 items-center gap-2 w-full">
              <File className="w-4 h-4 text-[#1DBE63] group-hover:text-white" />
              Templates
            </Button>
            <Button variant="outline" className="group cursor-pointer flex hover:bg-[#1DBE63] hover:text-white flex-col h-full p-4 items-center gap-2 w-full">
              <List className="w-4 h-4 text-[#1DBE63] group-hover:text-white" />
              Listas
            </Button>
            <Button variant="outline" className="group cursor-pointer flex hover:bg-[#1DBE63] hover:text-white flex-col h-full p-4 items-center gap-2 w-full">
              <TestTube className="w-4 h-4 text-[#1DBE63] group-hover:text-white" />
              Testes
            </Button>
            <Button variant="outline" className="group cursor-pointer flex hover:bg-[#1DBE63] hover:text-white flex-col h-full p-4 items-center gap-2 w-full">
              <FileSearch className="w-4 h-4 text-[#1DBE63] group-hover:text-white" />
              Auditorias
            </Button>
          </div>
          
          <Tabs defaultValue="ativas" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="ativas">Ativas (2)</TabsTrigger>
              <TabsTrigger value="rascunhos">Rascunhos (0)</TabsTrigger>
              <TabsTrigger value="arquivadas">Arquivadas (0)</TabsTrigger>
            </TabsList>
            <TabsContent className="" value="ativas">
              <PolicyCards />
            </TabsContent>
            <TabsContent value="rascunhos">
              <div className="text-center py-8 text-gray-500">
                Nenhum rascunho encontrado
              </div>
            </TabsContent>
            <TabsContent value="arquivadas">
              <div className="text-center py-8 text-gray-500">
                Nenhuma política arquivada
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

