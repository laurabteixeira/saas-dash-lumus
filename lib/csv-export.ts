import { Order } from "@/store/useOrdersStore"
import { formatDate } from "./utils"

enum OrderTag {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  WAITING_BIOMETRY = "WAITING_BIOMETRY",
  MANUAL_REVIEW = "MANUAL_REVIEW",
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

const formatDecision = (decision: string): string => {
  switch (decision) {
    case "aprovado":
      return "Aprovado"
    case "analise":
      return "Em análise"
    case "aguardando_biometria":
      return "Aguardando biometria"
    case "revisao_manual":
      return "Revisão Manual"
    default:
      return decision
  }
}

const escapeCSV = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return ""
  const stringValue = String(value)
  
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  
  return stringValue
}

const filterOrders = (orders: Order[], searchQuery: string, decisionFilter: string): Order[] => {
  return orders.filter((order) => {
    const decision = mapTagToDecision(order.tag)
    if (decisionFilter !== "all" && decision !== decisionFilter) {
      return false
    }

    if (!searchQuery.trim()) {
      return true
    }
    
    const query = searchQuery.toLowerCase().trim()
    const orderIdMatch = order.platformOrderId.toLowerCase().includes(query)
    const storeNameMatch = (order.shop?.name || order.shopId).toLowerCase().includes(query)
    
    return orderIdMatch || storeNameMatch
  })
}

export function exportOrdersToCSV(
  orders: Order[],
  searchQuery: string = "",
  decisionFilter: string = "all"
) {
  const filteredOrders = filterOrders(orders, searchQuery, decisionFilter)

  const headers = [
    "Order ID",
    "Loja",
    "Plataforma",
    "Valor",
    "Moeda",
    "Decisão",
    "Tag",
    "Aprovação",
    "Origem",
    "Destino",
    "Score",
    "País",
    "Status",
    "Customer ID",
    "Nome do Cliente",
    "Email",
    "Telefone",
    "Score Grade",
    "Tem Biometria",
    "Número de Pedidos",
    "Número de Chargebacks",
    "Número de Refunds",
    "IP",
    "Código do País (IP)",
    "Cidade (IP)",
    "ASN",
    "VPN Detectado",
    "Proxy Detectado",
    "Tor Detectado",
    "Bot Detectado",
    "Data de Criação",
    "Última Atualização",
  ]

  const rows = filteredOrders.map((order) => {
    const decision = mapTagToDecision(order.tag)
    
    return [
      escapeCSV(order.platformOrderId),
      escapeCSV(order.shop?.name || order.shopId),
      escapeCSV(order.platform),
      escapeCSV((order.totalPriceCents)),
      escapeCSV(order.currency),
      escapeCSV(formatDecision(decision)),
      escapeCSV(order.tag),
      escapeCSV(formatAprovacao(order.approvedBy)),
      escapeCSV(order.customer?.countryLast || null),
      escapeCSV(order.countryDestCode),
      escapeCSV(order.customerScoreGrade || order.customer?.scoreGrade || null),
      escapeCSV(order.countryDestCode),
      escapeCSV(order.status),
      escapeCSV(order.customer.platformCustomerId.toString()),
      escapeCSV(order.customer.name),
      escapeCSV(order.customer.email || null),
      escapeCSV(order.customer.phone || null),
      escapeCSV(order.customer.scoreGrade || null),
      escapeCSV(order.customer.hasBiometry ? "Sim" : "Não"),
      escapeCSV(order.customer.ordersCount || 0),
      escapeCSV(order.customer.chargebackCount || 0),
      escapeCSV(order.customer.refundCount || 0),
      escapeCSV(order.riskResults?.ip || null),
      escapeCSV(order.riskResults?.ipCountryCode || null),
      escapeCSV(order.riskResults?.ipCity || null),
      escapeCSV(order.riskResults?.ipAsn || null),
      escapeCSV(order.riskResults?.vpnDetected ? "Sim" : "Não"),
      escapeCSV(order.riskResults?.proxyDetected ? "Sim" : "Não"),
      escapeCSV(order.riskResults?.torDetected ? "Sim" : "Não"),
      escapeCSV(order.riskResults?.botDetected ? "Sim" : "Não"),
      escapeCSV(formatDate(order.createdAt)),
      escapeCSV(formatDate(order.updatedAt)),
    ]
  })

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n")

  const BOM = "\uFEFF"
  const csvWithBOM = BOM + csvContent

  const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  
  link.setAttribute("href", url)
  link.setAttribute("download", `pedidos-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

