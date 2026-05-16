import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-indigo-400">GigFlow</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          {user?.name}{' '}
          <span className="text-xs text-gray-600">({user?.role})</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar