"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 lg:py-20 border-b border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
        
        <div className="w-12 h-12 rounded-full bg-sky-50 border border-[#E8E2D9] mx-auto flex items-center justify-center text-[#0555A2]">
          <Mail className="w-6 h-6" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight">
            Stay in the Loop
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Get new product announcements, food stories and special offers delivered straight to your inbox.
          </p>
        </div>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#0555A2] text-white text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#28AAE0]" />
            <span>Thank you for subscribing to Arksh Food!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-full bg-white border border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0555A2]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shrink-0 shadow-sm"
            >
              Subscribe
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
