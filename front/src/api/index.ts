import type { Customer, Order } from '../types';

const BASE_URL = '/api';

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  
  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

/** Récupère la liste de tous les customers. */
export const fetchCustomers = (): Promise<Customer[]> =>
  apiFetch<Customer[]>('/customers');

export const fetchOrdersByCustomer = (customerId: number): Promise<Order[]> =>
  apiFetch<Order[]>(`/customers/${customerId}/orders`);