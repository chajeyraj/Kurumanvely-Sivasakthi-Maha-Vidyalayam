import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FooterShowBar } from '@/components/layout/FooterShowBar'
import { FooterVisibilityProvider, useFooterVisibility } from '@/context/FooterVisibilityContext'
import { pageTransition } from '@/utils/animations'

function MainLayoutContent() {
  const { visible } = useFooterVisibility()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main {...pageTransition} className="flex-1">
        <Outlet />
      </motion.main>
      {visible ? <Footer /> : <FooterShowBar />}
    </div>
  )
}

export function MainLayout() {
  return (
    <FooterVisibilityProvider>
      <MainLayoutContent />
    </FooterVisibilityProvider>
  )
}
