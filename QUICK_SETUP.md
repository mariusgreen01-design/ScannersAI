# AI Website Scanner - Complete Setup Instructions

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Start server | `npm start` |
| Build Docker | `docker build -t ai-website-scanner .` |
| Run Docker | `docker run -p 3000:3000 -e OPENAI_API_KEY=sk-... ai-website-scanner` |
| Docker Compose | `docker-compose up -d` |
| View logs | `npm start` or `docker logs -f ai-scanner` |
| Stop server | `Ctrl+C` |
| Stop Docker | `docker stop ai-scanner` |

## Setup Steps

### Step 1: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or login
3. Create new API key
4. Copy the key (save it safely!)

### Step 2: Configure .env
Edit `.env` and replace `sk-your-key-here` with your actual key:
```
OPENAI_API_KEY=sk-proj-...your-long-key-here...
PORT=3000
```

### Step 3: Choose Your Setup

#### Option A: Local/Development
```bash
npm install
npm start
# Access: http://localhost:3000
```

#### Option B: Docker (Recommended)
```bash
docker-compose up -d
# Access: http://localhost:3000
```

#### Option C: Docker on Server
```bash
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  --restart unless-stopped \
  ai-website-scanner:latest
```

### Step 4: Access on Android
1. Run `ipconfig` on your computer
2. Copy IPv4 Address (e.g., 192.168.1.100)
3. On Android: Open browser → `http://192.168.1.100:3000`

---

## File Descriptions

- **server.js** - Main backend, handles AI queries & web scraping
- **public/index.html** - Frontend UI (responsive for mobile)
- **.env** - Configuration file with API key
- **Dockerfile** - Docker image definition
- **docker-compose.yml** - Easy Docker setup
- **package.json** - Dependencies list

---

## Environment Variables

```
OPENAI_API_KEY=sk-...              # Your OpenAI API key (required)
PORT=3000                          # Server port (default: 3000)
NODE_ENV=development|production    # Environment mode
WEBSITES=url1,url2,url3           # Websites to scan (comma-separated)
```

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change PORT in .env, e.g., PORT=3001 |
| API key error | Verify key in .env, get new one from OpenAI |
| Android can't connect | Ensure same WiFi, use computer IP not localhost |
| Website indexing fails | Normal - some sites block scrapers, AI uses general knowledge |
| Docker build fails | Run `npm install --no-package-lock` first |

---

## APIs Available

### Query Endpoint
```bash
POST /api/query
Content-Type: application/json

{
  "question": "What services are available?",
  "website": "https://ph.usembassy.gov/"
}
```

Response:
```json
{
  "question": "What services are available?",
  "answer": "The US Embassy in the Philippines provides...",
  "context": "Website context included"
}
```

### Health Check
```bash
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "apiConfigured": true
}
```

---

## Scaling to Production

### Option 1: Self-Host on VPS
- Rent Ubuntu VPS ($5-10/month)
- SSH in and run Docker
- Use domain with SSL

### Option 2: Use Managed Services
- **Railway.app** - Simplest, ~$5/month
- **Render.com** - Free tier available
- **Fly.io** - Good for global access

### Option 3: Keep Running on Home PC
- Works fine for family/small use
- Use ngrok for remote access:
  ```bash
  # Download from ngrok.com
  ngrok http 3000
  ```

---

## Performance Tips

1. **Add caching** - Cache website content to reduce API calls
2. **Rate limiting** - Limit queries per IP to save API costs
3. **Batch indexing** - Index websites on schedule, not per query
4. **Use gpt-3.5** - Faster & cheaper than gpt-4

---

## Customization Examples

### Add New Website
Edit `server.js`, find `indexWebsites()`:
```javascript
const websites = [
  'https://ph.usembassy.gov/',
  'https://www.va.gov/',
  'https://your-new-site.gov/'  // Add here
];
```

### Change AI Model
In `server.js`, find `openai.chat.completions.create()`:
```javascript
model: 'gpt-4'  // Better but slower & more expensive
```

### Adjust Response Style
In `server.js`, modify system prompt:
```javascript
const systemPrompt = `You are a helpful AI...
Your custom instructions here...`;
```

---

## Security Checklist

- ✅ Never commit .env to git
- ✅ Use environment variables in production
- ✅ Rotate API keys regularly
- ✅ Use HTTPS if public
- ✅ Add authentication for sensitive data
- ✅ Rate limit API endpoints

---

All set! 🚀 Your AI website scanner is ready to deploy!
