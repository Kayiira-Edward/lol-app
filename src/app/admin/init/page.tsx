// src/app/admin/init/page.tsx
'use client'

import { useState } from 'react'
import { createSampleCommunities } from '@/services/firebase'
import { useToast } from '@/context/ToastContext'

export default function InitPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const { showToast } = useToast()

  const handleInitializeData = async () => {
    setIsInitializing(true)
    try {
      const success = await createSampleCommunities()
      if (success) {
        showToast('Sample communities created successfully!', 'success')
      } else {
        showToast('Failed to create sample communities', 'error')
      }
    } catch (error) {
      console.error('Initialization error:', error)
      showToast('Error initializing data', 'error')
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold text-white">Initialize Sample Data</h1>
      
      <div className="p-6 glass-card">
        <h2 className="mb-4 text-lg font-semibold text-white">Firebase Setup</h2>
        
        <div className="mb-6 space-y-4">
          <div className="p-4 border border-yellow-600 bg-yellow-600/20 rounded-2xl">
            <p className="text-sm text-yellow-300">
              <strong>Current Issue:</strong> Permission denied when joining communities
            </p>
          </div>
          
          <div className="p-4 border border-blue-600 bg-blue-600/20 rounded-2xl">
            <p className="text-sm text-blue-300">
              <strong>Solution Applied:</strong> Deployed permissive Firebase rules for development
            </p>
          </div>
        </div>

        <button
          onClick={handleInitializeData}
          disabled={isInitializing}
          className="w-full px-6 py-3 font-medium text-white transition-transform gradient-bg rounded-2xl hover:scale-105 disabled:opacity-50"
        >
          {isInitializing ? 'Creating Sample Data...' : 'Create Sample Communities'}
        </button>

        <div className="mt-6 text-sm text-gray-400">
          <p className="mb-2"><strong>Next Steps:</strong></p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Click the button above to create sample communities</li>
            <li>Go to /communities page to test joining</li>
            <li>If it works, we'll implement proper security rules</li>
          </ol>
        </div>
      </div>
    </div>
  )
}