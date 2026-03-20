'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Added Link import
import AirQualityCard from '../../components/AirQualityCard';
import PollutantChart from '../../components/PollutantChart';
import AICounsel from '../../components/AICounsel';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [searchInput, setSearchInput] = useState("");
  const [currentCity, setCurrentCity] = useState("Ludhiana"); 

  useEffect(() => {
    fetchData(currentCity);
  }, [currentCity]);

  async function fetchData(cityToSearch: string) {
    setLoading(true);

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityToSearch}&count=1&format=json`);
      const geoData = await geoRes.json();
      
      let lat = '30.9010'; 
      let lon = '75.8573';
      let displayName = cityToSearch;

      if (geoData.results && geoData.results.length > 0) {
        lat = geoData.results[0].latitude;
        lon = geoData.results[0].longitude;
        displayName = geoData.results[0].name; 
      }

      const res = await fetch(`/api/environment?lat=${lat}&lon=${lon}`);
      const json = await res.json();
      
      if (json.data) {
        json.data.city = displayName; 

        // 1. Fetch AI Insight BEFORE updating the UI
        let finalInsight = "AI Insights currently unavailable.";
        const aiRes = await fetch('/api/ai-coach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ aqi: json.data.current.pollution.aqius, city: displayName })
        });
        
        if (aiRes.ok) {
          const aiJson = await aiRes.json();
          finalInsight = aiJson.insight;
        }
        
        // 2. Batch all UI updates at the exact same moment
        setInsight(finalInsight);
        setData(json.data);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
    }
    setLoading(false);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentCity(searchInput);
      setSearchInput(""); 
    }
  };

  const getBgClass = (aqi: number) => {
    if (!aqi) return "from-background to-background";              
    if (aqi <= 50) return "from-emerald-950/40 to-background";       
    if (aqi <= 100) return "from-amber-950/40 to-background";        
    if (aqi <= 150) return "from-orange-950/40 to-background";       
    if (aqi <= 200) return "from-rose-950/40 to-background";         
    return "from-purple-950/40 to-background";                       
  };

  const currentAqi = loading ? 0 : (data?.current?.pollution?.aqius || 0);

  return (
    <>
      {/* Hidden divs separated to avoid Tailwind linter conflicts */}
      <div className="hidden">
        <div className="from-background to-background"></div>
        <div className="from-emerald-950/40"></div>
        <div className="from-amber-950/40"></div>
        <div className="from-orange-950/40"></div>
        <div className="from-rose-950/40"></div>
        <div className="from-purple-950/40"></div>
      </div>
      
      {/* Used bg-linear-to-b for Tailwind v4 compatibility */}
      <main className={`min-h-screen bg-background text-foreground p-6 font-body bg-linear-to-b transition-colors duration-1000 ease-in-out ${getBgClass(currentAqi)}`}>
        
        {/* UPDATED: Increased vertical spacing to space-y-12 */}
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          
          {/* Header Section Grouped Together */}
          <div className="space-y-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors inline-block font-medium">
              ← Back to Home
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 glass-surface p-6 rounded-3xl">
              <div>
                <h1 className="text-3xl font-display font-bold tracking-tight text-gradient-eco">GeoStats Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1 uppercase tracking-widest">Real-time environmental tracking</p>
              </div>
              
              <form onSubmit={handleSearch} className="flex w-full md:w-auto rounded-2xl">
                <input
                  type="text"
                  placeholder="Search any city..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="px-5 py-3 rounded-l-2xl border border-r-0 border-border bg-card/50 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all w-full md:w-64 placeholder:text-muted-foreground backdrop-blur-sm"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground font-display font-semibold rounded-r-2xl transition-all hover:bg-primary/90 glow-primary"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 font-display text-primary animate-pulse-glow text-xl tracking-wide">
              Fetching global satellite data...
            </div>
          ) : data ? (
            <>
              {/* UPDATED: Increased horizontal spacing between top cards to gap-10 */}
              <div className="grid md:grid-cols-2 gap-10">
                <AirQualityCard aqi={data.current.pollution.aqius} city={data.city} />
                <AICounsel insight={insight} />
              </div>

              <div className="glass-surface p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-default overflow-hidden relative group">
                {/* Used bg-linear-to-br for Tailwind v4 compatibility */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-glow-primary/5 to-glow-secondary/5 pointer-events-none" />
                
                <h3 className="font-display font-bold text-foreground mb-6 text-xl relative z-10">Pollutant Breakdown</h3>
                <div className="relative z-10">
                  <PollutantChart data={data.current.pollution} />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-destructive font-display text-xl font-bold drop-shadow-md">
              Failed to load data for this location.
            </div>
          )}
        </div>
      </main>
    </>
  );
}