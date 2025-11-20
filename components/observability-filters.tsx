"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Clock, Globe, AlertTriangle, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ObservabilityFilters({ alertsCount }: { alertsCount: number }) {
  return (
    <div className="flex items-center gap-4 mb-6 flex-wrap">
      <Button variant="outline" className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Funil
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Performance
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Globe className="w-4 h-4" />
        Geo
      </Button>
      <Button variant="outline" className="flex items-center gap-2 relative">
        <AlertTriangle className="w-4 h-4" />
        Alertas
        <Badge variant="destructive" className="ml-2 -mr-1">
          {alertsCount}
        </Badge>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Zap className="w-4 h-4" />
        SLOs
      </Button>
    </div>
  )
}
