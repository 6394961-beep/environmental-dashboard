export async function POST(req: Request) {
  try {
    const { sector, percentage, location } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing.");
      return new Response(JSON.stringify({ error: "Configuration Error" }), { status: 500 });
    }

    const prompt = `In ${location}, the ${sector} sector currently accounts for ${percentage}% of total water usage. Provide 2 brief insights explaining why this specific sector consumes so much in this specific region, and suggest one modern efficiency method to reduce it. Use bold text for key terms.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "AI rejected the request." }), { status: response.status });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights generated.";

    return new Response(JSON.stringify({ insight: text }), { headers: { "Content-Type": "application/json" } });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to connect to AI" }), { status: 500 });
  }
}