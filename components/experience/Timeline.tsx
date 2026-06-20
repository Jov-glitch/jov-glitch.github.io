"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface Experience {
  role: string;
  company: string;
  period: string;
  link?: string;
  description?: string;
  achievements: string[];
}

interface TimelineProps {
  experience: Experience[];
  lang: "es" | "en";
}

export function Timeline({ experience, lang }: TimelineProps) {
  const t = {
    es: {
      title: "Experiencia Profesional",
      explore: "Explorar Ecosistema",
      ctaBtn: "¡CONOCE MÁS DETALLES DE MI TRAYECTORIA!",
    },
    en: {
      title: "Experience",
      explore: "Explore Ecosystem",
      ctaBtn: "LEARN MORE DETAILS ABOUT MY ROLES!",
    },
  }[lang];

  return (
    <section id="experience" className="bg-brutal-light w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 border-t-4 border-brutal-black select-none">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-briefcase animate-pulse text-brutal-red"></i>
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Horizontal Track Line (Only visible on desktop) */}
          <div className="hidden md:block absolute left-16 right-16 top-6 h-1 bg-brutal-black z-0" />

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {experience.map((job, idx) => (
              <div key={`${job.company}-${idx}`} className="flex flex-col">
                {/* Node Step Dot (Desktop only) */}
                <div className="hidden md:flex justify-center mb-8">
                  <div className="w-12 h-12 rounded-full border-4 border-brutal-black bg-brutal-white flex items-center justify-center font-mono font-black text-sm shadow-brutal-sm relative z-10 select-none">
                    0{idx + 1}
                  </div>
                </div>

                {/* Mobile Connector Dot (Mobile only) */}
                <div className="md:hidden flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full border-4 border-brutal-black bg-brutal-white flex items-center justify-center font-mono font-black text-xs shadow-brutal-sm select-none">
                    0{idx + 1}
                  </div>
                  <div className="h-0.5 flex-1 bg-brutal-black" />
                </div>

                {/* Compact Card */}
                <div className="bg-brutal-white border-2 border-brutal-black p-5 sm:p-6 shadow-brutal hover:shadow-brutal-hover hover:-translate-y-1 transition-all duration-200 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] font-bold text-brutal-gray uppercase tracking-widest block select-none">
                      {job.period}
                    </span>
                    
                    <h3 className="text-base sm:text-lg font-mono font-bold uppercase tracking-tight leading-tight line-clamp-2">
                      {job.role}
                    </h3>
                    
                    <div>
                      {job.link ? (
                        <a
                          href={job.link}
                          className="text-xs sm:text-sm font-mono font-bold text-brutal-red hover:text-brutal-black inline-flex items-center gap-1 transition-all group"
                          target={job.link.startsWith("http") ? "_blank" : undefined}
                          rel={job.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          <span className="group-hover:underline truncate max-w-[200px]">
                            {job.company}
                          </span>
                          <i className="ph ph-arrow-up-right text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"></i>
                        </a>
                      ) : (
                        <span className="text-xs sm:text-sm font-mono font-bold text-brutal-dark truncate max-w-[200px] block">
                          {job.company}
                        </span>
                      )}
                    </div>
                    
                    <div className="h-0.5 w-8 bg-brutal-red my-2" />
                    
                    {job.description && (
                      <p className="text-xs sm:text-sm leading-relaxed text-brutal-dark font-sans font-medium line-clamp-4">
                        {job.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learn More CTA */}
        <div className="mt-16 text-center">
          <a href="/experience">
            <button className="bg-brutal-red text-brutal-white font-mono font-black text-sm px-8 py-4 border-4 border-brutal-black shadow-brutal hover:bg-brutal-white hover:text-brutal-black transition-colors cursor-pointer inline-flex items-center gap-2">
              <span>{t.ctaBtn}</span>
              <i className="ph ph-arrow-right text-lg"></i>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
