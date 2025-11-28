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
import { X } from "lucide-react"
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
        <div className="mb-8">
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
