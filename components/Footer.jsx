
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 mt-12 bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[var(--muted)]">© {new Date().getFullYear()} AleeAdee — built with ❤️</div>
        <div className="flex items-center gap-4">
          <a href="/about" className="text-sm hover:underline">About</a>
          <a href="/contact" className="text-sm hover:underline">Contact</a>
          <a href="https://github.com/" className="text-sm hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

