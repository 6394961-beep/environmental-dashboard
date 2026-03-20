"use client";
import { useState } from "react";
import Link from "next/link";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { countryWaterData } from "../../lib/data";

export default function WaterPage() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [insight, setInsight] = useState("Click a sector below to generate efficiency insights.");
  const [loading, setLoading] = useState(false);

  // Safely grab the data using your newly exported format
  const currentData = countryWaterData[selectedCountry] || countryWaterData["World"] || [];
  const countryList = Object.keys(countryWaterData).sort();

  const fetchWaterInsights = async (sector: string, percentage: string) => {
    setLoading(true);
    setInsight(`Analyzing ${sector} sector usage in ${selectedCountry}...`);
    try {
      const res = await fetch("/api/water-coach", {
        method: "POST",
        body: JSON.stringify({ 
          sector: sector, 
          percentage: percentage,
          location: selectedCountry 
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
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-500 mb-2">Global Water Usage</h1>
          {/* <p className="text-gray-400">Data Source: UN FAO AQUASTAT (2022)</p> */}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-1">Select Region / Country</label>
          <select 
            className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-blue-500 w-full md:w-64 font-semibold cursor-pointer"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setInsight(`Switched to ${e.target.value}. Click a sector below to analyze.`);
            }}
          >
            {countryList.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-80 bg-gray-900 border border-gray-800 rounded-xl mb-6 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} 
              formatter={(value) => `${value}%`}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {currentData.map((sector) => (
          <button 
            key={sector.name}
            onClick={() => fetchWaterInsights(sector.name, sector.value.toString())} 
            disabled={loading} 
            className="bg-gray-800 border border-gray-700 hover:border-blue-500 hover:text-blue-400 px-6 py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {sector.name} ({sector.value}%)
          </button>
        ))}
      </div>

      <div className="p-6 bg-blue-950/30 border border-blue-500/30 rounded-xl">
        <h3 className="font-bold text-blue-400 mb-2">✨ Efficiency Protocol</h3>
        <p className="whitespace-pre-line leading-relaxed">{insight}</p>
      </div>
    </div>
  );
}