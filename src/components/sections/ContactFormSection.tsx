import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageSquare } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'

const inputClass =
  'w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200/80 dark:border-gray-700/80 bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

const labelClass = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5'

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section-padding gradient-soft relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a question or need assistance? Send us a message and we will respond promptly."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <GlassCard className="p-6 md:p-8 border-t-2 border-t-primary/30">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-secondary/10">
                <MessageSquare className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Send a Message</h3>
            </div>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <p className="text-base font-semibold text-primary">Thank you for reaching out!</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Your message has been received. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Full Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email Address <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+94 XX XXX XXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="text-secondary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  Submit Message
                </button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
