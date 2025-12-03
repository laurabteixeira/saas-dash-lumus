"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, EyeIcon, PencilIcon, XCircle } from "lucide-react"
import { useTicketsStore } from "@/store/useTicketsStore"
import { formatDate } from "@/lib/utils"
import { Button } from "./ui/button"
import { ActionTooltip } from "./utils/action-tooltip"
import { useRouter } from "next/navigation"

const mapStatusToDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    "PENDING": "Aberto",
    "RESOLVED": "Resolvido",
    "CLOSED": "Fechado"
  }
  return statusMap[status.toUpperCase()] || status
}

const mapSlaStatusToDisplay = (slaStatus: string): string => {
  const slaStatusMap: Record<string, string> = {
    "FAST": "Rápido",
    "NORMAL": "Normal",
    "SLOW": "Lento",
    "CRITICAL": "Crítico",
  }
  return slaStatusMap[slaStatus.toUpperCase()] || status
}

const getStatusBadge = (status: string) => {
  const displayStatus = mapStatusToDisplay(status)
  switch (displayStatus) {
    case "Aberto":
      return <Badge className="bg-blue-600 text-white border-transparent">Aberto</Badge>
    case "Resolvido":
      return <Badge className="bg-green-600 text-white border-transparent">Resolvido</Badge>
    case "Fechado":
      return <Badge className="bg-gray-600 text-white border-transparent">Fechado</Badge>
    default:
      return <Badge>{displayStatus}</Badge>
  }
}

const getSlaStatusBadge = (slaStatus: string) => {
  const displaySlaStatus = mapSlaStatusToDisplay(slaStatus)
  switch (displaySlaStatus) {
    case "Rápido":
      return <Badge className="bg-lime-500 text-white border-transparent">Rápido</Badge>
    case "Normal":
      return <Badge className="bg-green-600 text-white border-transparent">Resolvido</Badge>
    case "Lento":
      return <Badge className="bg-orange-500 text-white border-transparent">Lento</Badge>
    case "Crítico":
      return <Badge className="bg-red-500 text-white border-transparent">Crítico</Badge>
    case "":
      return <>-</>
    default:
    return <Badge>{displaySlaStatus}</Badge>
  }
}

const getSLABadge = (timeToResolve: string | null) => {
  if (!timeToResolve) {
    return <Badge className="bg-gray-600 text-white border-transparent flex items-center gap-1">
      <Clock className="w-3 h-3" />
      Normal
    </Badge>
  }
  
  return <Badge className="bg-gray-600 text-white border-transparent flex items-center gap-1">
    <Clock className="w-3 h-3" />
    Normal
  </Badge>
}

export function TicketsTable() {
  const { tickets, loading, error } = useTicketsStore()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusValue = (filterValue: string): string | null => {
    const statusMap: Record<string, string> = {
      "pending": "PENDING",
      "resolved": "RESOLVED",
      "closed": "CLOSED"
    }
    return filterValue === "all" ? null : statusMap[filterValue] || null
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = searchQuery === "" || 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.merchantId.toLowerCase().includes(searchQuery.toLowerCase())

    const statusValue = getStatusValue(statusFilter)
    const matchesStatus = statusValue === null || ticket.status.toUpperCase() === statusValue

    return matchesSearch && matchesStatus
  })

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Tickets</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Buscar por ticket, assunto ou solicitante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none">
                <SelectItem value="all" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Todos os status</SelectItem>
                <SelectItem value="pending" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Aberto</SelectItem>
                <SelectItem value="resolved" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Resolvido</SelectItem>
                <SelectItem value="closed" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Fechado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border-none">
            <Table className="bg-[#f3f1ec] border-none">
              <TableHeader className="border-b border-b-[#e0e0e0]">
                <TableRow className="bg-[#f3f1ec] border-none">
                  <TableHead>Assunto</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tempo de resposta</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Resolvido Por</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Resolvido em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow className="bg-[#f3f1ec] border-b border-b-[#e0e0e0]">
                    <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                      Carregando tickets...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow className="bg-[#f3f1ec] border-b border-b-[#e0e0e0]">
                    <TableCell colSpan={9} className="text-center text-red-500 py-8">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredTickets.length === 0 ? (
                  <TableRow className="bg-[#f3f1ec] border-b border-b-[#e0e0e0]">
                    <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                      Nenhum ticket encontrado com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="bg-[#f3f1ec] border-b border-b-[#e0e0e0]">
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{ticket.description}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{ticket.timeToResolve ? ticket.timeToResolve : "Aguardando resposta"}</TableCell>
                      <TableCell>{getSlaStatusBadge(ticket.slaStatus || "")}</TableCell>
                      <TableCell>{ticket.resolvedBy || "-"}</TableCell>
                      <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                      <TableCell>{ticket.resolvedAt ? formatDate(ticket.resolvedAt) : "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <ActionTooltip label="Visualizar ticket">
                            <Button 
                              variant="ghost" 
                              onClick={() => router.push(`/suporte/${ticket.id}`)}
                            >
                              <EyeIcon className="w-4 h-4" />
                            </Button>
                          </ActionTooltip>
                          {ticket.status === "PENDING" && (
                            <ActionTooltip label="Fechar Ticket">
                              <Button variant="ghost" className="hover:text-rose-500"><XCircle className="w-4 h-4" /></Button>
                            </ActionTooltip>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
