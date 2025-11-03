// src/app/communities/[communityId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, collection, getDocs, addDoc, orderBy, query } from 'firebase/firestore'
import { db, joinCommunity } from '@/services/firebase'
import { Community, Message } from '@/types'

export default function CommunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const communityId = params.communityId as string

  const [community, setCommunity] = useState<Community | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isMember, setIsMember] = useState(false)

  useEffect(() => {
    loadCommunityData()
  }, [communityId])

  const loadCommunityData = async () => {
    try {
      // Load community details
      const communityRef = doc(db, 'communities', communityId)
      const communitySnap = await getDoc(communityRef)
      
      if (communitySnap.exists()) {
        const communityData = { id: communitySnap.id, ...communitySnap.data() } as Community
        setCommunity(communityData)
        
        // Check if user is member (TODO: Replace with actual user ID)
        const membersRef = collection(db, 'communities', communityId, 'members')
        const membersSnap = await getDocs(membersRef)
        const isUserMember = membersSnap.docs.some(doc => doc.data().userId === 'current-user-id')
        setIsMember(isUserMember)
        
        // Load community messages
        const messagesRef = collection(db, 'communities', communityId, 'posts')
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'))
        const messagesSnap = await getDocs(messagesQuery)
        const messagesData = messagesSnap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as Message[]
        
        setMessages(messagesData)
      }
    } catch (error) {
      console.error('Error loading community:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinCommunity = async () => {
    setIsJoining(true)
    try {
      const success = await joinCommunity(communityId, 'current-user-id')
      if (success) {
        setIsMember(true)
        loadCommunityData() // Refresh data
      }
    } catch (error) {
      console.error('Error joining community:', error)
    } finally {
      setIsJoining(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !isMember) return

    try {
      const messagesRef = collection(db, 'communities', communityId, 'posts')
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        senderId: 'current-user-id',
        senderDisplay: 'You',
        timestamp: Date.now(),
        reactions: {}
      })
      
      setNewMessage('')
      loadCommunityData() // Refresh messages
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading community...</div>
      </div>
    )
  }

  if (!community) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Community not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41 • Community
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => router.back()}
            className="text-gray-400 transition-colors hover:text-white"
          >
            ← Back
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{community.title}</h1>
            <p className="text-sm text-gray-400">{community.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {community.membersCount} members • {community.type}
          </div>
          
          {!isMember ? (
            <button
              onClick={handleJoinCommunity}
              disabled={isJoining}
              className="px-6 py-2 text-sm font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105 disabled:opacity-50"
            >
              {isJoining ? 'Joining...' : 'Join Community'}
            </button>
          ) : (
            <div className="text-sm font-medium text-green-400">✓ Member</div>
          )}
        </div>
      </div>

      {/* Community Feed */}
      <div className="p-6">
        {isMember ? (
          <>
            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="mb-6">
              <div className="p-4 glass-card rounded-2xl">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share something with the community..."
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[80px]"
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">
                    {newMessage.length}/500
                  </span>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 text-sm font-medium text-white transition-transform gradient-bg rounded-2xl disabled:opacity-50 hover:scale-105"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>

            {/* Messages */}
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mb-4 text-6xl">💬</div>
                  <h3 className="mb-2 text-lg font-semibold text-white">No posts yet</h3>
                  <p className="text-sm text-gray-400">
                    Be the first to share something in this community!
                  </p>
                </div>
              ) : (
                messages.map(message => (
                  <div key={message.id} className="p-4 glass-card">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                        {message.senderDisplay === 'You' ? '😊' : '👤'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-white">
                            {message.senderDisplay || 'Anonymous'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-white">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔒</div>
            <h3 className="mb-2 text-lg font-semibold text-white">Join to participate</h3>
            <p className="mb-6 text-sm text-gray-400">
              Become a member to view and post in this community
            </p>
            <button
              onClick={handleJoinCommunity}
              disabled={isJoining}
              className="px-6 py-3 font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105 disabled:opacity-50"
            >
              {isJoining ? 'Joining...' : 'Join Community'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}