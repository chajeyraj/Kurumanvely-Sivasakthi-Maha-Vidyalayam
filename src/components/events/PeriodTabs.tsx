import { CalendarClock, History } from 'lucide-react'
import { cn } from '@/utils/cn'

export type EventPeriod = 'upcoming' | 'past'

interface PeriodTabsProps {
  period: EventPeriod
  onChange: (period: EventPeriod) => void
  upcomingCount: number
  pastCount: number
  className?: string
}

export function PeriodTabs({
  period,
  onChange,
  upcomingCount,
  pastCount,
  className,
}: PeriodTabsProps) {
  const tabs: { id: EventPeriod; label: string; count: number; icon: typeof CalendarClock }[] = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingCount, icon: CalendarClock },
    { id: 'past', label: 'Past', count: pastCount, icon: History },
  ]

  return (
    <div
      className={cn(
        'inline-flex flex-wrap justify-center gap-1 p-1 rounded-xl bg-white border border-gray-200 shadow-sm',
        className
      )}
      role="tablist"
      aria-label="Event period"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const active = period === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors min-w-[8.5rem] justify-center',
              active
                ? tab.id === 'upcoming'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-secondary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {tab.label}
            <span
              className={cn(
                'text-xs font-bold px-1.5 py-0.5 rounded-full',
                active ? 'bg-white/25' : 'bg-gray-100 text-gray-600'
              )}
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
