"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EnviroAI — Environmental Intelligence Platform</p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Contact</span>
        </div>
      </div>
    </motion.footer>
  );
}