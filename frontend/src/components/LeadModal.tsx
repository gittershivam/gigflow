import { useState, useEffect } from 'react'
import { Lead } from '../types'

interface FormData {
  name: string
  email: string
  status: string
  source: string
}

interface FormErrors {
  name?: string
  email?: string
  source?: string
}

interface LeadModalProps {
  editLead: Lead | null
  onClose: () => void
  onSubmit: (form: FormData) => Promise<void>
  formError: string
  formLoading: boolean
}

const emptyForm: FormData = { name: '', email: '', status: 'New', source: 'Website' }

const LeadModal = ({ editLead, onClose, onSubmit, formError, formLoading }: LeadModalProps) => {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (editLead) {
      setForm({ name: editLead.name, email: editLead.email, status: editLead.status, source: editLead.source })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [editLead])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    else if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'

    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'

    if (!form.source) newErrors.source = 'Source is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // clear error on change
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(form)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-lg font-semibold mb-4">
          {editLead ? 'Edit Lead' : 'Add New Lead'}
        </h3>

        {formError && (
          <p className="text-red-400 text-sm mb-3 bg-red-400/10 px-3 py-2 rounded-lg">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'ring-2 ring-red-500' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Email</label>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Source</label>
            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${errors.source ? 'ring-2 ring-red-500' : ''}`}
            >
              <option>Website</option>
              <option>Instagram</option>
              <option>Referral</option>
            </select>
            {errors.source && <p className="text-red-400 text-xs mt-1">{errors.source}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 py-2.5 rounded-lg text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
            >
              {formLoading ? 'Saving...' : editLead ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeadModal