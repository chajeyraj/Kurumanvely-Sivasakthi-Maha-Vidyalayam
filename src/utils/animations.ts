export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

export const scaleOnHover = {
  whileHover: { scale: 1.02, y: -4 },
  transition: { type: 'spring' as const, stiffness: 300 },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35 },
}
