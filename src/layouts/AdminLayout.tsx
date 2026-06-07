import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Menu, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAdmin } from '@/context/AdminContext'
import { cn } from '@/utils/cn'

export function AdminLayout() {
  const { isAuthenticated, logout } = useAdmin()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen flex bg-surface-muted">
      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <div
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-200 lg:translate-x-0',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar onClose={() => setMenuOpen(false)} onNavigate={() => setMenuOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-primary/10 text-primary shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-primary text-sm">Admin Panel</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
