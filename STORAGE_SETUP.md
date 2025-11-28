# Allowlist Submission Storage Setup

This app supports **4 different storage options** for allowlist submissions. You can use one or all of them!

## 1. Vercel Postgres (Recommended)

**Best for:** Persistent, queryable storage

### Setup:
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Connect it to your project
5. Vercel will automatically add `POSTGRES_URL` environment variable

✅ **Done!** Submissions will be saved to Postgres automatically.

---

## 2. Vercel Blob Storage

**Best for:** Simple file storage, easy backup

### Setup:
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Blob**
4. Connect it to your project
5. Vercel will automatically add `BLOB_READ_WRITE_TOKEN` environment variable

✅ **Done!** Each submission will be saved as a JSON file.

---

## 3. Google Sheets Integration

**Best for:** Easy viewing and sharing with team

### Setup:
1. Create a new Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Paste this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Add header row if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Address', 'Farcaster Username', 'Tell Me Why', 'Timestamp']);
  }
  
  sheet.appendRow([
    data.address,
    data.farcasterUsername,
    data.tellMeWhy,
    data.timestamp
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}));
}
```

4. Click **Deploy** → **New deployment**
5. Select type: **Web app**
6. Execute as: **Me**
7. Who has access: **Anyone**
8. Click **Deploy** and copy the URL

9. In Vercel, add environment variable:
   - Name: `GOOGLE_SHEETS_WEBHOOK`
   - Value: (paste the URL you copied)

✅ **Done!** Submissions will appear in your Google Sheet.

---

## 4. Discord/Telegram Webhooks

**Best for:** Real-time notifications

### Discord Setup:
1. Go to your Discord server
2. Server Settings → Integrations → Webhooks
3. Click **New Webhook**
4. Choose a channel and copy the webhook URL
5. In Vercel, add environment variable:
   - Name: `DISCORD_WEBHOOK`
   - Value: (paste webhook URL)

### Telegram Setup:
1. Create a bot with [@BotFather](https://t.me/botfather)
2. Get your chat ID (send a message to your bot, then visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`)
3. Use a service like Zapier or n8n to create a webhook that forwards to Telegram
4. In Vercel, add environment variable:
   - Name: `TELEGRAM_WEBHOOK`
   - Value: (paste webhook URL)

### Custom Webhook:
For any other service (Slack, Zapier, Make, etc.):
- Name: `CUSTOM_WEBHOOK`
- Value: (your webhook URL)

✅ **Done!** You'll get instant notifications for new submissions.

---

## Required Environment Variables

Only one is required, the rest are optional:

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_KEY` | ✅ Yes | Password to access /admin panel |
| `POSTGRES_URL` | Optional | Vercel Postgres connection |
| `BLOB_READ_WRITE_TOKEN` | Optional | Vercel Blob storage |
| `GOOGLE_SHEETS_WEBHOOK` | Optional | Google Sheets integration |
| `DISCORD_WEBHOOK` | Optional | Discord notifications |
| `TELEGRAM_WEBHOOK` | Optional | Telegram notifications |
| `CUSTOM_WEBHOOK` | Optional | Any other webhook service |

---

## How It Works

When a user submits to the allowlist:
1. ✅ Validates the submission
2. 📝 Saves to **all configured storage options** in parallel
3. 🎉 Returns success to the user

The `/admin` panel reads from:
- **Postgres** (if configured) - primary source
- **Blob Storage** (if configured) - fallback
- Shows all unique submissions

---

## Viewing Submissions

### Option 1: Admin Panel
Visit `yourdomain.com/admin` and enter your `ADMIN_KEY`

### Option 2: Google Sheets
Open your connected Google Sheet

### Option 3: Discord/Telegram
Check your channel for notifications

### Option 4: Vercel Logs
Go to Vercel dashboard → Logs to see all submissions

---

## Recommendations

**For production:**
- Use **Postgres** for reliable storage
- Add **Discord/Telegram** for instant notifications
- Optional: **Google Sheets** for easy team access

**For testing:**
- Use **Blob Storage** (simplest setup)
- Add **Discord** for quick testing

**For maximum reliability:**
- Enable **all 4 options** - redundancy is good!
