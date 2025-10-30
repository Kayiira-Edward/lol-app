// src/hooks/useRealtimeMessages.ts
import { useState, useEffect } from 'react'
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  where 
} from 'firebase/firestore'
import { db } from '@/services/firebase'
import { Message } from '@/types'

export function useRealtimeMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!chatId) return

    const messagesRef = collection(db, 'messages', chatId, 'threads')
    const q = query(
      messagesRef, 
      orderBy('timestamp', 'asc'),
      limit(100)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = []
      snapshot.forEach(doc => {
        messagesData.push({ id: doc.id, ...doc.data() } as Message)
      })
      
      setMessages(messagesData)
      setLoading(false)
    }, (error) => {
      console.error('Error listening to messages:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [chatId])

  return { messages, loading }
}