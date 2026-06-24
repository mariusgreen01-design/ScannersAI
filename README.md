# 🤖 AI Website Scanner - Self-Hosted Chatbot

A **self-hosted AI application** that scans and answers questions about US Government websites using **Groq's free AI** (Mixtral model). Works on desktop, laptop, Android phones, and tablets.

---

## 📊 What It Does

✅ **Scans websites**: Indexes content from US Embassy PH & VA.gov  
✅ **AI-powered**: Uses OpenAI's GPT-3.5 to answer questions with context  
✅ **Mobile-friendly**: Responsive design works perfectly on Android  
✅ **Self-hosted**: Run on your own computer or server  
✅ **No data collection**: Your questions stay private  

---

## 🎯 Use Cases

- 🏛️ Answer questions about US Embassy services in the Philippines
- 🏥 Get VA benefits information
- 📚 Learn government procedures quickly
- 👨‍👩‍👧‍👦 Share with family on Android devices
- 🌍 Deploy to cloud for global access

---

## 📦 What's Included

```
ai-website-scanner/
├── server.js                # AI backend & web scraper
├── public/index.html        # Beautiful web UI
├── docker-compose.yml       # One-command Docker setup
├── Dockerfile              # Container definition
├── package.json            # Dependencies
├── .env                    # Configuration (API keys)
├── SETUP.md               # Full setup guide
├── QUICK_SETUP.md         # Fast start (5 minutes)
├── ANDROID_GUIDE.md       # Mobile instructions
└── verify.sh/bat          # Verification script
```

---

## ⚡ Quick Start (2 Minutes)

### 1️⃣ Get Groq API Key (Free!)
- Go to https://console.groq.com
- Sign up (free account)
- Create API key
- Copy it (looks like: `gsk_...`)

### 2️⃣ Configure
Edit `.env` file:
```
GROQ_API_KEY=gsk_your-key-here
PORT=3000
```

### 3️⃣ Run
```bash
npm install
npm start
```

### 4️⃣ Use
- **Desktop**: http://localhost:3000
- **Android**: http://192.168.1.100:3000 (your IP)

---

## 📱 Android Setup (1 Minute)

1. **Computer**: Run `npm start`
2. **Computer**: Get IP from `ipconfig` (e.g., 192.168.1.100)
3. **Android**: Open Chrome → `http://192.168.1.100:3000`
4. **Android**: Tap menu → "Add to Home screen"
5. Done! Use like a native app 🎉

See [ANDROID_GUIDE.md](ANDROID_GUIDE.md) for detailed instructions.

---

## 🛠️ Installation

### Requirements
- Node.js 18+ (download from nodejs.org)
- OpenAI API key ($5-20/month for light use)
- Docker (optional, for containerization)

### Install Steps
```bash
# 1. Navigate to project folder
cd C:\ai-website-scanner

# 2. Install dependencies
npm install

# 3. Create .env with your API key
echo OPENAI_API_KEY=sk-your-key >> .env

# 4. Start server
npm start

# 5. Open browser
# http://localhost:3000
```

---

## 🐳 Docker Deployment

### Local (Simplest)
```bash
docker-compose up -d
```

### Cloud Server (DigitalOcean Example)
```bash
# 1. SSH into server
ssh root@your-server-ip

# 2. Install Docker
curl -fsSL https://get.docker.com | sh

# 3. Deploy
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  --restart unless-stopped \
  ai-website-scanner:latest
```

---

## 💻 Architecture

```
┌─────────────────────────────────────────────┐
│         Web Browser / Mobile App            │
│  (Desktop, Android, iPhone, iPad)           │
└──────────────────────┬──────────────────────┘
                       │ HTTP
┌──────────────────────▼──────────────────────┐
│      Express.js Server (port 3000)          │
│  • API endpoints                             │
│  • Static file serving                       │
│  • Web scraper                               │
└──────────────────────┬──────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
┌────────▼─────────┐    ┌───────────▼──────────┐
│  OpenAI API      │    │  Website Scraper     │
│  (ChatGPT)       │    │ (Cheerio + Axios)    │
│                  │    │                      │
│ - gpt-3.5-turbo  │    │ - US Embassy PH      │
│ - gpt-4 (option) │    │ - VA.gov             │
└──────────────────┘    └──────────────────────┘
```

---

## 🔑 Configuration

