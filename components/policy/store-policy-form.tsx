// StorePolicyForm.tsx
"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@/store/useStoresStore"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Shield, Scale, Zap } from "lucide-react"
import { COUNTRIES, getCountryName } from "@/lib/countries"
import { UpdateStorePolicy } from "@/services/storePolicyServices"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(1),
  blockedCountriesDestination: z.array(z.string()),
  blockedCountriesOrigin: z.array(z.string()),
  maxChargebacksPerCustomer: z.number().min(0),
  maxRefundsPerCustomer: z.number().min(0),
  biometricMinOrderAmount: z.number(),
})

type FormData = z.infer<typeof formSchema>

interface PolicyTemplate {
  title: string
  description: string
  icon: React.ReactNode
  blockedCountriesOrigin: string[]
  blockedCountriesDestination: string[]
  maxChargebacksPerCustomer: number
  maxRefundsPerCustomer: number
  biometricMinOrderAmount: number
}

const POLICY_TEMPLATES: PolicyTemplate[] = [
  {
    title: "Conservadora",
    description: "Política mais restritiva com maior proteção",
    icon: <Shield className="w-5 h-5" />,
    blockedCountriesOrigin: ["CN", "RU", "NG", "PK", "BD"],
    blockedCountriesDestination: ["CN", "RU", "NG", "PK", "BD"],
    maxChargebacksPerCustomer: 1,
    maxRefundsPerCustomer: 2,
    biometricMinOrderAmount: 50,
  },
  {
    title: "Balanceada",
    description: "Equilíbrio entre segurança e experiência do cliente",
    icon: <Scale className="w-5 h-5" />,
    blockedCountriesOrigin: ["CN", "NG"],
    blockedCountriesDestination: ["CN", "NG"],
    maxChargebacksPerCustomer: 2,
    maxRefundsPerCustomer: 4,
    biometricMinOrderAmount: 100,
  },
  {
    title: "Permissiva",
    description: "Política mais flexível para maximizar conversões",
    icon: <Zap className="w-5 h-5" />,
    blockedCountriesOrigin: [],
    blockedCountriesDestination: [],
    maxChargebacksPerCustomer: 3,
    maxRefundsPerCustomer: 6,
    biometricMinOrderAmount: 200,
  },
]

