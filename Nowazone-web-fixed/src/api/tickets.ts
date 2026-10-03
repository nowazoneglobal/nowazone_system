import { apiRequest, ApiResponse } from './client';

export interface TicketMessage {
  _id?: string;
  sender?: string;
  senderName?: string;
  content: string;
  isInternal?: boolean;
  createdAt: string;
}

export interface TicketItem {
  _id: string;
  ticketNumber?: string;
  subject: string;
  description?: string;
  category?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  requesterName?: string;
  requesterEmail: string;
  messages?: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  subject: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export async function getMyTickets(params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<{ tickets: TicketItem[]; pagination: any }>> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());
  if (params?.status) query.set('status', params.status);
  const qStr = query.toString() ? `?${query.toString()}` : '';
  return apiRequest(`/api/tickets/mine${qStr}`);
}

export async function getMyTicket(id: string): Promise<ApiResponse<{ ticket: TicketItem }>> {
  return apiRequest(`/api/tickets/mine/${encodeURIComponent(id)}`);
}

export async function createClientTicket(data: CreateTicketPayload): Promise<ApiResponse<{ ticket: TicketItem }>> {
  return apiRequest('/api/tickets', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function addMyTicketMessage(id: string, content: string): Promise<ApiResponse<{ ticket: TicketItem }>> {
  return apiRequest(`/api/tickets/mine/${encodeURIComponent(id)}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}
