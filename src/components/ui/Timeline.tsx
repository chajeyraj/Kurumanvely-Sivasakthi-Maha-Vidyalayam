import { motion } from 'framer-motion'
import type { TimelineEvent } from '@/types'

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-1/2" />
      <div className="space-y-12">
        {events.map((event, i) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-6 ${
              i % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="md:w-1/2 md:px-8" />
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-lg md:-translate-x-1/2 z-10" />
            <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
              <GlassCardInline year={event.year} title={event.title} description={event.description} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function GlassCardInline({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="glass-card p-6">
      <span className="text-2xl font-bold text-accent">{year}</span>
      <h3 className="mt-2 text-xl font-bold text-primary">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
