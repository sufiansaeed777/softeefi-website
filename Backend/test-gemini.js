require('dotenv').config();
const fetch = globalThis.fetch || require('node-fetch');

console.log('=== Gemini API Test ===\n');

// Check environment variables
console.log('1. Environment Check:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('   GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 
  `${process.env.GEMINI_API_KEY.substring(0, 10)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 4)}` : 
  'NOT SET');
console.log('   GOOGLE_AI_API_KEY:', process.env.GOOGLE_AI_API_KEY ? 
  `${process.env.GOOGLE_AI_API_KEY.substring(0, 10)}...` : 
  'NOT SET');
console.log('   PORT:', process.env.PORT || '4000');
console.log('');

// Test Gemini API directly
async function testGeminiDirect() {
  console.log('2. Testing Gemini API Directly:');
  
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
    console.log('   ❌ No Gemini API key configured!');
    console.log('   Add GEMINI_API_KEY to your .env file');
    return false;
  }
  
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  try {
    console.log('   Sending test request to Gemini...');
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Say "Hello, I am working!" in exactly 5 words.'
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 50,
        }
      }),
    });

    console.log('   Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('   ❌ Gemini API Error:');
      console.log('   Status:', response.status);
      console.log('   Error:', errorText.substring(0, 200));
      
      if (response.status === 403) {
        console.log('\n   🔧 Fix: Your API key is invalid or disabled');
        console.log('   1. Check if the key is correct in .env file');
        console.log('   2. Verify the key is enabled at: https://makersuite.google.com/app/apikey');
        console.log('   3. Check if the Gemini API is enabled for your project');
      } else if (response.status === 429) {
        console.log('\n   🔧 Fix: Rate limit exceeded');
        console.log('   1. Wait a few minutes and try again');
        console.log('   2. Check your quota at: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas');
      } else if (response.status === 400) {
        console.log('\n   🔧 Fix: Invalid request format');
      }
      
      return false;
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (aiResponse) {
      console.log('   ✅ Gemini API is working!');
      console.log('   Response:', aiResponse.substring(0, 100));
      return true;
    } else {
      console.log('   ⚠️ Unexpected response format');
      console.log('   Data:', JSON.stringify(data).substring(0, 200));
      return false;
    }
    
  } catch (error) {
    console.log('   ❌ Network/Connection Error:');
    console.log('   ', error.message);
    console.log('\n   🔧 Fix: Check your internet connection and firewall settings');
    return false;
  }
}

// Test the local endpoint
async function testLocalEndpoint() {
  console.log('\n3. Testing Local /api/gemini/chat Endpoint:');
  
  const PORT = process.env.PORT || 4000;
  const url = `http://localhost:${PORT}/api/gemini/chat`;
  
  try {
    console.log('   Sending request to:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: 'What is web development?',
        service: 'Websites & Apps',
        systemPrompt: 'You are a helpful assistant. Answer briefly.'
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('   ✅ Local endpoint is working!');
      console.log('   Response preview:', data.response.substring(0, 100) + '...');
    } else {
      console.log('   ❌ Local endpoint failed:');
      console.log('   Error:', data.error);
      console.log('   Error Code:', data.errorCode);
    }
    
  } catch (error) {
    console.log('   ❌ Could not connect to local server');
    console.log('   Make sure your server is running on port', PORT);
    console.log('   Error:', error.message);
  }
}

// Check quota and limits
async function checkQuota() {
  console.log('\n4. API Key Information:');
  
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
    console.log('   Cannot check - no API key configured');
    return;
  }
  
  // Try to get model information
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ API key is valid and active');
      console.log('   Available models:', data.models?.length || 0);
    } else {
      console.log('   ⚠️ Could not verify API key status');
    }
  } catch (error) {
    console.log('   ⚠️ Could not check API key:', error.message);
  }
}

// Run all tests
(async () => {
  const geminiWorking = await testGeminiDirect();
  await checkQuota();
  
  // Only test local endpoint if Gemini is working
  if (geminiWorking) {
    await testLocalEndpoint();
  }
  
  console.log('\n=== Test Complete ===');
  console.log('\nTroubleshooting Summary:');
  
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_AI_API_KEY) {
    console.log('❌ No API key configured');
    console.log('   1. Get a free API key from: https://makersuite.google.com/app/apikey');
    console.log('   2. Add to .env file: GEMINI_API_KEY=your-key-here');
    console.log('   3. Restart your server');
  } else if (!geminiWorking) {
    console.log('❌ Gemini API not working');
    console.log('   Check the error messages above for specific fixes');
  } else {
    console.log('✅ Gemini API is working!');
    console.log('   Make sure to deploy your .env file to production');
  }
  
  console.log('\n📚 Useful Links:');
  console.log('   Get API Key: https://makersuite.google.com/app/apikey');
  console.log('   Check Quotas: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas');
  console.log('   Documentation: https://ai.google.dev/tutorials/rest_quickstart');
  
  process.exit(0);
})();