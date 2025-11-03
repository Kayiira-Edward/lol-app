// src/app/chat/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChatList from '@/components/ChatList'
import { getUserChats } from '@/services/firebase'

export default function ChatPage() {
  const [chats, setChats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = async () => {
    try {
      // TODO: Replace with actual user ID from auth
      const userChats = await getUserChats('current-user-id')
      setChats(userChats)
    } catch (error) {
      console.error('Error loading chats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    router.push('/u/new')
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41 • Chats
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <p className="text-sm text-gray-400">Your conversations</p>
          </div>
          <button 
            onClick={handleNewChat}
            className="px-4 py-2 text-sm text-white transition-transform gradient-bg rounded-2xl hover:scale-105"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Chat List */}
      <ChatList chats={chats} isLoading={isLoading} />
    </div>
  )
}