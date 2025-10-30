// src/components/CommunityCard.tsx
import { Community } from '@/types'

interface CommunityCardProps {
  community: Community
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="p-4 transition-all glass-card hover:bg-white/10">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white">{community.title}</h3>
        <span className="px-2 py-1 text-xs bg-purple-600 rounded-full">
          {community.membersCount} members
        </span>
      </div>
      <p className="mb-3 text-sm text-gray-400">{community.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{community.type}</span>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
          Join
        </button>
      </div>
    </div>
  )
}