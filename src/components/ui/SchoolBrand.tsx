import { Link } from 'react-router-dom'
import { SCHOOL } from '@/data/school'
import { cn } from '@/utils/cn'

const LOGO_SIZES = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
  xl: 'h-24 w-24 sm:h-28 sm:w-28',
} as const

type LogoSize = keyof typeof LOGO_SIZES

interface SchoolLogoProps {
  size?: LogoSize
  className?: string
}

export function SchoolLogo({ size = 'md', className }: SchoolLogoProps) {
  return (
    <img
      src={SCHOOL.logo}
      alt={`${SCHOOL.name} logo`}
      className={cn('object-contain shrink-0 drop-shadow-sm', LOGO_SIZES[size], className)}
      width={size === 'xl' ? 112 : size === 'lg' ? 56 : size === 'md' ? 44 : 36}
      height={size === 'xl' ? 112 : size === 'lg' ? 56 : size === 'md' ? 44 : 36}
      loading="eager"
      decoding="async"
    />
  )
}

interface SchoolBrandProps {
  variant?: 'header' | 'footer' | 'hero' | 'admin'
  asLink?: boolean
  compact?: boolean
  className?: string
}

export function SchoolBrand({
  variant = 'header',
  asLink = true,
  compact = false,
  className,
}: SchoolBrandProps) {
  const logoSize: LogoSize =
    variant === 'hero' ? 'xl' : variant === 'footer' ? 'lg' : compact ? 'sm' : 'md'

  const nameClass = cn(
    'font-bold text-primary leading-snug',
    variant === 'header' &&
      (compact
        ? 'text-[9px] leading-tight sm:text-[11px] lg:text-xs xl:text-[13px] sm:whitespace-nowrap'
        : 'text-[11px] lg:text-xs xl:text-[13px] whitespace-nowrap'),
    variant === 'footer' && 'text-white text-sm group-hover:text-primary-light transition-colors',
    variant === 'admin' && 'text-[11px] sm:text-xs',
    variant === 'hero' && 'text-white text-base sm:text-lg md:text-xl drop-shadow-md'
  )

  const textBlock = (
    <div
      className={cn(
        'min-w-0',
        variant === 'header' && 'text-left',
        variant === 'footer' && 'text-left',
        variant === 'admin' && 'text-left min-w-0',
        variant === 'hero' && 'text-center max-w-3xl mx-auto px-2'
      )}
    >
      <p className={nameClass}>{SCHOOL.name}</p>
      {variant === 'footer' && (
        <p className="text-[10px] text-white/50 mt-1 tracking-wide">Est. {SCHOOL.establishedYear}</p>
      )}
    </div>
  )

  const content = (
    <div
      className={cn(
        'flex items-center shrink-0 min-w-0',
        variant === 'header' && 'gap-1.5 sm:gap-2.5',
        variant === 'footer' && 'gap-3 group',
        variant === 'hero' && 'flex-col gap-2',
        variant === 'admin' && 'gap-2.5 flex-col sm:flex-row items-center sm:items-start text-center sm:text-left',
        className
      )}
    >
      <SchoolLogo size={logoSize} />
      {textBlock}
    </div>
  )

  if (asLink && variant !== 'hero') {
    return (
      <Link to="/" className="inline-flex min-w-0 max-w-full">
        {content}
      </Link>
    )
  }

  return content
}
