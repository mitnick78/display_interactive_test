export interface Customer {
  id: number;
  customer_number: string;
  title: 'mme' | 'm';        
  lastname: string;
  firstname: string;
  postcode: string;
  city: string;
  email: string;
}

export interface Order {
  id: number;
  last_name: string;
  purchase_identifier: string;
  product_id: string;
  quantity: number;
  price: number;
  currency: string;
  date: string;
}

// Etats de chargement
export type LoadingState = 'loading' | 'success' | 'error';