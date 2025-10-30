// src/components/IconButton.tsx
'use client'

interface IconButtonProps {
  icon: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export default function IconButton({
  icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className = ''
}: IconButtonProps) {
  const baseClasses = 'rounded-2xl transition-all flex items-center justify-center'
  
  const variantClasses = {
    primary: 'gradient-bg text-white hover:scale-105',
    secondary: 'glass-card text-gray-400 hover:text-white hover:bg-white/10',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5'
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      aria-label={`${icon} button`}
    >
      {icon}
    </button>
  )
}