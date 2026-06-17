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
      explore: "Explorar Ecosistema 🔗",
    },
    en: {
      title: "Experience",
      explore: "Explore Ecosystem 🔗",
    },
  }[lang];

  return (
    <section id="experience" className="bg-brutal-light w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 border-t-4 border-brutal-black">
      <div className="w-full max-w-3xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4">
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </div>

        {/* Timeline List */}
        <div className="space-y-12 relative">
          {/* Vertical line centered perfectly on the dots */}
          <div className="absolute left-[17px] sm:left-[25px] md:left-[33px] top-2 bottom-2 w-0.5 bg-brutal-black" />

          {experience.map((job, idx) => (
            <div
              key={`${job.company}-${idx}`}
              className="relative pl-12 sm:pl-16 md:pl-20"
            >
              {/* Dot centered mathematically on the vertical line */}
              <div className="absolute left-[10px] sm:left-[18px] md:left-[26px] top-3.5 w-4 h-4 bg-brutal-white border-2 border-brutal-black rounded-full z-10" />

              {/* Card */}
              <div className="bg-brutal-white border-2 border-brutal-black p-6 sm:p-8 md:p-10 shadow-brutal hover:shadow-brutal-hover transition-all duration-200">
                {/* Header */}
                <div className="mb-4 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold uppercase tracking-wider mb-2">
                    {job.role}
                  </h3>
                  
                  {job.link ? (
                    <a
                      href={job.link}
                      className="text-base sm:text-lg md:text-xl font-mono font-bold text-brutal-red hover:underline hover:text-brutal-black inline-block transition-all"
                    >
                      {job.company} {job.link.startsWith("#") && <span className="text-xs">({t.explore})</span>}
                    </a>
                  ) : (
                    <p className="text-base sm:text-lg md:text-xl font-mono font-bold text-brutal-dark">
                      {job.company}
                    </p>
                  )}
                  
                  <p className="text-xs sm:text-sm font-mono text-brutal-gray mt-2 uppercase tracking-wide">
                    {job.period}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-0.5 w-12 bg-brutal-red mb-5 mx-auto sm:mx-0" />

                {/* Achievements */}
                <ul className="space-y-3">
                  {job.achievements.map((achievement, aidx) => (
                    <li key={aidx} className="flex gap-3 items-start">
                      <span className="text-brutal-red font-bold text-lg flex-shrink-0 mt-0.5">
                        ▪
                      </span>
                      <span className="text-sm sm:text-base md:text-lg leading-relaxed text-left text-brutal-dark">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
