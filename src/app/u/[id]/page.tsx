// src/app/u/[id]/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function PublicProfile() {
  const params = useParams()
  const userId = params.id as string
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setIsSending(true)
    // TODO: Implement message sending to Firestore
    console.log('Sending message:', message, 'to user:', userId)
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setMessage('')
      alert('Message sent anonymously!')
    }, 1000)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      {/* Status Bar */}
      <div className="mb-8 text-sm text-center text-gray-400">
        9:41
      </div>

      {/* Profile Header */}
      <div className="p-6 mb-8 text-center glass-card">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-2xl text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
          👤
        </div>
        <h1 className="mb-2 text-xl font-bold text-white">Anonymous User</h1>
        <p className="text-sm text-gray-400">Send an anonymous message</p>
        <div className="mt-2 text-xs text-purple-400">User ID: {userId}</div>
      </div>

      {/* Message Form */}
      <form onSubmit={handleSendMessage} className="mb-8">
        <div className="p-4 glass-card">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your anonymous message here..."
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[120px]"
            maxLength={500}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              {message.length}/500
            </span>
            <button
              type="submit"
              disabled={!message.trim() || isSending}
              className="px-6 py-2 font-medium text-white transition-all gradient-bg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Send Anonymously'}
            </button>
          </div>
        </div>
      </form>

      {/* Info Card */}
      <div className="p-4 glass-card">
        <h3 className="mb-2 font-semibold text-white">How it works</h3>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Your message is completely anonymous</li>
          <li>• User can reply to start a conversation</li>
          <li>• Free users have limited replies per day</li>
          <li>• Go Pro for unlimited chats and identity hints</li>
        </ul>
      </div>
    </div>
  )
}