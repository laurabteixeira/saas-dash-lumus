import apiClient from "@/client/apiClient";

export async function GetOrdersMetrics() {
    return apiClient.get(`/orders/metrics`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

export async function GetShopsMetrics() {
    return apiClient.get(`/shops/metrics`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

export async function GetShopMetrics(shopId: string) {
    return apiClient.get(`/shop/metrics/${shopId}`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}