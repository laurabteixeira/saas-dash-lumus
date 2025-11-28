import apiClient from "@/client/apiClient";

interface UpdateStorePolicyProps {
    shopId: string
    title: string
    blockedCountriesDestination: string[]
    blockedCountriesOrigin: string[]
    maxChargebacksPerCustomer: number
    maxRefundsPerCustomer: number
    biometricMinOrderAmount: number
}

export async function UpdateStorePolicy(data: UpdateStorePolicyProps) {
    return apiClient.put(`/shop-policy`, data)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}