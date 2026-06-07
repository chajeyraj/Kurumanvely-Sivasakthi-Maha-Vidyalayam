import { useMemo, useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import type { GalleryItem } from '@/types'
import { useAdminData } from '@/context/AdminDataContext'
import { GALLERY_ADMIN_CATEGORIES } from '@/constants/adminCategories'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CategoryFilter } from '@/components/admin/CategoryFilter'
import { AdminModal } from '@/components/admin/AdminModal'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { AdminField, AdminFormActions, adminInputClass, adminSelectClass } from '@/components/admin/AdminForm'
import { GlassCard } from '@/components/ui/GlassCard'

const emptyForm = (): Omit<GalleryItem, 'id'> => ({
  title: '',
  category: GALLERY_ADMIN_CATEGORIES[0],
  image: '',
  aspectRatio: 'square',
})

export function GalleryAdminPage() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdminData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return gallery.filter((g) => {
      const matchCat = category === 'All' || g.category === category
      const q = search.toLowerCase()
      const matchSearch =
        !q || g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [gallery, category, search])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm())
    setModalOpen(true)
  }

  const openEdit = (item: GalleryItem) => {
    setEditing(item)
    setForm({
      title: item.title,
      category: item.category,
      image: item.image,
      aspectRatio: item.aspectRatio ?? 'square',
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.image.trim()) return
    if (editing) updateGalleryItem(editing.id, form)
    else addGalleryItem(form)
    setModalOpen(false)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <AdminPageHeader
        title="Photo Gallery"
        description="Manage photos by category: Campus, Events, Academics, Sports, Culture"
        addLabel="Add Photo"
        onAdd={openCreate}
      />

      <GlassCard className="mb-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photos..."
            className={`${adminInputClass} pl-9`}
          />
        </div>
        <CategoryFilter
          categories={GALLERY_ADMIN_CATEGORIES}
          active={category}
          onChange={setCategory}
        />
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <GlassCard className="col-span-full py-12 text-center text-gray-500 text-sm">
            No photos in this category. Add a photo to get started.
          </GlassCard>
        ) : (
          filtered.map((item) => (
            <GlassCard key={item.id} className="p-0 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="font-semibold text-primary text-sm truncate">{item.title}</p>
                <p className="text-xs text-secondary font-medium mt-0.5">{item.category}</p>
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
        title={editing ? 'Edit Photo' : 'Add Photo'}
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
          <AdminField label="Category" required>
            <select
              className={adminSelectClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {GALLERY_ADMIN_CATEGORIES.map((c) => (
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
              placeholder="https://..."
              required
            />
          </AdminField>
          <AdminField label="Layout">
            <select
              className={adminSelectClass}
              value={form.aspectRatio}
              onChange={(e) =>
                setForm({
                  ...form,
                  aspectRatio: e.target.value as GalleryItem['aspectRatio'],
                })
              }
            >
              <option value="square">Square</option>
              <option value="wide">Wide</option>
              <option value="tall">Tall</option>
            </select>
          </AdminField>
          {form.image && (
            <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
          )}
          <AdminFormActions
            onCancel={() => setModalOpen(false)}
            isEdit={!!editing}
            submitLabel={editing ? 'Save Photo' : 'Add Photo'}
          />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Photo"
        message="Remove this photo from the gallery?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteGalleryItem(deleteId)
          setDeleteId(null)
        }}
      />
    </div>
  )
}
