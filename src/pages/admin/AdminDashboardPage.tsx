import {
  LayoutDashboard,
  Newspaper,
  Image,
  Calendar,
  FileText,
  Users,
  Plus,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardCard } from '@/components/cards/DashboardCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { useAdmin } from '@/context/AdminContext'
import { useAdminData } from '@/context/AdminDataContext'
import { formatRelativeTime } from '@/lib/adminStorage'
import { splitEventsByPeriod } from '@/utils/events'
import {
  canAccessAdmissions,
  canManageArticles,
  canManageEvents,
  canManageGallery,
  canManageStaff,
  ADMIN_ROLES,
} from '@/lib/adminPermissions'
import type { AdminRole } from '@/lib/adminPermissions'

const MODULE_LINKS: {
  to: string
  label: string
  description: string
  icon: typeof Newspaper
  color: string
  canAccess: (role: AdminRole) => boolean
}[] = [
  {
    to: '/admin/admissions',
    label: 'Admissions',
    description: 'Important dates & download forms',
    icon: FileText,
    color: 'bg-secondary/10 text-secondary',
    canAccess: canAccessAdmissions,
  },
  {
    to: '/admin/articles',
    label: 'Add Article',
    description: 'Events, Academics, Sports, Culture…',
    icon: Newspaper,
    color: 'bg-primary/10 text-primary',
    canAccess: canManageArticles,
  },
  {
    to: '/admin/gallery',
    label: 'Photo Gallery',
    description: 'Campus, Events, Academics…',
    icon: Image,
    color: 'bg-secondary/10 text-secondary',
    canAccess: canManageGallery,
  },
  {
    to: '/admin/events',
    label: 'Event Management',
    description: 'Schedule & manage events',
    icon: Calendar,
    color: 'bg-primary/10 text-primary',
    canAccess: canManageEvents,
  },
  {
    to: '/admin/staff',
    label: 'Staff Members',
    description: 'Principal, Teachers, Admin…',
    icon: Users,
    color: 'bg-primary/10 text-primary',
    canAccess: canManageStaff,
  },
]

export function AdminDashboardPage() {
  const { role, user } = useAdmin()
  const { articles, gallery, events, staff, activities, admissionSettings } = useAdminData()
  const { upcoming } = splitEventsByPeriod(events)
  const modules = role ? MODULE_LINKS.filter((m) => m.canAccess(role)) : []

  const stats = [
    { label: 'Articles', value: articles.length, change: '6 categories', icon: 'Newspaper' },
    { label: 'Gallery Photos', value: gallery.length, change: '5 categories', icon: 'Image' },
    { label: 'Upcoming Events', value: upcoming.length, icon: 'Calendar' },
    { label: 'Staff Members', value: staff.length, change: '4 role groups', icon: 'Users' },
  ]

  const recentActivities =
    activities.length > 0
      ? activities.slice(0, 6)
      : [
          {
            id: '0',
            action: 'Admin panel ready — start by adding content',
            module: 'Dashboard',
            timestamp: Date.now(),
          },
        ]

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-primary mb-1">
          <LayoutDashboard className="w-6 h-6" />
          <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-gray-500 text-sm">
          {user && role ? (
            <>
              {ADMIN_ROLES[role]} · {user.email}
            </>
          ) : (
            'Manage school content and admissions'
          )}
          {role && canAccessAdmissions(role) && (
            <span className="block sm:inline sm:ml-2 text-gray-400 mt-1 sm:mt-0">
              · {admissionSettings.importantDates.length} dates,{' '}
              {admissionSettings.downloadForms.length} forms
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg font-bold text-primary mb-4">Management Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.to}
              to={mod.to}
              className="group flex gap-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className={`p-3 rounded-xl shrink-0 ${mod.color}`}>
                <mod.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-primary group-hover:text-primary-dark">{mod.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{mod.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        <GlassCard>
          <h2 className="text-lg font-bold text-primary mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivities.map((a) => (
              <li
                key={a.id}
                className="flex justify-between items-start gap-3 border-b border-gray-100 pb-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{a.action}</p>
                  <p className="text-xs text-secondary font-semibold">{a.module}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {formatRelativeTime(a.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-bold text-primary mb-4">Quick Add</h2>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.to}
                to={mod.to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-muted hover:bg-primary/5 border border-gray-200/60 transition-colors text-center"
              >
                <Plus className="w-5 h-5 text-secondary" />
                <span className="text-xs font-semibold text-primary">{mod.label}</span>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
