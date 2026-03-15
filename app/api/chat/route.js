import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are a helpful AI Health Assistant for rural areas.
Your goal is to provide general health information and guidance based on users' symptoms.
HOWEVER, you are NOT a doctor and must NEVER give a definitive diagnosis.
Always include a strong disclaimer that they should seek professional medical help if the condition is serious or persists.
Keep your responses compassionate, easy to understand (simple language), and structured.`;

    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    // Add the system prompt context to the latest message if it's the first one
    let latestMessage = messages[messages.length - 1].content;
    if (messages.length === 1) {
      latestMessage = `${systemPrompt}\n\nUser query: ${latestMessage}`;
    }

    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
