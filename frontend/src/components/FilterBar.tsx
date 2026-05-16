interface FilterBarProps {
  search: string
  status: string
  source: string
  sort: string
  onSearchChange: (val: string) => void
  onStatusChange: (val: string) => void
  onSourceChange: (val: string) => void
  onSortChange: (val: string) => void
}

const FilterBar = ({
  search, status, source, sort,
  onSearchChange, onStatusChange, onSourceChange, onSortChange
}: FilterBarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <input
        type="text"
        placeholder="Search name or email..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={status}
        onChange={e => onStatusChange(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Status</option>
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Lost</option>
      </select>
      <select
        value={source}
        onChange={e => onSourceChange(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Sources</option>
        <option>Website</option>
        <option>Instagram</option>
        <option>Referral</option>
      </select>
      <select
        value={sort}
        onChange={e => onSortChange(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  )
}

export default FilterBar