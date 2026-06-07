export type NavLinkItem = { to: string; label: string; end?: boolean }

export const ABOUT_MENU = {
  to: '/about',
  label: 'About',
  children: [
    { to: '/about', label: 'About School', end: true },
    { to: '/achievements', label: 'Achievements' },
  ] as NavLinkItem[],
}

export const NAV_GROUPS: { label: string; links: NavLinkItem[] }[] = [
  {
    label: 'School',
    links: [
      { to: '/', label: 'Home', end: true },
      { to: '/about', label: 'About' },
      { to: '/staff', label: 'Staff' },
    ],
  },
  {
    label: 'Academics',
    links: [{ to: '/academics', label: 'Academics' }],
  },
  {
    label: 'Campus',
    links: [
      { to: '/gallery', label: 'Gallery' },
      { to: '/news', label: 'News' },
      { to: '/events', label: 'Events' },
    ],
  },
  {
    label: 'Connect',
    links: [{ to: '/contact', label: 'Contact' }],
  },
]

export const NAV_LINKS: NavLinkItem[] = NAV_GROUPS.flatMap((g) => g.links)

export const FOOTER_LINKS = {
  explore: [
    { to: '/about', label: 'About Us' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/academics', label: 'Academics' },
    { to: '/staff', label: 'Staff Directory' },
  ],
  campus: [
    { to: '/gallery', label: 'Gallery' },
    { to: '/news', label: 'News' },
    { to: '/events', label: 'Events' },
  ],
  admissions: [
    { to: '/admissions', label: 'Apply Now' },
    { to: '/contact', label: 'Contact' },
  ],
} as const
