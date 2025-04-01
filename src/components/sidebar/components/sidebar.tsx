'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { navItems } from '../constants'
import { SidebarItem } from './sidebar-item'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [transition, setTransition] = useState(false)

  const handleToggle = (oepn: boolean) => {
    setTransition(true)
    setIsOpen(oepn)
    setTimeout(() => setTransition(false), 200)
  }

  return (
    <nav
      className={cn(
        'h-screen border-r pt-24',
        transition && 'duration-200',
        isOpen ? 'w-[78px] md:w-60' : 'w-[78px]',
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  )
}

export { Sidebar }
