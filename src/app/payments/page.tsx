// src/app/payments/page.tsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly'>('weekly')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const plans = {
    weekly: { price: 3000, duration: 'week', features: ['Unlimited messages', 'Identity hints', 'Custom themes'] },
    monthly: { price: 10000, duration: 'month', features: ['All weekly features', 'Priority support', 'Advanced analytics'] }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // TODO: Integrate with payment provider
    setTimeout(() => {
      setIsProcessing(false)
      router.push('/profile?tab=pro')
    }, 2000)
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-900">
      {/* Status Bar */}
      <div className="px-4 py-2 text-sm text-center text-gray-400 border-b border-gray-800">
        9:41 • Upgrade to Pro
      </div>

      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-white">Go Pro</h1>
        <p className="text-sm text-gray-400">Unlock unlimited features and support LOL App</p>
      </div>

      {/* Plan Selection */}
      <div className="p-6">
        <div className="p-6 glass-card">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setSelectedPlan('weekly')}
              className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
                selectedPlan === 'weekly'
                  ? 'gradient-bg text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
                selectedPlan === 'monthly'
                  ? 'gradient-bg text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Plan Details */}
          <div className="mb-6 text-center">
            <div className="mb-2 text-3xl font-bold text-white">
              {plans[selectedPlan].price.toLocaleString()} UGX
            </div>
            <div className="text-sm text-gray-400">per {plans[selectedPlan].duration}</div>
          </div>

          {/* Features */}
          <div className="mb-6 space-y-3">
            {plans[selectedPlan].features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <span className="text-green-400">✓</span>
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 text-lg font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay ${plans[selectedPlan].price.toLocaleString()} UGX`}
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6">
        <div className="p-4 glass-card">
          <h3 className="mb-3 font-semibold text-white">Payment Methods</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-2xl">
              <span className="text-xl">📱</span>
              <span className="text-sm text-white">Mobile Money</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-2xl">
              <span className="text-xl">💳</span>
              <span className="text-sm text-white">Credit/Debit Card</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}