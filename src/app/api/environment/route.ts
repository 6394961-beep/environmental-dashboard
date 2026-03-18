import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '28.6139'; // Default: Delhi
  const lon = searchParams.get('lon') || '77.2090';

  const API_KEY = process.env.NEXT_PUBLIC_IQAIR_API_KEY;
  const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch environmental data' }, { status: 500 });
  }
}