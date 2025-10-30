// src/components/MessageForm.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Message } from '@/types'

interface MessageFormProps {
  onSendMessage: (text: string) => void
  disabled?: boolean
  replyingTo?: Message | null
  onCancelReply?: () => void
}

export default function MessageForm({ 
  onSendMessage, 
  disabled = false,
  replyingTo,
  onCancelReply 
}: MessageFormProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  return (
    <form onSubmit={handleSubmit} className="p-4 glass-card rounded-2xl">
      {/* Reply Preview */}
      {replyingTo && (
        <div className="p-2 mb-3 border bg-purple-600/20 rounded-xl border-purple-600/30">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-xs text-purple-400">Replying to:</p>
              <p className="text-sm text-white line-clamp-2">{replyingTo.text}</p>
            </div>
            <button
              type="button"
              onClick={onCancelReply}
              className="ml-2 text-sm text-purple-400 hover:text-purple-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        {/* Message Input */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Daily limit reached" : "Type your message..."}
            disabled={disabled}
            rows={1}
            className="w-full text-white placeholder-gray-400 bg-transparent resize-none focus:outline-none disabled:opacity-50 max-h-32"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="self-end flex-shrink-0 px-4 py-2 font-medium text-white transition-all bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
        >
          Send
        </button>
      </div>

      {/* Character Count */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-400">
          {message.length}/500
        </div>
        <div className="flex space-x-2">
          <button type="button" className="text-gray-400 transition-colors hover:text-white">
            😊
          </button>
          <button type="button" className="text-gray-400 transition-colors hover:text-white">
            📎
          </button>
        </div>
      </div>
    </form>
  )
}