import { useAdmin } from '@/context/AdminContext'
import { ADMIN_ROLES } from '@/lib/adminPermissions'
import { AdmissionSettingsPanel } from '@/components/admin/AdmissionSettingsPanel'

export function AdmissionsAdminPage() {
  const { user, role } = useAdmin()

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">Admissions</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage Important Dates and Download Forms for the public Admissions page
        </p>
        {user && role && (
          <p className="text-xs text-secondary font-semibold mt-2">
            {ADMIN_ROLES[role]} · {user.email}
          </p>
        )}
      </div>

      <AdmissionSettingsPanel />
    </div>
  )
}
