// src/components/ChatList.tsx
'use client'

import { useState } from 'react'

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  isAnonymous: boolean
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Anonymous User',
    lastMessage: 'Hey, got any campus tea? ☕',
    timestamp: '2h ago',
    unread: 0,
    isAnonymous: true
  },
  {
    id: '2',
    name: 'Tech Enthusiast',
    lastMessage: 'What do you think about the new AI tools?',
    timestamp: '1d ago',
    unread: 1,
    isAnonymous: true
  },
  {
    id: '3',
    name: 'Campus Friend',
    lastMessage: 'The party was lit yesterday! 🎉',
    timestamp: '3d ago',
    unread: 0,
    isAnonymous: true
  }
]

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full bg-gray-900">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h3 className="mb-2 text-lg font-semibold text-white">No chats found</h3>
            <p className="text-sm text-gray-400">
              {searchQuery ? 'Try a different search' : 'Start a new conversation!'}
            </p>
          </div>
        ) : (
          filteredChats.map(chat => (
            <div
              key={chat.id}
              className="transition-colors border-b border-gray-800 cursor-pointer hover:bg-gray-800/50"
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                      {chat.isAnonymous ? '👤' : '😊'}
                    </div>
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-white truncate">
                        {chat.name}
                      </h3>
                      <span className="flex-shrink-0 ml-2 text-xs text-gray-400">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {chat.unread > 0 && (
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-purple-600 rounded-full">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full py-3 text-sm font-medium text-white gradient-bg rounded-2xl">
          + New Chat
        </button>
      </div>
    </div>
  )
}