import { Plus } from 'lucide-react'

interface AdminPageHeaderProps {
  title: string
  description: string
  addLabel: string
  onAdd: () => void
}

export function AdminPageHeader({  description, addLabel, onAdd }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <p className="text-gray-500 mt-1 text-sm">{description}</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-secondary hover:bg-secondary-dark transition-colors shrink-0"
      >
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
    </div>
  )
}
