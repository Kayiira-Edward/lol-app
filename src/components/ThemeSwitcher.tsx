// src/components/ThemeSwitcher.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('lol-app-theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(systemPrefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('lol-app-theme', newTheme ? 'dark' : 'light')
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-3 text-gray-400 transition-colors glass-card rounded-2xl hover:text-white"
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}