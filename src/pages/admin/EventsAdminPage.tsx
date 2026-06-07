import { useMemo, useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import type { EventItem } from '@/types'
import { useAdminData } from '@/context/AdminDataContext'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { AdminModal } from '@/components/admin/AdminModal'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { AdminField, AdminFormActions, adminInputClass } from '@/components/admin/AdminForm'
import { GlassCard } from '@/components/ui/GlassCard'
import { splitEventsByPeriod } from '@/utils/events'

const emptyForm = (): Omit<EventItem, 'id'> => ({
  title: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
  time: '09:00 AM',
  location: '',
  category: 'Ceremony',
  image: '',
})

const EVENT_CATEGORIES = ['Ceremony', 'Academic', 'Sports', 'Cultural', 'Other']

export function EventsAdminPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAdminData()
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState<'all' | 'upcoming' | 'past'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { upcoming, past } = useMemo(() => splitEventsByPeriod(events), [events])

  const filtered = useMemo(() => {
    let list = events
    if (period === 'upcoming') list = upcoming
    if (period === 'past') list = past
    const q = search.toLowerCase()
    if (!q) return list
    return list.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    )
  }, [events, upcoming, past, period, search])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm())
    setModalOpen(true)
  }

  const openEdit = (item: EventItem) => {
    setEditing(item)
    setForm({
      title: item.title,
      description: item.description,
      date: item.date,
      time: item.time,
      location: item.location,
      category: item.category,
      image: item.image,
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editing) updateEvent(editing.id, form)
    else addEvent(form)
    setModalOpen(false)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <AdminPageHeader
        title="Event Management"
        description="Schedule, edit, and remove school events. View upcoming and past entries."
        addLabel="Add Event"
        onAdd={openCreate}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'upcoming', 'past'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg capitalize ${
              period === p ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {p === 'all' ? `All (${events.length})` : `${p} (${p === 'upcoming' ? upcoming.length : past.length})`}
          </button>
        ))}
      </div>

      <GlassCard className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className={`${adminInputClass} pl-9 border-0`}
          />
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[720px]">
            <thead className="bg-primary/5">
              <tr>
                <th className="py-3 px-4 font-semibold text-primary">Event</th>
                <th className="py-3 px-4 font-semibold text-primary">Date & Time</th>
                <th className="py-3 px-4 font-semibold text-primary">Location</th>
                <th className="py-3 px-4 font-semibold text-primary">Status</th>
                <th className="py-3 px-4 font-semibold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No events found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isUpcoming = upcoming.some((e) => e.id === item.id)
                  return (
                    <tr key={item.id} className="border-t border-gray-100 hover:bg-primary/[0.03]">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(item.date).toLocaleDateString('en-GB')}
                        <br />
                        <span className="text-xs">{item.time}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.location}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            isUpcoming
                              ? 'bg-primary/15 text-primary'
                              : 'bg-secondary/15 text-secondary'
                          }`}
                        >
                          {isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="p-2 rounded-lg text-primary hover:bg-primary/10"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(item.id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Event' : 'Add Event'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminField label="Title" required>
            <input
              className={adminInputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </AdminField>
          <AdminField label="Description" required>
            <textarea
              className={adminInputClass}
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </AdminField>
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminField label="Date" required>
              <input
                type="date"
                className={adminInputClass}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Time" required>
              <input
                className={adminInputClass}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </AdminField>
          </div>
          <AdminField label="Location" required>
            <input
              className={adminInputClass}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </AdminField>
          <AdminField label="Category">
            <select
              className={adminInputClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {EVENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Image URL" required>
            <input
              className={adminInputClass}
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </AdminField>
          <AdminFormActions
            onCancel={() => setModalOpen(false)}
            isEdit={!!editing}
            submitLabel={editing ? 'Save Event' : 'Add Event'}
          />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Event"
        message="Remove this event permanently?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteEvent(deleteId)
          setDeleteId(null)
        }}
      />
    </div>
  )
}
