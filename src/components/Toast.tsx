// src/components/Toast.tsx
'use client'

import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type: ToastType
  isVisible: boolean
  onHide: () => void
  duration?: number
}

export default function Toast({ message, type, isVisible, onHide, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onHide])

  if (!isVisible) return null

  const typeConfig = {
    success: { icon: '✅', bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30' },
    error: { icon: '❌', bg: 'from-red-500/20 to-red-600/20', border: 'border-red-500/30' },
    info: { icon: '💡', bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30' },
    warning: { icon: '⚠️', bg: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/30' }
  }

  const config = typeConfig[type]

  return (
    <div className="fixed z-50 transform -translate-x-1/2 top-4 left-1/2 animate-fade-in-down">
      <div className={`
        backdrop-blur-2xl bg-gradient-to-r ${config.bg} border ${config.border}
        rounded-2xl px-6 py-4 shadow-2xl shadow-black/30
        flex items-center gap-3 min-w-[280px] max-w-[90vw]
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}>
        <span className="text-xl">{config.icon}</span>
        <span className="flex-1 text-sm font-medium text-white">{message}</span>
      </div>
    </div>
  )
}