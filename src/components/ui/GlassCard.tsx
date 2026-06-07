import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { scaleOnHover } from '@/utils/animations'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
  const Comp = hover ? motion.div : 'div'
  const props = hover ? scaleOnHover : {}

  return (
    <Comp
      className={cn('glass-card p-6 transition-shadow hover:shadow-2xl', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  )
}
