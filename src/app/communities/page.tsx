// src/app/communities/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CommunityCard from '@/components/CommunityCard'
import SearchBar from '@/components/SearchBar'
import { getAllCommunities, searchCommunities, createCommunity, joinCommunity } from '@/services/firebase'
import { useToast } from '@/context/ToastContext'
import { Community } from '@/types'

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newCommunity, setNewCommunity] = useState({ title: '', description: '' })
  const [joiningCommunity, setJoiningCommunity] = useState<string | null>(null)
  
  const router = useRouter()
  const { showToast } = useToast()

  useEffect(() => {
    loadCommunities()
  }, [])

  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery, communities])

  const loadCommunities = async () => {
    try {
      const allCommunities = await getAllCommunities()
      setCommunities(allCommunities as Community[])
      setFilteredCommunities(allCommunities as Community[])
    } catch (error) {
      console.error('Error loading communities:', error)
      showToast('Failed to load communities', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setFilteredCommunities(communities)
    } else {
      const results = await searchCommunities(query)
      setFilteredCommunities(results as Community[])
    }
  }

  const handleJoinCommunity = async (communityId: string, communityTitle: string) => {
    setJoiningCommunity(communityId)
    try {
      // TODO: Replace with actual user ID from auth
      const result = await joinCommunity(communityId, 'current-user-id')
      
      if (result.success) {
        showToast(`Joined ${communityTitle}!`, 'success')
        // Refresh communities to update member counts
        loadCommunities()
      } else {
        showToast(result.message, result.message.includes('Already') ? 'info' : 'error')
      }
    } catch (error) {
      console.error('Error joining community:', error)
      showToast('Failed to join community', 'error')
    } finally {
      setJoiningCommunity(null)
    }
  }

  const handleCreateCommunity = async () => {
    if (newCommunity.title.trim() && newCommunity.description.trim()) {
      try {
        await createCommunity(newCommunity)
        setShowCreateModal(false)
        setNewCommunity({ title: '', description: '' })
        showToast('Community created successfully!', 'success')
        loadCommunities() // Refresh list
      } catch (error) {
        console.error('Error creating community:', error)
        showToast('Failed to create community', 'error')
      }
    }
  }

  const categories = [
    { id: 'all', name: 'All Communities', count: communities.length },
    { id: 'popular', name: 'Most Popular', count: communities.filter(c => c.membersCount > 100).length },
    { id: 'new', name: 'New', count: communities.filter(c => Date.now() - c.createdAt < 604800000).length }
  ]

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41
      </div>

      {/* Header */}
      <div className="p-6">
        <h1 className="mb-2 text-2xl font-bold text-white">Communities</h1>
        <p className="text-sm text-gray-400">Join trending topics and connect anonymously</p>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Categories */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'gradient-bg text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {selectedCategory === 'popular' ? 'Most Popular' : 
             selectedCategory === 'new' ? 'New Communities' : 'All Communities'}
          </h2>
          <span className="text-sm text-gray-400">
            {filteredCommunities.length} communities
          </span>
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            // Loading skeletons
            [1, 2, 3].map(i => (
              <div key={i} className="p-4 glass-card animate-pulse">
                <div className="h-4 mb-2 bg-gray-700 rounded"></div>
                <div className="w-3/4 h-3 bg-gray-700 rounded"></div>
              </div>
            ))
          ) : (
            filteredCommunities.map(community => (
              <CommunityCard
                key={community.id}
                community={community}
                onJoin={() => handleJoinCommunity(community.id, community.title)}
                isJoining={joiningCommunity === community.id}
              />
            ))
          )}
        </div>

        {filteredCommunities.length === 0 && !isLoading && (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-lg font-semibold text-white">No communities found</h3>
            <p className="text-sm text-gray-400">
              Try adjusting your search or create your own community
            </p>
          </div>
        )}
      </div>

      {/* Create Community CTA */}
      <div className="fixed bottom-24 left-6 right-6">
        <div className="p-4 text-center glass-card">
          <h3 className="mb-2 font-semibold text-white">Can't find your community?</h3>
          <p className="mb-3 text-sm text-gray-400">Create your own and start connecting</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-full px-6 py-3 font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105"
          >
            Create Community
          </button>
        </div>
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50">
          <div className="w-full max-w-md p-6 glass-card animate-slide-up">
            <h3 className="mb-4 text-lg font-semibold text-white">Create Community</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Community Name
                </label>
                <input
                  type="text"
                  value={newCommunity.title}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter community name"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 resize-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Describe your community"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 font-medium text-white transition-colors bg-gray-700 rounded-2xl hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCommunity}
                  className="flex-1 px-4 py-3 font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}