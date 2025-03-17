'use client'

import { LucideMoon, LucideSun } from 'lucide-react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <LucideSun className="ratate-0 dark:ratate-90 h-4 w-4 scale-100 transition-all dark:scale-0" />
      <LucideMoon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export { ThemeSwitcher }
