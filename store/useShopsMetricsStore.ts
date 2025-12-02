import { create } from "zustand"
import { GetShopsMetrics } from "@/services/merchantMetricsServices"

export interface ShopsMetrics {
  penaltiesRank: [
    {penalty: string, count: number}
  ]
}

interface ShopsMetricsState {
  shopsMetrics: ShopsMetrics | null
  loading: boolean
  error: string | null
  fetchShopsMetrics: () => Promise<void>
  setShopsMetrics: () => void
}

export const useShopsMetricsStore = create<ShopsMetricsState>((set) => ({
  shopsMetrics: null,
  loading: false,
  error: null,

  fetchShopsMetrics: async () => {
    set({ loading: true, error: null })
    try {
      const result = await GetShopsMetrics()
      if (result.success && result.data) {
        set({ shopsMetrics: result.data.data, loading: false })
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

  setShopsMetrics: () => {
    set({ shopsMetrics: null })
  },
}))