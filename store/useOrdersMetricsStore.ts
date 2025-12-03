import { create } from "zustand"
import { GetOrdersMetrics } from "@/services/merchantMetricsServices"

export interface OrdersMetrics {
  approvalRate: number,
  disapprovalRate: number,
  totalApprovedAmountCurrent: number,
  approvalRatePercentageChange: number,
  disapprovalRatePercentageChange: number,
  totalApprovedAmountPercentageChange: number,
}

interface OrdersMetricsState {
  ordersMetrics: OrdersMetrics | null
  loading: boolean
  error: string | null
  fetchOrdersMetrics: () => Promise<void>
  setOrdersMetrics: () => void
}

export const useOrdersMetricsStore = create<OrdersMetricsState>((set) => ({
  ordersMetrics: null,
  loading: false,
  error: null,

  fetchOrdersMetrics: async () => {
    set({ loading: true, error: null })
    try {
      const result = await GetOrdersMetrics()
      if (result.success && result.data) {
        set({ ordersMetrics: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar métricas", loading: false })
      }
    } catch (error: any) {
      set({ 
        error: error?.message || "Erro ao carregar métricas", 
        loading: false 
      })
    }
  },

  setOrdersMetrics: () => {
    set({ ordersMetrics: null })
  },
}))