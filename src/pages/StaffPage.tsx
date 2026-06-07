import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { useAdminData } from '@/context/AdminDataContext'
import { cn } from '@/utils/cn'

const CATEGORIES = [
  { key: 'all', label: 'All Staff' },
  { key: 'principal', label: 'Principal' },
  { key: 'administration', label: 'Administration' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'non-academic', label: 'Non Academic' },
] as const

export function StaffPage() {
  const { staff } = useAdminData()
  const [filter, setFilter] = useState<string>('all')

  const filtered =
    filter === 'all' ? staff : staff.filter((s) => s.category === filter)

  const principal = staff.find((s) => s.category === 'principal')

  return (
    <div>
      <section className="relative py-24 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">Staff Directory</h1>
          <p className="page-hero-subtitle mx-auto">Meet our dedicated educators and staff</p>
        </div>
      </section>

      {principal && filter === 'all' && (
        <section className="section-padding bg-surface">
          <SectionTitle title="Principal" />
          <div className="max-w-md mx-auto">
            <GlassCard className="text-center p-0 overflow-hidden">
              <img src={principal.image} alt={principal.name} className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary">{principal.name}</h3>
                <p className="text-secondary font-medium">{principal.role}</p>
                {principal.email && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" /> {principal.email}
                  </p>
                )}
                {principal.phone && (
                  <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" /> {principal.phone}
                  </p>
                )}
              </div>
            </GlassCard>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setFilter(cat.key)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-semibold transition-all',
                filter === cat.key ? 'bg-primary text-white' : 'glass hover:bg-primary/10'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered
            .filter((s) => filter !== 'all' || s.category !== 'principal')
            .map((member) => (
              <GlassCard key={member.id} className="p-0 overflow-hidden text-center">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-primary">{member.name}</h3>
                  <p className="text-sm text-secondary">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{member.department}</p>
                </div>
              </GlassCard>
            ))}
        </div>
      </section>
    </div>
  )
}
