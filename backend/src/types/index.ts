export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'sales'
  createdAt: Date
}

export interface ILead {
  _id: string
  name: string
  email: string
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost'
  source: 'Website' | 'Instagram' | 'Referral'
  createdBy: string
  createdAt: Date
}

export interface AuthPayload {
  id: string
  role: 'admin' | 'sales'
}