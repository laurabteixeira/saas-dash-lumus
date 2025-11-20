"use client"

import { Sidebar } from "@/components/sidebar"
import { IdentityCategoryCards } from "@/components/identity-category-cards"
import { IdentityKPICards } from "@/components/identity-kpi-cards"
import { IdentityDetailCards } from "@/components/identity-detail-cards"
import { PublicationTimeline } from "@/components/publication-timeline"
import AnimationDiv from "@/components/animation/animation-div"

export default function IdentidadePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath="/identidade" />
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Identidade & Step-up
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure métodos de verificação, canais, consentimento e retenção
            </p>
          </div>
          <AnimationDiv position="left">
            <IdentityCategoryCards />
            
            <IdentityKPICards />

            <IdentityDetailCards />

            <PublicationTimeline />
          </AnimationDiv>
        </div>
      </main>
    </div>
  )
}
