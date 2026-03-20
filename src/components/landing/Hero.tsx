"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, lazy } from "react";

const ParticleGlobe = lazy(() => import("./ParticleGlobe"));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-radial-hero">
      <Suspense fallback={null}>
        <ParticleGlobe />
      </Suspense>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Environmental Intelligence Platform
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-800 leading-[0.95] mb-8">
          <span className="text-foreground">AI-Powered</span><br />
          <span className="text-gradient-eco">Environmental</span><br />
          <span className="text-foreground">Intelligence</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          An AI-powered environmental engine tracking real-time air quality, historical temperature anomalies, and global water consumption to deliver actionable, localized efficiency protocols
        </motion.p>
        {/* <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1 }}>
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg glow-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(160_100%_50%/0.4)]">
            Enter Dashboard
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div> */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}