'use client';
import { getAQIStatus } from "../lib/utils";
import Tilt from 'react-parallax-tilt';
import CountUp from 'react-countup';

export default function AirQualityCard({ aqi, city }: { aqi: number, city: string }) {
  const status = getAQIStatus(aqi);

  const gradientMap: Record<string, string> = {
    "bg-green-500": "from-emerald-400 to-green-600",
    "bg-yellow-400": "from-amber-300 to-yellow-500",
    "bg-orange-500": "from-orange-400 to-red-500",
    "bg-red-600": "from-red-600 to-rose-900",
  };

  const gradient = gradientMap[status.color] || "from-gray-400 to-gray-600";

  return (
    <Tilt 
      glareEnable={true} 
      glareMaxOpacity={0.3} 
      glareColor="#ffffff" 
      glarePosition="all" 
      scale={1.02} 
      transitionSpeed={1000} 
      className="h-full"
    >
      <div className={`h-full p-8 rounded-3xl shadow-lg text-white bg-linear-to-br ${gradient} border border-white/20 flex flex-col justify-between`}>
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{city}</h3>
          <p className="text-sm opacity-90 font-medium mb-6">Current Air Quality Index</p>
        </div>
        
        <div>
          <div className="text-8xl font-black drop-shadow-md mb-2">
            {/* The CountUp component makes the number tick up smoothly */}
            <CountUp end={aqi} duration={2.5} preserveValue={true} />
          </div>
          <p className="font-bold uppercase tracking-widest text-sm opacity-90 border-t border-white/20 pt-4 mt-4">
            {status.label}
          </p>
        </div>
      </div>
    </Tilt>
  );
}