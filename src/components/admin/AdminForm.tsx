import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function AdminField({
  label,
  children,
  required,
  className,
}: {
  label: string
  children: ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <label className={cn('block', className)}>
      <span className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-secondary ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

export const adminInputClass =
  'w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'

export const adminSelectClass = adminInputClass

export function AdminFormActions({
  onCancel,
  submitLabel,
  isEdit,
}: {
  onCancel: () => void
  submitLabel?: string
  isEdit?: boolean
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 pt-4 border-t border-gray-100 mt-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-dark"
      >
        {submitLabel ?? (isEdit ? 'Save Changes' : 'Create')}
      </button>
    </div>
  )
}
