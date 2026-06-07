import type { EventItem } from '@/types'

export function parseEventDate(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Start of local calendar day */
export function startOfDay(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isEventUpcoming(event: EventItem, today = startOfDay()): boolean {
  return parseEventDate(event.date).getTime() >= today.getTime()
}

export function splitEventsByPeriod(events: EventItem[], today = startOfDay()) {
  const upcoming = events
    .filter((e) => isEventUpcoming(e, today))
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())
  const past = events
    .filter((e) => !isEventUpcoming(e, today))
    .sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime())
  return { upcoming, past }
}

export function groupEventsByMonth(
  events: EventItem[],
  order: 'asc' | 'desc' = 'asc'
): { key: string; label: string; events: EventItem[] }[] {
  const map = new Map<string, EventItem[]>()
  for (const event of events) {
    const d = parseEventDate(event.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(event)
  }
  const groups = [...map.entries()].map(([key, items]) => {
    const d = parseEventDate(items[0].date)
    const label = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    return { key, label, events: items }
  })
  groups.sort((a, b) =>
    order === 'asc' ? a.key.localeCompare(b.key) : b.key.localeCompare(a.key)
  )
  return groups
}

export function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const daysInMonth = last.getDate()
  const startOffset = first.getDay()
  const cells: { day: number | null; date: Date | null }[] = []
  for (let i = 0; i < startOffset; i++) cells.push({ day: null, date: null })
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, date: new Date(year, month, d) })
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, date: null })
  return cells
}

export function eventsOnDate(events: EventItem[], date: Date): EventItem[] {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  return events.filter((e) => {
    const ed = parseEventDate(e.date)
    return ed.getFullYear() === y && ed.getMonth() === m && ed.getDate() === d
  })
}

export function monthHasEvents(events: EventItem[], year: number, month: number): boolean {
  return events.some((e) => {
    const d = parseEventDate(e.date)
    return d.getFullYear() === year && d.getMonth() === month
  })
}

export function defaultCalendarMonth(
  events: EventItem[],
  period: 'upcoming' | 'past',
  today = startOfDay()
): Date {
  if (events.length === 0) return new Date(today.getFullYear(), today.getMonth(), 1)
  const d = parseEventDate(period === 'upcoming' ? events[0].date : events[0].date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date, today = startOfDay()): boolean {
  return isSameDay(date, today)
}
