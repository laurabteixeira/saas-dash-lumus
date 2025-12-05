"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CreateTicket } from "@/services/ticketServices"
import { toast } from "sonner"
import { Plus } from "lucide-react"

interface CreateTicketModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTicketCreated: () => void
}

export function CreateTicketModal({ open, onOpenChange, onTicketCreated }: CreateTicketModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      toast.error("Por favor, preencha todos os campos")
      return
    }

    setLoading(true)
    const toastId = toast.loading("Criando ticket...")

    try {
      const result = await CreateTicket({
        title: title.trim(),
        description: description.trim(),
      })

      if (result.success) {
        toast.success("Ticket criado com sucesso!", { id: toastId })
        setTitle("")
        setDescription("")
        onOpenChange(false)
        onTicketCreated()
      } else {
        toast.error(result.data?.message || "Erro ao criar ticket", { id: toastId })
      }
    } catch (error: any) {
      toast.error(error?.message || "Erro ao criar ticket", { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setTitle("")
      setDescription("")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full p-4 sm:p-6 lg:p-8 bg-[#ffffff]">
        <DialogHeader className="pt-3">
          <div className="flex items-center gap-2">
            <Plus className="w-6 h-6 text-gray-900" />
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Criar Novo Ticket
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 pt-2">
            Preencha os campos abaixo para abrir um novo ticket de suporte
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-900">
              Título *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do ticket"
              className="w-full"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900">
              Descrição *
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o problema ou solicitação"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1DBE63] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={loading || !title.trim() || !description.trim()}
            >
              {loading ? "Criando..." : "Criar Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

