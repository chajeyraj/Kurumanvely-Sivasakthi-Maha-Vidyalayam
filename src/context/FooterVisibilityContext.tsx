import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface FooterVisibilityContextValue {
  visible: boolean
  hide: () => void
  show: () => void
  toggle: () => void
}

const STORAGE_KEY = 'footer_hidden'

const FooterVisibilityContext = createContext<FooterVisibilityContextValue | null>(null)

export function FooterVisibilityProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    return localStorage.getItem(STORAGE_KEY) !== 'true'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, visible ? 'false' : 'true')
  }, [visible])

  const hide = () => setVisible(false)
  const show = () => setVisible(true)
  const toggle = () => setVisible((v) => !v)

  return (
    <FooterVisibilityContext.Provider value={{ visible, hide, show, toggle }}>
      {children}
    </FooterVisibilityContext.Provider>
  )
}

export function useFooterVisibility() {
  const ctx = useContext(FooterVisibilityContext)
  if (!ctx) throw new Error('useFooterVisibility must be used within FooterVisibilityProvider')
  return ctx
}
