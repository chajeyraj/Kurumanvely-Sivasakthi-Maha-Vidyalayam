import { useEffect, useMemo, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { EventItem } from '@/types'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/utils/cn'
import {
  eventsOnDate,
  getCalendarDays,
  isSameDay,
  isToday,
  parseEventDate,
  startOfDay,
} from '@/utils/events'
import type { EventPeriod } from '@/components/events/PeriodTabs'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

interface EventsCalendarProps {
  events: EventItem[]
  period: EventPeriod
  initialMonth?: Date
}

export function EventsCalendar({ events, period, initialMonth }: EventsCalendarProps) {
  const todayRef = useRef(startOfDay())
  const [cursor, setCursor] = useState(
    () => initialMonth ?? new Date(todayRef.current.getFullYear(), todayRef.current.getMonth(), 1)
  )
  const [selected, setSelected] = useState<Date | null>(null)

  useEffect(() => {
    setCursor(initialMonth ?? new Date(todayRef.current.getFullYear(), todayRef.current.getMonth(), 1))
    setSelected(null)
  }, [period, initialMonth])

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const cells = useMemo(() => getCalendarDays(year, month), [year, month])
  const monthLabel = cursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  const eventDates = useMemo(
    () => new Set(events.map((e) => parseEventDate(e.date).toDateString())),
    [events]
  )

  const selectedEvents = selected ? eventsOnDate(events, selected) : []
  const monthEvents = events.filter((e) => {
    const d = parseEventDate(e.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const goMonth = (delta: number) => {
    setCursor(new Date(year, month + delta, 1))
    setSelected(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <GlassCard className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <button
            type="button"
            onClick={() => goMonth(-1)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-primary/5 hover:text-primary transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold text-primary">{monthLabel}</h3>
          <button
            type="button"
            onClick={() => goMonth(1)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-primary/5 hover:text-primary transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[280px] text-center text-sm">
            {WEEKDAYS.map((d) => (
              <div key={d} className="font-bold text-primary py-2 text-xs sm:text-sm">
                {d}
              </div>
            ))}
            {cells.map((cell, i) => {
              if (!cell.date) {
                return <div key={`empty-${i}`} className="py-2 sm:py-3" aria-hidden />
              }
              const hasEvent = eventDates.has(cell.date.toDateString())
              const isSelected = selected && isSameDay(cell.date, selected)
              const todayCell = isToday(cell.date, todayRef.current)
              return (
                <button
                  key={cell.date.toISOString()}
                  type="button"
                  onClick={() => setSelected(hasEvent ? cell.date : null)}
                  disabled={!hasEvent}
                  className={cn(
                    'py-2 sm:py-3 rounded-lg text-sm font-medium transition-colors relative',
                    hasEvent
                      ? 'cursor-pointer hover:ring-2 hover:ring-primary/30'
                      : 'text-gray-400 cursor-default',
                    todayCell && 'ring-2 ring-accent/80',
                    hasEvent &&
                      (period === 'upcoming'
                        ? 'bg-primary/15 text-primary font-bold'
                        : 'bg-secondary/15 text-secondary font-bold'),
                    isSelected &&
                      (period === 'upcoming' ? 'bg-primary text-white' : 'bg-secondary text-white')
                  )}
                >
                  {cell.day}
                  {hasEvent && !isSelected && (
                    <span
                      className={cn(
                        'absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                        period === 'upcoming' ? 'bg-primary' : 'bg-secondary'
                      )}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center sm:text-left">
          {period === 'upcoming'
            ? 'Highlighted dates have upcoming events. Tap a date for details.'
            : 'Highlighted dates have past events. Tap a date for details.'}
        </p>
      </GlassCard>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">
          {selected
            ? selected.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : `All in ${monthLabel}`}
        </h4>
        {(selected ? selectedEvents : monthEvents).length === 0 ? (
          <GlassCard className="py-8 text-center text-sm text-gray-500">
            No {period} events {selected ? 'on this date' : 'in this month'}.
          </GlassCard>
        ) : (
          <ul className="space-y-2">
            {(selected ? selectedEvents : monthEvents)
              .sort(
                (a, b) =>
                  parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime()
              )
              .map((e) => (
                <li key={e.id}>
                  <GlassCard
                    className={cn(
                      'py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2',
                      period === 'past' && 'opacity-90 border-l-4 border-l-secondary/40'
                    )}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase text-accent">
                        {e.category}
                      </span>
                      <p className="font-bold text-primary">{e.title}</p>
                      <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{e.description}</p>
                    </div>
                    <div className="text-sm text-gray-500 shrink-0 sm:text-right">
                      <p>{e.time}</p>
                      <p>{e.location}</p>
                    </div>
                  </GlassCard>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}
