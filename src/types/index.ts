export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  image: string
  featured?: boolean
}

export interface EventItem {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
  aspectRatio?: 'tall' | 'wide' | 'square'
}

export interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  category: 'principal' | 'administration' | 'teachers' | 'non-academic'
  email?: string
  phone?: string
  image: string
}

export interface AcademicStream {
  id: string
  name: string
  established: number
  description: string
  subjects: string[]
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface Statistic {
  label: string
  value: number
  suffix?: string
  icon: string
}

export interface AdmissionDate {
  label: string
  date: string
}

export interface ActivityItem {
  id: string
  action: string
  module: string
  time: string
}

export interface DashboardStat {
  label: string
  value: string | number
  change?: string
  icon: string
}
