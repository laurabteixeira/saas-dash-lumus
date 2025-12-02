"use client"

import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, FileText, AlertTriangle } from "lucide-react"
import { useOrdersStore } from "@/store/useOrdersStore"
import { formatDate } from "@/lib/utils"

interface ResultsTableRowData {
  orderId: string
  store: string
  value: string
  decision: "aprovado" | "recusado" | "revisao"
  stepup: string
  stepupStatus?: "success" | "failed"
  country: string
  hasVpn?: boolean
  hasWarning?: boolean
  latency: string
  date: string
}

function ResultsTableRow({
  orderId,
  store,
  value,
  decision,
  stepup,
  stepupStatus,
  country,
  hasVpn,
  hasWarning,
  latency,
  date
}: ResultsTableRowData) {
  const getDecisionVariant = (decision: string) => {
    switch (decision) {
      case "aprovado":
        return "success"
      case "recusado":
        return "destructive"
      case "revisao":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStepupVariant = (status?: string) => {
    if (status === "failed") return "destructive"
    return "secondary"
  }

  return (
    <TableRow className="bg-[#f3f1ec] border-b border-[#e0e0e0]">
      <TableCell className="text-sm">
        <div>
          <div className="font-medium text-gray-900">{orderId}</div>
        </div>
      </TableCell>
      <TableCell className="text-sm text-gray-700">{store}</TableCell>
      <TableCell className="text-sm text-gray-700 font-medium">{value}</TableCell>
      <TableCell>
        <Badge variant={getDecisionVariant(decision) as any} className="text-xs">
          {decision === "aprovado" ? "Aprovado" : decision === "recusado" ? "Recusado" : "Revisão Manual"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getStepupVariant(stepupStatus) as any} className="text-xs">
          {stepup}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-700">{country}</span>
          {hasVpn && (
            <Badge variant="warning" className="text-xs ml-1">VPN</Badge>
          )}
          {hasWarning && (
            <AlertTriangle className="w-3 h-3 text-orange-500" />
          )}
        </div>
      </TableCell>
      <TableCell className="text-sm text-gray-700">{latency}</TableCell>
      <TableCell className="text-sm text-gray-500">{date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

interface ResultsTableProps {
  searchQuery?: string
}

export function ResultsTable({ searchQuery = "" }: ResultsTableProps) {
  const { orders, loading, error, fetchOrders } = useOrdersStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const formatCurrency = (cents: number, currency: string): string => {
    const amount = cents / 100
    const currencySymbol = currency === "USD" ? "$" : currency === "BRL" ? "R$" : currency
    return `${currencySymbol} ${amount.toFixed(2)}`
  }

  const mapTagToDecision = (tag: string): "aprovado" | "recusado" | "revisao" => {
    switch (tag.toUpperCase()) {
      case "APPROVED":
        return "aprovado"
      case "REJECTED":
      case "DENIED":
        return "recusado"
      case "PENDING":
      case "REVIEW":
        return "revisao"
      default:
        return "revisao"
    }
  }

  const calculateLatency = (createdAt: string, updatedAt: string): string => {
    try {
      const created = new Date(createdAt).getTime()
      const updated = new Date(updatedAt).getTime()
      const diffMs = updated - created
      
      if (diffMs < 1000) {
        return `${diffMs}ms`
      } else {
        return `${(diffMs / 1000).toFixed(2)}s`
      }
    } catch {
      return "-"
    }
  }

  const allRows: ResultsTableRowData[] = orders.map((order) => ({
    orderId: order.platformOrderId,
    store: order.shop?.name || order.shopId,
    value: formatCurrency(order.totalPriceCents, order.currency),
    decision: mapTagToDecision(order.tag),
    stepup: order.approvedBy ? `${order.approvedBy} → approved` : "Não requerido",
    stepupStatus: order.approvedBy ? "success" : undefined,
    country: order.countryDestCode,
    date: formatDate(order.createdAt),
    latency: calculateLatency(order.createdAt, order.updatedAt),
  }))

  const filteredRows = allRows.filter((row) => {
    if (!searchQuery.trim()) {
      return true
    }
    const query = searchQuery.toLowerCase().trim()
    const orderIdMatch = row.orderId.toLowerCase().includes(query)
    return orderIdMatch 
  })

  if (loading) {
    return (
      <div className="bg-[#f3f1ec] rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
        <div className="text-center py-8 text-gray-500">
          Carregando pedidos...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#f3f1ec] rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f3f1ec] rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f3f1ec] border-b border-[#e0e0e0]">
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Order ID
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Loja
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Valor
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Decisão
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Step-up
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              País
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Latência
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Data
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#f3f1ec]">
          {filteredRows.length > 0 ? (
            filteredRows.map((row, index) => {
              const order = orders.find((o) => o.platformOrderId === row.orderId)
              return <ResultsTableRow key={order?.id || `order-${index}`} {...row} />
            })
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                Nenhum resultado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

