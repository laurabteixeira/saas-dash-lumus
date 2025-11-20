"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

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
  const reasons: RejectionReason[] = [
    { reason: "VPN_DETECTED", count: 234, maxCount: 234 },
    { reason: "GEO_MISMATCH", count: 189, maxCount: 234 },
    { reason: "IDENTITY_FAILED", count: 156, maxCount: 234 },
    { reason: "HIGH_VELOCITY", count: 98, maxCount: 234 },
    { reason: "DENY_LIST", count: 67, maxCount: 234 },
  ]

  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            Top 5 Razões de Recusa
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

