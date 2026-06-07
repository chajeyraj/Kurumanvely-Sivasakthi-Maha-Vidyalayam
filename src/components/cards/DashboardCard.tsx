import { motion } from 'framer-motion'
import { LayoutDashboard } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { getIcon } from '@/utils/icons'

interface DashboardCardProps {
  label: string
  value: string | number
  change?: string
  icon: string
}

export function DashboardCard({ label, value, change, icon }: DashboardCardProps) {
  const Icon = getIcon(icon, LayoutDashboard)

  return (
    <GlassCard hover={false}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-2xl font-bold text-primary"
          >
            {value}
          </motion.p>
          {change && (
            <p className="mt-1 text-sm text-secondary font-medium">{change}</p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-secondary/10">
          <Icon className="w-6 h-6 text-secondary" />
        </div>
      </div>
    </GlassCard>
  )
}
