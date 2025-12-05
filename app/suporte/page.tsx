"use client"

import { useEffect, useState } from "react"
import AnimationDiv from "@/components/animation/animation-div"
import { Sidebar } from "@/components/navigation/sidebar"
import { SupportKPICards } from "@/components/support/support-kpi-cards"
import { TicketsTable } from "@/components/support/tickets-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTicketsStore } from "@/store/useTicketsStore"
import { CreateTicketModal } from "@/components/modals/create-ticket-modal"
import { MobileMenu } from "@/components/navigation/mobile-menu"

export default function SuportePage() {
  const { fetchTickets } = useTicketsStore()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const handleTicketCreated = () => {
    fetchTickets()
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/suporte" />
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <MobileMenu currentPath="/suporte" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Suporte
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Gerencie tickets e atendimento ao cliente
                </p>
              </div>
            </div>
            <AnimationDiv position="center">
              <Button 
                variant="success" 
                className="flex items-center gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
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
      <CreateTicketModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  )
}
