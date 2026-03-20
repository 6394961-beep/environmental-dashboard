import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import Link from "next/link"; // Import Next.js router link

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      
      {/* --- NEW DASHBOARD NAVIGATION GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Explore the Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* AQI Link */}
          <Link href="/dashboard" className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-green-500 transition-all group">
            <h3 className="text-2xl font-bold text-green-400 mb-2 group-hover:scale-105 transition-transform">🌬️ AQI Detector</h3>
            <p className="text-gray-400">Real-time air quality tracking and localized AI health protocols.</p>
          </Link>
          
          {/* Temperature Link */}
          <Link href="/temperature" className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-red-500 transition-all group">
            <h3 className="text-2xl font-bold text-red-400 mb-2 group-hover:scale-105 transition-transform">📈 Global Temperature</h3>
            <p className="text-gray-400">Year-wise visual graphs tracking the impact of climate change.</p>
          </Link>

          {/* Water Usage Link */}
          <Link href="/water" className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all group">
            <h3 className="text-2xl font-bold text-blue-400 mb-2 group-hover:scale-105 transition-transform">💧 Water Usage</h3>
            <p className="text-gray-400">Sector-wise consumption statistics and efficiency insights.</p>
          </Link>

        </div>
      </section>
      {/* ----------------------------------- */}

      <Features />
      <Footer />
    </main>
  );
}