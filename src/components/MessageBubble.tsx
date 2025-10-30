// src/components/MessageBubble.tsx
import { Message } from '@/types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  onReply: (message: Message) => void
  onReact: (messageId: string, reaction: string) => void
}

export default function MessageBubble({ message, isOwn, onReply, onReact }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isOwn 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
          : 'glass-card text-white'
      }`}>
        {/* Reply context */}
        {message.replyTo && (
          <div className="pl-2 mb-2 text-xs border-l-2 border-purple-400 opacity-70">
            Replying to message...
          </div>
        )}
        
        {/* Message text */}
        <p className="text-sm">{message.text}</p>
        
        {/* Sender hint for anonymous */}
        {!isOwn && message.senderHint && (
          <div className="mt-1 text-xs opacity-60">
            💡 {message.senderHint}
          </div>
        )}
        
        {/* Timestamp */}
        <div className="mt-2 text-xs text-right opacity-50">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
        
        {/* Reaction bar */}
        <div className="flex gap-2 mt-2">
          {Object.entries(message.reactions).map(([reaction, count]) => (
            <button
              key={reaction}
              onClick={() => onReact(message.id, reaction)}
              className="px-2 py-1 text-xs transition-all rounded-full bg-white/20 hover:bg-white/30"
            >
              {reaction} {count}
            </button>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3 mt-3">
          <button 
            onClick={() => onReply(message)}
            className="text-xs transition-opacity opacity-70 hover:opacity-100"
          >
            Reply
          </button>
          <button className="text-xs transition-opacity opacity-70 hover:opacity-100">
            Share
          </button>
        </div>
      </div>
    </div>
  )
}