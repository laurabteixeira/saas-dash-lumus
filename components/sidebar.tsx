"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Plug, 
  FileText,  
  BarChart3, 
  Wrench
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"
import Image from "next/image"

const menuItems = [
  { icon: Plug, label: "Integrações", href: "/" },
  { icon: FileText, label: "Políticas", href: "/politicas" },
  //{ icon: Calculator, label: "Simulador", href: "/simulador" },
  { icon: BarChart3, label: "Resultados", href: "/resultados" },
  //{ icon: Activity, label: "Observabilidade", href: "/observabilidade" },
  //{ icon: User, label: "Identidade", href: "/identidade" },
  { icon: Wrench, label: "Suporte", href: "/suporte" },
]

export function Sidebar({ currentPath }: { currentPath?: string }) {
  const pathname = usePathname()
  const activePath = currentPath || pathname

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-[#2b2b2b] text-white p-6 overflow-y-auto">
      {/* <Image src="/lumus-logo-dark.svg" alt="Logo" width={150} height={100} /> */}
      <Image src="/lumus-logo-light.svg" alt="Logo" width={150} height={100} />
      <Separator className="bg-[#3b3b3b] my-6" />
      <h2 className="text-lg font-semibold mb-6 text-gray-300/80">Menu Principal</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activePath === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-[#3b3b3b] text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white hover:bg-[#3b3b3b]"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
