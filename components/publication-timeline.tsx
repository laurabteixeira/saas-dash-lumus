"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Edit, GitBranch } from "lucide-react"

interface TimelineEntry {
  version: string
  status: "active" | "editing" | "canary"
  description: string
  author: string
  timestamp: string
  canaryPercentage?: number
}

export function PublicationTimeline() {
  const entries: TimelineEntry[] = [
    {
      version: "v3",
      status: "active",
      description: "Publicada versão 3 (active) com ajustes de qualidade biometria",
      author: "admin@lumus.com",
      timestamp: "05/01/2025, 11:30:00"
    },
    {
      version: "v3",
      status: "editing",
      description: "Alterado min_score de biometria para 0.85",
      author: "admin@lumus.com",
      timestamp: "05/01/2025, 11:00:00"
    },
    {
      version: "v2",
      status: "canary",
      description: "Canário v2 com 10% (documento MRZ check habilitado)",
      author: "admin@lumus.com",
      timestamp: "28/12/2024, 07:15:00",
      canaryPercentage: 10
    },
    {
      version: "v2",
      status: "canary",
      description: "Canário v2 com 7% (documento MRZ check habilitado)",
      author: "admin@lumus.com",
      timestamp: "28/12/2024, 07:15:00",
      canaryPercentage: 7
    }
  ]

  const getStatusBadge = (status: string, version: string, canaryPercentage?: number) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-white border-transparent">{version}</Badge>
            <Badge className="bg-sky-500 text-white border-transparent">active</Badge>
          </div>
        )
      case "editing":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-400 text-white border-transparent">{version}</Badge>
            <Badge className="bg-amber-500 text-white border-transparent">editing</Badge>
          </div>
        )
      case "canary":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-400 text-white border-transparent">{version}</Badge>
            <Badge className="bg-orange-500 text-white border-transparent">
              active {canaryPercentage}% canário
            </Badge>
          </div>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "editing":
        return <Edit className="w-5 h-5 text-amber-500" />
      case "canary":
        return <GitBranch className="w-5 h-5 text-orange-500" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Timeline de Publicações</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`space-y-4 ${
            entries.length > 3 ? "max-h-88 overflow-y-auto pr-1" : ""
          }`}
        >
          {entries.map((entry, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="mt-1">{getStatusIcon(entry.status)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusBadge(entry.status, entry.version, entry.canaryPercentage)}
                </div>
                <p className="text-sm text-gray-900 mb-2">{entry.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{entry.author}</span>
                  <span>•</span>
                  <span>{entry.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
