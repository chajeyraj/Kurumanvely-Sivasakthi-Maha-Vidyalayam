import { motion } from 'framer-motion'

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 8 + (i % 4) * 6,
  left: `${8 + (i * 7) % 85}%`,
  top: `${10 + (i * 11) % 80}%`,
  delay: i * 0.4,
  duration: 4 + (i % 3),
}))

export function GlassParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full glass border border-white/50 shadow-lg"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, p.id % 2 === 0 ? 10 : -10, 0],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-secondary/30" />
    </div>
  )
}
