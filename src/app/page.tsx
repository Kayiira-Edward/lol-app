// src/app/page.tsx
import Navbar from '@/components/Navbar'
import CommunityCard from '@/components/CommunityCard'
import SearchBar from '@/components/SearchBar'

const trendingCommunities = [
  {
    id: 'campus',
    title: 'Campus Life',
    description: 'University stories & campus drama',
    membersCount: 1243,
    type: 'open'
  },
  {
    id: 'tech',
    title: 'Tech & Hustle', 
    description: 'Startups, coding, side hustles',
    membersCount: 892,
    type: 'open'
  },
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'Dating, friendships, family talks',
    membersCount: 2107,
    type: 'open'
  }
]

export default function Home() {
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
          <button className="w-full px-6 py-3 font-medium text-white gradient-bg rounded-2xl">
            Get Started
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <button className="p-4 text-center glass-card">
            <div className="mb-1 text-2xl">💬</div>
            <div className="text-xs">Chat</div>
          </button>
          <button className="p-4 text-center glass-card">
            <div className="mb-1 text-2xl">🔍</div>
            <div className="text-xs">Search</div>
          </button>
          <button className="p-4 text-center glass-card">
            <div className="mb-1 text-2xl">⚡</div>
            <div className="text-xs">Pro</div>
          </button>
        </div>
      </div>

      {/* Trending Communities */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Trending Communities</h2>
          <button className="text-sm text-purple-400">View All</button>
        </div>
        
        <div className="space-y-3">
          {trendingCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </div>
  )
}