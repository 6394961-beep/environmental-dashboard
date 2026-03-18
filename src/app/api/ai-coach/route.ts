import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { aqi, city } = await req.json();
    
    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ insight: "AI Insights unavailable: Missing API Key." }, { status: 200 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `The current AQI in ${city} is ${aqi}. Give 2 brief health tips.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ insight: response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ insight: "Could not generate AI tips at this moment." }, { status: 200 });
  }
}