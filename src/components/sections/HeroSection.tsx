import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Mail, Target, Compass, ChevronLeft, ChevronRight } from 'lucide-react'
import { SchoolBrand } from '@/components/ui/SchoolBrand'
import { SCHOOL } from '@/data/school'
import { HERO_SLIDES } from '@/data/hero'
import { GlassParticles } from '@/components/ui/GlassParticles'

const SLIDE_INTERVAL = 5500

export function HeroSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }, [index])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % HERO_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      scale: 1.05,
      x: d > 0 ? 80 : -80,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (d: number) => ({
      opacity: 0,
      scale: 1.02,
      x: d > 0 ? -80 : 80,
    }),
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={HERO_SLIDES[index].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={HERO_SLIDES[index].image}
              alt={HERO_SLIDES[index].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 gradient-hero" />
        <GlassParticles />
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 md:left-8 z-20 p-3 rounded-full glass hover:bg-white/90 transition-all shadow-premium"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 md:right-8 z-20 p-3 rounded-full glass hover:bg-white/90 transition-all shadow-premium"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
        <SchoolBrand variant="hero" asLink={false} className="mb-2" />

        <span className="inline-block px-4 py-1.5 mb-3 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-white/15 text-white border border-white/30">
          Established {SCHOOL.established}
        </span>

        <h1 className="sr-only">{SCHOOL.name}</h1>

        <p className="mt-2 text-xs sm:text-sm text-white/90 font-medium tracking-wide drop-shadow">
          Since 1910 — A Century of Educational Excellence
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-black/25 backdrop-blur-sm border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-200">Vision</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
              {SCHOOL.vision}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-black/25 backdrop-blur-sm border-l-4 border-secondary">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-rose-200 shrink-0" />
              <span className="text-sm font-bold uppercase tracking-wider text-rose-200">Mission</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
              {SCHOOL.mission}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/academics"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark transition-all shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            Explore Academics
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm rounded-lg font-semibold text-white bg-secondary hover:bg-secondary-dark transition-all shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </Link>
        </div>

        <p className="mt-6 text-white/80 text-sm font-medium drop-shadow-md">
          {HERO_SLIDES[index].caption}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-6 h-10 rounded-full border-2 border-white/60 flex justify-center pt-2">
        <div className="w-1.5 h-2.5 bg-white rounded-full" />
      </div>
    </section>
  )
}
