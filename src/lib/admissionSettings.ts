import type { AdmissionSettings, DownloadFormItem } from '@/types/admin'
import { IMPORTANT_DATES, DEFAULT_ADMISSION_SETTINGS } from '@/data/admissions'
import { generateId } from '@/lib/adminStorage'

/** Normalize legacy localStorage shape (grades/requirements/process or `file` field) */
export function normalizeAdmissionSettings(raw: unknown): AdmissionSettings {
  if (!raw || typeof raw !== 'object') return DEFAULT_ADMISSION_SETTINGS

  const data = raw as Record<string, unknown>
  const dates = Array.isArray(data.importantDates)
    ? (data.importantDates as AdmissionSettings['importantDates'])
    : IMPORTANT_DATES

  let forms: DownloadFormItem[] = DEFAULT_ADMISSION_SETTINGS.downloadForms
  if (Array.isArray(data.downloadForms)) {
    forms = (data.downloadForms as Array<Record<string, string>>).map((f) => ({
      id: f.id ?? generateId(),
      name: f.name ?? '',
      url: f.url ?? f.file ?? '',
    }))
  }

  return {
    importantDates: dates,
    downloadForms: forms.filter((f) => f.name.trim() && f.url.trim()),
  }
}
