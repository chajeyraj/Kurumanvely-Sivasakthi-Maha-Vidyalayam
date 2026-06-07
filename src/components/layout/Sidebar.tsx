import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Newspaper,
  Image,
  Calendar,
  FileText,
  Users,
  LogOut,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { SchoolLogo } from '@/components/ui/SchoolBrand'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import type { AdminRole } from '@/lib/adminPermissions'
import {
  canAccessAdmissions,
  canManageArticles,
  canManageEvents,
  canManageGallery,
  canManageStaff,
} from '@/lib/adminPermissions'

const ALL_ADMIN_LINKS: {
  to: string
  label: string
  icon: LucideIcon
  canAccess: (role: AdminRole) => boolean
}[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, canAccess: () => true },
  {
    to: '/admin/admissions',
    label: 'Admissions',
    icon: FileText,
    canAccess: canAccessAdmissions,
  },
  {
    to: '/admin/articles',
    label: 'Articles',
    icon: Newspaper,
    canAccess: canManageArticles,
  },
  {
    to: '/admin/gallery',
    label: 'Photo Gallery',
    icon: Image,
    canAccess: canManageGallery,
  },
  { to: '/admin/events', label: 'Events', icon: Calendar, canAccess: canManageEvents },
  { to: '/admin/staff', label: 'Staff', icon: Users, canAccess: canManageStaff },
]

interface SidebarProps {
  onNavigate?: () => void
  onClose?: () => void
}

export function Sidebar({ onNavigate, onClose }: SidebarProps) {
  const { logout, role } = useAdmin()
  const navigate = useNavigate()

  const links = role ? ALL_ADMIN_LINKS.filter((l) => l.canAccess(role)) : []

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
    onNavigate?.()
  }

  return (
    <aside className="w-64 min-h-full bg-white border-r border-gray-200 flex flex-col shadow-lg lg:shadow-none">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <SchoolLogo size="md" />
            <p className="font-bold text-primary text-sm leading-tight">Admin Panel</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
