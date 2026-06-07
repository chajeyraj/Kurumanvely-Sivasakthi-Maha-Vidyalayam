import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { NewsItem, EventItem, GalleryItem, StaffMember } from '@/types'
import type { ApplicationItem, ActivityLog, AdmissionSettings } from '@/types/admin'
import { DEFAULT_ADMISSION_SETTINGS } from '@/data/admissions'
import { normalizeAdmissionSettings } from '@/lib/admissionSettings'
import { NEWS } from '@/data/news'
import { GALLERY } from '@/data/gallery'
import { EVENTS } from '@/data/events'
import { STAFF } from '@/data/staff'
import { APPLICATIONS } from '@/data/applications'
import {
  STORAGE_KEYS,
  generateId,
  loadStored,
  saveStored,
  saveStoredObject,
} from '@/lib/adminStorage'

interface AdminDataContextValue {
  articles: NewsItem[]
  gallery: GalleryItem[]
  events: EventItem[]
  applications: ApplicationItem[]
  admissionSettings: AdmissionSettings
  staff: StaffMember[]
  activities: ActivityLog[]
  updateAdmissionSettings: (settings: Partial<AdmissionSettings>) => void
  addArticle: (item: Omit<NewsItem, 'id'>) => NewsItem
  updateArticle: (id: string, item: Partial<NewsItem>) => void
  deleteArticle: (id: string) => void
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => GalleryItem
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void
  deleteGalleryItem: (id: string) => void
  addEvent: (item: Omit<EventItem, 'id'>) => EventItem
  updateEvent: (id: string, item: Partial<EventItem>) => void
  deleteEvent: (id: string) => void
  addApplication: (item: Omit<ApplicationItem, 'id'>) => ApplicationItem
  updateApplication: (id: string, item: Partial<ApplicationItem>) => void
  deleteApplication: (id: string) => void
  addStaffMember: (item: Omit<StaffMember, 'id'>) => StaffMember
  updateStaffMember: (id: string, item: Partial<StaffMember>) => void
  deleteStaffMember: (id: string) => void
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null)

