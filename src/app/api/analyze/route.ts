import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request: Request) {
  try {
    const { topArtists } = await request.json();

    if (!topArtists || topArtists.length === 0) {
      return NextResponse.json({ error: 'Top artists are required.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const artistList = topArtists.join(', ');

    // --- FINAL REFINED PROMPT ---
    const prompt = `
      Act as a cool, insightful music expert, like a friend who really knows their stuff.
      Analyze a user's music taste based on their top Spotify artists and write a short, sophisticated, and beautifully worded analysis.

      **Key Instructions:**
      - **Be Concise:** The entire analysis must be a single, well-structured paragraph. Keep it brief and impactful.
      - **Natural Flow:** Avoid trying too hard to sound "vocabulary proficient." Use elegant and insightful language, but make it flow naturally, like a real, confident expert would speak.
      - **Match the Mood:** Subtly adapt your word choice to the general mood of the artists. If the artists are melancholic (like Lana Del Rey), use words that reflect that introspection. If they are energetic, match that vibe.
      - **Be Specific:** Mention one or two of the key artists by name to make the analysis feel personal.
      - **The Core Task:** Identify the common thread or "sonic identity" that connects these artists.

      **User's Top Artists:** ${artistList}.

      Please provide your analysis now as a single, flowing paragraph.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('--- CRITICAL ERROR IN AI ANALYSIS API ---');
    console.error(error);
    console.error('-----------------------------------------');
    
    return NextResponse.json({ error: 'Failed to analyze music taste.' }, { status: 500 });
  }
}

