import jsPDF from "jspdf"
import { Order } from "@/store/useOrdersStore"
import { formatDate } from "./utils"

export async function exportOrderToPDF(order: Order) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  let yPosition = margin

  const addLogoToPDF = async () => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            reject(new Error("Could not get canvas context"))
            return
          }
          
          const logoWidth = 60
          const logoHeight = (logoWidth * 89) / 700
          canvas.width = logoWidth * 2
          canvas.height = logoHeight * 2
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL("image/png")
          
          doc.addImage(dataUrl, "PNG", margin, 15, logoWidth, logoHeight)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
      
      img.onerror = () => {
        reject(new Error("Failed to load logo"))
      }
      
      img.src = "/lumus-logo-dark.svg"
      
      setTimeout(() => {
        if (!img.complete) {
          reject(new Error("Logo load timeout"))
        }
      }, 3000)
    })
  }

  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  const addSectionTitle = (title: string, fontSize: number = 16) => {
    checkPageBreak(15)
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", "bold")
    doc.text(title, margin, yPosition)
    yPosition += 10
    doc.setLineWidth(0.5)
    doc.setDrawColor(128, 128, 128)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    doc.setDrawColor(0, 0, 0)
    yPosition += 8
  }

  const addField = (label: string, value: string | number | null | undefined, indent: number = 0) => {
    checkPageBreak(8)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const labelX = margin + indent
    const valueX = margin + 80 + indent
    
    if (value !== null && value !== undefined) {
      doc.setFont("helvetica", "bold")
      doc.text(`${label}:`, labelX, yPosition)
      doc.setFont("helvetica", "normal")
      const valueStr = String(value)
      const lines = doc.splitTextToSize(valueStr, pageWidth - valueX - margin)
      doc.text(lines, valueX, yPosition)
      yPosition += lines.length * 6
    } else {
      doc.setFont("helvetica", "bold")
      doc.text(`${label}:`, labelX, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text("Não informado", valueX, yPosition)
      yPosition += 6
    }
    yPosition += 2
  }

  try {
    await addLogoToPDF()
    yPosition = 35
  } catch (error) {
    console.error("Could not load logo, using text fallback:", error)
    // Fallback: Simple text header
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("LUMUS", margin, 22)
    yPosition = 28
  }

  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("Relatório de Pedido", pageWidth - margin, 22, { align: "right" })
  
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  const now = new Date()
  const generatedDate = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()} - ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  doc.text(`Gerado em: ${generatedDate}`, pageWidth - margin, 30, { align: "right" })
  
  yPosition = Math.max(yPosition, 35)
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 15

  addSectionTitle("Informações do Pedido", 14)
  
  addField("Order ID", order.platformOrderId)
  addField("Plataforma", order.platform)
  addField("Loja", order.shop?.name || order.shopId)
  addField("Status", order.status)
  addField("Tag", order.tag)
  addField("Aprovação", order.approvedBy || "Não requerido")
  addField("Itens", order.items.join(", "))
  addField("Valor Total", `${order.currency || "$"} ${(order.totalPriceCents).toFixed(2)}`)
  addField("País de Destino", order.countryDestCode)
  addField("Score do Pedido", order.customer.scoreGrade || "Não disponível")
  addField("Data de Criação", formatDate(order.createdAt))
  addField("Última Atualização", formatDate(order.updatedAt))

  yPosition += 5

  addSectionTitle("Informações do Cliente", 14)

  addField("Customer ID", typeof order.customer.platformCustomerId === "string" ? order.customer.platformCustomerId : String(order.customer.platformCustomerId))
  addField("Nome", order.customer.name)
  addField("Email", order.customer.email || null)
  addField("Telefone", order.customer.phone || null)
  addField("País", order.customer.countryLast || null)
  addField("Score Grade", order.customer.scoreGrade || null)
  addField("Tem Biometria", order.customer.hasBiometry ? "Sim" : "Não")
  addField("Número de Pedidos", order.customer.ordersCount || 0)
  addField("Número de Chargebacks", order.customer.chargebackCount || 0)
  addField("Número de Refunds", order.customer.refundCount || 0)

  yPosition += 5

  if (order.customer.hasBiometry) {
    addSectionTitle("Imagem de Biometria", 14)
    
    const addBiometryImage = async (imageUrl?: string | null) => {
      if (!imageUrl) {
        checkPageBreak(70)
        const placeholderHeight = 60
        const placeholderWidth = 80
        doc.setLineWidth(1)
        doc.setDrawColor(200, 200, 200)
        doc.rect(margin, yPosition, placeholderWidth, placeholderHeight, "D")
        doc.setFontSize(10)
        doc.setFont("helvetica", "italic")
        doc.setTextColor(150, 150, 150)
        doc.text("Espaço reservado para", margin + placeholderWidth / 2, yPosition + placeholderHeight / 2 - 5, { align: "center" })
        doc.text("imagem de biometria", margin + placeholderWidth / 2, yPosition + placeholderHeight / 2 + 5, { align: "center" })
        doc.setTextColor(0, 0, 0)
        yPosition += placeholderHeight + 10
        return
      }

      try {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas")
              const ctx = canvas.getContext("2d")
              if (!ctx) {
                reject(new Error("Could not get canvas context"))
                return
              }
              
              const maxWidth = 80
              const aspectRatio = img.height / img.width
              let imageWidth = maxWidth
              let imageHeight = maxWidth * aspectRatio
              
              if (imageHeight > 60) {
                imageHeight = 60
                imageWidth = imageHeight / aspectRatio
              }
              
              canvas.width = imageWidth * 2
              canvas.height = imageHeight * 2
              
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
              const dataUrl = canvas.toDataURL("image/png")
              
              checkPageBreak(imageHeight + 10)
              doc.addImage(dataUrl, "PNG", margin, yPosition, imageWidth, imageHeight)
              yPosition += imageHeight + 10
              resolve()
            } catch (error) {
              reject(error)
            }
          }
          
          img.onerror = () => {
            checkPageBreak(10)
            doc.setFontSize(10)
            doc.setFont("helvetica", "italic")
            doc.text("Erro ao carregar imagem de biometria", margin, yPosition)
            yPosition += 10
            resolve() 
          }
          
          img.src = imageUrl
        })
      } catch (error) {
        console.error("Error loading biometry image:", error)
        checkPageBreak(10)
        doc.setFontSize(10)
        doc.setFont("helvetica", "italic")
        doc.text("Erro ao carregar imagem de biometria", margin, yPosition)
        yPosition += 10
      }
    }

    const biometryImageUrl = (order.customer as any).biometryImageUrl || (order.riskResults as any)?.biometryImageUrl || null
    
    await addBiometryImage(biometryImageUrl)
    yPosition += 5
  }

  if (order.riskResults?.ip && order.riskResults.ip.trim() !== "") {
    addSectionTitle("Análise de Risco", 14)

    addField("IP", order.riskResults.ip)
    addField("Código do País (IP)", order.riskResults.ipCountryCode)
    addField("Continente (IP)", order.riskResults.ipContinent)
    addField("Cidade (IP)", order.riskResults.ipCity)
    addField("ASN", order.riskResults.ipAsn)
    addField("VPN Detectado", order.riskResults.vpnDetected ? "Sim" : "Não")
    addField("Proxy Detectado", order.riskResults.proxyDetected ? "Sim" : "Não")
    addField("Tipo de Proxy", order.riskResults.proxyType.toUpperCase())
    addField("Tor Detectado", order.riskResults.torDetected ? "Sim" : "Não")
    addField("Bot Detectado", order.riskResults.botDetected ? "Sim" : "Não")
    addField("Biometria Necessária", order.riskResults.biometryNeeded ? "Sim" : "Não")
    addField("Decisão", order.riskResults.decision)

    yPosition += 5

    if (order.riskResults.scorePenalties && order.riskResults.scorePenalties.length > 0) {
      checkPageBreak(15)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Penalidades:", margin, yPosition)
      yPosition += 8
      
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      order.riskResults.scorePenalties.forEach((penalty) => {
        checkPageBreak(8)
        doc.text(`• ${penalty}`, margin + 10, yPosition)
        yPosition += 6
      })
      yPosition += 3
    }

    if (order.riskResults.scoreBonuses && order.riskResults.scoreBonuses.length > 0) {
      checkPageBreak(15)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Bônus:", margin, yPosition)
      yPosition += 8
      
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      order.riskResults.scoreBonuses.forEach((bonus) => {
        checkPageBreak(8)
        doc.text(`• ${bonus}`, margin + 10, yPosition)
        yPosition += 6
      })
    }
  } else {
    addSectionTitle("Análise de Risco", 14)
    checkPageBreak(10)
    doc.setFontSize(10)
    doc.setFont("helvetica", "italic")
    doc.text("Análise ainda em andamento...", margin, yPosition)
    yPosition += 10
  }

  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    )
  }

  const filename = `pedido-${order.platformOrderId}-${new Date().toISOString().split("T")[0]}.pdf`
  
  doc.save(filename)
}
