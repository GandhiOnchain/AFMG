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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { address, farcasterUsername, tellMeWhy, timestamp } = req.body

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid address' })
    }

    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({ error: 'Invalid Ethereum address format' })
    }

    if (!farcasterUsername || typeof farcasterUsername !== 'string' || farcasterUsername.trim().length === 0) {
      return res.status(400).json({ error: 'Farcaster username is required' })
    }

    if (!tellMeWhy || typeof tellMeWhy !== 'string' || tellMeWhy.trim().length === 0) {
      return res.status(400).json({ error: 'Tell me why is required' })
    }

    const existingSubmission = submissions.find(
      s => s.address.toLowerCase() === address.toLowerCase()
    )

    if (existingSubmission) {
      return res.status(400).json({ error: 'Address already submitted' })
    }

    const newSubmission: Submission = {
      address: address.toLowerCase(),
      farcasterUsername: farcasterUsername.trim(),
      tellMeWhy: tellMeWhy.trim(),
      timestamp: timestamp || new Date().toISOString(),
    }

    submissions.push(newSubmission)

    console.log(`New allowlist submission: ${address}`)
    console.log(`Total submissions: ${submissions.length}`)

    return res.status(200).json({ 
      success: true,
      message: 'Successfully submitted for allowlist',
      totalSubmissions: submissions.length
    })
  } catch (error) {
    console.error('Submission error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
