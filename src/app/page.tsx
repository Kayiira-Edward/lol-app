// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import CommunityCard from '@/components/CommunityCard'
import SearchBar from '@/components/SearchBar'
import { getTrendingCommunities, joinCommunity } from '@/services/firebase'
import { Community } from '@/types'

export default function Home() {
  const [trendingCommunities, setTrendingCommunities] = useState<Community[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadTrendingCommunities()
  }, [])

  const loadTrendingCommunities = async () => {
    try {
      const communities = await getTrendingCommunities()
      setTrendingCommunities(communities.slice(0, 3) as Community[])
    } catch (error) {
      console.error('Error loading communities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetStarted = () => {
    router.push('/auth/register')
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'chat':
        router.push('/chat')
        break
      case 'search':
        router.push('/communities')
        break
      case 'pro':
        router.push('/profile?tab=pro')
        break
    }
  }

  const handleViewAllCommunities = () => {
    router.push('/communities')
  }

  const handleJoinCommunity = async (communityId: string) => {
    try {
      // TODO: Replace with actual user ID from auth
      const success = await joinCommunity(communityId, 'current-user-id')
      if (success) {
        // Refresh communities to update member counts
        loadTrendingCommunities()
      }
    } catch (error) {
      console.error('Error joining community:', error)
    }
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41
      </div>
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="px-6 py-8 text-center">
        <h1 className="mb-2 text-3xl font-bold gradient-text">
          LOL App
        </h1>
        <p className="mb-6 text-sm text-gray-400">
          Your anonymous sidekick. Always on. Always real.
        </p>
        
        <div className="p-6 mb-8 glass-card">
          <h2 className="mb-2 text-xl font-semibold">Hey there! What's your first win today?</h2>
          <p className="mb-4 text-sm text-gray-400">Chat smarter. Stay anonymous.</p>
          <button 
            onClick={handleGetStarted}
            className="w-full px-6 py-3 font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleQuickAction('chat')}
            className="p-4 text-center transition-all glass-card hover:bg-white/10 active:scale-95"
          >
            <div className="mb-1 text-2xl">💬</div>
            <div className="text-xs">Chat</div>
          </button>
          <button 
            onClick={() => handleQuickAction('search')}
            className="p-4 text-center transition-all glass-card hover:bg-white/10 active:scale-95"
          >
            <div className="mb-1 text-2xl">🔍</div>
            <div className="text-xs">Search</div>
          </button>
          <button 
            onClick={() => handleQuickAction('pro')}
            className="p-4 text-center transition-all glass-card hover:bg-white/10 active:scale-95"
          >
            <div className="mb-1 text-2xl">⚡</div>
            <div className="text-xs">Pro</div>
          </button>
        </div>
      </div>

      {/* Trending Communities */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Trending Communities</h2>
          <button 
            onClick={handleViewAllCommunities}
            className="text-sm text-purple-400 transition-colors hover:text-purple-300"
          >
            View All
          </button>
        </div>
        
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 glass-card animate-pulse">
                <div className="h-4 mb-2 bg-gray-700 rounded"></div>
                <div className="w-3/4 h-3 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {trendingCommunities.map(community => (
              <CommunityCard 
                key={community.id} 
                community={community} 
                onJoin={() => handleJoinCommunity(community.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}