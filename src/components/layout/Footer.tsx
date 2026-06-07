import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Share2, Video, ArrowUpRight, PanelBottomClose } from 'lucide-react'
import { SCHOOL } from '@/data/school'
import { FOOTER_LINKS } from '@/components/layout/navConfig'
import { SchoolBrand } from '@/components/ui/SchoolBrand'
import { useFooterVisibility } from '@/context/FooterVisibilityContext'

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-white/95 mb-4 pb-2 border-b border-white/15 inline-block min-w-[4rem]">
        {title}
      </h4>
      {children}
    </div>
  )
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1 text-sm text-white/75 hover:text-white transition-colors"
      >
        <span>{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-70 group-hover:translate-y-0 transition-all" />
      </Link>
    </li>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const { hide } = useFooterVisibility()

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <div className="h-1 w-full gradient-primary" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex justify-end">
        <button
          type="button"
          onClick={hide}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Hide footer"
        >
          <PanelBottomClose className="w-3.5 h-3.5" />
          Hide Footer
        </button>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand — spans more on large screens */}
          <div className="sm:col-span-2 lg:col-span-4">
            <SchoolBrand variant="footer" className="mb-5" />
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {SCHOOL.name} — nurturing knowledge, leadership, and spiritual values for over a century.
            </p>
            <p className="mt-4 text-xs text-white/50 leading-relaxed max-w-sm italic">
              &ldquo;{SCHOOL.vision.slice(0, 90)}…&rdquo;
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Explore">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.explore.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Campus">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.campus.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Admissions">
              <ul className="space-y-2.5">
                {FOOTER_LINKS.admissions.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <FooterColumn title="Contact">
              <ul className="space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary-light" />
                  <span className="leading-snug">{SCHOOL.address}</span>
                </li>
                <li>
                  <a
                    href={`tel:${SCHOOL.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-primary-light" />
                    {SCHOOL.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SCHOOL.email}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-primary-light" />
                    {SCHOOL.email}
                  </a>
                </li>
              </ul>
              <div className="flex gap-2 mt-5">
                <a
                  href="#"
                  className="p-2.5 rounded-xl bg-white/8 hover:bg-primary hover:text-white border border-white/10 transition-all"
                  aria-label="Social media"
                >
                  <Share2 className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2.5 rounded-xl bg-white/8 hover:bg-secondary hover:text-white border border-white/10 transition-all"
                  aria-label="Video channel"
                >
                  <Video className="w-4 h-4" />
                </a>
              </div>
            </FooterColumn>
          </div>
        </div>

        {/* Academic streams bar */}
        <div className="mt-10 py-5 px-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
            Advanced Level Streams
          </p>
          <div className="flex flex-wrap gap-3">
            {['Arts (1992)', 'Commerce (2011)', 'Mathematics & Science (2021)'].map((stream) => (
              <span
                key={stream}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/20 text-white/90 border border-primary/25"
              >
                {stream}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="text-white/50 order-2 md:order-1">
            © {year}{' '}
            <span className="text-white/70">{SCHOOL.name}</span>. All rights reserved.
          </p>
          <p className="text-white/60 order-1 md:order-2 text-center md:text-right">
            Principal: <span className="font-semibold text-white/85">{SCHOOL.principal}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
