// src/app/communities/page.tsx
'use client'

import { useState } from 'react'
import CommunityCard from '@/components/CommunityCard'
import SearchBar from '@/components/SearchBar'
import { Community } from '@/types'

const mockCommunities: Community[] = [
  {
    id: 'campus',
    title: 'Campus Life',
    description: 'University stories, campus drama, and student life',
    membersCount: 1243,
    type: 'open',
    createdAt: Date.now() - 86400000
  },
  {
    id: 'tech',
    title: 'Tech & Hustle', 
    description: 'Startups, coding, side hustles and tech trends',
    membersCount: 892,
    type: 'open',
    createdAt: Date.now() - 172800000
  },
  {
    id: 'relationships',
    title: 'Relationships & Dating',
    description: 'Dating advice, friendship drama, relationship talks',
    membersCount: 2107,
    type: 'open',
    createdAt: Date.now() - 259200000
  },
  {
    id: 'gaming',
    title: 'Gaming Zone',
    description: 'Video games, esports, and gaming culture',
    membersCount: 567,
    type: 'open',
    createdAt: Date.now() - 345600000
  },
  {
    id: 'fitness',
    title: 'Fitness & Health',
    description: 'Workout tips, nutrition, and wellness journey',
    membersCount: 432,
    type: 'open',
    createdAt: Date.now() - 432000000
  }
]

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCommunities = mockCommunities.filter(community =>
    community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = [
    { id: 'all', name: 'All Communities', count: mockCommunities.length },
    { id: 'popular', name: 'Most Popular', count: mockCommunities.filter(c => c.membersCount > 1000).length },
    { id: 'new', name: 'New', count: mockCommunities.filter(c => Date.now() - c.createdAt < 604800000).length }
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
        <SearchBar />
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
          {filteredCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-lg font-semibold text-white">No communities found</h3>
            <p className="text-sm text-gray-400">
              Try adjusting your search or browse different categories
            </p>
          </div>
        )}
      </div>

      {/* Create Community CTA */}
      <div className="fixed bottom-24 left-6 right-6">
        <div className="p-4 text-center glass-card">
          <h3 className="mb-2 font-semibold text-white">Can't find your community?</h3>
          <p className="mb-3 text-sm text-gray-400">Create your own and start connecting</p>
          <button className="w-full px-6 py-3 font-medium text-white gradient-bg rounded-2xl">
            Create Community
          </button>
        </div>
      </div>
    </div>
  )
}