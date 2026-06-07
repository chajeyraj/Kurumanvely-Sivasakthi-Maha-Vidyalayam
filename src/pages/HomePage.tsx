import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Compass, ArrowRight } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { PrincipalSection } from '@/components/sections/PrincipalSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatisticCard } from '@/components/cards/StatisticCard'
import { NewsCard } from '@/components/cards/NewsCard'
import { EventCard } from '@/components/cards/EventCard'
import { SCHOOL, STATISTICS } from '@/data/school'
import { ACADEMIC_STREAMS } from '@/data/academics'
import { useAdminData } from '@/context/AdminDataContext'
import { splitEventsByPeriod } from '@/utils/events'

export function HomePage() {
  const { articles, events } = useAdminData()
  const upcomingEvents = splitEventsByPeriod(events).upcoming

  return (
    <>
      <HeroSection />

      <PrincipalSection />

      <section className="section-padding bg-surface">
        <SectionTitle title="Our Impact" subtitle="Over a century of educational excellence" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATISTICS.map((stat) => (
            <StatisticCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="Vision & Mission" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <GlassCard>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">Vision</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{SCHOOL.vision}</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Compass className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-secondary">Mission</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{SCHOOL.mission}</p>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <SectionTitle title="Academic Streams" subtitle="Three distinguished Advanced Level pathways" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {ACADEMIC_STREAMS.map((stream, i) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard>
                <span className="text-accent font-bold text-sm">Est. {stream.established}</span>
                <h3 className="mt-2 text-lg font-bold text-primary">{stream.name}</h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{stream.description}</p>
                <Link to="/academics" className="inline-flex items-center gap-1 mt-4 text-sm text-secondary font-semibold hover:text-primary">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-8">
          <SectionTitle title="Latest News" align="left" className="mb-0" />
          <Link to="/news" className="hidden sm:flex items-center gap-1 text-sm text-secondary font-semibold hover:text-primary">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {articles.slice(0, 3).map((item, i) => (
            <NewsCard key={item.id} item={item} featured={i === 0} />
          ))}
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-8">
          <SectionTitle title="Upcoming Events" align="left" className="mb-0" />
          <Link to="/events" className="hidden sm:flex items-center gap-1 text-sm text-secondary font-semibold">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} item={event} />
          ))}
        </div>
      </section>

      <ContactFormSection />
    </>
  )
}
