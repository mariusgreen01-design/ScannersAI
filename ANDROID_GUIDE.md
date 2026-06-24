# 📱 Using AI Website Scanner on Android

## Quick Start (5 Minutes)

### On Your Computer:
1. Open Command Prompt / Terminal in the project folder
2. Run: `npm start` (or `docker-compose up`)
3. Wait for: "Server running on http://localhost:3000"

### On Your Android Phone:

#### Step 1: Get Your Computer's IP Address

**Windows:**
```
Open Command Prompt
Type: ipconfig
Look for "IPv4 Address" under your WiFi connection
Example: 192.168.1.100
```

**Mac/Linux:**
```
Open Terminal
Type: ifconfig
Look for "inet" address under your network
Example: 192.168.1.100
```

#### Step 2: Open Browser on Android

1. Make sure your phone is on the **same WiFi** as your computer
2. Open Chrome, Firefox, or any browser
3. Type in address bar: `http://192.168.1.100:3000`
   - Replace `192.168.1.100` with your actual IP
4. Press Enter

#### Step 3: Use the App

✅ Ask questions about:
- US Embassy Philippines services
- VA.gov information
- Any content indexed from those sites

💾 **Bookmark for easy access:**
- Tap the menu (three dots)
- Select "Add to Home screen"
- Access directly from home screen

---

## Troubleshooting on Android

### "Can't reach server"
1. ✅ Make sure phone and computer are on same WiFi
2. ✅ Get correct IP from `ipconfig` command
3. ✅ Computer firewall isn't blocking port 3000
4. ✅ Server is actually running (`npm start`)

### "Connection refused"
- Computer IP might be wrong
- Try: `ping 192.168.1.100` on your computer to verify IP
- Server might not be running - check terminal for "Server running..."

### "Page keeps loading"
- Check if your OpenAI API key is set in `.env`
- Look at console (computer terminal) for errors
- Try a simple question first

### "Page looks weird"
- Refresh the browser (pull down from top)
- Clear browser cache: Settings > Apps > [Your Browser] > Storage > Clear cache
- Use Chrome for best compatibility

---

## Using on Public WiFi / Remote Access

If you want to use on Android from outside your home network:

### Option 1: Use ngrok (Free & Easy)

1. Download ngrok from https://ngrok.com
2. Run: `ngrok http 3000`
3. Copy the URL it gives you (looks like: `https://random-string.ngrok.io`)
4. Use that URL on Android instead of `http://192.168.1.100:3000`

### Option 2: Deploy to Cloud Server

See SETUP.md for deployment options to:
- DigitalOcean
- Railway.app
- AWS

---

## Performance Tips for Android

1. **Close other apps** - Save battery & RAM
2. **Use WiFi not cellular** - Faster & more reliable
3. **Bookmark the page** - Quick access
4. **Refresh if slow** - Sometimes helps

---

## Data Usage

- Each question: ~50-100 KB
- Initial load: ~50 KB
- Chat history: Stored locally (no upload)

---

## Offline Limitations

⚠️ The app requires internet because:
- Queries go to OpenAI API
- Websites are scanned in real-time

You **cannot** use it offline, but:
- Cached content loads faster
- Website data is stored on your server

---

## Multi-Device Setup

Multiple people on the same network can use it:

1. Server runs on Computer A
2. Computer B: Open `http://A-IP:3000`
3. Android Phone: Open `http://A-IP:3000`
4. iPhone/iPad: Open `http://A-IP:3000`
5. etc.

Everyone connects to the same server! ✅

---

## Accessing From Away From Home

### Temporary:
Use **ngrok** (see above)

### Permanent:
Deploy to cloud (see SETUP.md):
1. Rent a $5 VPS
2. Deploy Docker container
3. Access from anywhere

Example URL: `http://my-ai-scanner.com:3000`

---

## Battery & Data Saving

### Battery Tips:
- Use WiFi charging while testing
- Close other apps
- Reduce screen brightness
- Use built-in battery saver mode

### Data Tips:
- Reuse indexed content (don't ask same questions)
- Ask long questions (use up your API credits efficiently)
- Avoid rapid-fire questions

---

## FAQ

**Q: Does it work on iPad/iPhone?**
A: Yes! Same URL: `http://192.168.1.100:3000`

**Q: Can others see my conversations?**
A: No, history is on the device only. But server owner can see queries.

**Q: Is my data safe?**
A: Questions go to OpenAI. Don't ask sensitive info.

**Q: Can I disable the website?**
A: Edit server.js and remove the website from indexing.

**Q: How do I close the app?**
A: Browser close or navigate away. No persistent background service.

---

## Advanced: Custom Websites

Want to add more websites? Edit `server.js` and add URLs to:

```javascript
const websites = [
  'https://ph.usembassy.gov/',
  'https://www.va.gov/',
  'https://your-site.gov/'  // Add here
];
```

Restart server, then use on Android! 🚀

---

Enjoy your AI assistant! 📱✨
