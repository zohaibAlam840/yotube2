

// File: app/about/page.js
import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--brand-text)] p-6" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      <NavBar />
      <main className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold">About AleeAdee Dashboard</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">This demo shows a small dashboard that aggregates basic YouTube channel metrics. The server-side API keeps your API key secret and returns a light-weight payload for the frontend.</p>
        <section className="mt-6">
          <h2 className="text-lg font-semibold">How it works</h2>
          <ul className="mt-2 list-disc pl-6 text-sm text-[var(--muted)]">
            <li>The server calls the YouTube Data API and caches the result for a short time.</li>
            <li>The frontend polls the server endpoint and renders summarized data.</li>
            <li>This keeps quota usage down and hides your API key.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

