import { create } from "zustand"
import { GetShopMetrics, GetShopsMetrics } from "@/services/merchantMetricsServices"

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

interface ShopMetrics {
  totalOrders: number,
  numberOfCurrentOrders: number,
  numberOfCurrentApprovedOrders: number,
  numberOfCurrentManualReviewOrders: number,
  numberOfCurrentPendingOrders: number,
  totalPriceOfApprovedOrders: number,
  ordersPercentageChange: number,
  approvedOrdersPercentageChange: number,
  manualReviewPercentageChange: number,
  totalPriceApprovedPercentageChange: number,
  name: string,
  shopDomain: string
  createdAt: string,
  scorePenalties: string[],
  shopId: string
}

interface ShopMetricsState {
  shopMetrics: ShopMetrics | null
  loading: boolean
  error: string | null
  fetchShopMetrics: (shopId: string) => Promise<void>
  clearShopMetrics: () => void
}

export const useShopMetricsStore = create<ShopMetricsState>((set) => ({
  shopMetrics: null,
  loading: false,
  error: null,

  fetchShopMetrics: async (shopId: string) => {
    set({ loading: true, error: null })
    try {
      const result = await GetShopMetrics(shopId)
      if (result.success && result.data) {
        set({ shopMetrics: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar métrics da loja", loading: false })
      }
    } catch (error: any) {
      set({ error: error?.message || "Erro ao carregar métricas da loja", loading: false })
    }
  },

  clearShopMetrics: () => {
    set({ shopMetrics: null })
  },
}))
