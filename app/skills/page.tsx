"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as dataEn from "@/data/data";
import * as dataEs from "@/data/data_es";
import { useSearchParams } from "next/navigation";

interface SkillItem {
  name: string;
  description: string[]; // This is actually the list of technologies (e.g. ["Docker", "Podman"])
}

interface SkillCategory {
  category: string;
  description?: string;
  details?: string[];
  applications?: string[];
  items: SkillItem[];
}

function SkillsContent() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  useEffect(() => {
    // Sync language from localStorage if available
    const savedLang = localStorage.getItem("portfolio_lang") as "es" | "en";
    if (savedLang) setLang(savedLang);
    setMounted(true);
  }, []);

  const handleLangChange = (l: "es" | "en") => {
    setLang(l);
    localStorage.setItem("portfolio_lang", l);
  };

  const activeData = lang === "es" ? dataEs : dataEn;
  const { skills } = activeData;

  // Set default selected skill category
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  useEffect(() => {
    if (skills.length > 0) {
      if (catParam !== null) {
        const idx = parseInt(catParam, 10);
        if (!isNaN(idx) && idx >= 0 && idx < skills.length) {
          setSelectedCategory(skills[idx] as SkillCategory);
          return;
        }
      }
      if (!selectedCategory) {
        setSelectedCategory(skills[0] as SkillCategory);
      }
    }
  }, [skills, selectedCategory, catParam]);

  // Sync selected item when language changes to preserve selection index
  useEffect(() => {
    if (selectedCategory) {
      const idx = skills.findIndex(
        (cat) => cat.category.split(" (")[0] === selectedCategory.category.split(" (")[0]
      );
      if (idx !== -1) {
        setSelectedCategory(skills[idx] as SkillCategory);
      }
    }
  }, [lang]);

  const t = {
    es: {
      backBtn: "Volver a Inicio",
      pageTitle: "Wiki de Habilidades",
      pageSubtitle: "Expediente detallado de competencias, tecnologías y aplicaciones prácticas.",
      detailsLabel: "Competencias Técnicas",
      applicationsLabel: "Casos de Uso & Proyectos",
      techLabel: "Herramientas & Tecnologías",
      sidebarTitle: "SELECCIONA UNA CATEGORÍA",
      skills: "Habilidades",
      projects: "Proyectos",
      ecosystem: "Ecosistema CEV",
      experience: "Experiencia",
      workDemos: "Demos de Trabajo",
    },
    en: {
      backBtn: "Back to Home",
      pageTitle: "Skills Wiki",
      pageSubtitle: "Detailed dossier of technical competencies, tools, and practical use cases.",
      detailsLabel: "Technical Competencies",
      applicationsLabel: "Practical Applications",
      techLabel: "Tools & Technologies",
      sidebarTitle: "SELECT A CATEGORY",
      skills: "Skills",
      projects: "Projects",
      ecosystem: "CEV Ecosystem",
      experience: "Experience",
      workDemos: "Work Demos",
    },
  }[lang];

  // Helper to determine icons based on category name
  const getCategoryIcon = (category: string) => {
    const name = category.toLowerCase();
    if (name.includes("virtual") || name.includes("container") || name.includes("contenedor")) {
      return "ph ph-cube";
    }
    if (name.includes("cloud") || name.includes("nube") || name.includes("server") || name.includes("servidor")) {
      return "ph ph-cloud";
    }
    if (name.includes("network") || name.includes("enrutamiento") || name.includes("red")) {
      return "ph ph-broadcast";
    }
    if (name.includes("backend") || name.includes("framework")) {
      return "ph ph-code";
    }
    return "ph ph-file-text";
  };

  if (!mounted || !selectedCategory) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING TECHNICAL DOSSIER BUFFER...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brutal-white text-brutal-black selection:bg-blue-600 selection:text-white font-mono flex flex-col pt-16">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brutal-white border-b-4 border-brutal-black select-none font-mono">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Brand with Blue pulsing dot */}
          <a href="/" className="flex items-center gap-2 font-black text-lg sm:text-xl uppercase tracking-tighter">
            <span className="w-3.5 h-3.5 bg-blue-600 border-2 border-brutal-black rounded-full inline-block animate-pulse"></span>
            <span>JV_SYSTEM_v2</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="/#experience" className="hover:text-blue-600 hover:underline transition-all">
              {t.experience}
            </a>
            <a href="/#skills" className="hover:text-blue-600 hover:underline transition-all">
              {t.skills}
            </a>
            <a href="/#projects" className="hover:text-blue-600 hover:underline transition-all">
              {t.projects}
            </a>
            <a href="/#ecosystem" className="hover:text-blue-600 hover:underline transition-all">
              {t.ecosystem}
            </a>
            <a href="/work-demos" className="hover:text-blue-600 hover:underline transition-all">
              {t.workDemos}
            </a>

            <div className="h-6 w-0.5 bg-brutal-black mx-2" />

            {/* Language Toggle */}
            <div className="flex border-2 border-brutal-black font-mono text-xs">
              <button
                onClick={() => handleLangChange("es")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                  lang === "es" ? "bg-blue-600 text-white" : "bg-white hover:bg-brutal-light"
                )}
              >
                ES
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors",
                  lang === "en" ? "bg-blue-600 text-white" : "bg-white hover:bg-brutal-light"
                )}
              >
                EN
              </button>
            </div>

            {/* Back Button */}
            <a href="/">
              <Button variant="default" className="font-mono font-bold text-xs cursor-pointer border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 flex items-center gap-1">
                <i className="ph ph-arrow-left"></i>
                {t.backBtn}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleLangChange(lang === "es" ? "en" : "es")}
              className="border-2 border-brutal-black bg-white px-2 py-1 text-xs font-bold font-mono hover:bg-brutal-light cursor-pointer"
            >
              {lang.toUpperCase()}
            </button>
            
            <a href="/" className="border-2 border-brutal-black bg-brutal-black text-white px-2 py-1 text-xs font-bold font-mono hover:bg-blue-600 cursor-pointer">
              {t.backBtn.toUpperCase()}
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 border-2 border-brutal-black bg-white hover:bg-brutal-light flex items-center justify-center font-bold text-xl cursor-pointer"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-brutal-black bg-white p-4 flex flex-col gap-3 text-center font-bold text-base shadow-inner">
            <a href="/#experience" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all">
              {t.experience}
            </a>
            <a href="/#skills" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all">
              {t.skills}
            </a>
            <a href="/#projects" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all">
              {t.projects}
            </a>
            <a href="/#ecosystem" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all">
              {t.ecosystem}
            </a>
            <a href="/work-demos" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:bg-brutal-light border border-transparent hover:border-brutal-black transition-all">
              {t.workDemos}
            </a>
          </div>
        )}
      </nav>

      {/* Main Wiki Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-stretch select-none">
        
        {/* Left Sidebar */}
        <aside className="lg:w-80 w-full flex flex-col gap-4 flex-shrink-0">
          <h3 className="font-mono font-bold text-xs uppercase text-brutal-gray tracking-wider mb-2 text-left select-none">
            {t.sidebarTitle}
          </h3>

          {/* List Categories */}
          <div className="flex-1 border-4 border-brutal-black bg-white p-4 shadow-brutal flex flex-col gap-6 overflow-y-auto max-h-[70vh] lg:max-h-[calc(100vh-16rem)] scrollbar-thin">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-blue-600 border-b border-brutal-black pb-1 text-left select-none">
                <i className="ph ph-wrench"></i>
                <span>CATEGORÍAS TÉCNICAS</span>
              </div>
              
              <div className="flex flex-col gap-3">
                {skills.map((skillCat, idx) => {
                  const isSelected = selectedCategory.category === skillCat.category;
                  return (
                    <button
                      key={skillCat.category}
                      onClick={() => setSelectedCategory(skillCat as SkillCategory)}
                      className={cn(
                        "w-full text-left p-4 border-2 border-brutal-black text-xs font-bold transition-all cursor-pointer shadow-brutal-sm",
                        isSelected
                          ? "bg-blue-600 text-white -translate-y-1 shadow-brutal border-brutal-black"
                          : "bg-brutal-light text-brutal-black hover:bg-white hover:-translate-y-0.5 hover:shadow-brutal-sm"
                      )}
                    >
                      <p className={cn(
                        "font-mono text-[9px] uppercase font-semibold mb-1",
                        isSelected ? "text-blue-200" : "text-brutal-gray"
                      )}>
                        SKILL GROUP 0{idx + 1}
                      </p>
                      <div className="flex flex-col gap-1 text-left">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider leading-snug break-words">
                          {skillCat.category.split(" (")[0]}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Panel (Wiki Content) */}
        <section className="flex-1 flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory.category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col h-full"
            >
              <Card brutal className="flex-1 flex flex-col border-4 border-brutal-black shadow-brutal bg-white p-0 overflow-hidden">
                {/* Wiki Header */}
                <div className="bg-brutal-black text-brutal-white p-3 flex justify-between items-center border-b-2 border-brutal-black select-none font-mono">
                  <div className="font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-brutal-blue rounded-full animate-pulse inline-block"></span>
                    <span>SYSTEMS_ENGINEERING // STACK_ACQUIRED</span>
                  </div>
                  <div className="text-[10px] text-brutal-gray font-mono uppercase hidden sm:block">
                    {t.skills.toUpperCase()} DOSSIER
                  </div>
                </div>

                {/* Wiki Header Banner (Blue Style) */}
                <div className="bg-blue-600 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-brutal-black text-left select-none relative">
                  <div className="scanlines-overlay opacity-10 absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                  <div className="space-y-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-800 border border-blue-500 rounded-none">
                        <i className={cn(getCategoryIcon(selectedCategory.category), "text-white text-xl")}></i>
                      </div>
                      <Badge variant="default" className="text-[10px] font-mono tracking-wider uppercase bg-brutal-red text-white border-none rounded-none py-0.5 px-2">
                        LEVEL_VERIFIED
                      </Badge>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-mono font-black uppercase tracking-tight leading-tight">
                      {selectedCategory.category}
                    </CardTitle>
                  </div>
                </div>

                {/* Wiki Main Content Body */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto max-h-[80vh] lg:max-h-[calc(100vh-22rem)] scrollbar-thin select-text">
                  
                  {/* Category Description */}
                  {selectedCategory.description && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-600 text-blue-950 text-justify text-sm leading-relaxed font-serif italic shadow-inner">
                      "{selectedCategory.description}"
                    </div>
                  )}

                  {/* Columns Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* Competencies Column */}
                    {selectedCategory.details && selectedCategory.details.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-blue-600 border-b-2 border-dashed border-blue-600 pb-2 flex items-center gap-2 text-left">
                          <i className="ph ph-list-bullets text-base text-blue-600"></i>
                          {t.detailsLabel}
                        </h4>
                        <ul className="space-y-3.5">
                          {selectedCategory.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex gap-2.5 items-start text-xs sm:text-sm leading-relaxed text-brutal-dark text-left">
                              <span className="text-blue-600 mt-1 font-black">▪</span>
                              <span className="font-sans font-medium text-slate-800">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Applications Column */}
                    {selectedCategory.applications && selectedCategory.applications.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-blue-600 border-b-2 border-dashed border-blue-600 pb-2 flex items-center gap-2 text-left">
                          <i className="ph ph-target text-base text-blue-600"></i>
                          {t.applicationsLabel}
                        </h4>
                        <ul className="space-y-3.5">
                          {selectedCategory.applications.map((app, aIdx) => (
                            <li key={aIdx} className="flex gap-2.5 items-start text-xs sm:text-sm leading-relaxed text-brutal-dark text-left">
                              <span className="text-blue-600 mt-1 font-black">▶</span>
                              <span className="font-sans font-medium text-slate-800">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Tools & Subcategories Badges */}
                  {selectedCategory.items && selectedCategory.items.length > 0 && (
                    <div className="space-y-6 pt-6 border-t border-dashed border-brutal-gray/20">
                      <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-blue-600 flex items-center gap-2 text-left">
                        <i className="ph ph-stack text-base text-blue-600"></i>
                        {t.techLabel}
                      </h4>
                      <div className="space-y-4">
                        {selectedCategory.items.map((subItem) => (
                          <div key={subItem.name} className="flex flex-col gap-2 items-start text-left">
                            <span className="font-mono font-bold text-xs text-brutal-gray uppercase tracking-wider">
                              {subItem.name}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {subItem.description.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="font-mono text-xs font-bold text-blue-950 border-2 border-blue-600 bg-blue-50 px-3 py-1 rounded-none"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical annotation footer */}
                  <div className="mt-auto border-t border-dashed border-brutal-gray/20 pt-6 font-mono text-[10px] text-brutal-gray uppercase tracking-widest text-left select-none">
                    CAT_SKILLS // SUB_SYS: CORE_INFRA // STATUS: COMPILED // NODE: VEGA_CORE_TECH
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </section>

      </div>
    </main>
  );
}

export default function SkillsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING TECHNICAL DOSSIER BUFFER...</span>
      </div>
    }>
      <SkillsContent />
    </Suspense>
  );
}
