// src/app/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { loginUser } from '@/services/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await loginUser(email, password)
    
    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="w-full max-w-md p-8 glass-card">
        {/* Status Bar */}
        <div className="mb-8 text-sm text-center text-gray-400">
          9:41
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold gradient-text">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400">
            Sign in to your LOL App account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="px-4 py-3 text-sm text-red-300 border border-red-600 bg-red-600/20 rounded-2xl">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-medium text-white transition-all gradient-bg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <div className="px-3 text-sm text-gray-400">or</div>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/auth/register" className="font-medium text-purple-400 hover:text-purple-300">
              Sign up
            </a>
          </p>
        </div>

        {/* Demo Info */}
        <div className="p-4 mt-8 bg-gray-800/50 rounded-2xl">
          <p className="text-xs text-center text-gray-400">
            Demo: Use any email/password for testing. Real auth connects to Firebase.
          </p>
        </div>
      </div>
    </div>
  )
}