import { Lead } from '../types'
import { useAuth } from '../context/AuthContext'

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/10 text-blue-400',
  Contacted: 'bg-yellow-500/10 text-yellow-400',
  Qualified: 'bg-green-500/10 text-green-400',
  Lost: 'bg-red-500/10 text-red-400'
}

interface LeadTableProps {
  leads: Lead[]
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
}

const LeadTable = ({ leads, onEdit, onDelete }: LeadTableProps) => {
  const { user } = useAuth()

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400">
            <th className="text-left px-5 py-3 font-medium">Name</th>
            <th className="text-left px-5 py-3 font-medium">Email</th>
            <th className="text-left px-5 py-3 font-medium">Status</th>
            <th className="text-left px-5 py-3 font-medium">Source</th>
            <th className="text-left px-5 py-3 font-medium">Created</th>
            <th className="text-left px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr
              key={lead._id}
              className={`border-b border-gray-800/50 hover:bg-gray-800/40 transition ${i % 2 === 0 ? '' : 'bg-gray-800/20'}`}
            >
              <td className="px-5 py-3 font-medium">{lead.name}</td>
              <td className="px-5 py-3 text-gray-400">{lead.email}</td>
              <td className="px-5 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-5 py-3 text-gray-400">{lead.source}</td>
              <td className="px-5 py-3 text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(lead)}
                    className="text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Edit
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable