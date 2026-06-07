import { useMemo, useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import type { StaffMember } from '@/types'
import { useAdminData } from '@/context/AdminDataContext'
import { STAFF_ADMIN_CATEGORIES } from '@/constants/adminCategories'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CategoryFilter } from '@/components/admin/CategoryFilter'
import { AdminModal } from '@/components/admin/AdminModal'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { AdminField, AdminFormActions, adminInputClass, adminSelectClass } from '@/components/admin/AdminForm'
import { GlassCard } from '@/components/ui/GlassCard'

const categoryLabels = STAFF_ADMIN_CATEGORIES.map((c) => c.label)
const valueToLabel = Object.fromEntries(
  STAFF_ADMIN_CATEGORIES.map((c) => [c.value, c.label])
) as Record<StaffMember['category'], string>

const emptyForm = (): Omit<StaffMember, 'id'> => ({
  name: '',
  role: '',
  department: '',
  category: 'teachers',
  email: '',
  phone: '',
  image: '',
})

export function StaffAdminPage() {
  const { staff, addStaffMember, updateStaffMember, deleteStaffMember } = useAdminData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<StaffMember | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return staff.filter((s) => {
      const label = valueToLabel[s.category]
      const matchCat = category === 'All' || label === category
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [staff, category, search])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm())
    setModalOpen(true)
  }

  const openEdit = (item: StaffMember) => {
    setEditing(item)
    setForm({
      name: item.name,
      role: item.role,
      department: item.department,
      category: item.category,
      email: item.email ?? '',
      phone: item.phone ?? '',
      image: item.image,
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const payload = {
      ...form,
      email: form.email || undefined,
      phone: form.phone || undefined,
    }
    if (editing) updateStaffMember(editing.id, payload)
    else addStaffMember(payload)
    setModalOpen(false)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <AdminPageHeader
        title="Staff Management"
        description="Manage staff by role: Principal, Administration, Teachers, Non-Academic Staff"
        addLabel="Add Staff Member"
        onAdd={openCreate}
      />

      <GlassCard className="mb-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff..."
            className={`${adminInputClass} pl-9`}
          />
        </div>
        <CategoryFilter
          categories={categoryLabels}
          active={category}
          onChange={setCategory}
        />
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <GlassCard className="col-span-full py-12 text-center text-gray-500 text-sm">
            No staff members in this category.
          </GlassCard>
        ) : (
          filtered.map((item) => (
            <GlassCard key={item.id} className="p-0 overflow-hidden">
              <div className="h-40 overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-secondary uppercase">
                  {valueToLabel[item.category]}
                </span>
                <h3 className="font-bold text-primary mt-1">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.role}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.department}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold rounded-lg bg-primary/10 text-primary"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Staff Member' : 'Add Staff Member'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminField label="Full Name" required>
            <input
              className={adminInputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </AdminField>
          <AdminField label="Staff Category" required>
            <select
              className={adminSelectClass}
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as StaffMember['category'] })
              }
            >
              {STAFF_ADMIN_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </AdminField>
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminField label="Role / Title" required>
              <input
                className={adminInputClass}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="Department" required>
              <input
                className={adminInputClass}
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                required
              />
            </AdminField>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminField label="Email">
              <input
                type="email"
                className={adminInputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </AdminField>
            <AdminField label="Phone">
              <input
                className={adminInputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </AdminField>
          </div>
          <AdminField label="Photo URL" required>
            <input
              className={adminInputClass}
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </AdminField>
          {form.image && (
            <img src={form.image} alt="Preview" className="w-24 h-24 rounded-full object-cover mx-auto" />
          )}
          <AdminFormActions
            onCancel={() => setModalOpen(false)}
            isEdit={!!editing}
            submitLabel={editing ? 'Save Staff' : 'Add Staff Member'}
          />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Staff Member"
        message="Remove this person from the staff directory?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteStaffMember(deleteId)
          setDeleteId(null)
        }}
      />
    </div>
  )
}
