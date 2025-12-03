import { Order } from "@/store/useOrdersStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { formatDate } from "@/lib/utils"
import { Computer, FlaskConical, Package } from "lucide-react"
import { Separator } from "../ui/separator"

interface RiskDetailsProps {
  order: Order
}

const getDecisionVariant = (tag: string): "success" | "yellow" | "orange" | "purple" => {
  switch (tag.toUpperCase()) {
    case "APPROVED":
      return "success"
    case "PENDING":
      return "yellow"
    case "WAITING_BIOMETRY":
      return "purple"
    case "MANUAL_REVIEW":
      return "orange"
    default:
      return "success"
  }
}

const getPlatformVariant = (tag: string): "blue" | "rose" => {
    switch (tag.toUpperCase()) {
      case "NUVEMSHOP":
        return "blue"
      case "SHOPIFY":
        return "rose"
      default:
        return "rose"
    }
  }

export const RiskDetails = ({ order }: RiskDetailsProps) => {

  return (
    <div>
      <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical />
            <div>
                Resultado da Análise
            </div>
          </CardTitle>
          <Separator className="mt-4 bg-[#e0e0e0]" />
        </CardHeader>
        <CardContent>
            <div>
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">IP:</p>
                            <p>{order.riskResults.ip}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Código do País:</p>
                            <p>{order.riskResults.ipCountryCode}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Cidade:</p>
                            <p>{order.riskResults.ipCity}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">ASN:</p>
                            <p>{order.riskResults.ipAsn}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">VPN:</p>
                            <p>{order.riskResults.vpnDetected ? "Sim" : "Não"}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Proxy:</p>
                            <p>{order.riskResults.proxyDetected ? "Sim" : "Não"}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Tipo do Proxy:</p>
                            <p>{order.riskResults.proxyType.toUpperCase()}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Tor:</p>
                            <p>{order.riskResults.torDetected ? "Sim" : "Não"}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Bot:</p>
                            <p>{order.riskResults.botDetected ? "Sim" : "Não"}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Pediu Biometria:</p>
                            <p>{order.riskResults.biometryNeeded ? "Sim" : "Não"}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-muted-foreground text-sm">Resultado:</p>
                            <div><Badge variant={getDecisionVariant(order.riskResults.decision)}>{order.riskResults.decision}</Badge></div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}