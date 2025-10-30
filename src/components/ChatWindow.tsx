// src/components/ChatWindow.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import MessageForm from './MessageForm'
import { Message } from '@/types'
import { useMessageLimit } from '@/hooks/useMessageLimit'

interface ChatWindowProps {
  chatId: string
  messages: Message[]
  onSendMessage: (text: string, replyTo?: Message | null) => void
  onReact: (messageId: string, reaction: string) => void
  isPro?: boolean
}

export default function ChatWindow({ 
  chatId, 
  messages, 
  onSendMessage, 
  onReact, 
  isPro = false 
}: ChatWindowProps) {
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { canSend, count, limit } = useMessageLimit(isPro)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleReply = (message: Message) => {
    setReplyingTo(message)
  }

  const handleSend = (text: string) => {
    onSendMessage(text, replyingTo)
    setReplyingTo(null)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h3 className="mb-2 text-lg font-semibold text-white">No messages yet</h3>
            <p className="text-sm text-gray-400">
              Start the conversation by sending the first message!
            </p>
          </div>
        ) : (
          messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === 'me'}
              onReply={handleReply}
              onReact={onReact}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="p-3 mx-4 mt-4 glass-card rounded-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-xs text-purple-400">Replying to:</p>
              <p className="text-sm text-white truncate">{replyingTo.text}</p>
            </div>
            <button 
              onClick={handleCancelReply}
              className="ml-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Message Limit Alert */}
      {!canSend && (
        <div className="p-4 mx-4 mt-4 border border-orange-600 bg-orange-600/20 rounded-2xl">
          <p className="text-sm text-center text-orange-300">
            Daily limit reached ({count}/{limit}).{' '}
            <button className="font-semibold underline">Go Pro</button> for unlimited messages.
          </p>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4">
        <MessageForm
          onSendMessage={handleSend}
          disabled={!canSend}
          replyingTo={replyingTo}
          onCancelReply={handleCancelReply}
        />
        {!isPro && (
          <div className="mt-2 text-xs text-center text-gray-400">
            Messages today: {count}/{limit}
          </div>
        )}
      </div>
    </div>
  )
}