import { create } from "zustand"
import { GetOrder, GetOrders } from "@/services/ordersServices"

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
  customer: {
    name: string,
    email: string,
    phone: string | null,
    platformCustomerId: true
    countryLast: string | null
    scoreGrade: string | null
    chargebackCount: number | null
    refundCount: number | null
    ordersCount: number | null
    hasBiometry: boolean
  }
  riskResults: {
    ip: string,
    ipContinent: string,
    ipCountryCode: string,
    ipCity: string,
    ipAsn: string,
    vpnDetected: boolean,
    proxyDetected: boolean,
    proxyType: string,
    torDetected: boolean,
    botDetected: boolean,
    scorePenalties: string[],
    scoreBonuses: string[],
    biometryNeeded: boolean,
    decision: string,
  }
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

interface OrderState {
  order: Order | null
  loading: boolean
  error: string | null
  fetchOrder: (orderId: string) => Promise<void>
  clearOrder: () => void
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  loading: false,
  error: null,

  fetchOrder: async (orderId: string) => {
    set({ loading: true, error: null })
    try {
      const result = await GetOrder(orderId)
      if (result.success && result.data) {
        set({ order: result.data.data, loading: false })
      } else {
        set({ error: result.data?.message || "Erro ao carregar pedido", loading: false })
      }
    } catch (error: any) {
      set({ error: error?.message || "Erro ao carregar pedido", loading: false })
    }
  },

  clearOrder: () => {
    set({ order: null })
  },
}))
