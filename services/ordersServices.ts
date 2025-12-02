import apiClient from "@/client/apiClient";

export async function GetOrders() {
    return apiClient.get(`/orders`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

export async function GetOrder(orderId: string) {
    return apiClient.get(`/order/${orderId}`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}
