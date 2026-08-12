"use client";

import React from "react";

export function BackgroundVideoSection() {
  const videoId = "3zA3oJuOtkc";
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&enablejsapi=1&disablekb=1&modestbranding=1&iv_load_policy=3`;

  return (
    <section className="relative w-full h-[480px] sm:h-[580px] lg:h-[650px] overflow-hidden bg-slate-900 font-sans">
      {/* Background YouTube Video Iframe with Expanded Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          src={embedUrl}
          title="Arksh Food Background Video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240%] h-[240%] sm:w-[180%] sm:h-[180%] lg:w-[160%] lg:h-[160%] object-cover pointer-events-none border-0"
        />
      </div>

      {/* Light Gray/Slate Tint Cover (Not Heavy Black) */}
      <div className="absolute inset-0 z-10 bg-slate-900/30 bg-gradient-to-r from-slate-900/40 via-slate-900/20 to-slate-900/40 backdrop-blur-[0.5px]" />

      {/* Simple Centered Text Content */}
      <div className="relative z-20 h-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
        <span className="px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
          ARKSH FOOD
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-lg">
          Taste the Tradition of Nepal
        </h2>

        <p className="text-sm sm:text-lg text-slate-100 font-sans max-w-xl leading-relaxed drop-shadow-md font-medium">
          Authentic snacks and healthy food crafted with locally sourced
          ingredients.
        </p>
      </div>
    </section>
  );
}
