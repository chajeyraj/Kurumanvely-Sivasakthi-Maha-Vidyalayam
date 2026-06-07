# Kurumanvely Sivasakthi Maha Vidyalayam — School Website

Premium, production-ready school website UI built with React 19, TypeScript, Tailwind CSS v4, Vite, Framer Motion, and Lucide React.

## Features

- 12 complete pages (Home, About, Academics, Achievements, Gallery, News, Events, Admissions, Staff, Contact, Admin Login, Admin Dashboard)
- Glassmorphism design with Deep Maroon (#7A1020), Emerald Green (#0F7B5F), and Gold (#D4AF37)
- Responsive mobile-first layout with dark mode
- Framer Motion animations (page transitions, scroll reveals, counters, hover effects)
- Admin panel with demo authentication

## Quick Start

```bash
cd kurumanvely-school
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Admin Login (Demo)

- **Email:** `admin@ksmahavidyalayam.edu.lk`
- **Password:** `admin123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── components/   # Reusable UI (Navbar, Footer, cards, sections)
├── pages/        # Route pages (public + admin)
├── layouts/      # MainLayout, AdminLayout
├── hooks/        # useCounter, etc.
├── services/     # API placeholder
├── data/         # Static school content
├── types/        # TypeScript interfaces
├── routes/       # React Router config
├── context/      # Theme + Admin auth
└── utils/        # cn, animations
```

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
- React Router DOM
