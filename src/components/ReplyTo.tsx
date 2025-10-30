// src/components/ReplyTo.tsx
import { Message } from '@/types'

interface ReplyToProps {
  message: Message
  onCancel: () => void
}

export default function ReplyTo({ message, onCancel }: ReplyToProps) {
  return (
    <div className="p-3 mb-3 border-l-4 border-purple-500 glass-card rounded-2xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-1 space-x-2">
            <span className="text-xs font-medium text-purple-400">Replying to</span>
            {message.senderDisplay && (
              <span className="text-xs text-gray-400">@{message.senderDisplay}</span>
            )}
          </div>
          <p className="text-sm text-white line-clamp-2">
            {message.text}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="flex-shrink-0 ml-2 text-sm text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  )
}