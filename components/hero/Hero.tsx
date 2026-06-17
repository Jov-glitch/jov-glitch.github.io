"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import Link from "next/link";

interface HeroProps {
  profile: {
    name: string;
    title: string;
    tagline: string;
    github: string;
    linkedin: string;
    email: string;
  };
  lang: "es" | "en";
}

export function Hero({ profile, lang }: HeroProps) {
  const t = {
    es: {
      available: "Disponible para Trabajar",
      viewProjects: "Ver Proyectos →",
      getInTouch: "Contactar",
    },
    en: {
      available: "Available for Work",
      viewProjects: "View Projects →",
      getInTouch: "Get in Touch",
    },
  }[lang];

  return (
    <section className="bg-brutal-white flex items-center justify-center min-h-screen px-4 relative overflow-hidden">
      {/* Visual background details for premium layout */}
      <div className="absolute top-10 left-10 w-24 h-24 border-4 border-brutal-black/5 rounded-full pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-brutal-black/5 rounded-brutal pointer-events-none hidden md:block" />

      <motion.div
        className="w-full max-w-4xl mx-auto text-center"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItemVariants} className="mb-8">
          <Badge variant="destructive" className="inline-block text-sm px-4 py-1.5">
            {t.available}
          </Badge>
        </motion.div>

        <motion.h1
          variants={staggerItemVariants}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-bold uppercase tracking-tighter mb-6 leading-[0.85] text-brutal-black"
        >
          {profile.name}
        </motion.h1>

        <motion.div variants={staggerItemVariants} className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold uppercase tracking-widest text-brutal-dark text-center">
            {profile.title}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerItemVariants}
          className="max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4"
        >
          <div className="h-1 w-16 bg-brutal-red" />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed font-mono text-brutal-gray text-center">
            {profile.tagline}
          </p>
        </motion.div>

        <motion.div
          variants={staggerItemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="#projects">
            <Button variant="default" className="font-mono text-base font-bold w-full sm:w-auto px-8 py-5 h-auto cursor-pointer">
              {t.viewProjects}
            </Button>
          </Link>
          <a href={`mailto:${profile.email}`}>
            <Button variant="outline" className="font-mono text-base font-bold w-full sm:w-auto px-8 py-5 h-auto cursor-pointer">
              {t.getInTouch}
            </Button>
          </a>
        </motion.div>

        <motion.div
          variants={staggerItemVariants}
          className="flex flex-wrap gap-8 justify-center border-t border-brutal-black pt-8 mt-8"
        >
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-xs uppercase tracking-widest hover:text-brutal-red transition-colors">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-xs uppercase tracking-widest hover:text-brutal-red transition-colors">
            LinkedIn ↗
          </a>
          <a href={`mailto:${profile.email}`} className="font-mono font-bold text-xs uppercase tracking-widest hover:text-brutal-red transition-colors">
            Email ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
