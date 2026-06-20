"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import * as dataEn from "@/data/data";
import * as dataEs from "@/data/data_es";

interface CertificationItem {
  name: string;
  date: string;
  description?: string;
  details?: string[];
  rolesEnabled?: string[];
}

interface CertificationCategory {
  category: string;
  items: CertificationItem[];
}

export default function CertificationsPage() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  const { certifications } = activeData;

  // Flatten certifications for easy navigation
  const allItems = certifications.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryName: cat.category,
    }))
  );

  // Set default selected certification
  const [selectedItem, setSelectedItem] = useState<typeof allItems[0] | null>(null);

  useEffect(() => {
    if (allItems.length > 0 && !selectedItem) {
      setSelectedItem(allItems[0]);
    }
  }, [allItems, selectedItem]);

  // Sync selected item when language changes to preserve the selection index
  useEffect(() => {
    if (selectedItem) {
      const idx = allItems.findIndex((item) => item.name.split(":")[0] === selectedItem.name.split(":")[0]);
      if (idx !== -1) {
        setSelectedItem(allItems[idx]);
      }
    }
  }, [lang]);

  const t = {
    es: {
      backBtn: "Volver a Inicio",
      pageTitle: "Wiki de Certificaciones",
      pageSubtitle: "Expediente técnico detallado y competencias operativas validadas.",
      ciscoBadge: "Cisco Certified",
      syllabusLabel: "Temario & Contenido Técnico",
      rolesLabel: "Ámbito de Acción & Competencias",
      dateLabel: "Obtenido en:",
      sidebarTitle: "ÍNDICE DE EXPEDIENTE",
      skills: "Habilidades",
      projects: "Proyectos",
      ecosystem: "Ecosistema CEV",
      experience: "Experiencia",
      creative: "RETRO",
      serious: "SERIO",
      navCertifications: "Certificaciones",
    },
    en: {
      backBtn: "Back to Home",
      pageTitle: "Certifications Wiki",
      pageSubtitle: "Detailed technical syllabus and validated operational capabilities.",
      ciscoBadge: "Cisco Certified",
      syllabusLabel: "Syllabus & Technical Content",
      rolesLabel: "Competencies & Scope of Action",
      dateLabel: "Obtained in:",
      sidebarTitle: "FILE INDEX",
      skills: "Skills",
      projects: "Projects",
      ecosystem: "CEV Ecosystem",
      experience: "Experience",
      creative: "CREATIVE",
      serious: "SERIOUS",
      navCertifications: "Certifications",
    },
  }[lang];

  // Helper to determine icons based on category
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("redes") || category.toLowerCase().includes("network")) {
      return "ph ph-broadcast text-white text-xl";
    }
    return "ph ph-shield-check text-white text-xl";
  };

  if (!mounted || !selectedItem) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING ACCREDITATIONS DATA BUFFER...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brutal-white text-brutal-black selection:bg-purple-600 selection:text-white font-mono flex flex-col pt-16">
      
      {/* Top Navbar (Identical layout to Home Topbar but with purple dot & links back to homepage) */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brutal-white border-b-4 border-brutal-black select-none font-mono">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Brand with Electric Purple pulsing dot */}
          <a href="/" className="flex items-center gap-2 font-black text-lg sm:text-xl uppercase tracking-tighter">
            <span className="w-3.5 h-3.5 bg-purple-600 border-2 border-brutal-black rounded-full inline-block animate-pulse"></span>
            <span>JV_SYSTEM_v2</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="/#experience" className="hover:text-purple-600 hover:underline transition-all">
              {t.experience}
            </a>
            <a href="/#skills" className="hover:text-purple-600 hover:underline transition-all">
              {t.skills}
            </a>
            <a href="/#projects" className="hover:text-purple-600 hover:underline transition-all">
              {t.projects}
            </a>
            <a href="/#ecosystem" className="hover:text-purple-600 hover:underline transition-all">
              {t.ecosystem}
            </a>

            <div className="h-6 w-0.5 bg-brutal-black mx-2" />

            {/* Language Toggle */}
            <div className="flex border-2 border-brutal-black font-mono text-xs">
              <button
                onClick={() => handleLangChange("es")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                  lang === "es" ? "bg-purple-600 text-white" : "bg-white hover:bg-brutal-light"
                )}
              >
                ES
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors",
                  lang === "en" ? "bg-purple-600 text-white" : "bg-white hover:bg-brutal-light"
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
            
            <a href="/" className="border-2 border-brutal-black bg-brutal-black text-white px-2 py-1 text-xs font-bold font-mono hover:bg-purple-600 cursor-pointer">
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
          </div>
        )}
      </nav>

      {/* Main Wiki Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-stretch select-none">
        
        {/* Left Sidebar (Wiki Index) */}
        <aside className="lg:w-80 w-full flex flex-col gap-4 flex-shrink-0">
          {/* Header Title styled exactly like SELECCIONA UN MÓDULO */}
          <h3 className="font-mono font-bold text-xs uppercase text-brutal-gray tracking-wider mb-2 text-left select-none">
            {lang === "es" ? "SELECCIONA UNA CERTIFICACIÓN" : "SELECT A CERTIFICATION"}
          </h3>

          {/* List Categories & Items */}
          <div className="flex-1 border-4 border-brutal-black bg-white p-4 shadow-brutal flex flex-col gap-6 overflow-y-auto max-h-[70vh] lg:max-h-[calc(100vh-16rem)] scrollbar-thin">
            {certifications.map((cat) => (
              <div key={cat.category} className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-purple-600 border-b border-brutal-black pb-1 text-left select-none">
                  <i className={cat.category.toLowerCase().includes("redes") || cat.category.toLowerCase().includes("network") ? "ph ph-broadcast" : "ph ph-shield-check"}></i>
                  <span className="truncate">{cat.category.split(" (")[0]}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {cat.items.map((item, itemIdx) => {
                    const isSelected = selectedItem.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedItem({ ...item, categoryName: cat.category })}
                        className={cn(
                          "w-full text-left p-4 border-2 border-brutal-black text-xs font-bold transition-all cursor-pointer shadow-brutal-sm",
                          isSelected
                            ? "bg-purple-600 text-white -translate-y-1 shadow-brutal border-brutal-black"
                            : "bg-brutal-light text-brutal-black hover:bg-white hover:-translate-y-0.5 hover:shadow-brutal-sm"
                        )}
                      >
                        <p className={cn(
                          "font-mono text-[9px] uppercase font-semibold mb-1",
                          isSelected ? "text-purple-200" : "text-brutal-gray"
                        )}>
                          {cat.category.toLowerCase().includes("redes") || cat.category.toLowerCase().includes("network") ? "NET" : "SEC"} 0{itemIdx + 1}
                        </p>
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider leading-snug break-words flex-1">
                            {item.name.replace("CCNA: ", "")}
                          </span>
                          <span className={cn(
                            "font-mono text-[9px] px-1 py-0.5 flex-shrink-0 font-bold border border-brutal-black",
                            isSelected ? "text-white bg-purple-800" : "text-brutal-black bg-white"
                          )}>
                            {item.date.split(" ")[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel (Wiki Content) */}
        <section className="flex-1 flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col h-full"
            >
              <Card brutal className="flex-1 flex flex-col border-4 border-brutal-black shadow-brutal bg-white p-0 overflow-hidden">
                {/* Wiki Header (Identical header bar style) */}
                <div className="bg-brutal-black text-brutal-white p-3 flex justify-between items-center border-b-2 border-brutal-black select-none font-mono">
                  <div className="font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-brutal-green rounded-full animate-pulse inline-block"></span>
                    <span>{selectedItem.name.toUpperCase()}</span>
                  </div>
                  <div className="text-[10px] text-brutal-gray font-mono uppercase hidden sm:block">
                    {selectedItem.categoryName}
                  </div>
                </div>

                {/* Wiki Header Banner (Purple Style) */}
                <div className="bg-purple-600 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-brutal-black text-left select-none relative">
                  <div className="scanlines-overlay opacity-10 absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                  <div className="space-y-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-purple-800 border border-purple-500 rounded-none">
                        <i className={getCategoryIcon(selectedItem.categoryName)}></i>
                      </div>
                      <Badge variant="default" className="text-[10px] font-mono tracking-wider uppercase bg-brutal-red text-white border-none rounded-none py-0.5 px-2">
                        {t.ciscoBadge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-mono font-black uppercase tracking-tight leading-tight">
                      {selectedItem.name}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs font-bold text-white border-2 border-white bg-black/20 px-4 py-1.5 rounded-none flex-shrink-0 w-fit z-10 self-start sm:self-center">
                    {t.dateLabel} {selectedItem.date}
                  </Badge>
                </div>

                {/* Wiki Main content Body */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto max-h-[80vh] lg:max-h-[calc(100vh-22rem)] scrollbar-thin select-text">
                  {/* Short description */}
                  {selectedItem.description && (
                    <div className="p-4 bg-purple-50 border-l-4 border-purple-600 text-purple-955 text-justify text-sm leading-relaxed font-serif italic shadow-inner">
                      "{selectedItem.description}"
                    </div>
                  )}

                  {/* Columns Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Syllabus Column */}
                    {selectedItem.details && selectedItem.details.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-purple-600 border-b-2 border-dashed border-purple-600 pb-2 flex items-center gap-2 text-left">
                          <i className="ph ph-list-bullets text-base text-purple-600"></i>
                          {t.syllabusLabel}
                        </h4>
                        <ul className="space-y-3.5">
                          {selectedItem.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex gap-2.5 items-start text-xs sm:text-sm leading-relaxed text-brutal-dark text-left">
                              <span className="text-purple-600 mt-1 font-black">▪</span>
                              <span className="font-sans font-medium">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Roles Enabled Column */}
                    {selectedItem.rolesEnabled && selectedItem.rolesEnabled.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-purple-600 border-b-2 border-dashed border-purple-600 pb-2 flex items-center gap-2 text-left">
                          <i className="ph ph-briefcase text-base text-purple-600"></i>
                          {t.rolesLabel}
                        </h4>
                        <ul className="space-y-3.5">
                          {selectedItem.rolesEnabled.map((role, rIdx) => (
                            <li key={rIdx} className="flex gap-2.5 items-start text-xs sm:text-sm leading-relaxed text-brutal-dark text-left">
                              <span className="text-purple-600 mt-1 font-black">▶</span>
                              <span className="font-sans font-medium text-slate-800">{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Technical annotation footer inside card */}
                  <div className="mt-auto border-t border-dashed border-brutal-gray/20 pt-6 font-mono text-[10px] text-brutal-gray uppercase tracking-widest text-left select-none">
                    SEC_REG // CCNA_CERTIFICATION_VERIFICATION_STATUS: VALIDATED // SYSTEM: RYZEN_NODE_V-NET
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
