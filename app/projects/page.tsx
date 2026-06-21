"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as dataEn from "@/data/data";
import * as dataEs from "@/data/data_es";
import { useSearchParams, useRouter } from "next/navigation";

interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  purpose: string;
  link?: string;
  iacCode?: string;
}

function ProjectsContent() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const router = useRouter();

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
  const { projects } = activeData;

  // Set default selected project index
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    if (projects.length > 0) {
      const idx = idParam !== null ? parseInt(idParam, 10) : 0;
      const validIdx = !isNaN(idx) && idx >= 0 && idx < projects.length ? idx : 0;
      setSelectedIdx(validIdx);
    }
  }, [projects, idParam]);

  const selectedItem = projects[selectedIdx] || null;

  const handleProjectSelect = (idx: number) => {
    router.push(`/projects?id=${idx}`, { scroll: false });
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const t = {
    es: {
      backBtn: "Volver a Inicio",
      pageTitle: "Wiki de Proyectos",
      pageSubtitle: "Expediente detallado de arquitectura, automatización y código fuente.",
      detailsLabel: "Código de Automatización / Configuración",
      techLabel: "Herramientas & Tecnologías",
      purposeLabel: "Propósito del Proyecto",
      linkButton: "Explorar Proyecto en Línea ↗",
      sidebarTitle: "ÍNDICE DE PROYECTOS",
      copyBtn: "Copiar",
      copiedFeedback: "Copiado",
      skills: "Habilidades",
      projects: "Proyectos",
      ecosystem: "Ecosistema CEV",
      experience: "Experiencia",
      workDemos: "Demos de Trabajo",
    },
    en: {
      backBtn: "Back to Home",
      pageTitle: "Projects Wiki",
      pageSubtitle: "Detailed dossier of architecture, automation, and source code.",
      detailsLabel: "Automation Code / Configuration",
      techLabel: "Tools & Technologies",
      purposeLabel: "Project Purpose",
      linkButton: "Explore Project Online ↗",
      sidebarTitle: "PROJECTS INDEX",
      copyBtn: "Copy",
      copiedFeedback: "Copied",
      skills: "Skills",
      projects: "Projects",
      ecosystem: "CEV Ecosystem",
      experience: "Experience",
      workDemos: "Work Demos",
    },
  }[lang];

  if (!mounted || !selectedItem) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING PROJECTS DATA BUFFER...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brutal-white text-brutal-black selection:bg-red-600 selection:text-white font-mono flex flex-col pt-16">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brutal-white border-b-4 border-brutal-black select-none font-mono">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Brand with Red pulsing dot */}
          <a href="/" className="flex items-center gap-2 font-black text-lg sm:text-xl uppercase tracking-tighter">
            <span className="w-3.5 h-3.5 bg-red-600 border-2 border-brutal-black rounded-full inline-block animate-pulse"></span>
            <span>JV_SYSTEM_v2</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="/#experience" className="hover:text-red-600 hover:underline transition-all">
              {t.experience}
            </a>
            <a href="/#skills" className="hover:text-red-600 hover:underline transition-all">
              {t.skills}
            </a>
            <a href="/#projects" className="hover:text-red-600 hover:underline transition-all">
              {t.projects}
            </a>
            <a href="/#ecosystem" className="hover:text-red-600 hover:underline transition-all">
              {t.ecosystem}
            </a>
            <a href="/work-demos" className="hover:text-red-600 hover:underline transition-all">
              {t.workDemos}
            </a>

            <div className="h-6 w-0.5 bg-brutal-black mx-2" />

            {/* Language Toggle */}
            <div className="flex border-2 border-brutal-black font-mono text-xs">
              <button
                onClick={() => handleLangChange("es")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                  lang === "es" ? "bg-red-600 text-white" : "bg-white hover:bg-brutal-light"
                )}
              >
                ES
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors",
                  lang === "en" ? "bg-red-600 text-white" : "bg-white hover:bg-brutal-light"
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
            
            <a href="/" className="border-2 border-brutal-black bg-brutal-black text-white px-2 py-1 text-xs font-bold font-mono hover:bg-red-600 cursor-pointer">
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
        
        {/* Left Sidebar (Wiki Index) */}
        <aside className="lg:w-80 w-full flex flex-col gap-4 flex-shrink-0">
          <h3 className="font-mono font-bold text-xs uppercase text-brutal-gray tracking-wider mb-2 text-left select-none">
            {t.sidebarTitle}
          </h3>

          {/* List Projects */}
          <div className="flex-1 border-4 border-brutal-black bg-white p-4 shadow-brutal flex flex-col gap-2 overflow-y-auto max-h-[70vh] lg:max-h-[calc(100vh-16rem)] scrollbar-thin">
            {projects.map((project, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={project.title}
                  onClick={() => handleProjectSelect(idx)}
                  className={cn(
                    "w-full text-left p-4 border-2 border-brutal-black text-xs font-bold transition-all cursor-pointer shadow-brutal-sm",
                    isSelected
                      ? "bg-red-600 text-white -translate-y-1 shadow-brutal border-brutal-black"
                      : "bg-brutal-light text-brutal-black hover:bg-white hover:-translate-y-0.5 hover:shadow-brutal-sm"
                  )}
                >
                  <p className={cn(
                    "font-mono text-[9px] uppercase font-semibold mb-1",
                    isSelected ? "text-red-200" : "text-brutal-gray"
                  )}>
                    PROJ 0{idx + 1}
                  </p>
                  <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider leading-snug break-words">
                    {project.title}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Panel (Wiki Content) */}
        <section className="flex-1 flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.title}
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
                    <span className="w-2.5 h-2.5 bg-brutal-green rounded-full animate-pulse inline-block"></span>
                    <span>{selectedItem.title.toUpperCase()}</span>
                  </div>
                  <div className="text-[10px] text-brutal-gray font-mono uppercase hidden sm:block">
                    PROJECTS_ENGINE // STATUS: COMPILED
                  </div>
                </div>

                {/* Wiki Header Banner (Red Style) */}
                <div className="bg-red-600 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-brutal-black text-left select-none relative">
                  <div className="scanlines-overlay opacity-10 absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                  <div className="space-y-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-red-800 border border-red-500 rounded-none">
                        <i className="ph ph-package text-white text-xl"></i>
                      </div>
                      <Badge variant="default" className="text-[10px] font-mono tracking-wider uppercase bg-brutal-black text-white border-none rounded-none py-0.5 px-2">
                        {selectedItem.purpose ? selectedItem.purpose.split(" ")[0] : "CORE"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-mono font-black uppercase tracking-tight leading-tight">
                      {selectedItem.title}
                    </CardTitle>
                  </div>
                </div>

                {/* Wiki Main Content Body */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[80vh] lg:max-h-[calc(100vh-22rem)] scrollbar-thin select-text">
                  
                  {/* Purpose Box */}
                  {selectedItem.purpose && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-950 text-left text-sm leading-relaxed font-sans font-medium shadow-inner">
                      <span className="font-mono font-bold text-xs uppercase text-red-700 block mb-1 tracking-wider">{t.purposeLabel}</span>
                      "{selectedItem.purpose}"
                    </div>
                  )}

                  {/* Description */}
                  <div className="text-justify text-sm leading-relaxed text-brutal-dark">
                    <p className="font-sans font-medium text-slate-800">{selectedItem.description}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2 text-left">
                    <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-red-600 border-b-2 border-dashed border-red-600 pb-2 flex items-center gap-2 select-none">
                      <i className="ph ph-wrench text-base"></i>
                      {t.techLabel}
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedItem.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-2 border-brutal-black text-xs font-bold bg-white text-brutal-black px-2.5 py-1 hover:bg-brutal-light cursor-default transition-all shadow-brutal-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* IaC Playbook Script Container */}
                  {selectedItem.iacCode && (
                    <div className="space-y-2">
                      <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-red-600 border-b-2 border-dashed border-red-600 pb-2 flex items-center gap-2 text-left select-none">
                        <i className="ph ph-terminal text-base"></i>
                        {t.detailsLabel}
                      </h4>
                      <div className="border-4 border-brutal-black bg-brutal-black text-white font-mono text-xs rounded-none overflow-hidden relative shadow-brutal-sm">
                        {/* Terminal Titlebar */}
                        <div className="bg-neutral-900 border-b-2 border-brutal-black p-2 flex justify-between items-center select-none">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-600 rounded-full inline-block"></span>
                            <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider ml-2">IAC_PLAYBOOK.yml</span>
                          </div>
                          <button
                            onClick={() => handleCopy(selectedItem.iacCode || "")}
                            className="border border-neutral-700 bg-neutral-800 hover:bg-red-600 text-neutral-300 hover:text-white px-2 py-0.5 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 active:translate-y-0.5"
                          >
                            <i className={cn("ph", copiedCode ? "ph-check-square" : "ph-copy")}></i>
                            {copiedCode ? t.copiedFeedback : t.copyBtn}
                          </button>
                        </div>
                        {/* Code Area */}
                        <pre className="p-4 overflow-x-auto max-h-[350px] scrollbar-thin select-text text-left text-emerald-400 font-semibold leading-relaxed">
                          <code>{selectedItem.iacCode}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Explore Button */}
                  {selectedItem.link && (
                    <div className="pt-4 flex select-none">
                      {selectedItem.link.startsWith("/") ? (
                        <a href={selectedItem.link} className="w-full sm:w-auto">
                          <Button variant="default" className="w-full font-mono font-black text-sm cursor-pointer border-4 border-brutal-black shadow-brutal bg-red-600 hover:bg-red-700 text-white py-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-brutal-sm transition-all flex items-center justify-center gap-2">
                            <i className="ph ph-globe"></i>
                            {t.linkButton}
                          </Button>
                        </a>
                      ) : (
                        <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                          <Button variant="default" className="w-full font-mono font-black text-sm cursor-pointer border-4 border-brutal-black shadow-brutal bg-red-600 hover:bg-red-700 text-white py-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-brutal-sm transition-all flex items-center justify-center gap-2">
                            <i className="ph ph-github-logo"></i>
                            {t.linkButton}
                          </Button>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Technical annotation footer */}
                  <div className="mt-auto border-t border-dashed border-brutal-gray/20 pt-6 font-mono text-[10px] text-brutal-gray uppercase tracking-widest text-left select-none">
                    PROJ_REG // PROJECT_VERIFICATION_STATUS: DEPLOYED // NODE: RYZEN_PROD_01
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

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING PROJECTS DOSSIER BUFFER...</span>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
