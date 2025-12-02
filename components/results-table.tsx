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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { ActionTooltip } from "./utils/action-tooltip"
import { useRouter } from "next/navigation"

enum OrderTag {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  WAITING_BIOMETRY = "WAITING_BIOMETRY",
  MANUAL_REVIEW = "MANUAL_REVIEW",
}

interface ResultsTableRowData {
  orderId: string
  orderDbId: string
  store: string
  value: string
  decision: "aprovado" | "analise" | "aguardando_biometria" | "revisao_manual"
  aprovacao: string
  origem: string | null
  destino: string
  score: string | null
  country: string
  hasVpn?: boolean
  hasWarning?: boolean
  date: string
}

function ResultsTableRow({
  orderId,
  orderDbId,
  store,
  value,
  decision,
  aprovacao,
  origem,
  destino,
  score,
  country,
  hasVpn,
  hasWarning,
  date
}: ResultsTableRowData) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/resultados/${orderDbId}`)
  }
  const getDecisionVariant = (decision: string) => {
    switch (decision) {
      case "aprovado":
        return "success"
      case "analise":
      case "aguardando_biometria":
      case "revisao_manual":
        return "secondary"
      default:
        return "default"
    }
  }

  const getAprovacaoVariant = (aprovacao: string) => {
    if (aprovacao === "Não requerido") return "secondary"
    return "success"
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
          {decision === "aprovado" 
            ? "Aprovado" 
            : decision === "analise"
            ? "Em análise"
            : decision === "aguardando_biometria"
            ? "Aguardando biometria"
            : "Revisão Manual"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getAprovacaoVariant(aprovacao) as any} className="text-xs">
          {aprovacao}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-gray-700">
        {origem || "-"}
      </TableCell>
      <TableCell className="text-sm text-gray-700">
        {destino}
      </TableCell>
      <TableCell className="text-sm text-gray-700">
        {score ? parseFloat(score).toFixed(2) : "-"}
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
      <TableCell className="text-sm text-gray-500">{date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ActionTooltip label="Ver detalhes">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleViewDetails}>
              <Eye className="w-4 h-4" />
            </Button>
          </ActionTooltip>
        </div>
      </TableCell>
    </TableRow>
  )
}

interface ResultsTableProps {
  searchQuery?: string
  decisionFilter?: string
}

export function ResultsTable({ searchQuery = "", decisionFilter = "all" }: ResultsTableProps) {
  const { orders, loading, error, fetchOrders } = useOrdersStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const formatCurrency = (cents: number, currency: string): string => {
    const amount = cents / 100
    const currencySymbol = currency === "USD" ? "$" : currency === "BRL" ? "R$" : currency
    return `${currencySymbol} ${amount.toFixed(2)}`
  }

  const mapTagToDecision = (tag: string): "aprovado" | "analise" | "aguardando_biometria" | "revisao_manual" => { 
    switch (tag.toUpperCase()) {
      case OrderTag.APPROVED:
        return "aprovado"
      case OrderTag.PENDING:
        return "analise"
      case OrderTag.WAITING_BIOMETRY:
        return "aguardando_biometria"
      case OrderTag.MANUAL_REVIEW:
        return "revisao_manual"
      default:
        return "revisao_manual"
    }
  }

  const formatAprovacao = (approvedBy: string | null): string => {
    if (!approvedBy) return "Não requerido"
    return approvedBy.toUpperCase() === "LUMUS" ? "LUMUS" : approvedBy.toUpperCase() === "MERCHANT" ? "MERCHANT" : approvedBy
  }

  const allRows: ResultsTableRowData[] = orders.map((order) => ({
    orderId: order.platformOrderId,
    orderDbId: order.id,
    store: order.shop?.name || order.shopId,
    value: formatCurrency(order.totalPriceCents, order.currency),
    decision: mapTagToDecision(order.tag),
    aprovacao: formatAprovacao(order.approvedBy),
    origem: order.customer?.countryLast || null,
    destino: order.countryDestCode,
    score: order.customerScoreGrade,
    country: order.countryDestCode,
    date: formatDate(order.createdAt),
  }))

  const filteredRows = allRows.filter((row) => {
    // Filter by decision
    if (decisionFilter !== "all" && row.decision !== decisionFilter) {
      return false
    }

    // Filter by search query
    if (!searchQuery.trim()) {
      return true
    }
    const query = searchQuery.toLowerCase().trim()
    const orderIdMatch = row.orderId.toLowerCase().includes(query)
    const storeNameMatch = row.store.toLowerCase().includes(query)
    return orderIdMatch || storeNameMatch
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
        <TableHeader className="">
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
              Aprovação
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Origem
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Destino
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Score
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              País
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
              <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                Nenhum resultado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

