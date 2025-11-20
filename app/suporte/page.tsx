"use client"

import AnimationDiv from "@/components/animation/animation-div"
import { Sidebar } from "@/components/sidebar"
import { SupportKPICards } from "@/components/support-kpi-cards"
import { TicketsTable } from "@/components/tickets-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SuportePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/suporte" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Suporte
              </h1>
              <p className="text-gray-600">
                Gerencie tickets e atendimento ao cliente
              </p>
            </div>
            <AnimationDiv position="center">
              <Button variant="success" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Abrir Ticket
              </Button>
            </AnimationDiv>
          </div>

          <AnimationDiv position="left">
            <SupportKPICards />
            
            <TicketsTable />
          </AnimationDiv>
        </div>
      </main>
    </div>
  )
}
