export async function POST(req: Request) {
  try {
    const { year, anomaly } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing.");
      return new Response(JSON.stringify({ error: "Configuration Error" }), { status: 500 });
    }

    const prompt = `The global temperature anomaly for the year ${year} was ${anomaly}°C above the 20th-century average. Provide 2 brief, alarming but actionable insights on the global impact of this specific temperature rise. Use bold text for key terms.`;

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