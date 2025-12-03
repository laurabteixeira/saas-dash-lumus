import { create } from "zustand"
import { GetTicket, GetTickets } from "@/services/ticketServices"

export interface Ticket {
    id: string,
    merchantId: string,
    title: string,
    description: string,
    status: string,
    timeToResolve: string | null,
    slaStatus: string | null,
    solutionTitle: string | null,
    solutionDescription: string | null,
    resolvedBy: string | null,
    resolvedAt: string | null,
    createdAt: string,
    updatedAt: string,
}

interface TicketsState {
  tickets: Ticket[]
  loading: boolean
  error: string | null
  fetchTickets: () => Promise<void>
  setTickets: (tickets: Ticket[]) => void
}

export const useTicketsStore = create<TicketsState>((set) => ({
  tickets: [],
  loading: false,
  error: null,

  fetchTickets: async () => {
    set({ loading: true, error: null })
    try {
      const result = await GetTickets()
      if (result.success && result.data) {
        set({ tickets: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar tickets", loading: false })
      }
    } catch (error: any) {
      set({ 
        error: error?.message || "Erro ao carregar tickets", 
        loading: false 
      })
    }
  },

  setTickets: (tickets: Ticket[]) => {
    set({ tickets })
  },
}))

interface TicketState {
  ticket: Ticket | null
  loading: boolean
  error: string | null
  fetchTicket: (ticketId: string) => Promise<void>
  clearTicket: () => void
}

export const useTicketStore = create<TicketState>((set) => ({
  ticket: null,
  loading: false,
  error: null,

  fetchTicket: async (ticketId: string) => {
    set({ loading: true, error: null })
    try {
      const result = await GetTicket(ticketId)
      if (result.success && result.data) {
        set({ ticket: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar ticket", loading: false })
      }
    } catch (error: any) {
      set({ error: error?.message || "Erro ao carregar ticket", loading: false })
    }
  },

  clearTicket: () => {
    set({ ticket: null })
  },
}))
