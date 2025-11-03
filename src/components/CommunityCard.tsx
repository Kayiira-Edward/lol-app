// src/components/CommunityCard.tsx
import { Community } from '@/types'
import { useRouter } from 'next/navigation'

interface CommunityCardProps {
  community: Community
  onJoin: (communityId: string, communityTitle: string) => void
  isJoining?: boolean
}

export default function CommunityCard({ community, onJoin, isJoining = false }: CommunityCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/communities/${community.id}`)
  }

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when joining
    onJoin(community.id, community.title)
  }

  return (
    <div 
      onClick={handleCardClick}
      className="p-4 transition-all cursor-pointer glass-card hover:bg-white/10 active:scale-95"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white">{community.title}</h3>
        <span className="px-2 py-1 text-xs bg-purple-600 rounded-full">
          {community.membersCount} members
        </span>
      </div>
      <p className="mb-3 text-sm text-gray-400">{community.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 capitalize">{community.type}</span>
        <button 
          onClick={handleJoin}
          disabled={isJoining}
          className="px-4 py-2 text-sm font-medium text-white transition-transform bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isJoining ? 'Joining...' : 'Join'}
        </button>
      </div>
    </div>
  )
}