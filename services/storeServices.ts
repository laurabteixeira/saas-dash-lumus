import apiClient from "@/client/apiClient";

export async function GetStores() {
  return apiClient.get(`/merchant/stores`)
      .then((response) => ({ success: true, data: response.data }))
      .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

export async function GetStore(storeId: string) {
    return apiClient.get(`/merchant/stores/${storeId}`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}