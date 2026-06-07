import { AdminModal } from '@/components/admin/AdminModal'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AdminModal open={open} onClose={onCancel} title={title} size="md">
      <p className="text-sm text-gray-600">{message}</p>
      <div className="flex gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </AdminModal>
  )
}
