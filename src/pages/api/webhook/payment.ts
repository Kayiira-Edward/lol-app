// src/pages/api/webhook/payment.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // TODO: Verify webhook signature from payment provider
  const signature = req.headers['x-signature']
  const payload = req.body

  try {
    // TODO: Verify signature with payment provider
    // const isValid = verifySignature(payload, signature, process.env.PAYMENT_WEBHOOK_SECRET)
    // if (!isValid) return res.status(401).json({ error: 'Invalid signature' })

    const { event, data } = payload

    if (event === 'payment.completed') {
      const { userId, plan, amount, sessionId } = data

      // TODO: Update user in Firestore to set pro=true
      // TODO: Add payment record to payments collection
      // TODO: Send confirmation email

      console.log('Payment completed:', { userId, plan, amount, sessionId })
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}