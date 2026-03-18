import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  // ✅ Check the key FIRST, before initializing anything
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("FATAL: GEMINI_API_KEY environment variable is not set.");
    return new Response(
      JSON.stringify({ error: "Server configuration error: API key missing." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // ✅ Initialize the client inside the handler, after validation
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const { aqi, city } = await req.json();

    if (!aqi || !city) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: aqi and city." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Use the stable, universally available model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `Provide 2 brief, actionable health tips for residents of ${city} where the AQI is ${aqi}. Use bold text for key terms.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ insight: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    // ✅ Log the FULL error object so Vercel shows you the real message
    console.error("Gemini API Error — Full details:", JSON.stringify(error, null, 2));

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return new Response(
      JSON.stringify({ error: "Failed to generate tips.", detail: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}