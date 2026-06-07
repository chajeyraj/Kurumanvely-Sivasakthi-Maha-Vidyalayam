import { BookOpen, BarChart3 } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { ACADEMIC_STREAMS, DEPARTMENTS, PERFORMANCE_STATS } from '@/data/academics'

export function AcademicsPage() {
  return (
    <div>
      <section className="relative py-24 gradient-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">Academics</h1>
          <p className="page-hero-subtitle mx-auto">Excellence across Arts, Commerce, and Science</p>
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="Curriculum" subtitle="Aligned with the Sri Lankan national curriculum and enriched with holistic development" />
        <GlassCard className="max-w-4xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our curriculum integrates rigorous academic standards with leadership training, spiritual values, and co-curricular activities. Students progress through primary, ordinary level, and advanced level programmes with dedicated faculty support at every stage.
          </p>
        </GlassCard>
      </section>

      <section className="section-padding bg-surface">
        <SectionTitle title="Academic Streams" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {ACADEMIC_STREAMS.map((stream) => (
            <GlassCard key={stream.id}>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="text-xl font-bold text-primary">{stream.name}</h3>
                  <span className="text-sm text-accent">Since {stream.established}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{stream.description}</p>
              <ul className="space-y-1">
                {stream.subjects.map((s) => (
                  <li key={s} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {s}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="Departments" />
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <GlassCard key={dept.name}>
              <h3 className="text-lg font-bold text-primary">{dept.name}</h3>
              <p className="text-sm text-secondary mt-1">Head: {dept.head}</p>
              <p className="mt-2 text-gray-500">{dept.subjects} subject areas</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="section-padding bg-surface">
        <SectionTitle title="Performance Statistics" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFORMANCE_STATS.map((stat) => (
            <GlassCard key={stat.label} className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-accent mb-3" />
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}
