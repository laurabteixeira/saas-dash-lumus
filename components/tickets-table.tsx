"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Plus, Filter, Download, Clock } from "lucide-react"

interface Ticket {
  id: string
  subject: string
  requester: string
  category: string
  priority: "Urgente" | "Alta" | "Normal" | "Baixa"
  status: "Aberto" | "Aguardando Cliente" | "Escalado" | "Resolvido" | "Fechado"
  sla: "Crítico" | "Violado" | "Normal" | "Ok"
  assigned: string
  updated: string
}

const tickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Erro ao processar pagamento",
    requester: "João Silva",
    category: "Técnico",
    priority: "Urgente",
    status: "Aberto",
    sla: "Crítico",
    assigned: "Maria Souza",
    updated: "15/01, 07:35"
  },
  {
    id: "TKT-002",
    subject: "Cobrança duplicada",
    requester: "Ana Costa",
    category: "Financeiro",
    priority: "Normal",
    status: "Aguardando Cliente",
    sla: "Normal",
    assigned: "Não atribuído",
    updated: "14/01, 12:30"
  },
  {
    id: "TKT-003",
    subject: "Webhooks não estão sendo recebidos",
    requester: "Pedro Lima",
    category: "Integração",
    priority: "Alta",
    status: "Escalado",
    sla: "Violado",
    assigned: "Juliana Tech",
    updated: "15/01, 08:00"
  }
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "Urgente":
      return <Badge className="bg-red-600 text-white border-transparent">Urgente</Badge>
    case "Alta":
      return <Badge className="bg-orange-600 text-white border-transparent">Alta</Badge>
    case "Normal":
      return <Badge className="bg-blue-600 text-white border-transparent">Normal</Badge>
    case "Baixa":
      return <Badge className="bg-gray-600 text-white border-transparent">Baixa</Badge>
    default:
      return <Badge>{priority}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Aberto":
      return <Badge className="bg-blue-600 text-white border-transparent">Aberto</Badge>
    case "Aguardando Cliente":
      return <Badge className="bg-yellow-600 text-white border-transparent">Aguardando Cliente</Badge>
    case "Escalado":
      return <Badge className="bg-red-600 text-white border-transparent">Escalado</Badge>
    case "Resolvido":
      return <Badge className="bg-green-600 text-white border-transparent">Resolvido</Badge>
    case "Fechado":
      return <Badge className="bg-gray-600 text-white border-transparent">Fechado</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const getSLABadge = (slaStatus: string) => {
  switch (slaStatus) {
    case "Crítico":
      return (
        <Badge className="bg-orange-600 text-white border-transparent flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Crítico
        </Badge>
      )
    case "Violado":
      return (
        <Badge className="bg-red-600 text-white border-transparent flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Violado
        </Badge>
      )
    case "Normal":
      return (
        <Badge className="bg-gray-600 text-white border-transparent flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Normal
        </Badge>
      )
    case "Ok":
      return (
        <Badge className="bg-green-600 text-white border-transparent flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Ok
        </Badge>
      )
    default:
      return <Badge>{slaStatus}</Badge>
  }
}

export function TicketsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getStatusValue = (filterValue: string): string | null => {
    const statusMap: Record<string, string> = {
      "open": "Aberto",
      "waiting": "Aguardando Cliente",
      "escalated": "Escalado",
      "resolved": "Resolvido",
      "closed": "Fechado"
    }
    return filterValue === "all" ? null : statusMap[filterValue] || null
  }

  const getPriorityValue = (filterValue: string): string | null => {
    const priorityMap: Record<string, string> = {
      "urgent": "Urgente",
      "high": "Alta",
      "normal": "Normal",
      "low": "Baixa"
    }
    return filterValue === "all" ? null : priorityMap[filterValue] || null
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = searchQuery === "" || 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(searchQuery.toLowerCase())

    const statusValue = getStatusValue(statusFilter)
    const matchesStatus = statusValue === null || ticket.status === statusValue

    const priorityValue = getPriorityValue(priorityFilter)
    const matchesPriority = priorityValue === null || ticket.priority === priorityValue

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Tickets</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
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
                <SelectItem value="open" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Aberto</SelectItem>
                <SelectItem value="waiting" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Aguardando Cliente</SelectItem>
                <SelectItem value="escalated" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Escalado</SelectItem>
                <SelectItem value="resolved" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Resolvido</SelectItem>
                <SelectItem value="closed" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Fechado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as prioridades" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none">
                <SelectItem value="all" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Todas as prioridades</SelectItem>
                <SelectItem value="urgent" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Urgente</SelectItem>
                <SelectItem value="high" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Alta</SelectItem>
                <SelectItem value="normal" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Normal</SelectItem>
                <SelectItem value="low" className="data-[state=checked]:bg-[#1DBE63] data-[state=checked]:text-white">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border-none">
            <Table className="bg-[#f3f1ec] border-none">
              <TableHeader className="border-b border-b-[#e0e0e0]">
                <TableRow className="bg-[#f3f1ec] border-none">
                  <TableHead>Ticket</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Atribuído</TableHead>
                  <TableHead>Atualizado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow className="bg-[#f3f1ec] border-b border-b-[#e0e0e0]">
                    <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                      Nenhum ticket encontrado com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="bg-[#f3f1ec] border-b border-b-[#e0e0e0]">
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>{ticket.requester}</TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getSLABadge(ticket.sla)}</TableCell>
                      <TableCell>{ticket.assigned}</TableCell>
                      <TableCell>{ticket.updated}</TableCell>
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
