// src/pages/api/admin/export.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // TODO: Implement admin authentication check
    // const isAdmin = await checkAdminAuth(req)
    // if (!isAdmin) return res.status(403).json({ error: 'Forbidden' })

    const { type, format = 'csv' } = req.body

    // TODO: Fetch data from Firestore based on type
    let data: any[] = []
    let filename = ''

    switch (type) {
      case 'users':
        data = await getUsersData()
        filename = `lolapp-users-${Date.now()}.${format}`
        break
      case 'payments':
        data = await getPaymentsData()
        filename = `lolapp-payments-${Date.now()}.${format}`
        break
      case 'messages':
        data = await getMessagesData()
        filename = `lolapp-messages-${Date.now()}.${format}`
        break
      default:
        return res.status(400).json({ error: 'Invalid export type' })
    }

    if (format === 'csv') {
      const csv = convertToCSV(data)
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
      return res.send(csv)
    } else {
      return res.status(400).json({ error: 'Format not supported' })
    }

  } catch (error) {
    console.error('Export error:', error)
    return res.status(500).json({ error: 'Export failed' })
  }
}

// Mock data functions - replace with actual Firestore queries
async function getUsersData() {
  return [
    { id: '1', username: 'user1', pro: true, joined: '2024-01-01' },
    { id: '2', username: 'user2', pro: false, joined: '2024-01-02' }
  ]
}

async function getPaymentsData() {
  return [
    { id: 'p1', userId: '1', amount: 3000, status: 'completed' },
    { id: 'p2', userId: '2', amount: 10000, status: 'completed' }
  ]
}

async function getMessagesData() {
  return [
    { id: 'm1', sender: 'anon1', receiver: 'user1', timestamp: '2024-01-01' },
    { id: 'm2', sender: 'user1', receiver: 'anon1', timestamp: '2024-01-01' }
  ]
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const csvRows = [headers.join(',')]
  
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"')
      return `"${escaped}"`
    })
    csvRows.push(values.join(','))
  }
  
  return csvRows.join('\n')
}