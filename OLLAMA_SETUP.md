# 🚀 Ollama Setup - Free, Local AI (No Restrictions!)

## What Changed?

✅ **Switched from Groq (Cloud) to Ollama (Local)**
- Groq: Limited free tier with restrictions
- Ollama: **Completely FREE, runs on your computer, no restrictions!**

---

## ⚡ Why Ollama is Better

| Feature | Groq | Ollama |
|---------|------|--------|
| **Cost** | Free (limited) | 💰 Completely FREE |
| **Restrictions** | Yes (rate limits) | ❌ NONE |
| **Privacy** | Data sent to cloud | ✅ Stays on your computer |
| **Internet** | Required | Optional (works offline) |
| **Model** | Mixtral 8x7B | Llama 2 (or others) |
| **Control** | Limited | ✅ Full control |

---

## 📥 Install Ollama (3 Steps)

### Step 1: Download Ollama
1. Visit: **https://ollama.com**
2. Click "Download"
3. Choose your OS:
   - **Windows**: Download installer
   - **Mac**: Download DMG
   - **Linux**: Run install script

### Step 2: Install & Run
- **Windows/Mac**: Run the installer, follow prompts
- **Linux**: Follow instructions on website
- **Keep Ollama running** in the background

### Step 3: Pull a Model
Open Terminal/Command Prompt:
```bash
ollama pull llama2
```

This downloads Llama 2 model (~4GB).

---

## 🧪 Test Ollama is Working

### Test 1: Check Ollama Status
```bash
# Ollama should be running
curl http://localhost:11434/api/tags
```

Expected: Lists available models

### Test 2: Try a Query
```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama2",
    "prompt": "Hello!",
    "stream": false
  }'
```

Expected: Response from Llama 2

---

## 🚀 Start Your AI Scanner

### Option 1: Local (Easiest)

1. Make sure Ollama is running
2. Run the app:
```bash
npm start
```

3. Open: http://localhost:3000
4. Start asking questions!

### Option 2: Docker (Recommended)

```bash
docker-compose up -d
```

This starts both Ollama and your AI Scanner automatically!

---

## 📊 Available Ollama Models

You can use any of these (pull them with `ollama pull <model>`):

### Free, Open-Source Models

| Model | Size | Speed | Quality | Command |
|-------|------|-------|---------|---------|
| **llama2** | 4GB | Medium | ⭐⭐⭐⭐ | `ollama pull llama2` |
| **mistral** | 4GB | Fast | ⭐⭐⭐⭐ | `ollama pull mistral` |
| **neural-chat** | 4GB | Fast | ⭐⭐⭐⭐ | `ollama pull neural-chat` |
| **llama2-uncensored** | 4GB | Medium | ⭐⭐⭐⭐ | `ollama pull llama2-uncensored` |
| **orca-mini** | 2.5GB | Very Fast | ⭐⭐⭐ | `ollama pull orca-mini` |

### To Use a Different Model

Edit `.env`:
```env
OLLAMA_MODEL=mistral
```

Then restart your app.

---

## ⚙️ Configuration

### .env File

```env
OLLAMA_API=http://localhost:11434    # Ollama server location
OLLAMA_MODEL=llama2                  # Which model to use
PORT=3000                            # App port
NODE_ENV=development                 # Development/production
```

### Change Model Speed/Quality

**Faster:** Use `mistral` or `orca-mini`
```env
OLLAMA_MODEL=mistral
```

**Better Quality:** Use `llama2` or `neural-chat`
```env
OLLAMA_MODEL=llama2
```

**Most Capable:** Use larger models
```bash
ollama pull llama2:13b    # Bigger, slower, better
```

---

## 🐳 Docker Setup (All-in-One)

### Start Everything
```bash
docker-compose up -d
```

This:
1. Starts Ollama container
2. Downloads model if needed
3. Starts your AI Scanner
4. Opens on port 3000

### Check Status
```bash
docker-compose logs
```

### Stop Everything
```bash
docker-compose down
```

---

## 🧪 Test Your Setup

### Health Check
```bash
curl http://localhost:3000/api/health
```

Should show:
```json
{
  "status": "ok",
  "ollamaConnected": true,
  "model": "llama2",
  "type": "Ollama (Free, Local, No Restrictions)"
}
```

### Ask a Question
Open http://localhost:3000 and ask:
- "What is the US Embassy?"
- "How do I apply for a visa?"
- "Tell me about government services"

---

## ⚠️ Troubleshooting

### "Cannot connect to Ollama"
**Solution:** Make sure Ollama is running
```bash
ollama serve
```

### "Model not found"
**Solution:** Pull the model first
```bash
ollama pull llama2
```

### "Response is slow"
**Reasons:**
- First response is always slow (model loading)
- Smaller model (use `mistral`)
- Need more RAM
- Model still downloading

### "Out of memory"
**Solutions:**
- Close other apps
- Use smaller model: `orca-mini`
- Or upgrade your RAM

### Can't find Ollama in PATH
**Windows:** Restart your Terminal or Computer
**Mac/Linux:** Make sure Ollama installed correctly

---

## 🎯 Next Steps

1. ✅ Download Ollama from https://ollama.com
2. ✅ Install and run Ollama
3. ✅ Pull a model: `ollama pull llama2`
4. ✅ Run your AI: `npm start`
5. ✅ Open http://localhost:3000
6. ✅ Start asking questions!

---

## 🔐 Benefits of Local AI

✅ **Privacy**: Data stays on your computer  
✅ **Cost**: Completely FREE  
✅ **Speed**: Ultra-fast local processing  
✅ **Offline**: Works without internet (after model downloaded)  
✅ **Control**: Your computer, your rules  
✅ **No Restrictions**: Use it however you want  
✅ **No API Limits**: Unlimited questions  

---

## 💡 Pro Tips

💡 First response takes time (model loading) - subsequent responses are faster  
💡 Mistral is faster but less capable than Llama2  
💡 Larger models (13B) are slower but more accurate  
💡 Keep Ollama running in background for quick access  
💡 Models cache after first load  
💡 You can run multiple models simultaneously  

---

## 📚 Learn More

- **Ollama Official**: https://ollama.com
- **Ollama GitHub**: https://github.com/ollama/ollama
- **Available Models**: https://ollama.com/library

---

**Your AI is now completely FREE, running locally, with ZERO restrictions!** 🎉

No API keys. No rate limits. No fees. Just pure AI power! 🚀