function logActivity(
  setActivities: React.Dispatch<React.SetStateAction<ActivityLog[]>>,
  action: string,
  module: string
) {
  const entry: ActivityLog = {
    id: generateId(),
    action,
    module,
    timestamp: Date.now(),
  }
  setActivities((prev) => [entry, ...prev].slice(0, 30))
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState(() => loadStored(STORAGE_KEYS.articles, NEWS))
  const [gallery, setGallery] = useState(() => loadStored(STORAGE_KEYS.gallery, GALLERY))
  const [events, setEvents] = useState(() => loadStored(STORAGE_KEYS.events, EVENTS))
  const [applications, setApplications] = useState(() =>
    loadStored(STORAGE_KEYS.applications, APPLICATIONS)
  )
  const [staff, setStaff] = useState(() => loadStored(STORAGE_KEYS.staff, STAFF))
  const [admissionSettings, setAdmissionSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.admissionSettings)
      if (raw) return normalizeAdmissionSettings(JSON.parse(raw))
    } catch {
      /* seed */
    }
    return DEFAULT_ADMISSION_SETTINGS
  })
  const [activities, setActivities] = useState<ActivityLog[]>(() =>
    loadStored(STORAGE_KEYS.activities, [])
  )

  useEffect(() => saveStored(STORAGE_KEYS.articles, articles), [articles])
  useEffect(() => saveStored(STORAGE_KEYS.gallery, gallery), [gallery])
  useEffect(() => saveStored(STORAGE_KEYS.events, events), [events])
  useEffect(() => saveStored(STORAGE_KEYS.applications, applications), [applications])
  useEffect(() => saveStored(STORAGE_KEYS.staff, staff), [staff])
  useEffect(() => saveStoredObject(STORAGE_KEYS.admissionSettings, admissionSettings), [admissionSettings])
  useEffect(() => saveStored(STORAGE_KEYS.activities, activities), [activities])

  const updateAdmissionSettings = useCallback((settings: Partial<AdmissionSettings>) => {
    setAdmissionSettings((prev) => ({ ...prev, ...settings }))
    logActivity(setActivities, 'Updated admissions dates or forms', 'Admissions')
  }, [])

  const addArticle = useCallback((item: Omit<NewsItem, 'id'>) => {
    const created = { ...item, id: generateId() }
    setArticles((prev) => [created, ...prev])
    logActivity(setActivities, `Added article "${item.title}"`, 'Articles')
    return created
  }, [])

  const updateArticle = useCallback((id: string, item: Partial<NewsItem>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...item } : a)))
    logActivity(setActivities, 'Updated an article', 'Articles')
  }, [])

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
    logActivity(setActivities, 'Deleted an article', 'Articles')
  }, [])

  const addGalleryItem = useCallback((item: Omit<GalleryItem, 'id'>) => {
    const created = { ...item, id: generateId() }
    setGallery((prev) => [created, ...prev])
    logActivity(setActivities, `Added photo "${item.title}"`, 'Gallery')
    return created
  }, [])

  const updateGalleryItem = useCallback((id: string, item: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...item } : g)))
    logActivity(setActivities, 'Updated a gallery photo', 'Gallery')
  }, [])

  const deleteGalleryItem = useCallback((id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id))
    logActivity(setActivities, 'Deleted a gallery photo', 'Gallery')
  }, [])

  const addEvent = useCallback((item: Omit<EventItem, 'id'>) => {
    const created = { ...item, id: generateId() }
    setEvents((prev) => [created, ...prev])
    logActivity(setActivities, `Added event "${item.title}"`, 'Events')
    return created
  }, [])

  const updateEvent = useCallback((id: string, item: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...item } : e)))
    logActivity(setActivities, 'Updated an event', 'Events')
  }, [])

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
    logActivity(setActivities, 'Deleted an event', 'Events')
  }, [])

  const addApplication = useCallback((item: Omit<ApplicationItem, 'id'>) => {
    const created = { ...item, id: generateId() }
    setApplications((prev) => [created, ...prev])
    logActivity(setActivities, `Added application for ${item.studentName}`, 'Admissions')
    return created
  }, [])

  const updateApplication = useCallback((id: string, item: Partial<ApplicationItem>) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, ...item } : a)))
    logActivity(setActivities, 'Updated an application', 'Admissions')
  }, [])

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id))
    logActivity(setActivities, 'Deleted an application', 'Admissions')
  }, [])

  const addStaffMember = useCallback((item: Omit<StaffMember, 'id'>) => {
    const created = { ...item, id: generateId() }
    setStaff((prev) => [created, ...prev])
    logActivity(setActivities, `Added staff member ${item.name}`, 'Staff')
    return created
  }, [])

  const updateStaffMember = useCallback((id: string, item: Partial<StaffMember>) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, ...item } : s)))
    logActivity(setActivities, 'Updated a staff member', 'Staff')
  }, [])

  const deleteStaffMember = useCallback((id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id))
    logActivity(setActivities, 'Deleted a staff member', 'Staff')
  }, [])

  const value = useMemo(
    () => ({
      articles,
      gallery,
      events,
      applications,
      admissionSettings,
      staff,
      activities,
      addArticle,
      updateArticle,
      deleteArticle,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      addEvent,
      updateEvent,
      deleteEvent,
      addApplication,
      updateApplication,
      deleteApplication,
      updateAdmissionSettings,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
    }),
    [
      articles,
      gallery,
      events,
      applications,
      admissionSettings,
      staff,
      activities,
      addArticle,
      updateArticle,
      deleteArticle,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      addEvent,
      updateEvent,
      deleteEvent,
      addApplication,
      updateApplication,
      deleteApplication,
      updateAdmissionSettings,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
    ]
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider')
  return ctx
}
