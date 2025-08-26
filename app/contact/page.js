
// File: app/contact/page.js
import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--brand-text)] p-6" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      <NavBar />
      <main className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">Have a question or want to collaborate? Reach out!</p>
        <form className="mt-6 grid gap-3">
          <input className="w-full border border-slate-200 rounded px-3 py-2" placeholder="Your name" />
          <input className="w-full border border-slate-200 rounded px-3 py-2" placeholder="Email" />
          <textarea className="w-full border border-slate-200 rounded px-3 py-2" rows={6} placeholder="Message" />
          <button className="self-start px-4 py-2 bg-[var(--brand-red)] text-white rounded">Send</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
