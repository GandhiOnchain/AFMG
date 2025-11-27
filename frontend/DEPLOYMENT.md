# Deployment Instructions

## Prerequisites
- Vercel account (free tier works)
- Your NFT contract deployed on Base

## Step 1: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the frontend folder

## Step 2: Set Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add:

```
ADMIN_KEY=your-secure-random-key-here
```

**Generate a secure admin key:**
- Use a password generator
- Make it at least 32 characters
- Example: `sk_live_abc123xyz789_secure_admin_key_2024`

## Step 3: Update Farcaster Manifest URLs

After deployment, Vercel will give you a URL like `https://your-app.vercel.app`

Update these files with your actual URLs:

### `frontend/public/.well-known/farcaster.json`
```json
{
  "frame": {
    "version": "1",
    "name": "NFT Mint",
    "iconUrl": "https://your-app.vercel.app/icon.png",
    "homeUrl": "https://your-app.vercel.app/",
    "imageUrl": "https://your-app.vercel.app/og-image.png"
  }
}
```

### `frontend/index.html`
Update the `fc:miniapp` meta tag with your URLs.

## Step 4: Add Images

Upload these images to `frontend/public/`:
- `icon.png` - 1024x1024px (no alpha channel)
- `og-image.png` - 1200x800px (3:2 aspect ratio)

## Step 5: View Allowlist Submissions

1. Go to `https://your-app.vercel.app/admin`
2. Enter your `ADMIN_KEY` (the one you set in Vercel)
3. View all submissions
4. Click "Copy All Addresses" to get the list
5. Paste into OpenSea Drop allowlist settings

## Step 6: Test in Farcaster

1. Go to https://farcaster.xyz/~/developers/mini-apps/preview
2. Enter your app URL
3. Test the submission flow
4. Verify it works before December 1st

## Important Notes

- Submissions are stored in memory (resets on deployment)
- For production, consider using a database (Vercel KV, Supabase, etc.)
- Keep your ADMIN_KEY secret
- Test thoroughly before the mint date

## Troubleshooting

**Can't access /admin:**
- Make sure ADMIN_KEY is set in Vercel environment variables
- Redeploy after adding environment variables

**Submissions not saving:**
- Check browser console for errors
- Verify API endpoints are working at `/api/allowlist/submit`

**Farcaster not loading:**
- Ensure all URLs are HTTPS
- Check manifest file is accessible at `/.well-known/farcaster.json`
