import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { SCHOOL } from '@/data/school'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="relative py-24 gradient-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-subtitle mx-auto">We would love to hear from you</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MapPin, label: 'Address', value: SCHOOL.address },
            { icon: Phone, label: 'Phone', value: SCHOOL.phone },
            { icon: Mail, label: 'Email', value: SCHOOL.email },
          ].map((card) => (
            <GlassCard key={card.label} className="text-center">
              <card.icon className="w-10 h-10 mx-auto text-secondary mb-3" />
              <p className="text-sm font-semibold text-gray-500 uppercase">{card.label}</p>
              <p className="mt-2 text-primary font-medium">{card.value}</p>
            </GlassCard>
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <GlassCard>
            <SectionTitle title="Send a Message" align="left" className="mb-6" />
            {submitted ? (
              <p className="text-secondary font-semibold py-8 text-center">
                Thank you! Your message has been received. We will respond shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-secondary outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-secondary outline-none"
                />
                <input
                  placeholder="Phone (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-secondary outline-none"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-secondary outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            )}
          </GlassCard>

          <div className="space-y-6">
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-accent" />
                <h3 className="font-bold text-primary">Office Hours</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Monday – Friday: 7:30 AM – 3:30 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Saturday: 8:00 AM – 12:00 PM (Admin only)</p>
            </GlassCard>
            <GlassCard className="p-0 overflow-hidden h-80">
              <iframe
                title="School Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.0%2C9.6%2C80.1%2C9.7&layer=mapnik&marker=9.65%2C80.05"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all"
                loading="lazy"
              />
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  )
}
