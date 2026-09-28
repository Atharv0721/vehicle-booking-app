'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

function ThemeToggle({
  className = '',
  variant = 'onDark',
}: {
  className?: string
  variant?: 'onDark' | 'onLight'
}) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const base =
    variant === 'onDark'
      ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
      : 'border-border bg-card text-foreground hover:bg-muted shadow-[var(--shadow-soft)]'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 ${base} ${className}`}
    >
      <Sun
        size={15}
        strokeWidth={2}
        className={`absolute transition-all duration-300 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
      />
      <Moon
        size={15}
        strokeWidth={2}
        className={`absolute transition-all duration-300 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
      />
    </button>
  )
}

export default ThemeToggle
