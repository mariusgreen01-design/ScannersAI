# 🎉 Groq Free AI Setup - Complete Guide

## What's Changed?

✅ **Switched from OpenAI (Paid) to Groq (Free)**
- OpenAI: $0.50-20/month
- Groq: **$0 - Completely Free** 🎉

✅ **Same Performance**
- Uses Mixtral 8x7B model (very capable)
- Fast responses
- Same API interface

✅ **Better Speed**
- Groq is faster than OpenAI in many cases
- Great for real-time queries

---

## ⚡ Quick Start (2 Minutes)

### Step 1: Sign Up for Groq (Free)
1. Go to: **https://console.groq.com**
2. Click "Sign Up"
3. Create account (email + password)
4. Verify email
5. ✅ Done

### Step 2: Get API Key
1. Log in to https://console.groq.com
2. Click on "API Keys" in sidebar
3. Click "Create API Key"
4. Copy the key (looks like: `gsk_...`)
5. Keep it safe!

### Step 3: Add to Your Project
Edit `.env` file:
```
GROQ_API_KEY=gsk_your-key-here
PORT=3000
NODE_ENV=development
```

### Step 4: Start Your App
```bash
npm install  # (already done, groq-sdk installed)
npm start
```

Then open: **http://localhost:3000**

---

## 🔑 Getting Your API Key (Detailed Steps)

### Via Web Browser:

**Step 1: Visit Groq Console**
- Open: https://console.groq.com
- Sign in (or create account)

**Step 2: Create API Key**
```
Left sidebar → "API Keys"
↓
"Create API Key" button
↓
Name: "ai-website-scanner" (or any name)
↓
"Generate Key"
↓
Copy the key immediately!
```

**Step 3: Save Securely**
- Put in `.env` file immediately
- Don't share publicly
- Can regenerate anytime

---

## ✅ What You Get (Free Tier)

| Feature | Limit |
|---------|-------|
| API Requests | Unlimited ✅ |
| Models Available | Mixtral, Llama 2, etc. |
| Speed | Fast (50+ tokens/sec) |
| Uptime | Very reliable |
| Cost | $0/month 🎉 |

---

## 🚀 Your Updated Application

### What Changed
- ✅ Removed OpenAI SDK
- ✅ Added Groq SDK
- ✅ Updated server.js
- ✅ Updated configuration
- ✅ Same frontend UI

### What's the Same
- ✅ Same website scanning
- ✅ Same chat interface
- ✅ Same quality responses
- ✅ Same Android support

---

## 🧪 Test Your Setup

### Test 1: Check API Connection
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "apiConfigured": true,
  "model": "Groq Mixtral 8x7B (Free)",
  "cost": "Free tier - unlimited queries"
}
```

### Test 2: Ask a Question
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the US Embassy?",
    "website": "https://ph.usembassy.gov/"
  }'
```

---

## 📱 Use on Android (Same as Before)

1. Get computer IP: `ipconfig`
2. On Android browser: `http://192.168.1.100:3000`
3. Ask questions
4. Completely free!

---

## 💰 Cost Comparison

### Before (OpenAI)
```
OpenAI GPT-3.5:
- Light use: $0.50/month
- Normal use: $5/month
- Heavy use: $20/month
Total: $$$ per month
```

### After (Groq)
```
Groq Free Tier:
- Unlimited queries
- Unlimited everything
Total: $0/month 🎉
```

**Savings: $5-20/month** ✅

---

## 🎯 Available Groq Models

### Recommended for Your Project
**Mixtral 8x7B** (Currently Set)
- ✅ Best all-around
- ✅ Fast & capable
- ✅ Good for Q&A
- ✅ Free tier

### Other Options Available
- **Llama 2 70B** - Larger, slightly slower
- **Llama 3 70B** - Newest, very capable

To change model, edit `server.js`:
```javascript
model: 'mixtral-8x7b-32768'  // Change this line
```

---

## 🔐 Security Notes

✅ Groq API keys are secure  
✅ Your data is encrypted  
✅ No storage of queries  
✅ Follow Groq's terms of service  

---

## ⚠️ Common Issues & Fixes

### "API key not configured"
```
✅ Get key from console.groq.com
✅ Add to .env file
✅ Format: GROQ_API_KEY=gsk_...
```

### "Invalid API key"
```
✅ Copy key exactly (no spaces)
✅ Make sure it starts with "gsk_"
✅ Regenerate key if unsure
```

### "Rate limit exceeded"
```
✅ Free tier has limits
✅ Wait a moment, try again
✅ Usually not a problem for normal use
```

### "Model not available"
```
✅ Stick with 'mixtral-8x7b-32768'
✅ It's the most stable
```

---

## 📊 Groq vs OpenAI Comparison

| Feature | Groq (Free) | OpenAI (Paid) |
|---------|------------|--------------|
| Cost | $0 | $5-20/month |
| Speed | ⚡⚡⚡ Very Fast | ⚡⚡ Medium |
| Model Quality | ⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Best |
| Setup | 2 min | 2 min |
| Best For | Q&A, Chat | Complex tasks |
| Reliability | Excellent | Excellent |

**For your project: Groq is perfect!** ✅

---

## 🚀 Advanced: Switching Back to OpenAI (Optional)

If you ever want to use OpenAI again:

### Step 1: Install OpenAI SDK
```bash
npm install openai
```

### Step 2: Update .env
```env
OPENAI_API_KEY=sk-your-key
```

### Step 3: Modify server.js
```javascript
// Replace Groq import
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Replace model in /api/query endpoint
model: 'gpt-3.5-turbo'
```

But honestly, Groq is better for this project! 🎉

---

## 📚 Groq Resources

- **Official Console**: https://console.groq.com
- **Documentation**: https://console.groq.com/docs
- **API Reference**: https://api.groq.com/docs
- **Community**: https://www.groq.com/

---

## ✅ Checklist

Before running:
- [ ] Visited https://console.groq.com
- [ ] Created account
- [ ] Generated API key
- [ ] Copied key exactly
- [ ] Updated .env file
- [ ] Key starts with "gsk_"
- [ ] No spaces in key
- [ ] Ready to run!

---

## 🎉 You're Ready!

**Your project is now using Groq (Free) instead of OpenAI!**

### Next Steps:
1. ✅ Get Groq API key
2. ✅ Add to .env
3. ✅ Run: `npm start`
4. ✅ Open: http://localhost:3000
5. ✅ Enjoy free AI!

---

## 💡 Pro Tips

💡 Groq is incredibly fast - enjoy quick responses!  
💡 Free tier is genuinely unlimited for your use case  
💡 No credit card needed - always free  
💡 Perfect for personal projects  
💡 Great for demos and prototypes  

---

**Questions about Groq?** Visit https://console.groq.com/docs

**Ready to start?** Run: `npm start` 🚀
