import { useState, useMemo } from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GalleryCard } from '@/components/cards/GalleryCard'
import { Modal } from '@/components/ui/Modal'
import { GALLERY_CATEGORIES } from '@/data/gallery'
import { useAdminData } from '@/context/AdminDataContext'
import type { GalleryItem } from '@/types'
import { cn } from '@/utils/cn'

export function GalleryPage() {
  const { gallery } = useAdminData()
  const [category, setCategory] = useState('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const filtered = useMemo(
    () => (category === 'All' ? gallery : gallery.filter((g) => g.category === category)),
    [gallery, category]
  )

  return (
    <div>
      <section className="relative py-24 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-subtitle mx-auto">Capturing life at BT/Kurumanvely Sivasakthi Maha Vidyalayam</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-semibold transition-all',
                category === cat
                  ? 'bg-primary text-white shadow-lg'
                  : 'glass text-gray-700 hover:bg-secondary/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <SectionTitle title="Photo Gallery" className="hidden" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={() => setLightbox(item)} />
          ))}
        </div>
      </section>

      <Modal open={!!lightbox} onClose={() => setLightbox(null)} title={lightbox?.title} size="xl">
        {lightbox && (
          <div className="p-4">
            <img src={lightbox.image} alt={lightbox.title} className="w-full rounded-xl max-h-[70vh] object-contain" />
            <p className="mt-4 text-center text-gray-500">{lightbox.category}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