export function StorePolicyForm({ 
  store,
  onSubmitRef 
}: { 
  store: Store
  onSubmitRef?: React.MutableRefObject<(() => void) | null>
}) {
  const policy = store.shopPolicy
  const [selectedOriginCountry, setSelectedOriginCountry] = useState<string>("")
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: policy.title,
      blockedCountriesDestination: policy.blockedCountriesDestination ?? [],
      blockedCountriesOrigin: policy.blockedCountriesOrigin ?? [],
      maxChargebacksPerCustomer: policy.maxChargebacksPerCustomer,
      maxRefundsPerCustomer: policy.maxRefundsPerCustomer,
      biometricMinOrderAmount: policy.biometricMinOrderAmount,
    },
  })

  const blockedCountriesOrigin = form.watch("blockedCountriesOrigin") || []
  const blockedCountriesDestination = form.watch("blockedCountriesDestination") || []

  const addCountryOrigin = (countryCode: string) => {
    if (countryCode && !blockedCountriesOrigin.includes(countryCode)) {
      form.setValue("blockedCountriesOrigin", [...blockedCountriesOrigin, countryCode])
      setSelectedOriginCountry("")
    }
  }

  const removeCountryOrigin = (countryCode: string) => {
    form.setValue(
      "blockedCountriesOrigin",
      blockedCountriesOrigin.filter((code) => code !== countryCode)
    )
  }

  const addCountryDestination = (countryCode: string) => {
    if (countryCode && !blockedCountriesDestination.includes(countryCode)) {
      form.setValue("blockedCountriesDestination", [...blockedCountriesDestination, countryCode])
      setSelectedDestinationCountry("")
    }
  }

  const removeCountryDestination = (countryCode: string) => {
    form.setValue(
      "blockedCountriesDestination",
      blockedCountriesDestination.filter((code) => code !== countryCode)
    )
  }

  const applyTemplate = (template: PolicyTemplate) => {
    form.setValue("title", template.title)
    form.setValue("blockedCountriesOrigin", template.blockedCountriesOrigin)
    form.setValue("blockedCountriesDestination", template.blockedCountriesDestination)
    form.setValue("maxChargebacksPerCustomer", template.maxChargebacksPerCustomer)
    form.setValue("maxRefundsPerCustomer", template.maxRefundsPerCustomer)
    form.setValue("biometricMinOrderAmount", template.biometricMinOrderAmount)
    toast.success(`Template "${template.title}" aplicado com sucesso!`)
  }

  const availableOriginCountries = COUNTRIES.filter(
    (country) => !blockedCountriesOrigin.includes(country.code)
  )
  
  const availableDestinationCountries = COUNTRIES.filter(
    (country) => !blockedCountriesDestination.includes(country.code)
  )

  async function onSubmit(data: FormData) {
    try {
      const shopId = store.id
      if (!shopId) {
        toast.error("ID da loja é obrigatório")
        return
      }
      const loadingToastId = toast.loading("Salvando política...")

      const response = await UpdateStorePolicy({
        shopId,
        title: data.title,
        blockedCountriesDestination: data.blockedCountriesDestination || [],
        blockedCountriesOrigin: data.blockedCountriesOrigin || [],
        maxChargebacksPerCustomer: data.maxChargebacksPerCustomer,
        maxRefundsPerCustomer: data.maxRefundsPerCustomer,
        biometricMinOrderAmount: data.biometricMinOrderAmount,
      })

      toast.dismiss(loadingToastId)

      if (response.success) {
        toast.success("Política atualizada com sucesso")
      } else {
        toast.error(response.data?.error_message || response.data || "Erro ao salvar política")
      }
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast.dismiss()
      toast.error(
        error?.response?.data?.error_message || error?.message || "Erro ao salvar política"
      )
    }
  }

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => {
        form.handleSubmit(onSubmit)()
      }
    }
  }, [onSubmitRef, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Policy Templates */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Templates de Política</h2>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Você pode aplicar um template de política para preencher automaticamente os campos ou configurar manualmente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {POLICY_TEMPLATES.map((template) => (
              <Card
                key={template.title}
                className="bg-[#f3f1ec] border-[#e0e0e0] hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#1DBE63] hover:scale-105"
                onClick={() => applyTemplate(template)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#1DBE63] rounded-lg text-white">
                      {template.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span>Chargebacks máx:</span>
                      <span className="font-semibold">{template.maxChargebacksPerCustomer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refunds máx:</span>
                      <span className="font-semibold">{template.maxRefundsPerCustomer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biometria mín:</span>
                      <span className="font-semibold">R$ {template.biometricMinOrderAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Países bloqueados:</span>
                      <span className="font-semibold">
                        {template.blockedCountriesOrigin.length + template.blockedCountriesDestination.length}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-4 hover:bg-[#1DBE63] hover:text-white hover:border-[#1DBE63]"
                    onClick={(e) => {
                      e.stopPropagation()
                      applyTemplate(template)
                    }}
                  >
                    Usar este template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Configuração Manual</h2>
          <p className="text-gray-600 text-sm dark:text-gray-400 pb-4">
            Configure manualmente os campos da sua política
          </p>
          <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Título</h2>
                <p className="text-gray-600 text-sm dark:text-gray-400 mb-4">
                  Dê um título à sua política
                </p>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-gray-900"
                          placeholder="Ex: Conservadora, Balanceada, etc."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Países de Origem Bloqueados</h2>
                <p className="text-gray-600 text-sm dark:text-gray-400 mb-4">Selecione os países de onde você não deseja receber pedidos</p>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="blockedCountriesOrigin"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={selectedOriginCountry}
                          onValueChange={(value) => {
                            setSelectedOriginCountry(value)
                            addCountryOrigin(value)
                          }}
                        >
                          <SelectTrigger className="bg-white text-gray-900">
                            <SelectValue placeholder="Selecione um país" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] bg-white text-gray-900 border-none">
                            {availableOriginCountries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name} ({country.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {blockedCountriesOrigin.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blockedCountriesOrigin.map((code) => (
                      <Badge key={code} variant="success" className="flex items-center gap-1">
                        {getCountryName(code)} ({code})
                        <button
                          type="button"
                          onClick={() => removeCountryOrigin(code)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Países de Destino Bloqueados</h2>
                <p className="text-gray-600 text-sm dark:text-gray-400 mb-4">Selecione os países onde você não deseja entregar</p>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="blockedCountriesDestination"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={selectedDestinationCountry}
                          onValueChange={(value) => {
                            setSelectedDestinationCountry(value)
                            addCountryDestination(value)
                          }}
                        >
                          <SelectTrigger className="bg-white text-gray-900">
                            <SelectValue placeholder="Selecione um país" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] bg-white text-gray-900 border-none">
                            {availableDestinationCountries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name} ({country.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {blockedCountriesDestination.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blockedCountriesDestination.map((code) => (
                      <Badge key={code} variant="success" className="flex items-center gap-1">
                        {getCountryName(code)} ({code})
                        <button
                          type="button"
                          onClick={() => removeCountryDestination(code)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Máximo de Chargebacks por Cliente</h2>
                <p className="text-gray-600 text-sm dark:text-gray-400 mb-4">Defina o máximo de chargebacks que um cliente pode ter</p>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="maxChargebacksPerCustomer"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className="text-gray-900"
                          placeholder="Ex: 3"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Máximo de Reembolsos por Cliente</h2>
                <p className="text-gray-600 text-sm dark:text-gray-400 mb-4">Defina o máximo de reembolsos que um cliente pode ter</p>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="maxRefundsPerCustomer"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className="text-gray-900"
                          placeholder="Ex: 5"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#f3f1ec] border-[#e0e0e0] text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-900">Mínimo de Pedidos para Biometria</h2>
                <p className="text-gray-600 text-sm dark:text-gray-400 mb-4">Defina o mínimo de pedidos para que a biometria seja requerida</p>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="biometricMinOrderAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="text-gray-900"
                          placeholder="Ex: 100.00"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  )
}
