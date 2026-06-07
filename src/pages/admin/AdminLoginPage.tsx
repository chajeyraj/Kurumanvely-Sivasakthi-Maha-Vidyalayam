import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowLeft } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { SchoolBrand } from '@/components/ui/SchoolBrand'

export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAdmin()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(email, password)) {
      navigate('/admin/dashboard')
    } else {
      setError(
        'Invalid credentials. Admin: admin@ksmahavidyalayam.edu.lk / admin123 · Admissions: admissions@ksmahavidyalayam.edu.lk / admissions123'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-primary/85" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <SchoolBrand variant="admin" asLink={false} className="mb-4" />
          <h1 className="text-xl font-bold text-primary">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/50 bg-white/40 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="admin@ksmahavidyalayam.edu.lk"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/50 bg-white/40 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-[11px] text-gray-500 text-center leading-relaxed">
          Super admin: full access · Admissions officer: admissions module only
        </p>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </Link>
      </motion.div>
    </div>
  )
}
