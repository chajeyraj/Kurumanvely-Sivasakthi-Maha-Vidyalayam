import { PanelTopOpen } from 'lucide-react'
import { useFooterVisibility } from '@/context/FooterVisibilityContext'

export function FooterShowBar() {
  const { show } = useFooterVisibility()

  return (
    <div className="sticky bottom-0 z-30 border-t border-gray-200/80 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-center">
        <button
          type="button"
          onClick={show}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary hover:text-primary-dark rounded-lg hover:bg-primary/5 transition-colors"
          aria-label="Show footer"
        >
          <PanelTopOpen className="w-4 h-4" />
          Show Footer
        </button>
      </div>
    </div>
  )
}
