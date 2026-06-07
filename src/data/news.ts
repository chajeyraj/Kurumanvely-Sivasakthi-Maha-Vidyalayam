import type { NewsItem } from '@/types'

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Annual Prize Giving Ceremony 2026',
    excerpt: 'Celebrating outstanding academic and co-curricular achievements of our students.',
    content: 'The Annual Prize Giving Ceremony will be held at the school auditorium. Parents and guardians are warmly invited.',
    category: 'Events',
    date: '2026-05-15',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c93?w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'GCE Advanced Level Results Excellence',
    excerpt: 'Our students achieved remarkable results in the 2025 A/L examinations.',
    content: 'Multiple students secured district ranks in Mathematics, Science, and Commerce streams.',
    category: 'Academics',
    date: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1427504492485-13579b9c5f2a?w=800&q=80',
    featured: true,
  },
  {
    id: '3',
    title: 'New Science Laboratory Inauguration',
    excerpt: 'State-of-the-art laboratory facilities for Mathematics & Science stream.',
    content: 'The new laboratory supports advanced practical learning for our science students.',
    category: 'Infrastructure',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
  },
  {
    id: '4',
    title: 'Inter-School Sports Championship Victory',
    excerpt: 'Our athletics team secured first place in the regional championship.',
    content: 'Gold medals in track events and team sports highlight our sports programme.',
    category: 'Sports',
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
  },
  {
    id: '5',
    title: 'Admission Applications Open for 2027',
    excerpt: 'Grade 6 and A/L stream applications now accepted.',
    content: 'Download application forms from the Admissions page or collect from the school office.',
    category: 'Admissions',
    date: '2026-01-05',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
  },
  {
    id: '6',
    title: 'Cultural Day Celebration',
    excerpt: 'Students showcased Tamil heritage through music, dance, and drama.',
    content: 'A vibrant display of tradition and creativity honoured our cultural roots.',
    category: 'Culture',
    date: '2025-12-18',
    image: 'https://images.unsplash.com/photo-1514525253160-7a46d19cd819?w=800&q=80',
  },
]

export const NEWS_CATEGORIES = ['All', 'Events', 'Academics', 'Infrastructure', 'Sports', 'Admissions', 'Culture']
