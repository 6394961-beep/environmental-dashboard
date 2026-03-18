import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { aqi, city } = await req.json();

    // Use the version-stable model name
    // If "gemini-1.5-flash" fails, "gemini-pro" is a guaranteed fallback
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide 2 brief, actionable health tips for residents of ${city} where the AQI is ${aqi}. Use bold text for key terms.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ insight: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "AI failed to generate." }), { status: 500 });
  }
}