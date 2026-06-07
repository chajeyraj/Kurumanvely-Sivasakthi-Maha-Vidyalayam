import type { AdmissionDate } from '@/types'
import type { AdmissionSettings } from '@/types/admin'
import { generateId } from '@/lib/adminStorage'

export const ADMISSION_INFO = {
  grades: ['Grade 6 (Year 7)', 'GCE O/L Foundation', 'GCE A/L — Arts', 'GCE A/L — Commerce', 'GCE A/L — Mathematics & Science'],
  requirements: [
    'Completed application form',
    'Birth certificate (copy)',
    'Previous school records / transfer certificate',
    'Two passport-size photographs',
    'Proof of residence',
  ],
  process: [
    'Collect or download the application form',
    'Submit completed form with documents to the school office',
    'Attend entrance assessment (where applicable)',
    'Receive admission decision via official letter',
    'Complete enrollment and fee payment',
  ],
}

export const IMPORTANT_DATES: AdmissionDate[] = [
  { label: 'Application Period Opens', date: '1 January 2027' },
  { label: 'Application Deadline', date: '28 February 2027' },
  { label: 'Entrance Assessment', date: '15 March 2027' },
  { label: 'Results Announcement', date: '1 April 2027' },
  { label: 'Enrollment & Orientation', date: '20 April 2027' },
]

export const DOWNLOAD_FORMS = [
  { name: 'Grade 6 Application Form', url: 'grade6-application.pdf' },
  { name: 'A/L Stream Application Form', url: 'al-application.pdf' },
  { name: 'Transfer Student Form', url: 'transfer-form.pdf' },
]

export const DEFAULT_ADMISSION_SETTINGS: AdmissionSettings = {
  importantDates: IMPORTANT_DATES,
  downloadForms: DOWNLOAD_FORMS.map((f) => ({
    id: generateId(),
    name: f.name,
    url: f.url,
  })),
}