### Environment Variables
```env
OPENAI_API_KEY=sk-proj-...          # Required: Your OpenAI API key
PORT=3000                            # Optional: Server port (default: 3000)
NODE_ENV=development|production     # Optional: Environment mode
WEBSITES=url1,url2,url3            # Optional: Comma-separated site URLs
```

### Customize AI Model
Edit `server.js`, find `openai.chat.completions.create()`:
```javascript
model: 'gpt-3.5-turbo'  // Default, fast & cheap
// OR
model: 'gpt-4'         // Better, slower & expensive
```

### Add More Websites
Edit `server.js`, find `indexWebsites()`:
```javascript
const websites = [
  'https://ph.usembassy.gov/',
  'https://www.va.gov/',
  'https://your-new-site.gov/'  // Add here
];
```

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup guide with all options
- **[QUICK_SETUP.md](QUICK_SETUP.md)** - 5-minute fast start
- **[ANDROID_GUIDE.md](ANDROID_GUIDE.md)** - Mobile usage instructions

---

## 🚀 API Usage

### Query the AI
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What visa services are available?",
    "website": "https://ph.usembassy.gov/"
  }'
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

See [SETUP.md](SETUP.md) for all API endpoints.

---

## 🐛 Troubleshooting

### "OpenAI API key not configured"
✅ Add key to `.env` file (get from https://platform.openai.com/api-keys)

### "Cannot connect on Android"
✅ Use same WiFi, get correct IP from `ipconfig`, verify server is running

### "Port 3000 in use"
✅ Change port in `.env`: `PORT=3001`

### "Website indexing errors"
✅ Normal - some sites block scrapers. AI still works with general knowledge.

### "Docker build failed"
✅ Run `npm install --no-package-lock` first

More issues? See [SETUP.md](SETUP.md) troubleshooting section.

---

## 💰 Cost Estimate

### API Usage (OpenAI)
- **$0.50/month** - Light use (10-20 questions/day)
- **$5/month** - Regular use (100+ questions/day)
- **$20/month** - Heavy use (1000+ questions/day)

### Hosting
- **Free** - Run on your computer
- **$5/month** - VPS (DigitalOcean, Linode)
- **$15/month** - Managed platforms (Railway, Render)

---

## 🔐 Security & Privacy

✅ **Your questions are private** - Only sent to OpenAI  
✅ **No data storage** - Chat history is local only  
✅ **API key protected** - Never exposed to client  
⚠️ **Be careful** - Don't ask sensitive/personal info  
⚠️ **OpenAI Terms** - Follow their usage policies  

---

## 📈 Deployment Options

### Option 1: Home Computer (Free)
```bash
npm start  # Keep PC on 24/7
```
✅ Simplest  
✅ Free  
❌ PC must stay on  
❌ Access only locally

### Option 2: VPS Server ($5/month)
```bash
# DigitalOcean, Linode, AWS, etc.
docker-compose up -d
```
✅ Always on  
✅ Accessible globally  
✅ Professional  
❌ Small monthly cost

### Option 3: PaaS Platform ($0-15/month)
```bash
# Railway.app, Render.com, Fly.io
# Push to repository, auto-deploy
```
✅ Easiest deployment  
✅ Auto scaling  
✅ HTTPS included  
❌ Limited customization

---

## 🤝 Contributing

Want to improve this? Help welcome!

### Ideas
- Add more websites
- Improve UI/UX
- Add caching layer
- Multi-language support
- Rate limiting
- Authentication

---

## 📄 License

MIT - Use freely for personal & commercial projects

---

## 🎓 What You'll Learn

Building this project teaches you:
- ✅ Web scraping (Cheerio, Axios)
- ✅ REST APIs (Express.js)
- ✅ AI integration (OpenAI SDK)
- ✅ Docker containerization
- ✅ Full-stack development
- ✅ Responsive web design

---

## ⭐ Support

If this helps you, consider:
- ⭐ Starring the repository
- 📢 Sharing with friends
- 💬 Providing feedback
- 🐛 Reporting issues

---

## 🚀 Next Steps

1. ✅ Get OpenAI API key
2. ✅ Update `.env`
3. ✅ Run `npm start` or `docker-compose up`
4. ✅ Open http://localhost:3000
5. ✅ Ask questions!
6. ✅ Use on Android

---

**Questions?** Check the guides: SETUP.md, QUICK_SETUP.md, ANDROID_GUIDE.md

**Ready to deploy?** Start with Docker: `docker-compose up -d`

**On mobile?** See ANDROID_GUIDE.md for easy setup

---

**Happy questioning! 🎉 Your self-hosted AI is ready!**
