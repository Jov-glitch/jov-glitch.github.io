"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  lang: "es" | "en";
  setLang: (lang: "es" | "en") => void;
  mode: "creativo" | "serio";
  setMode: (mode: "creativo" | "serio") => void;
}

export function Navbar({ lang, setLang, mode, setMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    es: {
      skills: "Habilidades",
      projects: "Proyectos",
      ecosystem: "Ecosistema CEV",
      experience: "Experiencia",
      creative: "CREATIVO",
      serious: "SERIO",
    },
    en: {
      skills: "Skills",
      projects: "Projects",
      ecosystem: "CEV Ecosystem",
      experience: "Experience",
      creative: "CREATIVE",
      serious: "SERIOUS",
    },
  }[lang];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-brutal-white border-b-4 border-brutal-black select-none font-mono">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 font-black text-lg sm:text-xl uppercase tracking-tighter">
          <span className="w-3.5 h-3.5 bg-brutal-green border-2 border-brutal-black rounded-full inline-block animate-pulse"></span>
          <span>JV_SYSTEM_v2</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold">
          <a href="#skills" className="hover:text-brutal-red hover:underline transition-all">
            {t.skills}
          </a>
          <a href="#projects" className="hover:text-brutal-red hover:underline transition-all">
            {t.projects}
          </a>
          <a href="#ecosystem" className="hover:text-brutal-red hover:underline transition-all">
            {t.ecosystem}
          </a>
          <a href="#experience" className="hover:text-brutal-red hover:underline transition-all">
            {t.experience}
          </a>

          <div className="h-6 w-0.5 bg-brutal-black mx-2" />

          {/* Language Toggle */}
          <div className="flex border-2 border-brutal-black font-mono text-xs">
            <button
              onClick={() => setLang("es")}
              className={cn(
                "px-2.5 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                lang === "es" ? "bg-brutal-red text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
              )}
            >
              ES
            </button>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2.5 py-1 font-bold cursor-pointer transition-colors",
                lang === "en" ? "bg-brutal-red text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
              )}
            >
              EN
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-2 border-brutal-black font-mono text-xs shadow-brutal-sm">
            <button
              onClick={() => setMode("creativo")}
              className={cn(
                "px-3 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                mode === "creativo" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
              )}
              title="Creative Retro Mode"
            >
              {t.creative}
            </button>
            <button
              onClick={() => setMode("serio")}
              className={cn(
                "px-3 py-1 font-bold cursor-pointer transition-colors",
                mode === "serio" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
              )}
              title="Professional Dossier Mode"
            >
              {t.serious}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Language Toggle */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="border-2 border-brutal-black bg-brutal-white px-2 py-1 text-xs font-bold font-mono hover:bg-brutal-light cursor-pointer"
          >
            {lang.toUpperCase()}
          </button>
          
          <button
            onClick={() => setMode(mode === "creativo" ? "serio" : "creativo")}
            className="border-2 border-brutal-black bg-brutal-black text-brutal-white px-2 py-1 text-xs font-bold font-mono hover:bg-brutal-red cursor-pointer"
          >
            {mode === "creativo" ? t.creative : t.serious}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 border-2 border-brutal-black bg-brutal-white hover:bg-brutal-light flex items-center justify-center font-bold text-xl cursor-pointer"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-brutal-black bg-brutal-white p-4 flex flex-col gap-4 text-center font-bold text-base shadow-inner">
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all"
          >
            {t.skills}
          </a>
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all"
          >
            {t.projects}
          </a>
          <a
            href="#ecosystem"
            onClick={() => setIsOpen(false)}
            className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all"
          >
            {t.ecosystem}
          </a>
          <a
            href="#experience"
            onClick={() => setIsOpen(false)}
            className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all"
          >
            {t.experience}
          </a>
        </div>
      )}
    </nav>
  );
}
