import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Quote, ArrowRight } from 'lucide-react'
import { PRINCIPAL } from '@/data/school'

export function PrincipalSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface-muted relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,640px)] h-48 bg-primary/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/10 text-primary border border-primary/15">
            Leadership
          </span>
          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
            Principal&apos;s Welcome
          </h2>
          <div className="mt-3 h-0.5 w-16 rounded-full gradient-primary mx-auto" />
        </motion.div>

        {/* Unified premium card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="glass-card shadow-premium rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/60"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
            {/* Compact portrait card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="flex-shrink-0 mx-auto sm:mx-0 sm:self-center"
            >
              <div className="relative w-[200px] sm:w-[220px] md:w-[240px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/25 translate-x-1.5 translate-y-1.5" />
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg border-2 border-white/80">
                  <img
                    src={PRINCIPAL.image}
                    alt={PRINCIPAL.name}
                    className="w-full aspect-[3/4] max-h-[280px] sm:max-h-[300px] object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 to-transparent px-3 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                      {PRINCIPAL.title}
                    </p>
                    <p className="text-sm font-bold text-white leading-tight">{PRINCIPAL.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Message — aligned center with image */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Quote className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  A Message from the Principal
                </p>
              </div>

              <blockquote className="relative">
                <span
                  className="hidden sm:block absolute -top-1 left-0 text-4xl font-bold text-primary/12 leading-none font-display select-none"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic font-display sm:pl-1">
                  {PRINCIPAL.message}
                </p>
              </blockquote>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-gray-200/70 dark:border-gray-700/50">
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/8 text-primary font-semibold border border-primary/15">
                    Dedicated Educator
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-secondary/8 text-secondary font-semibold border border-secondary/15">
                    Student Excellence
                  </span>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary transition-colors group mx-auto sm:mx-0"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
