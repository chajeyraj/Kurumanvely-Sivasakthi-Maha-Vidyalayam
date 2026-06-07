import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { NAV_GROUPS, NAV_LINKS, ABOUT_MENU } from '@/components/layout/navConfig'
import { SchoolBrand } from '@/components/ui/SchoolBrand'
import { AboutNavDropdown } from '@/components/layout/AboutNavMenu'

function NavItem({
  to,
  label,
  end,
  onClick,
  className,
}: {
  to: string
  label: string
  end?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap',
          isActive
            ? 'text-primary bg-primary/10'
            : 'text-gray-600 hover:text-primary hover:bg-primary/5',
          className
        )
      }
    >
      {label}
    </NavLink>
  )
}

function MobileNavItem({
  to,
  label,
  end,
  onClick,
  className,
}: {
  to: string
  label: string
  end?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
          isActive
            ? 'bg-primary text-white'
            : 'text-gray-800 hover:bg-primary/10 hover:text-primary',
          className
        )
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-strong shadow-premium border-b border-white/25'
          : 'bg-white/95 border-b border-gray-200/80'
      )}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full h-14 md:h-[3.75rem]">
          {/* Left: logo + school name */}
          <div className="flex items-center min-w-0 shrink-0 max-w-[min(100%,52%)] sm:max-w-[min(100%,48%)] xl:max-w-[42%]">
            <SchoolBrand variant="header" compact className="min-w-0 max-w-full" />
          </div>

          {/* Right: main nav + actions, aligned to the end */}
          <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5 min-w-0">
            <div className="hidden xl:flex items-center justify-end min-w-0">
              <div className="flex items-center justify-end flex-nowrap gap-0.5 py-0.5">
                {NAV_GROUPS.map((group, gi) => (
                  <div key={group.label} className="flex items-center">
                    {gi > 0 && (
                      <span className="w-px h-4 bg-gray-300/70 mx-1" aria-hidden />
                    )}
                    {group.links.map((link) =>
                      link.to === '/about' ? (
                        <AboutNavDropdown key="about-menu" />
                      ) : (
                        <NavItem
                          key={link.to}
                          to={link.to}
                          label={link.label}
                          end={link.to === '/'}
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex xl:hidden items-center justify-end gap-0.5 min-w-0 overflow-x-auto max-w-full">
              {NAV_LINKS.filter((l) =>
                ['/', '/about', '/academics', '/contact'].includes(l.to)
              ).map((link) =>
                link.to === '/about' ? (
                  <AboutNavDropdown key="about-menu-md" />
                ) : (
                  <NavItem
                    key={link.to}
                    to={link.to}
                    label={link.label}
                    end={link.to === '/'}
                    className="text-xs px-2"
                  />
                )
              )}
            </div>

            <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0 ml-1">
            <Link
              to="/admissions"
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors shrink-0"
            >
              Admissions
            </Link>
            <Link
              to="/admin/login"
              className="hidden md:inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg text-secondary border border-secondary/25 hover:bg-secondary/5 transition-colors shrink-0"
            >
              Admin
            </Link>
            <button
              type="button"
              className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Dim overlay — no blur so page behind stays sharp but subdued */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-14 md:top-[3.75rem] z-40 xl:hidden bg-black/55"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            {/* Solid menu panel — high contrast, fully readable */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-14 md:top-[3.75rem] z-50 xl:hidden max-h-[calc(100dvh-3.5rem)] overflow-y-auto bg-white border-b-2 border-primary/20 shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="max-w-7xl mx-auto px-4 py-5">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="mb-5 last:mb-0">
                    <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-secondary">
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {group.label === 'School'
                        ? group.links.flatMap((link) =>
                            link.to === '/about'
                              ? ABOUT_MENU.children.map((child) => (
                                  <MobileNavItem
                                    key={child.to + child.label}
                                    to={child.to}
                                    label={child.label}
                                    end={child.end}
                                    onClick={() => setOpen(false)}
                                    className={
                                      child.to === '/achievements'
                                        ? 'ml-3 border-l-2 border-primary/30 pl-4'
                                        : undefined
                                    }
                                  />
                                ))
                              : [
                                  <MobileNavItem
                                    key={link.to}
                                    to={link.to}
                                    label={link.label}
                                    end={link.to === '/'}
                                    onClick={() => setOpen(false)}
                                  />,
                                ]
                          )
                        : group.links.map((link) => (
                            <MobileNavItem
                              key={link.to}
                              to={link.to}
                              label={link.label}
                              end={link.to === '/'}
                              onClick={() => setOpen(false)}
                            />
                          ))}
                    </div>
                  </div>
                ))}
                <div className="mt-5 pt-5 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
                  <Link
                    to="/admissions"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-3 text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark"
                  >
                    Apply for Admission
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-3 text-sm font-semibold rounded-lg text-secondary border-2 border-secondary/30 hover:bg-secondary/5"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
