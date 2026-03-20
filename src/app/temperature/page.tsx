"use client";
import { useState } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { nasaTemperatureData } from "../../lib/data";

// Clean the raw data to only include rows with actual numbers
const validTempData = nasaTemperatureData.filter(d => 
  typeof d["GLB.Ts+dSST"] === 'number' && typeof d["Column2"] === 'number'
);

export default function TemperaturePage() {
  const [selectedYearObj, setSelectedYearObj] = useState(validTempData[validTempData.length - 1]);
  const [insight, setInsight] = useState("Select a year to see AI insights.");
  const [loading, setLoading] = useState(false);

  const fetchTemperatureInsights = async () => {
    setLoading(true);
    setInsight(`Analyzing ${selectedYearObj["GLB.Ts+dSST"]} climate data...`);
    try {
      const res = await fetch("/api/temperature-coach", {
        method: "POST",
        body: JSON.stringify({ 
          year: selectedYearObj["GLB.Ts+dSST"].toString(), 
          anomaly: selectedYearObj["Column2"].toString() 
        }),
      });
      const data = await res.json();
      setInsight(data.insight || data.error);
    } catch (err) {
      setInsight("Failed to fetch insights.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <Link href="/" className="text-gray-400 hover:text-white mb-6 inline-block">← Back to Home</Link>
      <h1 className="text-4xl font-bold text-red-500 mb-2">Global Temperature Rise</h1>
      <p className="text-gray-400 mb-6">Data Source: NASA Goddard Institute for Space Studies</p>
      
      <div className="h-80 bg-gray-900 border border-gray-800 rounded-xl mb-6 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={validTempData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="GLB.Ts+dSST" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
            {/* Added name="Anomaly" below to fix the hover tooltip! */}
            <Line 
              type="monotone" 
              dataKey="Column2" 
              name="Anomaly" 
              stroke="#ef4444" 
              strokeWidth={3} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select 
          className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-red-500"
          value={selectedYearObj["GLB.Ts+dSST"]}
          onChange={(e) => {
            const dataPoint = validTempData.find(d => d["GLB.Ts+dSST"].toString() === e.target.value);
            if (dataPoint) setSelectedYearObj(dataPoint);
          }}
        >
          {validTempData.map((data) => (
            <option key={data["GLB.Ts+dSST"]} value={data["GLB.Ts+dSST"]}>
              {data["GLB.Ts+dSST"]} ({data["Column2"]}°C)
            </option>
          ))}
        </select>

        <button 
          onClick={fetchTemperatureInsights}
          disabled={loading}
          className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          Analyze {selectedYearObj["GLB.Ts+dSST"]} Data
        </button>
      </div>

      <div className="p-6 bg-red-950/30 border border-red-500/30 rounded-xl">
        {/* Updated the title below to match your request! */}
        <h3 className="font-bold text-red-400 mb-2">✨ Climate Analysis</h3>
        <p className="whitespace-pre-line leading-relaxed">{insight}</p>
      </div>
    </div>
  );
}