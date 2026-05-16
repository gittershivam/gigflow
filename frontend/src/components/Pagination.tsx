interface PaginationProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-5">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="px-4 py-1.5 text-sm bg-gray-800 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="px-4 py-1.5 text-sm bg-gray-800 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination