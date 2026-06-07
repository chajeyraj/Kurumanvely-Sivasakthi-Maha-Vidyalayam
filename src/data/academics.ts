import type { AcademicStream, TimelineEvent } from '@/types'

export const ACADEMIC_STREAMS: AcademicStream[] = [
  {
    id: 'arts',
    name: 'Arts',
    established: 1992,
    description: 'Comprehensive humanities programme fostering critical thinking, languages, and social sciences.',
    subjects: ['Tamil Literature', 'English', 'History', 'Geography', 'Economics', 'Logic'],
  },
  {
    id: 'commerce',
    name: 'Commerce',
    established: 2011,
    description: 'Business and accounting stream preparing students for commerce, finance, and entrepreneurship.',
    subjects: ['Accounting', 'Business Studies', 'Economics', 'ICT', 'English'],
  },
  {
    id: 'science',
    name: 'Mathematics & Science',
    established: 2021,
    description: 'Rigorous STEM curriculum with modern laboratory facilities for future scientists and engineers.',
    subjects: ['Combined Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT'],
  },
]

export const DEPARTMENTS = [
  { name: 'Languages', head: 'Mrs. S. Tharmalingam', subjects: 8 },
  { name: 'Mathematics', head: 'Mr. K. Sivakumar', subjects: 4 },
  { name: 'Science', head: 'Mr. R. Nadarajah', subjects: 6 },
  { name: 'Commerce', head: 'Mrs. V. Piratheepan', subjects: 5 },
  { name: 'Physical Education', head: 'Mr. N. Kanagaratnam', subjects: 2 },
  { name: 'ICT', head: 'Mr. J. Maheswaran', subjects: 3 },
]

export const PERFORMANCE_STATS = [
  { label: 'A/L Pass Rate', value: '94%' },
  { label: 'University Entrants', value: '180+' },
  { label: 'District Rank Holders', value: '12' },
  { label: 'O/L Pass Rate', value: '98%' },
]

export const HISTORY_TIMELINE: TimelineEvent[] = [
  { year: '1910', title: 'Foundation', description: 'BT/Kurumanvely Sivasakthi Maha Vidyalayam established on 10 November 1910.' },
  { year: '1950', title: 'Expansion', description: 'New buildings and increased enrollment serve the growing community.' },
  { year: '1992', title: 'Arts Stream', description: 'Advanced Level Arts stream introduced.' },
  { year: '2011', title: 'Commerce Stream', description: 'Commerce stream launched for business education.' },
  { year: '2021', title: 'Science Stream', description: 'Mathematics & Science stream inaugurated with modern labs.' },
  { year: '2026', title: 'Present Day', description: 'Over 1,850 students and 95+ dedicated educators continue the legacy.' },
]
