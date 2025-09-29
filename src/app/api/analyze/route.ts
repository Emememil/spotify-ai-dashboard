import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 1. Check for the new OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

// 2. Initialize the official OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topArtists } = await request.json();

    if (!topArtists || topArtists.length === 0) {
      return NextResponse.json({ error: 'Top artists are required.' }, { status: 400 });
    }

    const artistList = topArtists.join(', ');

    const systemPrompt = `You are a cool, insightful music expert. Based on the user's top artists, write a short, sophisticated, single-paragraph analysis of their music taste.`;
    const userPrompt = `My top artists are: ${artistList}.`;

    // 3. Call the OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
      ],
      model: 'gpt-4o', // OpenAI's latest and most capable model
    });

    const analysis = chatCompletion.choices[0]?.message?.content || 'Could not generate analysis.';

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('--- CRITICAL ERROR IN OPENAI ANALYSIS API ---');
    console.error(error);
    console.error('-----------------------------------------');

    return NextResponse.json({ error: 'Failed to analyze music taste.' }, { status: 500 });
  }
}
