import { useMemo, useState } from 'react'
import { Calendar, List } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useAdminData } from '@/context/AdminDataContext'
import { cn } from '@/utils/cn'
import { splitEventsByPeriod, defaultCalendarMonth } from '@/utils/events'
import { PeriodTabs, type EventPeriod } from '@/components/events/PeriodTabs'
import { EventsCalendar } from '@/components/events/EventsCalendar'
import { EventListGrouped } from '@/components/events/EventListGrouped'

type ViewMode = 'list' | 'calendar'

export function EventsPage() {
  const { events } = useAdminData()
  const [view, setView] = useState<ViewMode>('list')
  const [period, setPeriod] = useState<EventPeriod>('upcoming')

  const { upcoming, past } = useMemo(() => splitEventsByPeriod(events), [events])
  const activeEvents = period === 'upcoming' ? upcoming : past
  const calendarMonth = useMemo(
    () => defaultCalendarMonth(activeEvents, period),
    [activeEvents, period]
  )

  return (
    <div>
      <section className="relative py-20 md:py-24 gradient-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">Events</h1>
          <p className="page-hero-subtitle mx-auto">
            Browse upcoming activities and past school events
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setView('list')}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  view === 'list' ? 'bg-primary text-white shadow-sm' : 'glass'
                )}
              >
                <List className="w-4 h-4" /> List
              </button>
              <button
                type="button"
                onClick={() => setView('calendar')}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  view === 'calendar' ? 'bg-primary text-white shadow-sm' : 'glass'
                )}
              >
                <Calendar className="w-4 h-4" /> Calendar
              </button>
            </div>
            <PeriodTabs
              period={period}
              onChange={setPeriod}
              upcomingCount={upcoming.length}
              pastCount={past.length}
            />
          </div>

          <SectionTitle
            title={period === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
            subtitle={
              view === 'calendar'
                ? 'Use arrows to change month; tap highlighted dates for details'
                : period === 'upcoming'
                  ? 'Grouped by month — soonest first'
                  : 'Grouped by month — most recent first'
            }
            className="mb-8"
          />

          {view === 'calendar' ? (
            <EventsCalendar
              key={period}
              events={activeEvents}
              period={period}
              initialMonth={calendarMonth}
            />
          ) : (
            <EventListGrouped events={activeEvents} period={period} variant="grid" />
          )}
        </div>
      </section>
    </div>
  )
}
