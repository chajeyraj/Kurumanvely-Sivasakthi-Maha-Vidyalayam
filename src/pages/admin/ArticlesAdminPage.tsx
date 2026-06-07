import { useMemo, useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import type { NewsItem } from '@/types'
import { useAdminData } from '@/context/AdminDataContext'
import { ARTICLE_CATEGORIES } from '@/constants/adminCategories'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CategoryFilter } from '@/components/admin/CategoryFilter'
import { AdminModal } from '@/components/admin/AdminModal'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { AdminField, AdminFormActions, adminInputClass, adminSelectClass } from '@/components/admin/AdminForm'
import { GlassCard } from '@/components/ui/GlassCard'

const emptyForm = (): Omit<NewsItem, 'id'> => ({
  title: '',
  excerpt: '',
  content: '',
  category: ARTICLE_CATEGORIES[0],
  date: new Date().toISOString().slice(0, 10),
  image: '',
  featured: false,
})

export function ArticlesAdminPage() {
  const { articles, addArticle, updateArticle, deleteArticle } = useAdminData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = category === 'All' || a.category === category
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [articles, category, search])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm())
    setModalOpen(true)
  }

  const openEdit = (item: NewsItem) => {
    setEditing(item)
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      date: item.date,
      image: item.image,
      featured: item.featured ?? false,
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editing) updateArticle(editing.id, form)
    else addArticle(form)
    setModalOpen(false)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <AdminPageHeader
        title="Article Management"
        description="Add and manage news articles by category: Events, Academics, Infrastructure, Sports, Admissions, Culture"
        addLabel="Add Article"
        onAdd={openCreate}
      />

      <GlassCard className="mb-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className={`${adminInputClass} pl-9`}
          />
        </div>
        <CategoryFilter
          categories={ARTICLE_CATEGORIES}
          active={category}
          onChange={setCategory}
        />
      </GlassCard>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead className="bg-primary/5">
              <tr>
                <th className="py-3 px-4 font-semibold text-primary">Title</th>
                <th className="py-3 px-4 font-semibold text-primary">Category</th>
                <th className="py-3 px-4 font-semibold text-primary">Date</th>
                <th className="py-3 px-4 font-semibold text-primary">Featured</th>
                <th className="py-3 px-4 font-semibold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No articles found. Add your first article.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-primary/[0.03]">
                    <td className="py-3 px-4 font-medium text-gray-800 max-w-[200px] truncate">
                      {item.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(item.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-4">{item.featured ? 'Yes' : '—'}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="p-2 rounded-lg text-primary hover:bg-primary/10"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
          {filtered.length} of {articles.length} articles
        </p>
      </GlassCard>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Article' : 'Add Article'}
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
          <AdminField label="Category" required>
            <select
              className={adminSelectClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {ARTICLE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Excerpt" required>
            <textarea
              className={adminInputClass}
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
          </AdminField>
          <AdminField label="Content" required>
            <textarea
              className={adminInputClass}
              rows={4}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
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
            <AdminField label="Image URL" required>
              <input
                className={adminInputClass}
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                required
              />
            </AdminField>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Featured article
          </label>
          <AdminFormActions
            onCancel={() => setModalOpen(false)}
            isEdit={!!editing}
            submitLabel={editing ? 'Save Article' : 'Add Article'}
          />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Article"
        message="This article will be permanently removed. Continue?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteArticle(deleteId)
          setDeleteId(null)
        }}
      />
    </div>
  )
}
