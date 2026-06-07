import { Download, Calendar, CheckCircle, ExternalLink } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { ADMISSION_INFO } from '@/data/admissions'
import { useAdminData } from '@/context/AdminDataContext'
import { Link } from 'react-router-dom'

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url.trim())
}

export function AdmissionsPage() {
  const { admissionSettings } = useAdminData()
  const { importantDates, downloadForms } = admissionSettings
  const { grades, requirements, process } = ADMISSION_INFO

  return (
    <div>
      <section className="relative py-24 bg-secondary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">Admissions</h1>
          <p className="page-hero-subtitle mx-auto">Join our community of learners since 1910</p>
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="Admission Information" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="text-xl font-bold text-primary mb-4">Available Programmes</h3>
            <ul className="space-y-2">
              {grades.map((g) => (
                <li key={g} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-bold text-primary mb-4">Requirements</h3>
            <ul className="space-y-2">
              {requirements.map((r) => (
                <li key={r} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <SectionTitle title="Application Process" />
        <div className="max-w-3xl mx-auto">
          {process.map((step, i) => (
            <div key={step} className="flex gap-4 mb-6">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <GlassCard className="flex-1 py-4">
                <p className="text-gray-700">{step}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <SectionTitle title="Important Dates" />
        <div className="max-w-3xl mx-auto space-y-4">
          {importantDates.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">Dates will be announced soon.</p>
          ) : (
            importantDates.map((d) => (
              <GlassCard key={d.label + d.date} className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <p className="font-bold text-primary">{d.label}</p>
                  <p className="text-secondary font-medium">{d.date}</p>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </section>

      <section className="section-padding bg-surface">
        <SectionTitle title="Download Forms" />
        <div className="max-w-2xl mx-auto grid gap-4">
          {downloadForms.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">Forms will be available soon.</p>
          ) : (
            downloadForms.map((form) => {
              const external = isExternalUrl(form.url)
              const href = external ? form.url.trim() : `#${form.url}`

              if (external) {
                return (
                  <GlassCard key={form.id} className="flex items-center justify-between gap-4">
                    <span className="font-medium text-primary">{form.name}</span>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-colors shrink-0 text-sm font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </a>
                  </GlassCard>
                )
              }

              return (
                <GlassCard key={form.id} className="flex items-center justify-between gap-4">
                  <span className="font-medium text-primary">{form.name}</span>
                  <a
                    href={href}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-colors shrink-0 text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </a>
                </GlassCard>
              )
            })
          )}
        </div>
        <p className="text-center mt-8 text-gray-500">
          Questions?{' '}
          <Link to="/contact" className="text-secondary font-semibold hover:underline">
            Contact us
          </Link>
        </p>
      </section>
    </div>
  )
}
