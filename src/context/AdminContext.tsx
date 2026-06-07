import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AdminRole } from '@/lib/adminPermissions'

interface AdminUser {
  email: string
  role: AdminRole
}

interface AdminContextValue {
  isAuthenticated: boolean
  user: AdminUser | null
  role: AdminRole | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

const DEMO_ACCOUNTS: { email: string; password: string; role: AdminRole }[] = [
  { email: 'admin@ksmahavidyalayam.edu.lk', password: 'admin123', role: 'super_admin' },
  {
    email: 'admissions@ksmahavidyalayam.edu.lk',
    password: 'admissions123',
    role: 'admissions_officer',
  },
]

function loadSessionUser(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem('admin_user')
    if (raw) return JSON.parse(raw) as AdminUser
  } catch {
    /* ignore */
  }
  return null
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') return loadSessionUser()
    return null
  })

  const login = (email: string, password: string) => {
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    )
    if (account) {
      const sessionUser: AdminUser = { email: account.email, role: account.role }
      sessionStorage.setItem('admin_auth', 'true')
      sessionStorage.setItem('admin_user', JSON.stringify(sessionUser))
      setUser(sessionUser)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    sessionStorage.removeItem('admin_user')
    setUser(null)
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        role: user?.role ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
