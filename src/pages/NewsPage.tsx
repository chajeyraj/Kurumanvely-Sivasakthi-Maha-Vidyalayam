import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { NewsCard } from '@/components/cards/NewsCard'
import { NEWS_CATEGORIES } from '@/data/news'
import { useAdminData } from '@/context/AdminDataContext'
import { cn } from '@/utils/cn'

export function NewsPage() {
  const { articles } = useAdminData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return articles.filter((n) => {
      const matchCat = category === 'All' || n.category === category
      const matchSearch =
        search === '' ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [articles, search, category])

  const featured = articles.find((n) => n.featured)

  return (
    <div>
      <section className="relative py-24 bg-secondary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="page-hero-title">News & Announcements</h1>
          <p className="page-hero-subtitle mx-auto">Stay updated with school news</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/40 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                  category === cat ? 'bg-secondary text-white' : 'glass hover:bg-secondary/10'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featured && category === 'All' && search === '' && (
          <div className="max-w-7xl mx-auto mb-12">
            <SectionTitle title="Featured" align="left" />
            <NewsCard item={featured} featured />
          </div>
        )}

        <SectionTitle title="All News" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No news found matching your criteria.</p>
        )}
      </section>
    </div>
  )
}
