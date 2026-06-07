import { motion } from 'framer-motion'
import { Building2, User, GraduationCap } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { Timeline } from '@/components/ui/Timeline'
import { PrincipalSection } from '@/components/sections/PrincipalSection'
import { AboutSectionNav } from '@/components/layout/AboutNavMenu'
import { SCHOOL, FOUNDER } from '@/data/school'
import { HISTORY_TIMELINE } from '@/data/academics'

export function AboutPage() {
  return (
    <div>
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 gradient-primary opacity-80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero-title"
          >
            About Our School
          </motion.h1>
          <p className="page-hero-subtitle mx-auto">
            A legacy of excellence since {SCHOOL.established}
          </p>
          <div className="mt-6 flex justify-center">
            <AboutSectionNav />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="Our History" subtitle="Over 116 years of dedicated service to education" />
        <div className="max-w-4xl mx-auto">
          <Timeline events={HISTORY_TIMELINE} />
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-accent font-semibold uppercase tracking-wider">Our Foundation</span>
            <h2 className="mt-2 text-3xl font-bold text-primary">{FOUNDER.name}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{FOUNDER.description}</p>
          </motion.div>
          <GlassCard className="p-0 overflow-hidden">
            <img src={FOUNDER.image} alt="School heritage" className="w-full h-80 object-cover" />
          </GlassCard>
        </div>
      </section>

      <PrincipalSection />

      <section className="section-padding bg-surface">
        <SectionTitle title="Vision & Mission" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="text-xl font-bold text-primary mb-3">Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">{SCHOOL.vision}</p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-bold text-secondary mb-3">Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">{SCHOOL.mission}</p>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="School Information" />
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Building2, label: 'Established', value: SCHOOL.established },
            { icon: User, label: 'Principal', value: SCHOOL.principal },
            { icon: GraduationCap, label: 'Streams', value: 'Arts, Commerce, Science' },
          ].map((info) => (
            <GlassCard key={info.label} className="text-center">
              <info.icon className="w-10 h-10 mx-auto text-secondary mb-3" />
              <p className="text-sm text-gray-500 uppercase tracking-wider">{info.label}</p>
              <p className="mt-2 text-lg font-bold text-primary">{info.value}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}
