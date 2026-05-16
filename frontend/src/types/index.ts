export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'sales'
}

export interface Lead {
  _id: string
  name: string
  email: string
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost'
  source: 'Website' | 'Instagram' | 'Referral'
  createdAt: string
}

export interface LeadsResponse {
  leads: Lead[]
  total: number
  page: number
  totalPages: number
}

export interface AuthState {
  user: User | null
  token: string | null
}