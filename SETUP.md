# 🤖 AI Website Scanner - Self-Hosted Setup Guide

A self-hosted AI application that scans US Government websites (US Embassy PH & VA.gov) and answers questions using ChatGPT, accessible on desktop and Android.

## 📋 Features

- ✅ Scan and index specific websites
- ✅ Chat interface powered by OpenAI's GPT-3.5
- ✅ Responsive mobile-friendly design (works on Android)
- ✅ Self-hosted with Docker
- ✅ Real-time website context in AI responses
- ✅ Easy setup and deployment

---

## 📦 Prerequisites

### On Your Computer (for development/testing):
- Node.js 18+
- npm or yarn
- Docker & Docker Compose (optional, for containerized deployment)

### For Production/Self-Hosting:
- Docker installed
- OpenAI API key (get it from https://platform.openai.com/api-keys)
- A Linux server or computer that stays on (or use cloud: AWS, DigitalOcean, etc.)

---

## 🚀 Quick Start (Local Development)

### 1. Clone/Set up the project
```bash
cd C:\ai-website-scanner  # or your project directory
```

### 2. Create .env file
```bash
# .env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3000
NODE_ENV=development
WEBSITES=https://ph.usembassy.gov/,https://www.va.gov/
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server
```bash
npm start
```

### 5. Access the app
- **Desktop**: Open http://localhost:3000 in your browser
- **Mobile/Android**: Use your computer's IP address: http://your-computer-ip:3000
  - Find your IP: Run `ipconfig` (Windows) and look for IPv4 Address (e.g., 192.168.1.100)

---

## 🐳 Docker Setup (Recommended for Self-Hosting)

### Using Docker Compose (Easiest)

```bash
cd C:\ai-website-scanner

# Set your API key in .env
echo OPENAI_API_KEY=sk-your-key-here >> .env

# Start the container
docker-compose up -d
```

Access at: http://localhost:3000 (or http://your-server-ip:3000)

### Using Docker Directly

```bash
# Build image
docker build -t ai-website-scanner .

# Run container
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key-here \
  --name ai-scanner \
  ai-website-scanner:latest
```

---

## 📱 Accessing on Android

### Option 1: Mobile Browser
1. Make sure Android phone and computer are on the same WiFi
2. Find your computer's IP: `ipconfig` → copy IPv4 Address
3. On Android phone, open browser and go to: `http://192.168.1.100:3000` (replace with your IP)
4. Bookmark the page for quick access

### Option 2: Docker on a Remote Server
If hosting on AWS/DigitalOcean:
1. Set up Docker container on the server
2. Allow port 3000 in firewall
3. Access: `http://your-server-domain.com:3000`
4. Use on any device with internet access

---

## 🔧 Configuration

### Add More Websites

Edit `server.js` and modify the `indexWebsites()` function:

```javascript
const websites = [
  'https://ph.usembassy.gov/',
  'https://www.va.gov/',
  'https://new-website.gov/'  // Add here
];
```

Then restart the server.

### Change Model

In `server.js`, update the OpenAI model:

```javascript
model: 'gpt-4'  // Change from gpt-3.5-turbo to gpt-4 (costs more, but better)
```

### Adjust Temperature (Creativity)

In `server.js`:
```javascript
temperature: 0.7  // Lower = more factual (0.0), Higher = more creative (1.0)
```

---

## 🔐 Security Considerations

⚠️ **Never commit your .env file** - it contains your API key!

For production:
- Use environment variables, not .env files
- Set API key in Docker secrets or CI/CD platform
- Use HTTPS if hosting publicly
- Add authentication if needed

---

## 💻 API Endpoints

### Query the AI
**POST** `/api/query`
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What services do they provide?",
    "website": "https://ph.usembassy.gov/"
  }'
```

### Health Check
**GET** `/api/health`
```bash
curl http://localhost:3000/api/health
```

### Get Indexed Content
**GET** `/api/content/:domain`
```bash
curl http://localhost:3000/api/content/ph.usembassy.gov
```

### Manual Rescan
**POST** `/api/rescan`
```bash
curl -X POST http://localhost:3000/api/rescan \
  -H "Content-Type: application/json" \
  -d '{"website": "https://ph.usembassy.gov/"}'
```

---

## 📊 Project Structure

```
ai-website-scanner/
├── server.js              # Express server + AI logic
├── package.json           # Dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── .env                   # API keys (keep secret!)
├── .dockerignore          # Files to exclude from Docker
└── public/
    └── index.html         # Web UI
```

---

## 🐛 Troubleshooting

### "OpenAI API key not configured"
- Add `OPENAI_API_KEY` to .env file
- Get key from: https://platform.openai.com/api-keys

### "Cannot connect to server"
- Ensure server is running: `npm start`
- Check port 3000 is not in use: `netstat -ano | findstr :3000`
- Try a different port: `PORT=3001 npm start`

### "Website indexing errors"
- Some websites block scrapers; this is normal
- The AI will still work with general knowledge
- Not all pages are indexed, but home page content is captured

### Docker container exits immediately
- Check logs: `docker logs ai-scanner`
- Verify API key is set: `docker logs -f <container-id>`

---

## 📈 Deployment Options

### 1. **Your Home Computer** (Simplest)
- Run Docker on your PC
- Keep PC on 24/7
- Access locally only or use ngrok for remote access

### 2. **VPS/Cloud Server** ($3-5/month)
- Use: DigitalOcean, Linode, or AWS
- Deploy Docker container
- Access from anywhere

### 3. **Cloud Services** ($5-15/month)
- Heroku, Railway, Render
- Automatic deployment
- Better uptime

---

## 🚀 Deployment to DigitalOcean (Example)

1. Create a Droplet (Ubuntu 24.04)
2. SSH into it
3. Install Docker:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
4. Clone your repo or copy files
5. Create .env with API key
6. Run: `docker-compose up -d`
7. Access via: `http://your-droplet-ip:3000`

---

## 📞 Support & Issues

- Check server logs: `npm start` (development) or `docker logs -f ai-scanner` (Docker)
- Verify API key is valid
- Ensure websites are accessible (test in browser)
- Check internet connection

---

## 📄 License

MIT

---

## 🎯 Next Steps

1. ✅ Get OpenAI API key
2. ✅ Update .env file
3. ✅ Run `npm start` or `docker-compose up`
4. ✅ Open http://localhost:3000
5. ✅ Ask questions!
6. ✅ Share with friends on Android

Enjoy your self-hosted AI! 🚀
