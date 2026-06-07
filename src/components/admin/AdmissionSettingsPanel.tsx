import { useState } from 'react'
import { Calendar, Download, Plus, Save, Trash2 } from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { generateId } from '@/lib/adminStorage'
import { AdminField, adminInputClass } from '@/components/admin/AdminForm'
import { GlassCard } from '@/components/ui/GlassCard'

export function AdmissionSettingsPanel() {
  const { admissionSettings, updateAdmissionSettings } = useAdminData()
  const [dates, setDates] = useState(admissionSettings.importantDates)
  const [forms, setForms] = useState(admissionSettings.downloadForms)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateAdmissionSettings({
      importantDates: dates.filter((d) => d.label.trim() && d.date.trim()),
      downloadForms: forms.filter((f) => f.name.trim() && f.url.trim()),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-500">
          Only Important Dates and Download Forms are editable here. Other admissions
          content on the public page is fixed.
        </p>
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark shrink-0"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-secondary" />
          <h2 className="font-bold text-primary">Important Dates</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Shown on the public Admissions page under &quot;Important Dates&quot;.
        </p>
        <div className="space-y-3">
          {dates.map((d, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-2">
              <input
                className={adminInputClass}
                placeholder="Event label"
                value={d.label}
                onChange={(e) => {
                  const next = [...dates]
                  next[i] = { ...next[i], label: e.target.value }
                  setDates(next)
                }}
              />
              <div className="flex gap-2">
                <input
                  className={adminInputClass}
                  placeholder="e.g. 28 February 2027"
                  value={d.date}
                  onChange={(e) => {
                    const next = [...dates]
                    next[i] = { ...next[i], date: e.target.value }
                    setDates(next)
                  }}
                />
                <button
                  type="button"
                  onClick={() => setDates(dates.filter((_, j) => j !== i))}
                  className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                  aria-label="Remove date"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDates([...dates, { label: '', date: '' }])}
          className="mt-4 text-sm font-semibold text-secondary flex items-center gap-1 hover:underline"
        >
          <Plus className="w-4 h-4" /> Add date
        </button>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-secondary" />
          <h2 className="font-bold text-primary">Download Forms (PDF / URL)</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Enter a PDF filename or a full link (https://…). Visitors can download or open
          each form from the Admissions page.
        </p>
        <div className="space-y-4">
          {forms.map((f, i) => (
            <div key={f.id} className="p-3 rounded-lg border border-gray-100 space-y-2">
              <AdminField label="Form title">
                <input
                  className={adminInputClass}
                  placeholder="e.g. Grade 6 Application Form"
                  value={f.name}
                  onChange={(e) => {
                    const next = [...forms]
                    next[i] = { ...next[i], name: e.target.value }
                    setForms(next)
                  }}
                />
              </AdminField>
              <div className="flex gap-2 items-end">
                <AdminField label="PDF file or URL" className="flex-1">
                  <input
                    className={adminInputClass}
                    placeholder="form.pdf or https://example.com/form.pdf"
                    value={f.url}
                    onChange={(e) => {
                      const next = [...forms]
                      next[i] = { ...next[i], url: e.target.value }
                      setForms(next)
                    }}
                  />
                </AdminField>
                <button
                  type="button"
                  onClick={() => setForms(forms.filter((_, j) => j !== i))}
                  className="p-2.5 mb-0.5 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                  aria-label="Remove form"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setForms([...forms, { id: generateId(), name: '', url: '' }])}
          className="mt-4 text-sm font-semibold text-secondary flex items-center gap-1 hover:underline"
        >
          <Plus className="w-4 h-4" /> Add form
        </button>
      </GlassCard>
    </div>
  )
}
