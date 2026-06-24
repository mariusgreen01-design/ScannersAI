const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ollama API endpoint (local)
const OLLAMA_API = process.env.OLLAMA_API || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama2';

// Middleware
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// In-memory storage for scraped content
let scrapedContent = {
  'ph.usembassy.gov': [],
  'va.gov': []
};

// Function to scrape website content
async function scrapeWebsite(url) {
  try {
    console.log(`Scraping: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000,
      maxHeaderSize: 16 * 1024 * 1024
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract main content
    const content = {
      url: url,
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content') || '',
      headings: [],
      paragraphs: [],
      links: []
    };
    
    // Extract headings
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
      const text = $(el).text().trim();
      if (text) content.headings.push(text);
    });
    
    // Extract paragraphs
    $('p').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 20) {
        content.paragraphs.push(text.substring(0, 500)); // Limit paragraph size
      }
    });
    
    // Extract important links
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (text && href && !href.startsWith('#')) {
        content.links.push({ text, href });
      }
    });
    
    return content;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return { url, error: error.message };
  }
}

// Function to index websites on startup
async function indexWebsites() {
  const websites = [
    'https://ph.usembassy.gov/',
    'https://www.va.gov/'
  ];
  
  console.log('Starting website indexing...');
  
  for (const website of websites) {
    const domain = new URL(website).hostname;
    console.log(`Indexing ${domain}...`);
    
    const content = await scrapeWebsite(website);
    scrapedContent[domain] = [content];
  }
  
  console.log('Website indexing completed');
}

// Check if Ollama is running
async function checkOllamaConnection() {
  try {
    const response = await axios.get(`${OLLAMA_API}/api/tags`, { timeout: 3000 });
    return true;
  } catch (error) {
    return false;
  }
}

// API endpoint to query the AI with website context
app.post('/api/query', async (req, res) => {
  try {
    const { question, website } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Check Ollama connection
    const ollamaConnected = await checkOllamaConnection();
    if (!ollamaConnected) {
      return res.status(503).json({ 
        error: 'Ollama is not running',
        solution: 'Start Ollama first:',
        steps: [
          '1. Download Ollama from https://ollama.com',
          '2. Install and run Ollama',
          '3. Pull a model: ollama pull llama2',
          '4. Or use Docker: docker run -p 11434:11434 ollama/ollama',
          '5. Then retry your question'
        ]
      });
    }
    
    // Get relevant content from scraped data
    let context = '';
    
    if (website) {
      try {
        const domain = new URL(website).hostname;
        if (scrapedContent[domain] && scrapedContent[domain].length > 0) {
          const content = scrapedContent[domain][0];
          // Safely access array elements
          const headings = (content.headings || []).slice(0, 5).join('\n');
          const paragraphs = (content.paragraphs || []).slice(0, 3).join('\n\n');
          
          context = `
Website: ${content.title || domain}
Description: ${content.description || ''}

Key Information:
${headings}

Content:
${paragraphs}
`;
        }
      } catch (e) {
        console.warn('Error building context:', e.message);
      }
    }
    
    // Build the prompt
    const systemPrompt = `You are a helpful AI assistant for US Government websites.
You have been provided with information from official US Government websites.
Answer questions based on the provided content and your knowledge.
Be accurate and cite information when relevant.
${context ? `\n\nContext from website:\n${context}` : ''}`;

    const fullPrompt = `${systemPrompt}\n\nUser question: ${question}`;
    
    console.log(`Querying Ollama (${MODEL}) for: ${question.substring(0, 50)}...`);
    
    // Query Ollama
    const response = await axios.post(
      `${OLLAMA_API}/api/generate`,
      {
        model: MODEL,
        prompt: fullPrompt,
        stream: false,
        temperature: 0.7
      },
      { timeout: 120000 } // 2 minute timeout for local model
    );
    
    res.json({
      question,
      answer: response.data.response || 'No response from model',
      context: context ? 'Website context included' : 'General knowledge',
      model: `Ollama ${MODEL.toUpperCase()} (Free, Local)`
    });
  } catch (error) {
    console.error('Query error:', error.message);
    
    if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
      return res.status(503).json({ 
        error: 'Cannot connect to Ollama',
        message: 'Ollama service is not running',
        solution: 'Start Ollama:',
        steps: [
          '1. Install Ollama from https://ollama.com',
          '2. Run: ollama pull llama2',
          '3. Run: ollama serve',
          '4. Keep terminal open',
          '5. Retry your question'
        ]
      });
    }
    
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// API endpoint to get indexed content
app.get('/api/content/:domain', (req, res) => {
  const domain = req.params.domain;
  if (scrapedContent[domain] && scrapedContent[domain].length > 0) {
    res.json(scrapedContent[domain]);
  } else {
    res.status(404).json({ error: 'Domain not found' });
  }
});

// API endpoint to manually rescan a website
app.post('/api/rescan', async (req, res) => {
  try {
    const { website } = req.body;
    if (!website) {
      return res.status(400).json({ error: 'Website URL is required' });
    }
    
    const domain = new URL(website).hostname;
    const content = await scrapeWebsite(website);
    scrapedContent[domain] = [content];
    
    res.json({ message: 'Rescan completed', content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const ollamaConnected = await checkOllamaConnection();
  
  res.json({ 
    status: 'ok', 
    ollamaConnected: ollamaConnected,
    model: MODEL,
    ollamaUrl: OLLAMA_API,
    type: 'Ollama (Free, Local, No Restrictions)',
    cost: 'Free - runs locally',
    warning: !ollamaConnected ? 'Ollama is not running. Start it first!' : null
  });
});

// Serve static files (frontend)
app.use(express.static('public'));

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 AI Model: Ollama ${MODEL.toUpperCase()}`);
  console.log(`💰 Cost: Completely FREE - runs locally on your computer`);
  console.log(`🔓 Restrictions: NONE - full control`);
  
  const ollamaConnected = await checkOllamaConnection();
  
  if (ollamaConnected) {
    console.log(`\n✅ Ollama connected at ${OLLAMA_API}`);
    await indexWebsites();
  } else {
    console.log(`\n⚠️  OLLAMA NOT RUNNING!`);
    console.log(`\n📥 To get started:`);
    console.log(`1. Download Ollama from https://ollama.com`);
    console.log(`2. Install and run Ollama`);
    console.log(`3. Download a model: ollama pull llama2`);
    console.log(`4. Keep Ollama running in the background`);
    console.log(`5. Come back here and try your question\n`);
  }
});

module.exports = server;
