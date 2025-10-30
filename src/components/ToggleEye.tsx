// src/components/ToggleEye.tsx
'use client'

import { useState } from 'react'

interface ToggleEyeProps {
  onToggle?: (isVisible: boolean) => void
  defaultVisible?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function ToggleEye({ 
  onToggle, 
  defaultVisible = false,
  size = 'md' 
}: ToggleEyeProps) {
  const [isVisible, setIsVisible] = useState(defaultVisible)

  const handleToggle = () => {
    const newVisible = !isVisible
    setIsVisible(newVisible)
    onToggle?.(newVisible)
  }

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  return (
    <button
      onClick={handleToggle}
      className={`glass-card rounded-full flex items-center justify-center transition-all hover:scale-110 ${
        sizeClasses[size]
      } ${
        isVisible 
          ? 'bg-green-600/20 text-green-400' 
          : 'bg-red-600/20 text-red-400'
      }`}
      aria-label={isVisible ? 'Hide' : 'Show'}
    >
      {isVisible ? '👁️' : '👁️‍🗨️'}
    </button>
  )
}