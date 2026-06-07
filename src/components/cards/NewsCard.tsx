import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import type { NewsItem } from '@/types'
import { GlassCard } from '@/components/ui/GlassCard'

interface NewsCardProps {
  item: NewsItem
  featured?: boolean
}

export function NewsCard({ item, featured }: NewsCardProps) {
  return (
    <GlassCard className={featured ? 'md:col-span-2' : ''} hover>
      <div className={featured ? 'grid md:grid-cols-2 gap-6' : ''}>
        <div className={`overflow-hidden rounded-xl ${featured ? 'h-64 md:h-full' : 'h-48 mb-4'}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            {item.category}
          </span>
          <h3 className="mt-2 text-base font-bold text-primary line-clamp-2">{item.title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">{item.excerpt}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <Link
              to="/news"
              className="flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary transition-colors"
            >
              Read more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
