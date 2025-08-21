export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
}

export interface ClientInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId?: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  company: CompanyInfo;
  client: ClientInfo;
  products: Product[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}