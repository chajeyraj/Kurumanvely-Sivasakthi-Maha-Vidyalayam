import { Calendar, Clock, MapPin } from 'lucide-react'
import type { EventItem } from '@/types'
import { GlassCard } from '@/components/ui/GlassCard'

interface EventCardProps {
  item: EventItem
  compact?: boolean
  isPast?: boolean
}

export function EventCard({ item, compact, isPast }: EventCardProps) {
  return (
    <GlassCard className={isPast ? 'overflow-hidden p-0 border-l-4 border-l-secondary/50' : 'overflow-hidden p-0'}>
      {!compact && (
        <div className="h-40 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase text-accent">{item.category}</span>
          {isPast && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
              Past
            </span>
          )}
        </div>
        <h3 className="mt-2 text-base font-bold text-primary">{item.title}</h3>
        {!compact && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>}
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            {new Date(item.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-secondary" />
            {item.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            {item.location}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}
