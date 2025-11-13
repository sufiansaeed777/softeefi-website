const express = require('express');
const router = express.Router();

// Use native fetch if available (Node.js 18+), otherwise use node-fetch
const fetch = globalThis.fetch || require('node-fetch');

// Check if Gemini API key is configured
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
  console.warn('⚠️  Gemini API key not configured. Add GEMINI_API_KEY to your .env file');
} else {
  console.log('✅ Gemini API configured with key:', GEMINI_API_KEY.substring(0, 10) + '...');
}

// Gemini API endpoint
router.post('/chat', async (req, res) => {
  console.log('Gemini chat endpoint called');
  try {
    const { question, service, systemPrompt } = req.body;
    console.log('Request body:', { question, service });
    
    // Use the API key from environment
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.error('Gemini API key not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'AI service not configured. Please contact support.',
        errorCode: 'API_KEY_MISSING'
      });
    }
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser Question: ${question}\n\nIMPORTANT: Follow the system prompt strictly. If the question is not related to your specific service area, you MUST redirect the user as instructed in the system prompt. Do not answer general knowledge questions.\n\nProvide a helpful, detailed response that showcases expertise while being conversational. Keep responses under 200 words unless more detail is specifically requested.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error response:', errorData);
      console.error('Response status:', response.status);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      } else if (response.status === 403) {
        throw new Error('API key invalid or disabled. Please contact support.');
      } else if (response.status === 400) {
        throw new Error('Invalid request. Please try rephrasing your question.');
      }
      
      throw new Error(`Gemini API error: ${response.status} - ${errorData.substring(0, 200)}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t generate a response. Please try again.';
    
    res.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    console.error('Full error:', error);
    
    // Determine appropriate error response
    let statusCode = 500;
    let errorMessage = 'Failed to generate response';
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error.message.includes('Rate limit')) {
      statusCode = 429;
      errorMessage = 'Too many requests. Please wait a moment and try again.';
      errorCode = 'RATE_LIMIT';
    } else if (error.message.includes('API key')) {
      statusCode = 403;
      errorMessage = 'AI service configuration error. Please contact support.';
      errorCode = 'API_KEY_ERROR';
    } else if (error.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your connection.';
      errorCode = 'NETWORK_ERROR';
    }
    
    res.status(statusCode).json({ 
      success: false, 
      error: errorMessage,
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
      errorCode: errorCode
    });
  }
});

// Occupation validation endpoint
router.post('/validate-occupation', async (req, res) => {
  try {
    const { occupation } = req.body;
    
    if (!occupation || occupation.trim().length < 2) {
      return res.json({ 
        valid: false, 
        message: 'Please enter a valid occupation.' 
      });
    }
    
    // Use the API key from environment
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.error('Gemini API key not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'AI service not configured. Please contact support.',
        errorCode: 'API_KEY_MISSING'
      });
    }
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Is "${occupation}" a valid occupation or job title? Consider common jobs, professions, roles, and legitimate employment positions. Also accept student, retired, unemployed, self-employed, freelancer etc. Respond with only "VALID" or "INVALID" followed by a brief reason if invalid.`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.1,
          maxOutputTokens: 100,
        }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (aiResponse.toUpperCase().includes('VALID') && !aiResponse.toUpperCase().includes('INVALID')) {
        res.json({ valid: true });
      } else {
        const reason = aiResponse.replace(/^INVALID:?\s*/i, '').trim();
        res.json({ 
          valid: false, 
          message: 'Our AI has detected an invalid occupation entry. Please enter a valid job title, role, or employment status (e.g., student, freelancer, engineer, etc.).' 
        });
      }
    } else {
      throw new Error('Gemini API request failed');
    }
  } catch (error) {
    console.error('Occupation validation error:', error);
    // Fallback validation
    if (occupation.length < 2 || /^[^a-zA-Z\s]+$/.test(occupation)) {
      res.json({ 
        valid: false, 
        message: 'Please enter a valid occupation using letters.' 
      });
    } else {
      res.json({ valid: true });
    }
  }
});

module.exports = router;