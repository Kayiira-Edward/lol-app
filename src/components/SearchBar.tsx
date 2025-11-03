// src/components/SearchBar.tsx
'use client'

import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = "Search communities..." }: SearchBarProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-400 transition-all bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
    </div>
  )
}