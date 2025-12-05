"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import Image from "next/image"
import { 
  Plug, 
  FileText,  
  BarChart3, 
  Wrench
} from "lucide-react"

const menuItems = [
  { icon: Plug, label: "Integrações", href: "/" },
  { icon: FileText, label: "Políticas", href: "/politicas" },
  { icon: BarChart3, label: "Resultados", href: "/resultados" },
  { icon: Wrench, label: "Suporte", href: "/suporte" },
]

export function MobileMenu({ currentPath }: { currentPath?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const activePath = currentPath || pathname

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-6 bg-[#2b2b2b] text-white border-0">
        <SheetTitle className="sr-only">Menu Principal</SheetTitle>
        <div className="h-full overflow-y-auto">
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
                  onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  )
}

