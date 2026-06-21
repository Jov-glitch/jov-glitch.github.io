"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as dockerData from "@/data/docker_stacks";
import { useSearchParams, useRouter } from "next/navigation";

interface StackData {
  name: string;
  title: string;
  tag: string;
  environment: string;
  description: string;
  compose: string;
}

function WorkDemosContent() {
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

  // Extract stacks from TS data module
  const allStacks: StackData[] = Object.keys(dockerData)
    .filter((key) => key.startsWith("docker_"))
    .map((key) => (dockerData as any)[key] as StackData);

  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"trabajo" | "homelab">("trabajo");

  useEffect(() => {
    if (allStacks.length > 0) {
      const idx = idParam !== null ? parseInt(idParam, 10) : 0;
      const validIdx = !isNaN(idx) && idx >= 0 && idx < allStacks.length ? idx : 0;
      setSelectedIdx(validIdx);

      // Auto-set the active tab based on the selected stack's tag
      const stack = allStacks[validIdx];
      if (stack) {
        setActiveTab(stack.tag as "trabajo" | "homelab");
      }
    }
  }, [idParam]);

  const selectedStack = allStacks[selectedIdx] || null;

  const handleStackSelect = (idx: number) => {
    router.push(`/work-demos?id=${idx}`, { scroll: false });
  };

  const handleTabChange = (tab: "trabajo" | "homelab") => {
    // Find the first stack index of this tab
    const firstOfTab = allStacks.findIndex((s) => s.tag === tab);
    if (firstOfTab !== -1) {
      router.push(`/work-demos?id=${firstOfTab}`, { scroll: false });
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredStacks = allStacks
    .map((stack, idx) => ({ ...stack, globalIdx: idx }))
    .filter((s) => s.tag === activeTab);

  const t = {
    es: {
      backBtn: "Volver a Inicio",
      pageTitle: "Wiki de Demos de Trabajo",
      pageSubtitle: "Repositorio de infraestructura como código auto-hospedada y automatización local.",
      detailsLabel: "Archivo de Configuración Compose",
      descriptionLabel: "Detalles del Stack",
      tabWork: "Trabajo / Institucional",
      tabHomelab: "HomeLab / Personal",
      copyBtn: "Copiar YAML",
      copiedFeedback: "Copiado",
      sidebarTitle: "ÍNDICE DE STACKS",
      noStacks: "No hay stacks para este entorno.",
      skills: "Habilidades",
      projects: "Proyectos",
      ecosystem: "Ecosistema CEV",
      experience: "Experiencia",
      workDemos: "Demos de Trabajo",
    },
    en: {
      backBtn: "Back to Home",
      pageTitle: "Work Demos Wiki",
      pageSubtitle: "Repository of self-hosted infrastructure as code and local orchestration.",
      detailsLabel: "Compose Configuration File",
      descriptionLabel: "Stack Details",
      tabWork: "Work / Institutional",
      tabHomelab: "HomeLab / Personal",
      copyBtn: "Copy YAML",
      copiedFeedback: "Copied",
      sidebarTitle: "STACKS INDEX",
      noStacks: "No stacks for this environment.",
      skills: "Skills",
      projects: "Projects",
      ecosystem: "CEV Ecosystem",
      experience: "Experience",
      workDemos: "Work Demos",
    },
  }[lang];

  if (!mounted || !selectedStack) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING STACKS DATA BUFFER...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brutal-white text-brutal-black selection:bg-amber-600 selection:text-white font-mono flex flex-col pt-16">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brutal-white border-b-4 border-brutal-black select-none font-mono">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Brand with Amber pulsing dot */}
          <a href="/" className="flex items-center gap-2 font-black text-lg sm:text-xl uppercase tracking-tighter">
            <span className="w-3.5 h-3.5 bg-amber-600 border-2 border-brutal-black rounded-full inline-block animate-pulse"></span>
            <span>JV_SYSTEM_v2</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="/#experience" className="hover:text-amber-600 hover:underline transition-all">
              {t.experience}
            </a>
            <a href="/#skills" className="hover:text-amber-600 hover:underline transition-all">
              {t.skills}
            </a>
            <a href="/#projects" className="hover:text-amber-600 hover:underline transition-all">
              {t.projects}
            </a>
            <a href="/#ecosystem" className="hover:text-amber-600 hover:underline transition-all">
              {t.ecosystem}
            </a>
            <a href="/work-demos" className="hover:text-amber-600 hover:underline transition-all">
              {t.workDemos}
            </a>

            <div className="h-6 w-0.5 bg-brutal-black mx-2" />

            {/* Language Toggle */}
            <div className="flex border-2 border-brutal-black font-mono text-xs">
              <button
                onClick={() => handleLangChange("es")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                  lang === "es" ? "bg-amber-600 text-white" : "bg-white hover:bg-brutal-light"
                )}
              >
                ES
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors",
                  lang === "en" ? "bg-amber-600 text-white" : "bg-white hover:bg-brutal-light"
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
            
            <a href="/" className="border-2 border-brutal-black bg-brutal-black text-white px-2 py-1 text-xs font-bold font-mono hover:bg-amber-600 cursor-pointer">
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
          
          {/* Environment Tabs */}
          <div className="flex border-4 border-brutal-black font-mono text-xs shadow-brutal-sm">
            <button
              onClick={() => handleTabChange("trabajo")}
              className={cn(
                "flex-1 py-2.5 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                activeTab === "trabajo" ? "bg-amber-600 text-white" : "bg-white hover:bg-brutal-light"
              )}
            >
              {t.tabWork}
            </button>
            <button
              onClick={() => handleTabChange("homelab")}
              className={cn(
                "flex-1 py-2.5 font-bold cursor-pointer transition-colors",
                activeTab === "homelab" ? "bg-amber-600 text-white" : "bg-white hover:bg-brutal-light"
              )}
            >
              {t.tabHomelab}
            </button>
          </div>

          <h3 className="font-mono font-bold text-xs uppercase text-brutal-gray tracking-wider mt-2 text-left select-none font-semibold">
            {t.sidebarTitle}
          </h3>

          {/* List Stacks */}
          <div className="flex-1 border-4 border-brutal-black bg-white p-4 shadow-brutal flex flex-col gap-2 overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-19rem)] scrollbar-thin">
            {filteredStacks.length > 0 ? (
              filteredStacks.map((stack, idx) => {
                const isSelected = selectedIdx === stack.globalIdx;
                return (
                  <button
                    key={stack.name}
                    onClick={() => handleStackSelect(stack.globalIdx)}
                    className={cn(
                      "w-full text-left p-4 border-2 border-brutal-black text-xs font-bold transition-all cursor-pointer shadow-brutal-sm",
                      isSelected
                        ? "bg-amber-600 text-white -translate-y-1 shadow-brutal border-brutal-black"
                        : "bg-brutal-light text-brutal-black hover:bg-white hover:-translate-y-0.5 hover:shadow-brutal-sm"
                    )}
                  >
                    <p className={cn(
                      "font-mono text-[9px] uppercase font-semibold mb-1",
                      isSelected ? "text-amber-200" : "text-brutal-gray"
                    )}>
                      STACK 0{idx + 1}
                    </p>
                    <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider leading-snug break-words">
                      {stack.title}
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="text-xs font-mono text-brutal-gray text-center py-4">{t.noStacks}</p>
            )}
          </div>
        </aside>

        {/* Right Panel (Wiki Content) */}
        <section className="flex-1 flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStack.name}
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
                    <span>{selectedStack.title.toUpperCase()}</span>
                  </div>
                  <div className="text-[10px] text-brutal-gray font-mono uppercase hidden sm:block">
                    DOCKER_ENGINE // STATUS: RUNNING
                  </div>
                </div>

                {/* Wiki Header Banner (Amber Style) */}
                <div className="bg-amber-600 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-brutal-black text-left select-none relative">
                  <div className="scanlines-overlay opacity-10 absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                  <div className="space-y-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-amber-800 border border-amber-500 rounded-none">
                        <i className="ph ph-cube text-white text-xl"></i>
                      </div>
                      <Badge variant="default" className="text-[10px] font-mono tracking-wider uppercase bg-brutal-black text-white border-none rounded-none py-0.5 px-2">
                        {selectedStack.environment}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-mono font-black uppercase tracking-tight leading-tight">
                      {selectedStack.name}
                    </CardTitle>
                  </div>
                </div>

                {/* Wiki Main Content Body */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[80vh] lg:max-h-[calc(100vh-22rem)] scrollbar-thin select-text">
                  
                  {/* Description Box */}
                  <div className="space-y-2 text-left">
                    <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-600 border-b-2 border-dashed border-amber-600 pb-2 flex items-center gap-2 select-none">
                      <i className="ph ph-info text-base"></i>
                      {t.descriptionLabel}
                    </h4>
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-600 text-amber-955 text-justify text-sm leading-relaxed font-sans font-medium shadow-inner">
                      "{selectedStack.description}"
                    </div>
                  </div>

                  {/* Docker Compose YAML Code Box */}
                  <div className="space-y-2">
                    <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-600 border-b-2 border-dashed border-amber-600 pb-2 flex items-center gap-2 text-left select-none">
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
                          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider ml-2">docker-compose.yml</span>
                        </div>
                        <button
                          onClick={() => handleCopy(selectedStack.compose)}
                          className="border border-neutral-700 bg-neutral-800 hover:bg-amber-600 text-neutral-300 hover:text-white px-2 py-0.5 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 active:translate-y-0.5"
                        >
                          <i className={cn("ph", copiedCode ? "ph-check-square" : "ph-copy")}></i>
                          {copiedCode ? t.copiedFeedback : t.copyBtn}
                        </button>
                      </div>
                      {/* Code Area */}
                      <pre className="p-4 overflow-x-auto max-h-[350px] scrollbar-thin select-text text-left text-slate-100 font-semibold leading-relaxed">
                        <code>{selectedStack.compose}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Technical annotation footer */}
                  <div className="mt-auto border-t border-dashed border-brutal-gray/20 pt-6 font-mono text-[10px] text-brutal-gray uppercase tracking-widest text-left select-none">
                    COMPOSE_HUB_REG // ORCHESTRATOR: DOCKER_SWARM // NODE: homelab_servers
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

export default function WorkDemosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING WORK DEMOS DOSSIER BUFFER...</span>
      </div>
    }>
      <WorkDemosContent />
    </Suspense>
  );
}
