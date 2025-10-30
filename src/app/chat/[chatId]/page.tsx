// src/app/chat/[chatId]/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import MessageBubble from '@/components/MessageBubble'
import { Message } from '@/types'
import { useMessageLimit } from '@/hooks/useMessageLimit'

// Mock data - replace with real Firestore data
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey there! Got any campus tea? ☕',
    senderId: 'anon1',
    senderDisplay: null,
    senderHint: 'Probably from your faculty',
    replyTo: null,
    timestamp: Date.now() - 3600000,
    reactions: { '😂': 1 }
  },
  {
    id: '2', 
    text: 'Haha which faculty though? Engineering has some drama 👀',
    senderId: 'me',
    senderDisplay: 'You',
    senderHint: null,
    replyTo: '1',
    timestamp: Date.now() - 1800000,
    reactions: {}
  }
]

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId as string
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  
  const { canSend, count, limit, increment } = useMessageLimit(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !canSend) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: 'me',
      senderDisplay: 'You',
      senderHint: null,
      replyTo: replyingTo?.id || null,
      timestamp: Date.now(),
      reactions: {}
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setReplyingTo(null)
    increment()
  }

  const handleReply = (message: Message) => {
    setReplyingTo(message)
  }

  const handleReact = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            reactions: { 
              ...msg.reactions, 
              [reaction]: (msg.reactions[reaction] || 0) + 1 
            } 
          } 
        : msg
    ))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <div className="p-4 m-4 mb-0 glass-card rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
            👤
          </div>
          <div>
            <h1 className="font-semibold text-white">Anonymous Chat</h1>
            <p className="text-sm text-gray-400">Online • Started 2h ago</p>
          </div>
        </div>
      </div>

      {/* Message Limit Alert */}
      {!canSend && (
        <div className="p-4 mx-4 mt-4 border border-orange-600 bg-orange-600/20 rounded-2xl">
          <p className="text-sm text-center text-orange-300">
            Daily limit reached ({count}/{limit}). <button className="font-semibold underline">Go Pro</button> for unlimited messages.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === 'me'}
              onReply={handleReply}
              onReact={handleReact}
            />
          ))}
        </div>
      </div>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="p-3 mx-4 mt-4 glass-card rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs text-purple-400">Replying to:</p>
              <p className="text-sm text-white truncate">{replyingTo.text}</p>
            </div>
            <button 
              onClick={() => setReplyingTo(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 m-4 mt-0 glass-card rounded-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={canSend ? "Type your message..." : "Daily limit reached"}
            disabled={!canSend}
            className="flex-1 text-white placeholder-gray-400 bg-transparent focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !canSend}
            className="px-4 py-2 font-medium text-white transition-all gradient-bg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-center text-gray-400">
          Messages today: {count}/{limit}
        </div>
      </form>
    </div>
  )
}