const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

function getApiKey() {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    return match ? match[1].trim() : null;
  } catch (err) {
    console.error('Error reading .env.local:', err.message);
    return null;
  }
}

async function listModels() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('API key not found');
    return;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const result = await genAI.listModels();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Full Error:', error);
    if (error.cause) console.error('Error Cause:', error.cause);
  }
}

listModels();
