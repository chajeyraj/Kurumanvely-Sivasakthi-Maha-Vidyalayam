export const STORAGE_KEYS = {
  articles: 'ks_admin_articles',
  gallery: 'ks_admin_gallery',
  events: 'ks_admin_events',
  applications: 'ks_admin_applications',
  staff: 'ks_admin_staff',
  activities: 'ks_admin_activities',
  admissionSettings: 'ks_admin_admission_settings',
} as const

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function loadStored<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw) as T[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    /* use seed */
  }
  return [...seed]
}

export function saveStored<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function loadStoredObject<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    /* use seed */
  }
  return seed
}

export function saveStoredObject<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return new Date(timestamp).toLocaleDateString('en-GB')
}
