import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'
import { Lead } from '../types'
import useDebounce from '../hooks/useDebounce'
import Navbar from '../components/Navbar'
import FilterBar from '../components/FilterBar'
import LeadTable from '../components/LeadTable'
import LeadModal from '../components/LeadModal'
import Pagination from '../components/Pagination'

interface FormData {
  name: string
  email: string
  status: string
  source: string
}

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const [sort, setSort] = useState('latest')

  const debouncedSearch = useDebounce(search, 300)

  const [showModal, setShowModal] = useState(false)
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params: Record<string, string | number> = { page, limit: 10, sort }
      if (debouncedSearch) params.search = debouncedSearch
      if (status) params.status = status
      if (source) params.source = source

      const res = await api.get('/leads', { params })
      setLeads(res.data.leads)
      setTotal(res.data.total)
      setTotalPages(res.data.totalPages)
    } catch {
      setError('Failed to fetch leads. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, status, source, sort])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status, source, sort])

  const openCreate = () => {
    setEditLead(null)
    setFormError('')
    setShowModal(true)
  }

  const openEdit = (lead: Lead) => {
    setEditLead(lead)
    setFormError('')
    setShowModal(true)
  }

  const handleSubmit = async (form: FormData) => {
    setFormError('')
    setFormLoading(true)
    try {
      if (editLead) {
        await api.put(`/leads/${editLead._id}`, form)
      } else {
        await api.post('/leads', form)
      }
      setShowModal(false)
      fetchLeads()
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return
    try {
      await api.delete(`/leads/${id}`)
      fetchLeads()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete')
    }
  }

  const exportCSV = () => {
    if (!leads.length) return
    const headers = ['Name', 'Email', 'Status', 'Source', 'Created At']
    const rows = leads.map(l => [
      l.name,
      l.email,
      l.status,
      l.source,
      new Date(l.createdAt).toLocaleDateString()
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Leads</h2>
            <p className="text-gray-500 text-sm mt-0.5">{total} total leads</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
            >
              Export CSV
            </button>
            <button
              onClick={openCreate}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
            >
              + Add Lead
            </button>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          search={search}
          status={status}
          source={source}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSourceChange={setSource}
          onSortChange={setSort}
        />

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading leads...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">{error}</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No leads found. Add your first lead!
          </div>
        ) : (
          <LeadTable
            leads={leads}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage(p => p - 1)}
          onNext={() => setPage(p => p + 1)}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <LeadModal
          editLead={editLead}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          formError={formError}
          formLoading={formLoading}
        />
      )}
    </div>
  )
}

export default Dashboard