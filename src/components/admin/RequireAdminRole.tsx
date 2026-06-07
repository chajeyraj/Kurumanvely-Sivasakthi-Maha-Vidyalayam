import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAdmin } from '@/context/AdminContext'
import type { AdminRole } from '@/lib/adminPermissions'
import { GlassCard } from '@/components/ui/GlassCard'
import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

interface RequireAdminRoleProps {
  children: ReactNode
  allowedRoles: AdminRole[]
}

export function RequireAdminRole({ children, allowedRoles }: RequireAdminRoleProps) {
  const { isAuthenticated, role } = useAdmin()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="p-6 md:p-8 max-w-lg mx-auto">
        <GlassCard className="text-center py-10">
          <ShieldAlert className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h1 className="text-xl font-bold text-primary">Access restricted</h1>
          <p className="text-sm text-gray-600 mt-2">
            Your account does not have permission to view this section. Contact a super
            administrator if you need access.
          </p>
          <Link
            to="/admin/dashboard"
            className="inline-block mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary"
          >
            Back to Dashboard
          </Link>
        </GlassCard>
      </div>
    )
  }

  return children
}
