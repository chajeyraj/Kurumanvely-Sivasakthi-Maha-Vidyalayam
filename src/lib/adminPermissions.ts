export type AdminRole = 'super_admin' | 'admissions_officer' | 'editor'

export const ADMIN_ROLES: Record<AdminRole, string> = {
  super_admin: 'Super Administrator',
  admissions_officer: 'Admissions Officer',
  editor: 'Content Editor',
}

/** Modules each role may access in the admin panel */
export function canAccessAdmissions(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'admissions_officer'
}

export function canManageArticles(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'editor'
}

export function canManageGallery(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'editor'
}

export function canManageEvents(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'editor'
}

export function canManageStaff(role: AdminRole): boolean {
  return role === 'super_admin'
}
