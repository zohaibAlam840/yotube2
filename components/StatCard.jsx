
// File: components/StatCard.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ label, value, emoji, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`p-4 rounded-2xl bg-white/95 border border-slate-100 shadow-sm flex-1 min-w-[160px]`}
    >
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--muted)] font-medium">{label}</div>
        <div className="text-2xl">{emoji}</div>
      </div>
      <div className={`mt-3 text-2xl font-semibold ${highlight ? "text-[var(--brand-blue)]" : "text-[var(--brand-text)]"}`}>
        {value}
      </div>
    </motion.div>
  );
}

