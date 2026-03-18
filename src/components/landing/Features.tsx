"use client";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Activity, BrainCircuit, BarChart3 } from "lucide-react";

const features = [
  { icon: <Activity size={28} />, title: "Real-time AQI Tracking", description: "Monitor air quality indices across thousands of global stations with sub-second latency and predictive trend modeling." },
  { icon: <BrainCircuit size={28} />, title: "AI Environmental Coach", description: "Receive personalized health recommendations powered by deep learning models that adapt to your local environmental conditions." },
  { icon: <BarChart3 size={28} />, title: "Deep Pollutant Analytics", description: "Drill into PM2.5, NO₂, O₃, and VOC datasets with advanced visualizations and correlation analysis across time and geography." },
];

export default function Features() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-4">Core Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-foreground">Intelligence at Every Layer</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (<FeatureCard key={f.title} {...f} index={i} />))}
        </div>
      </div>
    </section>
  );
}