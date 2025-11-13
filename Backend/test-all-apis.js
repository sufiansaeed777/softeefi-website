// Test all backend APIs
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:4000/api';

async function testAPIs() {
  console.log('🧪 Testing all backend APIs...\n');

  // Test 1: Contact API
  console.log('1️⃣ Testing Contact API...');
  try {
    const contactRes = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message from API test'
      })
    });
    const contactData = await contactRes.json();
    console.log('✅ Contact API:', contactRes.status === 200 ? 'Working' : 'Failed');
    console.log('   Response:', contactData);
  } catch (error) {
    console.log('❌ Contact API Error:', error.message);
  }

  // Test 2: Gemini Chat API
  console.log('\n2️⃣ Testing Gemini Chat API...');
  try {
    const geminiRes = await fetch(`${BASE_URL}/gemini/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What is cloud computing?',
        service: 'cloud',
        systemPrompt: 'You are a cloud computing expert. Answer briefly.'
      })
    });
    const geminiData = await geminiRes.json();
    console.log('✅ Gemini API:', geminiRes.status === 200 ? 'Working' : 'Failed');
    console.log('   Response:', geminiData.response ? geminiData.response.substring(0, 100) + '...' : geminiData.error);
  } catch (error) {
    console.log('❌ Gemini API Error:', error.message);
  }

  // Test 3: AI Ask API
  console.log('\n3️⃣ Testing AI Ask API...');
  try {
    const aiRes = await fetch(`${BASE_URL}/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        field: 'ai-solutions',
        question: 'How can AI help my business?'
      })
    });
    const aiData = await aiRes.json();
    console.log('✅ AI Ask API:', aiRes.status === 200 ? 'Working' : 'Failed');
    console.log('   Response:', aiData);
  } catch (error) {
    console.log('❌ AI Ask API Error:', error.message);
  }

  // Test 4: AI Fields API
  console.log('\n4️⃣ Testing AI Fields API...');
  try {
    const fieldsRes = await fetch(`${BASE_URL}/ai/fields`);
    const fieldsData = await fieldsRes.json();
    console.log('✅ AI Fields API:', fieldsRes.status === 200 ? 'Working' : 'Failed');
    console.log('   Available fields:', fieldsData.fields);
  } catch (error) {
    console.log('❌ AI Fields API Error:', error.message);
  }

  // Test 5: Free Reports Registration API
  console.log('\n5️⃣ Testing Free Reports API...');
  try {
    const reportRes = await fetch(`${BASE_URL}/free-reports/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        occupation: 'Software Developer',
        company: 'Test Company'
      })
    });
    const reportData = await reportRes.json();
    console.log('✅ Free Reports API:', reportRes.status === 200 || reportRes.status === 201 ? 'Working' : 'Failed');
    console.log('   Response:', reportData);
  } catch (error) {
    console.log('❌ Free Reports API Error:', error.message);
  }

  console.log('\n📊 API Test Complete!');
  console.log('========================');
  console.log('Note: Some APIs may require authentication or specific setup.');
  console.log('Check server logs for detailed error messages.');
}

// Run tests
testAPIs().catch(console.error);