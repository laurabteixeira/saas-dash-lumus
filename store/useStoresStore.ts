import { create } from "zustand"
import { GetStore, GetStores } from "@/services/storeServices"

export interface Store {
  id: string,
  shopId: string,
  name: string,
  shopDomain: string
  platform: string,
  shopContactEmail: string,
  status: string,
  currency: string,
  shopPolicy: {
    id: string,
    title: string,
    blockedCountriesDestination: string[],
    blockedCountriesOrigin: string[],
    maxChargebacksPerCustomer: number,
    maxRefundsPerCustomer: number,
    biometricMinOrderAmount: number,
    createdAt: string,
    updatedAt: string,
  },
  createdAt: string,
}

interface StoresState {
  stores: Store[]
  loading: boolean
  error: string | null
  fetchStores: () => Promise<void>
  setStores: (stores: Store[]) => void
}

export const useStoresStore = create<StoresState>((set) => ({
  stores: [],
  loading: false,
  error: null,

  fetchStores: async () => {
    set({ loading: true, error: null })
    try {
      const result = await GetStores()
      if (result.success && result.data) {
        set({ stores: result.data.data, loading: false })
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

  setStores: (stores: Store[]) => {
    set({ stores })
  },
}))

interface StoreState {
  store: Store | null
  loading: boolean
  error: string | null
  fetchStore: (shopId: string) => Promise<void>
  clearStore: () => void
}

export const useStoreStore = create<StoreState>((set) => ({
  store: null,
  loading: false,
  error: null,

  fetchStore: async (shopId: string) => {
    set({ loading: true, error: null })
    try {
      const result = await GetStore(shopId)
      if (result.success && result.data) {
        set({ store: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar loja", loading: false })
      }
    } catch (error: any) {
      set({ error: error?.message || "Erro ao carregar loja", loading: false })
    }
  },

  clearStore: () => {
    set({ store: null })
  },
}))
