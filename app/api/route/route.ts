import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error('No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const apiKey = process.env.DEEPGRAM_API_KEY;
    if (!apiKey) {
      console.error('Missing Deepgram API key');
      return NextResponse.json({ error: 'Missing Deepgram API key' }, { status: 500 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create Deepgram client with the current SDK
    const deepgram = createClient(apiKey);

    // Use the current SDK method structure
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-2',
        punctuate: true,
        diarize: false,
        smart_format: true,
        mimetype: file.type || 'audio/wav'
      }
    );

    if (error) {
      console.error('Deepgram API error:', error);
      return NextResponse.json(
        { error: 'Transcription failed', details: error.message },
        { status: 500 }
      );
    }

    // Extract transcript from the response
    const transcript = result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

    if (!transcript) {
      console.log('No transcript found in response');
      return NextResponse.json({ error: 'No transcript generated' }, { status: 400 });
    }

    return NextResponse.json({ transcript });

  } catch (e: any) {
    console.error('Transcription failed:', e);
    return NextResponse.json(
      { error: 'Transcription failed', details: e.message },
      { status: 500 }
    );
  }
}