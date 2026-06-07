import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import type { GalleryItem } from '@/types'

interface GalleryCardProps {
  item: GalleryItem
  onClick: () => void
}

export function GalleryCard({ item, onClick }: GalleryCardProps) {
  const aspectClass = {
    tall: 'row-span-2',
    wide: 'col-span-2',
    square: '',
  }[item.aspectRatio ?? 'square']

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl ${aspectClass} min-h-[200px]`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <div className="flex items-center gap-2 text-white font-semibold">
          <ZoomIn className="w-5 h-5" />
          {item.title}
        </div>
      </div>
      <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full glass text-primary">
        {item.category}
      </span>
    </motion.button>
  )
}
