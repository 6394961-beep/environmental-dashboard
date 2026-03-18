export async function POST(req: Request) {
  try {
    const { aqi, city } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Fail securely if the key is missing
    if (!apiKey) {
      console.error("API Key is missing from Vercel environment.");
      return new Response(JSON.stringify({ error: "Configuration Error" }), { status: 500 });
    }

    const prompt = `Provide 2 brief, actionable health tips for residents of ${city} where the AQI is ${aqi}. Use bold text for key terms.`;

    // 2. Direct REST API URL (Bypasses the buggy SDK entirely)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    // 3. Make a native web request straight to Google
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    // 4. Catch and log exact Google Server errors
    if (!response.ok) {
      console.error("Direct Google API Error:", data);
      return new Response(JSON.stringify({ error: "Google API rejected the request." }), { status: response.status });
    }

    // 5. Extract the AI text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights generated.";

    return new Response(JSON.stringify({ insight: text }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Server Fetch Error:", error);
    return new Response(JSON.stringify({ error: "Failed to connect to AI" }), { status: 500 });
  }
}