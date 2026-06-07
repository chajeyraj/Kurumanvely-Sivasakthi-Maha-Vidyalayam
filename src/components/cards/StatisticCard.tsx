import { motion } from 'framer-motion'
import { BarChart } from 'lucide-react'
import { useCounter } from '@/hooks/useCounter'
import { getIcon } from '@/utils/icons'
import { GlassCard } from '@/components/ui/GlassCard'

interface StatisticCardProps {
  label: string
  value: number
  suffix?: string
  icon: string
}

export function StatisticCard({ label, value, suffix = '', icon }: StatisticCardProps) {
  const { count, ref } = useCounter(value)
  const Icon = getIcon(icon, BarChart)

  return (
    <div ref={ref}>
      <GlassCard className="text-center">
        <div className="inline-flex p-4 mb-4 rounded-2xl bg-primary/10">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <motion.p className="text-2xl md:text-3xl font-bold text-gradient">
          {count}{suffix}
        </motion.p>
        <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">{label}</p>
      </GlassCard>
    </div>
  )
}
