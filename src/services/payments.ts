// src/services/payments.ts
import { postJSON } from './api'

export interface CheckoutSession {
  userId: string
  plan: 'weekly' | 'monthly'
  amount: number
  currency: string
}

export interface PaymentResult {
  success: boolean
  checkoutUrl?: string
  sessionId?: string
  error?: string
}

export async function createCheckoutSession({ userId, plan }: { userId: string; plan: 'weekly' | 'monthly' }): Promise<PaymentResult> {
  try {
    const response = await postJSON('/api/payments/create-checkout', {
      userId,
      plan,
      provider: process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'marzpay'
    })

    return {
      success: true,
      checkoutUrl: response.checkoutUrl,
      sessionId: response.sessionId
    }
  } catch (error) {
    console.error('Payment session creation failed:', error)
    return {
      success: false,
      error: 'Failed to create payment session'
    }
  }
}

export async function verifyPayment(sessionId: string): Promise<boolean> {
  try {
    const response = await postJSON('/api/payments/verify', { sessionId })
    return response.verified
  } catch (error) {
    console.error('Payment verification failed:', error)
    return false
  }
}

export async function getPaymentHistory(userId: string) {
  try {
    const response = await postJSON('/api/payments/history', { userId })
    return response.payments
  } catch (error) {
    console.error('Failed to fetch payment history:', error)
    return []
  }
}