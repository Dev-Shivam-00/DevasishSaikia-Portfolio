'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface MenuState {
  open: boolean
  openMenu: () => void
  closeMenu: () => void
}

const MenuContext = createContext<MenuState | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openMenu = useCallback(() => setOpen(true), [])
  const closeMenu = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const value = useMemo(() => ({ open, openMenu, closeMenu }), [open, openMenu, closeMenu])

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu(): MenuState {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenu must be used within MenuProvider')
  return context
}
