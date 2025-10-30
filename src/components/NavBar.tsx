// src/components/Navbar.tsx
'use client'

import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/communities', icon: '👥', label: 'Communities' },
    { path: '/chat', icon: '💬', label: 'Chat' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 backdrop-blur-sm">
      <div className="flex items-center justify-around py-3">
        {navItems.map(item => (
          <a
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
              pathname === item.path 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="mb-1 text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}