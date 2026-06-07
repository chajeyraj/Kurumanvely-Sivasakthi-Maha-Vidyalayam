import { motion } from 'framer-motion'
import type { EventItem } from '@/types'
import { EventCard } from '@/components/cards/EventCard'
import { groupEventsByMonth } from '@/utils/events'
import type { EventPeriod } from '@/components/events/PeriodTabs'

interface EventListGroupedProps {
  events: EventItem[]
  period: EventPeriod
  variant?: 'grid' | 'timeline'
}

export function EventListGrouped({ events, period, variant = 'grid' }: EventListGroupedProps) {
  const groups = groupEventsByMonth(events, period === 'upcoming' ? 'asc' : 'desc')

  if (events.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4 rounded-xl border border-dashed border-gray-300 bg-surface-muted">
        <p className="text-gray-600 text-sm">
          {period === 'upcoming'
            ? 'No upcoming events scheduled at the moment. Please check back soon.'
            : 'No past events recorded for this period yet.'}
        </p>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className="space-y-10">
        {groups.map((group, gi) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.05 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <h3 className="text-lg font-bold text-primary shrink-0">{group.label}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              <span className="text-xs font-semibold text-gray-500">
                {group.events.length} event{group.events.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.events.map((event) => (
                <EventCard key={event.id} item={event} isPast={period === 'past'} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {groups.map((group, gi) => (
        <motion.div
          key={group.key}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: gi * 0.05 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span
              className={
                period === 'upcoming'
                  ? 'flex h-10 px-3 items-center justify-center rounded-full bg-primary text-white font-bold text-sm'
                  : 'flex h-10 px-3 items-center justify-center rounded-full bg-secondary/90 text-white font-bold text-sm'
              }
            >
              {group.label}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
          </div>
          <div className="space-y-0">
            {group.events.map((event, i) => (
              <div key={event.id} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0">
                {i < group.events.length - 1 && (
                  <div
                    className={
                      period === 'upcoming'
                        ? 'absolute left-[27px] top-14 bottom-0 w-0.5 bg-primary/25'
                        : 'absolute left-[27px] top-14 bottom-0 w-0.5 bg-secondary/25'
                    }
                  />
                )}
                <div
                  className={
                    period === 'upcoming'
                      ? 'shrink-0 w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-sm z-10'
                      : 'shrink-0 w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-sm z-10 border border-secondary/30'
                  }
                >
                  {new Date(event.date).getDate()}
                </div>
                <div className="flex-1 min-w-0">
                  <EventCard item={event} isPast={period === 'past'} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
