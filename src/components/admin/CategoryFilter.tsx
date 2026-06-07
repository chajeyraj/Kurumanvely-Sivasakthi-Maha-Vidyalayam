import { cn } from '@/utils/cn'

interface CategoryFilterProps {
  categories: readonly string[]
  active: string
  onChange: (category: string) => void
  allLabel?: string
}

export function CategoryFilter({
  categories,
  active,
  onChange,
  allLabel = 'All',
}: CategoryFilterProps) {
  const tabs = [allLabel, ...categories]

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            'px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors',
            active === cat
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/40'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
