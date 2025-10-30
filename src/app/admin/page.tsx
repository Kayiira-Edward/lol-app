// src/app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  revenue: number
  totalMessages: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1247,
    activeUsers: 342,
    revenue: 45000,
    totalMessages: 12894
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // TODO: Check admin authentication
    const checkAdmin = async () => {
      // Simulate admin check
      setTimeout(() => setIsLoading(false), 1000)
    }
    checkAdmin()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-lg text-white">Loading Admin Panel...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41 • Admin Mode
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Manage your LOL App</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-2xl"
          >
            Exit Admin
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 glass-card">
            <div className="mb-1 text-2xl font-bold text-white">{stats.totalUsers}</div>
            <div className="text-xs text-gray-400">Total Users</div>
          </div>
          <div className="p-4 glass-card">
            <div className="mb-1 text-2xl font-bold text-white">{stats.activeUsers}</div>
            <div className="text-xs text-gray-400">Active Today</div>
          </div>
          <div className="p-4 glass-card">
            <div className="mb-1 text-2xl font-bold text-white">{stats.revenue.toLocaleString()} UGX</div>
            <div className="text-xs text-gray-400">Revenue</div>
          </div>
          <div className="p-4 glass-card">
            <div className="mb-1 text-2xl font-bold text-white">{stats.totalMessages.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Messages</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 text-center transition-all glass-card hover:bg-white/10">
            <div className="mb-2 text-2xl">👥</div>
            <div className="text-sm text-white">Manage Users</div>
          </button>
          <button className="p-4 text-center transition-all glass-card hover:bg-white/10">
            <div className="mb-2 text-2xl">💰</div>
            <div className="text-sm text-white">View Payments</div>
          </button>
          <button className="p-4 text-center transition-all glass-card hover:bg-white/10">
            <div className="mb-2 text-2xl">📊</div>
            <div className="text-sm text-white">Analytics</div>
          </button>
          <button className="p-4 text-center transition-all glass-card hover:bg-white/10">
            <div className="mb-2 text-2xl">⚙️</div>
            <div className="text-sm text-white">Settings</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
        <div className="p-4 glass-card">
          <div className="space-y-3">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <div className="text-sm text-white">New user registration</div>
                  <div className="text-xs text-gray-400">2 hours ago</div>
                </div>
                <div className="text-sm text-green-400">+1</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Data */}
      <div className="p-6">
        <div className="p-4 glass-card">
          <h3 className="mb-2 font-semibold text-white">Export Data</h3>
          <p className="mb-4 text-sm text-gray-400">Download user data and analytics</p>
          <button className="w-full px-4 py-2 text-sm text-white gradient-bg rounded-2xl">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  )
}