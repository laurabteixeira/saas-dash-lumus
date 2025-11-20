"use client"

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
import { Eye, FileText, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

interface ResultsTableRowData {
  orderId: string
  externalRef: string
  store: string
  value: string
  decision: "aprovado" | "recusado" | "revisao"
  score: number
  scoreTrend?: "up" | "down"
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
  externalRef,
  store,
  value,
  decision,
  score,
  scoreTrend,
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
          <div className="text-xs text-gray-500">({externalRef})</div>
        </div>
      </TableCell>
      <TableCell className="text-sm text-gray-700">{store}</TableCell>
      <TableCell className="text-sm text-gray-700 font-medium">{value}</TableCell>
      <TableCell>
        <Badge variant={getDecisionVariant(decision) as any} className="text-xs">
          {decision === "aprovado" ? "Aprovado" : decision === "recusado" ? "Recusado" : "Revisão Manual"}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-900">{score.toFixed(2)}</span>
          {scoreTrend === "up" && <TrendingUp className="w-3 h-3 text-green-600" />}
          {scoreTrend === "down" && <TrendingDown className="w-3 h-3 text-red-600" />}
        </div>
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
  const allRows: ResultsTableRowData[] = [
    {
      orderId: "ORD-2025-001234",
      externalRef: "SHOP-98765",
      store: "Loja Fashion BR",
      value: "BRL 459.90",
      decision: "aprovado",
      score: 0.82,
      scoreTrend: "up",
      stepup: "Não requerido",
      country: "BR",
      latency: "245ms",
      date: "15/01/2025, 11:32:15"
    },
    {
      orderId: "ORD-2025-001235",
      externalRef: "SHOP-98766",
      store: "Tech Store",
      value: "BRL 1299.00",
      decision: "aprovado",
      score: 0.65,
      stepup: "Challenge → passed",
      country: "BR",
      latency: "1834ms",
      date: "15/01/2025, 10:15:42"
    },
    {
      orderId: "ORD-2025-001236",
      externalRef: "SHOP-98767",
      store: "Loja Fashion BR",
      value: "BRL 2499.90",
      decision: "recusado",
      score: 0.28,
      scoreTrend: "down",
      stepup: "Biometria → failed",
      stepupStatus: "failed",
      country: "NL",
      hasVpn: true,
      hasWarning: true,
      latency: "9456ms",
      date: "15/01/2025, 09:45:22"
    },
    {
      orderId: "ORD-2025-001237",
      externalRef: "SHOP-98768",
      store: "Eletrônicos Plus",
      value: "BRL 3899.00",
      decision: "revisao",
      score: 0.51,
      stepup: "Documento → passed",
      country: "BR",
      hasWarning: true,
      latency: "7892ms",
      date: "15/01/2025, 08:20:15"
    }
  ]

  const filteredRows = allRows.filter((row) => {
    if (!searchQuery.trim()) {
      return true
    }
    const query = searchQuery.toLowerCase().trim()
    const orderIdMatch = row.orderId.toLowerCase().includes(query)
    const externalRefMatch = row.externalRef.toLowerCase().includes(query)
    return orderIdMatch || externalRefMatch
  })

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
              Score
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
            filteredRows.map((row, index) => (
              <ResultsTableRow key={index} {...row} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                Nenhum resultado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

