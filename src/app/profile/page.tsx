// src/app/profile/page.tsx
'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [user] = useState({
    displayName: 'Edward',
    username: 'edwardbrin',
    lolId: '8f2d3k',
    pro: false,
    balance: 0,
    joinedDate: '2024-01-15',
    messagesSent: 47,
    communitiesJoined: 3
  })

  const stats = [
    { label: 'Messages Sent', value: user.messagesSent },
    { label: 'Communities', value: user.communitiesJoined },
    { label: 'Days Active', value: 28 }
  ]

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41
      </div>

      {/* Profile Header */}
      <div className="p-6">
        <div className="p-6 text-center glass-card">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-3xl text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
            👤
          </div>
          <h1 className="mb-1 text-2xl font-bold text-white">{user.displayName}</h1>
          <p className="mb-2 text-gray-400">@{user.username}</p>
          <div className="inline-block px-3 py-1 mb-4 text-xs text-gray-300 bg-gray-800 rounded-full">
            ID: {user.lolId}
          </div>
          
          {!user.pro && (
            <button className="w-full px-6 py-3 mb-4 font-medium text-white gradient-bg rounded-2xl">
              Upgrade to Pro - 3,000 UGX/week
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 text-center glass-card">
              <div className="mb-1 text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-4 text-left transition-all glass-card hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-2xl">
                <span>🔗</span>
              </div>
              <div>
                <div className="font-medium text-white">Your Profile Link</div>
                <div className="text-sm text-gray-400">Share to receive anonymous messages</div>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="flex items-center justify-between w-full p-4 text-left transition-all glass-card hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-2xl">
                <span>⚡</span>
              </div>
              <div>
                <div className="font-medium text-white">Go Pro</div>
                <div className="text-sm text-gray-400">Unlock unlimited replies and features</div>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="flex items-center justify-between w-full p-4 text-left transition-all glass-card hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-2xl">
                <span>👥</span>
              </div>
              <div>
                <div className="font-medium text-white">My Communities</div>
                <div className="text-sm text-gray-400">Manage your joined communities</div>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="px-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Settings</h2>
        <div className="space-y-3">
          <button className="w-full p-4 text-left transition-all glass-card hover:bg-white/10">
            <div className="font-medium text-white">Privacy & Security</div>
            <div className="text-sm text-gray-400">Manage your privacy settings</div>
          </button>

          <button className="w-full p-4 text-left transition-all glass-card hover:bg-white/10">
            <div className="font-medium text-white">Notifications</div>
            <div className="text-sm text-gray-400">Control your notification preferences</div>
          </button>

          <button className="w-full p-4 text-left transition-all glass-card hover:bg-white/10">
            <div className="font-medium text-white">Help & Support</div>
            <div className="text-sm text-gray-400">Get help and contact support</div>
          </button>

          <button className="w-full p-4 text-left text-red-400 transition-all glass-card hover:bg-red-400/10">
            <div className="font-medium">Logout</div>
            <div className="text-sm text-red-400/70">Sign out of your account</div>
          </button>
        </div>
      </div>
    </div>
  )
}