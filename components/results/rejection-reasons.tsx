"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { useShopsMetricsStore } from "@/store/useShopsMetricsStore"

interface RejectionReason {
  reason: string
  count: number
  maxCount: number
}

interface RejectionReasonBarProps extends RejectionReason {
  index: number
}

function RejectionReasonBar({ reason, count, maxCount, index }: RejectionReasonBarProps) {
  const percentage = (count / maxCount) * 100
  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    const delay = index * 200 
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage)
    }, delay)

    return () => clearTimeout(timer)
  }, [percentage, index])

  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-48 text-sm text-gray-700 font-medium">
        {reason}
      </div>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${animatedWidth}%` }}
          />
        </div>
        <div className="w-12 text-sm font-semibold text-gray-900 text-right">
          {count}
        </div>
      </div>
    </div>
  )
}

export function RejectionReasons() {
  const { shopsMetrics, loading, error, fetchShopsMetrics } = useShopsMetricsStore()

  useEffect(() => {
    fetchShopsMetrics()
  }, [fetchShopsMetrics])

  // Transform penaltiesRank data to RejectionReason format
  const reasons: RejectionReason[] = shopsMetrics?.penaltiesRank
    ? (() => {
        const top5 = shopsMetrics.penaltiesRank.slice(0, 5) // Take only first 5
        const maxCount = Math.max(...top5.map((item) => item.count), 0) // Calculate max count from top 5
        return top5.map((item) => ({
          reason: item.penalty,
          count: item.count,
          maxCount,
        }))
      })()
    : []

  const reasonsCount = reasons.length
  const title = `Top ${reasonsCount} Raz${reasonsCount === 1 ? "ão" : "ões"} de Recusa`

  if (loading) {
    return (
      <Card className="bg-[#f3f1ec] border-[#e0e0e0] mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            Carregando...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-[#f3f1ec] border-[#e0e0e0] mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
          </div>
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Don't display the card if there are no reasons
  if (!shopsMetrics || reasonsCount === 0) {
    return null
  }

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
        </div>
        <div>
          {reasons.map((reason, index) => (
            <RejectionReasonBar key={index} {...reason} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

