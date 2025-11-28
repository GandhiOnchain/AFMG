import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { list } from '@vercel/blob'

interface Submission {
  address: string
  farcasterUsername: string
  tellMeWhy: string
  timestamp: string
}

async function getFromPostgres(): Promise<Submission[]> {
  if (!process.env.POSTGRES_URL) return []

  try {
    const result = await sql`
      SELECT address, farcaster_username as "farcasterUsername", tell_me_why as "tellMeWhy", timestamp
      FROM allowlist_submissions
      ORDER BY created_at DESC
    `
    return result.rows as Submission[]
  } catch (error) {
    console.error('Postgres read error:', error)
    return []
  }
}

async function getFromBlob(): Promise<Submission[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return []

  try {
    const { blobs } = await list({
      prefix: 'submissions/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    const submissions = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url)
        return response.json()
      })
    )

    return submissions
  } catch (error) {
    console.error('Blob read error:', error)
    return []
  }
}

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
    // Try Postgres first, fallback to Blob
    let submissions = await getFromPostgres()
    
    if (submissions.length === 0) {
      submissions = await getFromBlob()
    }

    // Remove duplicates by address
    const uniqueSubmissions = submissions.reduce((acc, curr) => {
      if (!acc.find(s => s.address === curr.address)) {
        acc.push(curr)
      }
      return acc
    }, [] as Submission[])

    return res.status(200).json({ 
      submissions: uniqueSubmissions,
      total: uniqueSubmissions.length,
      source: submissions.length > 0 ? (process.env.POSTGRES_URL ? 'postgres' : 'blob') : 'none'
    })
  } catch (error) {
    console.error('List error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
