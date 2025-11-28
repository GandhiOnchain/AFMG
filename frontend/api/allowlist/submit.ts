import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { put } from '@vercel/blob'

interface Submission {
  address: string
  farcasterUsername: string
  tellMeWhy: string
  timestamp: string
}

async function saveToPostgres(submission: Submission) {
  if (!process.env.POSTGRES_URL) return

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS allowlist_submissions (
        id SERIAL PRIMARY KEY,
        address TEXT UNIQUE NOT NULL,
        farcaster_username TEXT NOT NULL,
        tell_me_why TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    await sql`
      INSERT INTO allowlist_submissions (address, farcaster_username, tell_me_why, timestamp)
      VALUES (${submission.address}, ${submission.farcasterUsername}, ${submission.tellMeWhy}, ${submission.timestamp})
      ON CONFLICT (address) DO NOTHING
    `
    console.log('✅ Saved to Postgres')
  } catch (error) {
    console.error('❌ Postgres error:', error)
  }
}

async function saveToBlob(submission: Submission) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return

  try {
    const filename = `submissions/${submission.address}.json`
    await put(filename, JSON.stringify(submission, null, 2), {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    console.log('✅ Saved to Vercel Blob')
  } catch (error) {
    console.error('❌ Blob error:', error)
  }
}

async function sendToGoogleSheets(submission: Submission) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK) return

  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: submission.address,
        farcasterUsername: submission.farcasterUsername,
        tellMeWhy: submission.tellMeWhy,
        timestamp: submission.timestamp,
      }),
    })
    console.log('✅ Sent to Google Sheets')
  } catch (error) {
    console.error('❌ Google Sheets error:', error)
  }
}

async function sendToWebhook(submission: Submission) {
  const webhooks = [
    process.env.DISCORD_WEBHOOK,
    process.env.TELEGRAM_WEBHOOK,
    process.env.CUSTOM_WEBHOOK,
  ].filter((w): w is string => Boolean(w))

  for (const webhook of webhooks) {
    try {
      const isDiscord = webhook.includes('discord.com')
      
      const payload = isDiscord
        ? {
            embeds: [{
              title: '🎉 New Allowlist Submission',
              color: 0x00ff00,
              fields: [
                { name: 'Address', value: `\`${submission.address}\``, inline: false },
                { name: 'Farcaster', value: `@${submission.farcasterUsername}`, inline: true },
                { name: 'Timestamp', value: new Date(submission.timestamp).toLocaleString(), inline: true },
                { name: 'Tell Me Why', value: submission.tellMeWhy, inline: false },
              ],
              timestamp: submission.timestamp,
            }],
          }
        : {
            text: `🎉 New Allowlist Submission\n\nAddress: ${submission.address}\nFarcaster: @${submission.farcasterUsername}\nTell Me Why: ${submission.tellMeWhy}\nTime: ${new Date(submission.timestamp).toLocaleString()}`,
            ...submission,
          }

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      console.log(`✅ Sent to webhook: ${isDiscord ? 'Discord' : 'Custom'}`)
    } catch (error) {
      console.error('❌ Webhook error:', error)
    }
  }
}

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

    const newSubmission: Submission = {
      address: address.toLowerCase(),
      farcasterUsername: farcasterUsername.trim(),
      tellMeWhy: tellMeWhy.trim(),
      timestamp: timestamp || new Date().toISOString(),
    }

    console.log(`📝 New allowlist submission: ${address}`)

    // Save to all configured storage options in parallel
    await Promise.allSettled([
      saveToPostgres(newSubmission),
      saveToBlob(newSubmission),
      sendToGoogleSheets(newSubmission),
      sendToWebhook(newSubmission),
    ])

    return res.status(200).json({ 
      success: true,
      message: 'Successfully submitted for allowlist',
    })
  } catch (error) {
    console.error('Submission error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
