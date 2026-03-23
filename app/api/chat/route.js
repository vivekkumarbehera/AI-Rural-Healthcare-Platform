import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

console.log('Chat API route initialized. API Key presence:', !!apiKey, 'Length:', apiKey.length, 'Prefix:', apiKey.substring(0, 5));

export async function POST(req) {
  let modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  
  try {
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const systemInstruction = `You are a helpful AI Health Assistant for rural areas.
Your goal is to provide general health information and guidance based on users' symptoms.
HOWEVER, you are NOT a doctor and must NEVER give a definitive diagnosis.
Always include a strong disclaimer that they should seek professional medical help if the condition is serious or persists.
Keep your responses compassionate, easy to understand (simple language), and structured.`;

    const model = genAI.getGenerativeModel({ model: modelName });

    // Format history for Gemini SDK
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const latestMessage = messages[messages.length - 1].content;
    
    // Inject system instruction if it's the first message or if history is empty
    const promptToSend = history.length === 0 
      ? `${systemInstruction}\n\nUser: ${latestMessage}`
      : latestMessage;

    console.log(`Starting chat with model: ${modelName}. Messages total: ${messages.length}`);
    const chat = model.startChat({ history });

    console.log('Sending message to Gemini...');
    const result = await chat.sendMessage(promptToSend);
    const response = await result.response;
    const responseText = response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error('Gemini API Error details:', error);
    if (error.status) console.error('Error Status:', error.status);
    if (error.statusText) console.error('Error Status Text:', error.statusText);
    
    // Check for specific error types to provide better feedback
    let errorMessage = 'Failed to process chat request';
    if (error.status === 403 || error.message?.toLowerCase().includes('api key')) {
      errorMessage = 'Invalid API Key. Please verify your GEMINI_API_KEY in .env.local';
    } else if (error.status === 404) {
      errorMessage = `Model "${modelName}" not found or not accessible with this API key.`;
    } else if (error.status === 503) {
      errorMessage = 'The AI service is currently overloaded. Please try again in a moment.';
    }

    return NextResponse.json({ 
      error: errorMessage,
      details: error.message || error.toString(),
      status: error.status
    }, { status: 500 });
  }
}
