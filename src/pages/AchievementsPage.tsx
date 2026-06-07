import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trophy, Medal, Star, ArrowLeft } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { getIcon } from '@/utils/icons'
import { GlassCard } from '@/components/ui/GlassCard'
import { AboutSectionNav } from '@/components/layout/AboutNavMenu'
import { ACHIEVEMENTS } from '@/data/achievements'

const HIGHLIGHTS = [
  { label: 'District Rank Holders', value: '12+', icon: Trophy },
  { label: 'National Awards', value: '5+', icon: Medal },
  { label: 'Years of Excellence', value: '115+', icon: Star },
]

const byYear = ACHIEVEMENTS.reduce<Record<string, typeof ACHIEVEMENTS>>((acc, item) => {
  if (!acc[item.year]) acc[item.year] = []
  acc[item.year].push(item)
  return acc
}, {})

const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))
const featured = ACHIEVEMENTS[0]

export function AchievementsPage() {
  return (
    <div>
      <section className="relative py-20 md:py-24 gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h1 className="page-hero-title">Achievements</h1>
          <p className="page-hero-subtitle mx-auto">
            Honouring academic, sporting, and cultural excellence
          </p>
          <div className="mt-6 flex justify-center">
            <AboutSectionNav />
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 md:gap-6">
          {HIGHLIGHTS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="text-center py-5">
                <stat.icon className="w-7 h-7 mx-auto text-primary mb-2" />
                <p className="text-xl md:text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-600">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Featured Achievement" align="left" className="mb-6" />
          <GlassCard className="p-0 overflow-hidden md:grid md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-br from-primary to-secondary p-8 flex flex-col justify-center text-white">
              <span className="text-accent font-bold text-3xl">{featured.year}</span>
              <Trophy className="w-10 h-10 mt-4 text-accent" />
            </div>
            <div className="md:col-span-3 p-6 md:p-8">
              <h3 className="text-xl font-bold text-primary">{featured.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{featured.description}</p>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <SectionTitle
          title="Achievement Timeline"
          subtitle="Milestones organised by year for easy reading"
        />
        <div className="max-w-4xl mx-auto space-y-10">
          {years.map((year, yi) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: yi * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                  {year}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>
              <div className="space-y-3 pl-2 md:pl-14">
                {byYear[year].map((item) => {
                  const Icon = getIcon(item.icon, Trophy)
                  return (
                    <GlassCard key={item.title} className="flex gap-4 items-start">
                      <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </GlassCard>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="py-8">
            <p className="text-gray-600 text-sm">
              Explore more about our school history, leadership, and values.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
