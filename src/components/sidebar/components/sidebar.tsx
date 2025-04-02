'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { cn } from '@/lib/utils'
import { signInPath, signUpPath } from '@/paths'
import { getActivePath } from '@/utils/get-active-path'
import { navItems } from '../constants'
import { SidebarItem } from './sidebar-item'

const Sidebar = () => {
  const { user, isFetched } = useAuth()
  const pathname = usePathname()

  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((navItem) => navItem.href),
    [signInPath(), signUpPath()],
  )

  const [isOpen, setIsOpen] = useState(false)
  const [transition, setTransition] = useState(false)

  const handleToggle = (oepn: boolean) => {
    setTransition(true)
    setIsOpen(oepn)
    setTimeout(() => setTransition(false), 200)
  }

  if (!user || !isFetched) {
    return <div className="bg-secondary/20 w-[78px]"></div>
  }

  return (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'h-screen border-r pt-24',
        transition && 'duration-200',
        isOpen ? 'w-[78px] md:w-60' : 'w-[78px]',
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  )
}

export { Sidebar }
