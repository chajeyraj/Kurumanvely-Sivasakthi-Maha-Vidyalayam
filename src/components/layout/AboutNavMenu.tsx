import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ABOUT_MENU } from '@/components/layout/navConfig'

export function AboutNavDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isAboutSection =
    location.pathname === '/about' || location.pathname === '/achievements'

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-0.5 px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-colors',
          isAboutSection
            ? 'text-primary bg-primary/10'
            : 'text-gray-600 hover:text-primary hover:bg-primary/5'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {ABOUT_MENU.label}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 min-w-[11rem] py-1.5 rounded-xl bg-white border border-gray-200 shadow-lg z-[60]">
          {ABOUT_MENU.children.map((child) => (
            <NavLink
              key={child.to + child.label}
              to={child.to}
              end={child.end}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

/** In-page sub-navigation for About section */
export function AboutSectionNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        'flex flex-wrap justify-center gap-2 p-1.5 rounded-xl bg-white/80 border border-gray-200/80 shadow-sm',
        className
      )}
      aria-label="About section"
    >
      {ABOUT_MENU.children.map((child) => (
        <NavLink
          key={child.to + child.label}
          to={child.to}
          end={child.end}
          className={({ isActive }) =>
            cn(
              'px-4 py-2 text-sm font-semibold rounded-lg transition-colors',
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
            )
          }
        >
          {child.label}
        </NavLink>
      ))}
    </nav>
  )
}
