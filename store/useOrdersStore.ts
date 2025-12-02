import { create } from "zustand"
import { GetOrders } from "@/services/ordersServices"

export interface Order {
  id: string
  shopId: string
  customerId: string
  platform: string
  platformOrderId: string
  customerScoreGrade: string | null
  items: string[]
  totalPriceCents: number
  currency: string
  tag: string
  status: string
  approvedBy: string | null
  countryDestCode: string
  shop: {
    name: string
  }
  createdAt: string
  updatedAt: string
}

interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
  fetchOrders: () => Promise<void>
  setOrders: (orders: Order[]) => void
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null })
    try {
      const result = await GetOrders()
      if (result.success && result.data) {
        set({ orders: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar lojas", loading: false })
      }
    } catch (error: any) {
      set({ 
        error: error?.message || "Erro ao carregar lojas", 
        loading: false 
      })
    }
  },

  setOrders: (orders: Order[]) => {
    set({ orders })
  },
}))
