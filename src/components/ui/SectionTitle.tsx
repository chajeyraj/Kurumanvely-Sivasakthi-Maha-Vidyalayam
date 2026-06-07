import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ title, subtitle, align = 'center', className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={cn(
        'mb-8 md:mb-10',
        align === 'center' && 'text-center',
        className
      )}
    >
      <span className="inline-block px-3 py-0.5 mb-2 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/15">
        Excellence Since 1910
      </span>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400 mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-3 h-0.5 w-16 rounded-full gradient-primary',
          align === 'center' && 'mx-auto'
        )}
      />
    </motion.div>
  )
}
