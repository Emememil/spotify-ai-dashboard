import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topArtists } = await request.json();

    if (!topArtists || topArtists.length === 0) {
      return NextResponse.json({ error: 'Top artists are required.' }, { status: 400 });
    }
    
    const artistList = topArtists.join(', ');

    const prompt = `
      Act as a cool, insightful music expert, like a friend who really knows their stuff.
      Analyze a user's music taste based on their top Spotify artists and write a short, sophisticated, and beautifully worded analysis.
      **Key Instructions:**
      - **Be Concise:** The entire analysis must be a single, well-structured paragraph.
      - **Natural Flow:** Use elegant and insightful language, but make it flow naturally.
      - **Match the Mood:** Subtly adapt your word choice to the general mood of the artists.
      - **Be Specific:** Mention one or two of the key artists by name.
      - **The Core Task:** Identify the common thread or "sonic identity" that connects these artists.
      **User's Top Artists:** ${artistList}.
      Please provide your analysis now as a single, flowing paragraph.
    `;
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
    });

    const analysis = chatCompletion.choices[0]?.message?.content || 'Could not generate analysis.';

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('--- CRITICAL ERROR IN GROQ ANALYSIS API ---');
    console.error(error);
    console.error('-----------------------------------------');
    
    return NextResponse.json({ error: 'Failed to analyze music taste.' }, { status: 500 });
  }
}
