"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Clock, User, CheckCircle, XCircle, AlertCircle, Frown, Smile } from "lucide-react"
import { useTicketStore } from "@/store/useTicketsStore"
import { formatDate } from "@/lib/utils"

const mapStatusToDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    "PENDING": "Aberto",
    "RESOLVED": "Resolvido",
    "CLOSED": "Fechado"
  }
  return statusMap[status.toUpperCase()] || status
}

const mapSlaStatusToDisplay = (slaStatus: string | null): string => {
  if (!slaStatus) return "Normal"
  const slaStatusMap: Record<string, string> = {
    "FAST": "Rápido",
    "NORMAL": "Normal",
    "SLOW": "Lento",
    "CRITICAL": "Crítico",
  }
  return slaStatusMap[slaStatus.toUpperCase()] || slaStatus
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

const getSlaStatusBadge = (slaStatus: string | null) => {
  const displaySlaStatus = mapSlaStatusToDisplay(slaStatus)
  switch (displaySlaStatus) {
    case "Rápido":
      return <Badge className="bg-lime-500 text-white border-transparent">Rápido</Badge>
    case "Normal":
      return <Badge className="bg-green-600 text-white border-transparent">Normal</Badge>
    case "Lento":
      return <Badge className="bg-orange-500 text-white border-transparent">Lento</Badge>
    case "Crítico":
      return <Badge className="bg-red-500 text-white border-transparent">Crítico</Badge>
    default:
      return <Badge>{displaySlaStatus}</Badge>
  }
}

export default function TicketDetailPage() {
  const params = useParams() as { ticketId: string }
  const router = useRouter()
  const { ticket, fetchTicket, loading, error } = useTicketStore()

  useEffect(() => {
    if (params.ticketId) {
      fetchTicket(params.ticketId)
    }
  }, [params.ticketId, fetchTicket])

  if (loading && !ticket) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPath="/suporte" />
        <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 text-gray-500">Carregando ticket...</div>
          </div>
        </main>
      </div>
    )
  }

  if (error && !ticket) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPath="/suporte" />
        <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 text-red-500">{error || "Ticket não encontrado"}</div>
          </div>
        </main>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentPath="/suporte" />
        <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 text-gray-500">Ticket não encontrado</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/suporte" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/suporte")} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Detalhes do Ticket
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {ticket.id}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informações do Ticket */}
            <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informações do Ticket
                </CardTitle>
                <Separator className="bg-[#e0e0e0] mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ID do Ticket:</p>
                  <p className="text-gray-900 font-medium">{ticket.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Título:</p>
                  <p className="text-gray-900 font-medium">{ticket.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Descrição:</p>
                  <p className="text-gray-900">{ticket.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status:</p>
                  <div>{getStatusBadge(ticket.status)}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Status e SLA
                </CardTitle>
                <Separator className="bg-[#e0e0e0] mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status do SLA:</p>
                  <div>{getSlaStatusBadge(ticket.slaStatus)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tempo de Resposta:</p>
                  <p className="text-gray-900 font-medium">
                    {ticket.timeToResolve || "Aguardando resposta"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Criado em:</p>
                  <p className="text-gray-900 font-medium">{formatDate(ticket.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Respondido em:</p>
                  <p className="text-gray-900 font-medium">{ ticket.resolvedAt ? formatDate(ticket.resolvedAt) : "Ainda não respondido" }</p>
                </div>
              </CardContent>
            </Card>

            {ticket.status.toUpperCase() === "RESOLVED" || ticket.status.toUpperCase() === "CLOSED" ? (
              <Card className="bg-[#f3f1ec] border-[#e0e0e0] lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Informações de Resolução
                  </CardTitle>
                  <Separator className="bg-[#e0e0e0] mt-4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Resolvido por:</p>
                      <p className="text-gray-900 font-medium">{ticket.resolvedBy || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Resolvido em:</p>
                      <p className="text-gray-900 font-medium">
                        {ticket.resolvedAt ? formatDate(ticket.resolvedAt) : "-"}
                      </p>
                    </div>
                  </div>
                  {ticket.solutionTitle && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Título da Solução:</p>
                      <p className="text-gray-900 font-medium">{ticket.solutionTitle}</p>
                    </div>
                  )}
                  {ticket.solutionDescription && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Descrição da Solução:</p>
                      <p className="text-gray-900">{ticket.solutionDescription}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-[#f3f1ec] border-[#e0e0e0] lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Informações de Resolução
                  </CardTitle>
                  <Separator className="bg-[#e0e0e0] mt-4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center text-gray-600">
                    <Smile className="w-10 h-10 mx-auto mb-4" />
                    <p className="text-lg font-medium">Aguarde um pouco, já estamos trabalhando para resolver seu problema!</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

