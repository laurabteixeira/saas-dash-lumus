import apiClient from "@/client/apiClient";

interface CreateTicketProps {
    title: string,
    description: string,
}

export async function CreateTicket(data: CreateTicketProps) {
  return apiClient.post(`/tickets`, data)
      .then((response) => ({ success: true, data: response.data }))
      .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

export async function GetTicket(ticketId: string) {
    return apiClient.get(`/tickets/${ticketId}`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

export async function GetTickets() {
    return apiClient.get(`/tickets`)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

enum TicketStatus {
    CLOSED = "CLOSED",
}

interface UpdateTicketProps {
    ticketId: string,
    status: TicketStatus,
}

export async function UpdateTicket(data: UpdateTicketProps) {
    return apiClient.put(`/tickets`, data)
        .then((response) => ({ success: true, data: response.data }))
        .catch((error) => ({ success: false, data: error.response.data.error_message }));
}

