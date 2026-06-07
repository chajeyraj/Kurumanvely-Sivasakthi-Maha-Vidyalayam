export const ARTICLE_CATEGORIES = [
  'Events',
  'Academics',
  'Infrastructure',
  'Sports',
  'Admissions',
  'Culture',
] as const

export const GALLERY_ADMIN_CATEGORIES = [
  'Campus',
  'Events',
  'Academics',
  'Sports',
  'Culture',
] as const

export const STAFF_ADMIN_CATEGORIES = [
  { value: 'principal' as const, label: 'Principal' },
  { value: 'administration' as const, label: 'Administration' },
  { value: 'teachers' as const, label: 'Teachers' },
  { value: 'non-academic' as const, label: 'Non-Academic Staff' },
]

export const APPLICATION_STATUSES = [
  'pending',
  'reviewed',
  'approved',
  'rejected',
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]
