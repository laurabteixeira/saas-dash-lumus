"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Link as LinkIcon, 
  Activity, 
  Database, 
  Zap, 
  FileText, 
  FileBarChart 
} from "lucide-react"

interface ModuleCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ModuleCard({ title, description, icon }: ModuleCardProps) {
  return (
    <Card className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-green-600 mt-1">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ObservabilityModules() {
  const modules = [
    {
      title: "Webhooks",
      description: "Entregas, latência, retries e validação HMAC",
      icon: <LinkIcon className="w-6 h-6" />
    },
    {
      title: "Modelo ML",
      description: "Drift, qualidade de score e importância",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Qualidade de Dados",
      description: "Frescor, cobertura e consistência",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Tracing",
      description: "Busca por request_id e análise de spans",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Logs",
      description: "Eventos e erros com filtro rápido",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Relatórios",
      description: "Export PDF/CSV e agendamentos",
      icon: <FileBarChart className="w-6 h-6" />
    }
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Módulos Funcionais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
          />
        ))}
      </div>
    </div>
  )
}
