"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface AboutProps {
  about: string;
  vision: string;
  location: string;
  lang: "es" | "en";
}

export function About({ about, vision, location, lang }: AboutProps) {
  const t = {
    es: {
      title: "Sobre Mí",
      background: "Trayectoria",
      vision: "Visión",
      based: "Ubicado en",
    },
    en: {
      title: "About Me",
      background: "Background",
      vision: "Vision",
      based: "Based in",
    },
  }[lang];

  return (
    <section className="bg-brutal-white w-full px-4 py-24 border-t-4 border-brutal-black">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={staggerItemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-user"></i>
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <motion.div
            variants={staggerItemVariants}
            className="lg:col-span-2 bg-brutal-light border-2 border-brutal-black p-8 shadow-brutal hover:shadow-brutal-hover transition-all duration-200"
          >
            <h3 className="text-xl font-mono font-bold uppercase tracking-wider mb-6 pb-4 border-b-2 border-brutal-black text-center">
              {t.background}
            </h3>
            <div className="space-y-5 text-base leading-relaxed text-center">
              {about.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerItemVariants}
            className="bg-brutal-red border-2 border-brutal-black p-8 shadow-brutal text-brutal-white h-fit hover:shadow-brutal-hover transition-all duration-200 text-center animate-pulse-brutal"
          >
            <h3 className="text-xl font-mono font-bold uppercase tracking-wider mb-6 pb-4 border-b-2 border-brutal-white">
              {t.vision}
            </h3>
            <p className="text-base leading-relaxed font-serif">{vision}</p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerItemVariants}
          className="mt-16 flex flex-col sm:flex-row items-center gap-4 border-t border-brutal-black pt-8 justify-center"
        >
          <div className="w-12 h-12 bg-brutal-black flex items-center justify-center text-brutal-white font-bold text-xl flex-shrink-0">
            <i className="ph ph-map-pin text-xl text-brutal-white"></i>
          </div>
          <div className="text-center sm:text-left">
            <p className="font-mono font-bold text-xs uppercase tracking-widest text-brutal-gray">{t.based}</p>
            <p className="text-xl font-mono font-bold">{location}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
