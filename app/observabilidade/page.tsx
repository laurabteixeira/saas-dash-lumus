"use client"

import { Sidebar } from "@/components/sidebar"
import { ObservabilityKPICards } from "@/components/observability-kpi-cards"
import { RecentAlerts } from "@/components/recent-alerts"
import { ObservabilityModules } from "@/components/observability-modules"
import { ObservabilityFilters } from "@/components/observability-filters"
import AnimationDiv from "@/components/animation/animation-div"

export default function ObservabilidadePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/observabilidade" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Observabilidade
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              KPIs globais, BI e SLOs do sistema
            </p>
          </div>

          <AnimationDiv position="left">
            <ObservabilityFilters alertsCount={3} />
            
            <ObservabilityKPICards />

            <RecentAlerts />

            <ObservabilityModules />
          </AnimationDiv>
        </div>
      </main>
    </div>
  )
}
