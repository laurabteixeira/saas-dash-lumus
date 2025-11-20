"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Settings, 
  Headphones, 
  FileText, 
  Clock, 
  Rocket,
  TestTube
} from "lucide-react"

interface CategoryCardProps {
  title: string
  icon: React.ReactNode
}

function CategoryCard({ title, icon }: CategoryCardProps) {
  return (
    <Card className="group bg-white border-[#e0e0e0] hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="group-hover:text-green-500 transition-colors duration-300 text-gray-600">
            {icon}
          </div>
          <h3 className="text-sm font-normal text-gray-900">{title}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export function IdentityCategoryCards() {
  const categories = [
    {
      title: "Preferências",
      icon: <Settings className="w-4 h-4" />
    },
    {
      title: "Canais",
      icon: <Headphones className="w-4 h-4" />
    },
    {
      title: "Consentimento",
      icon: <FileText className="w-4 h-4" />
    },
    {
      title: "Retenção",
      icon: <Clock className="w-4 h-4" />
    },
    {
      title: "Teste",
      icon: <TestTube className="w-4 h-4" />
    },
    {
      title: "Publicação",
      icon: <Rocket className="w-4 h-4" />
    }
  ]

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  )
}
