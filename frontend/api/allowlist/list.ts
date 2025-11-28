import type { VercelRequest, VercelResponse } from '@vercel/node'

interface Submission {
  address: string
  farcasterUsername: string
  tellMeWhy: string
  timestamp: string
}

let submissions: Submission[] = []

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminKey = req.headers['x-admin-key'] || req.query.key

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    return res.status(200).json({ 
      submissions,
      total: submissions.length
    })
  } catch (error) {
    console.error('List error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
