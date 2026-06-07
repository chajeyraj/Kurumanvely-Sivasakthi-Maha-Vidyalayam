import type { AdmissionDate } from '@/types'

export interface DownloadFormItem {
  id: string
  name: string
  /** PDF filename (e.g. form.pdf) or full URL */
  url: string
}

/** Admin-managed admissions content only (dates + download forms) */
export interface AdmissionSettings {
  importantDates: AdmissionDate[]
  downloadForms: DownloadFormItem[]
}

export interface ApplicationItem {
  id: string
  studentName: string
  parentName: string
  grade: string
  stream?: string
  email: string
  phone: string
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
  submittedAt: string
  notes?: string
}

export interface ActivityLog {
  id: string
  action: string
  module: string
  timestamp: number
}
