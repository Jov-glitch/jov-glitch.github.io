"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import * as dataEn from "@/data/data";
import * as dataEs from "@/data/data_es";

interface MonitoringItem {
  title: string;
  description: string;
  dashboard_url: string;
}

interface RuleItem {
  title: string;
  desc: string;
}

interface ArchLayer {
  title: string;
  details: string[];
}

interface MinecraftEvent {
  title: string;
  description: string;
  serverIp: string;
  mapLink: string;
  aboutEvent: string;
  gamerStory: string;
  modpack: {
    link: string;
    description: string;
    instructions: string;
  };
  rules: RuleItem[];
  architecture: ArchLayer[];
  monitoring: MonitoringItem[];
}

function MinecraftProjectContent() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulated metrics state for live network visualization
  const [sysCpu, setSysCpu] = useState(12);
  const [sysRam, setSysRam] = useState(48);
  const [sysNetwork, setSysNetwork] = useState(120);

  useEffect(() => {
    // Sync language from localStorage if available
    const savedLang = localStorage.getItem("portfolio_lang") as "es" | "en";
    if (savedLang) setLang(savedLang);
    setMounted(true);

    // Telemetry ticker
    const interval = setInterval(() => {
      setSysCpu(Math.floor(Math.random() * 20 + 8)); // 8% - 28%
      setSysRam((prev) => {
        const diff = Math.random() * 2 - 1;
        const next = prev + diff;
        return Number(Math.min(Math.max(next, 47), 51).toFixed(1));
      });
      setSysNetwork(Math.floor(Math.random() * 40 + 100)); // 100 - 140 kb/s
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleLangChange = (l: "es" | "en") => {
    setLang(l);
    localStorage.setItem("portfolio_lang", l);
  };

  const activeData = lang === "es" ? dataEs : dataEn;
  const { minecraftEvent } = activeData;

  const copyIp = () => {
    navigator.clipboard.writeText(minecraftEvent.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    es: {
      backBtn: "Volver al Inicio",
      pageTitle: "Archivo del Servidor Minecraft",
      pageSubtitle: "Detalles técnicos, reglas y documentación de la infraestructura temporal.",
      aboutTitle: "Sobre el Evento",
      modpackTitle: "ModPack Oficial",
      downloadZip: "Descargar Modpack (.zip)",
      gamerTitle: "Historia Gamer",
      rulesTitle: "Reglas de Convivencia",
      archTitle: "Arquitectura del Servidor",
      instructions: "INSTRUCCIONES:",
      copyIpBtn: "COPIAR IP",
      copiedIpBtn: "¡COPIADO!",
      telemetryTitle: "Telemetría en Vivo & Monitoreo",
      telemetrySubtitle: "Métricas del servidor en tiempo real y paneles de control dedicados.",
      sysCpu: "Carga del CPU",
      sysRam: "RAM Física",
      sysNetwork: "Tráfico de Red",
      collapseBtn: "[- Ocultar Panel]",
      deployBtn: "[+ Desplegar Telemetría]",
      skills: "Habilidades",
      projects: "Proyectos",
      ecosystem: "Ecosistema CEV",
      experience: "Experiencia",
      workDemos: "Demos de Trabajo",
    },
    en: {
      backBtn: "Back to Home",
      pageTitle: "Minecraft Server Archive",
      pageSubtitle: "Technical details, rules, and documentation of the temporary infrastructure.",
      aboutTitle: "About the Event",
      modpackTitle: "Official ModPack",
      downloadZip: "Download Modpack (.zip)",
      gamerTitle: "Gamer Story",
      rulesTitle: "Server Rules",
      archTitle: "Server Architecture",
      instructions: "INSTRUCTIONS:",
      copyIpBtn: "COPY IP",
      copiedIpBtn: "COPIED!",
      telemetryTitle: "Live Telemetry & Monitoring",
      telemetrySubtitle: "Real-time node metrics and dedicated console dashboards.",
      sysCpu: "CPU Load",
      sysRam: "Physical RAM",
      sysNetwork: "Network Traffic",
      collapseBtn: "[- Collapse Panel]",
      deployBtn: "[+ Deploy Telemetry]",
      skills: "Skills",
      projects: "Projects",
      ecosystem: "CEV Ecosystem",
      experience: "Experience",
      workDemos: "Work Demos",
    },
  }[lang];

  // Helper to parse markdown links: [Text](URL)
  const renderRichText = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [_, linkText, url] = match;
        return (
          <a
            key={index}
            href={url}
            className="text-orange-600 hover:text-brutal-black hover:underline font-mono font-black transition-colors inline-flex items-center gap-0.5 mx-0.5"
          >
            <span>{linkText}</span>
            <i className="ph ph-arrow-up-right text-[9px] flex-shrink-0"></i>
          </a>
        );
      }
      return part.replace(/\*\*/g, "");
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING RESOURCE BUFFER...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brutal-white text-brutal-black selection:bg-orange-600 selection:text-white font-mono flex flex-col pt-16">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brutal-white border-b-4 border-brutal-black select-none font-mono">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Brand with Orange pulsing dot */}
          <a href="/" className="flex items-center gap-2 font-black text-lg sm:text-xl uppercase tracking-tighter">
            <span className="w-3.5 h-3.5 bg-orange-600 border-2 border-brutal-black rounded-full inline-block animate-pulse"></span>
            <span>JV_SYSTEM_v2</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="/#experience" className="hover:text-orange-600 hover:underline transition-all">
              {t.experience}
            </a>
            <a href="/#skills" className="hover:text-orange-600 hover:underline transition-all">
              {t.skills}
            </a>
            <a href="/#projects" className="hover:text-orange-600 hover:underline transition-all">
              {t.projects}
            </a>
            <a href="/#ecosystem" className="hover:text-orange-600 hover:underline transition-all">
              {t.ecosystem}
            </a>
            <a href="/work-demos" className="hover:text-orange-600 hover:underline transition-all">
              {t.workDemos}
            </a>

            <div className="h-6 w-0.5 bg-brutal-black mx-2" />

            {/* Language Toggle */}
            <div className="flex border-2 border-brutal-black font-mono text-xs">
              <button
                onClick={() => handleLangChange("es")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black",
                  lang === "es" ? "bg-orange-600 text-white" : "bg-white hover:bg-brutal-light"
                )}
              >
                ES
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={cn(
                  "px-2.5 py-1 font-bold cursor-pointer transition-colors",
                  lang === "en" ? "bg-orange-600 text-white" : "bg-white hover:bg-brutal-light"
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
            
            <a href="/" className="border-2 border-brutal-black bg-brutal-black text-white px-2 py-1 text-xs font-bold font-mono hover:bg-orange-600 cursor-pointer">
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

      {/* Main Page Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-12 select-none">
        
        {/* Header Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="text-center flex flex-col items-center mt-6"
        >
          <motion.div variants={staggerItemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
              <i className="ph ph-cube text-orange-600"></i>
              {t.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto">
              {t.pageSubtitle}
            </p>
            <div className="h-1.5 w-24 bg-orange-600 mx-auto mt-6" />
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Event Info Card */}
            <Card brutal className="relative overflow-hidden bg-brutal-white border-4 border-brutal-black shadow-brutal p-0">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-600" />
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl sm:text-2xl mb-1">{minecraftEvent.title}</CardTitle>
                <p className="text-[10px] text-brutal-gray font-mono uppercase tracking-wider">{minecraftEvent.description}</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* IP Connection box */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-brutal-light p-4 border-2 border-brutal-black shadow-brutal-sm">
                  <div className="flex-1 font-mono text-sm">
                    <span className="text-brutal-gray font-bold">IP:</span>{" "}
                    <span className="font-black text-base select-all text-brutal-black">{minecraftEvent.serverIp}</span>
                  </div>
                  <Button onClick={copyIp} variant={copied ? "secondary" : "default"} className="font-mono text-xs cursor-pointer border-2 border-brutal-black shadow-brutal-sm">
                    {copied ? t.copiedIpBtn : t.copyIpBtn}
                  </Button>
                </div>

                {/* About Info */}
                <div className="border-t-2 border-brutal-black pt-6 space-y-3 text-sm leading-relaxed text-brutal-dark">
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-orange-600">
                    [ {t.aboutTitle} ]
                  </h4>
                  <p className="font-sans font-medium text-slate-700">{minecraftEvent.aboutEvent}</p>
                </div>

                {/* ModPack Info */}
                <div className="border-t-2 border-brutal-black pt-6 space-y-4">
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-orange-600">
                    [ {t.modpackTitle} ]
                  </h4>
                  <p className="text-sm leading-relaxed font-sans font-medium text-slate-700">{minecraftEvent.modpack.description}</p>
                  <div className="bg-orange-50 border-2 border-orange-500/30 p-3 text-xs text-orange-950 font-mono shadow-brutal-sm">
                    <span className="font-black"><i className="ph ph-lightbulb mr-1.5"></i>{t.instructions}</span> {minecraftEvent.modpack.instructions}
                  </div>
                  <a href={minecraftEvent.modpack.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full font-mono text-xs cursor-pointer border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 flex items-center justify-center gap-2">
                      <i className="ph ph-download-simple"></i>
                      {t.downloadZip}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Gamer Story */}
            <Card brutal className="bg-brutal-black text-brutal-white border-4 border-brutal-black shadow-brutal select-text p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg sm:text-xl text-orange-600 font-mono uppercase tracking-wider flex items-center gap-2">
                  <i className="ph ph-game-controller"></i>
                  {t.gamerTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-sm leading-relaxed text-brutal-light font-serif italic text-justify">
                "{minecraftEvent.gamerStory}"
              </CardContent>
            </Card>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Rules card */}
            <Card brutal className="bg-brutal-white border-4 border-brutal-black shadow-brutal p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg uppercase tracking-wider flex items-center gap-2">
                  <i className="ph ph-scroll"></i>
                  {t.rulesTitle}
                </CardTitle>
                <div className="h-0.5 w-12 bg-orange-600 mt-2" />
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4">
                  {minecraftEvent.rules.map((rule, idx) => (
                    <li key={idx} className="flex gap-3 items-start border-b-2 border-brutal-light pb-3 last:border-0 last:pb-0">
                      <span className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 border border-brutal-black">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-mono font-bold text-xs uppercase text-brutal-black">{rule.title}</h4>
                        <p className="text-[11px] text-brutal-gray font-sans font-medium mt-1">{rule.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Server architecture card */}
            <Card brutal className="bg-brutal-white border-4 border-brutal-black shadow-brutal p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg uppercase tracking-wider flex items-center gap-2">
                  <i className="ph ph-cpu"></i>
                  {t.archTitle}
                </CardTitle>
                <div className="h-0.5 w-12 bg-orange-600 mt-2" />
              </CardHeader>
              <CardContent className="p-0 space-y-4 select-text">
                {minecraftEvent.architecture.map((layer, idx) => (
                  <div key={idx} className="space-y-1.5 border-b border-dashed border-brutal-gray/20 pb-3 last:border-0 last:pb-0">
                    <h4 className="font-mono font-bold text-xs uppercase text-orange-600">
                      {layer.title}
                    </h4>
                    <ul className="space-y-1 text-[11px] font-mono text-brutal-dark">
                      {layer.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex gap-2 items-start">
                          <span className="text-orange-600 font-bold">❯</span>
                          <span>{renderRichText(detail)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Live Telemetry & Monitoring Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
          className="space-y-8 mt-6"
        >
          <div className="border-t-4 border-brutal-black pt-12 text-center">
            <h2 className="text-2xl sm:text-4xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
              <i className="ph ph-chart-bar animate-pulse text-orange-600"></i>
              {t.telemetryTitle}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-brutal-gray uppercase tracking-widest max-w-xl mx-auto mb-6">
              {t.telemetrySubtitle}
            </p>
            <div className="h-1 w-20 bg-orange-600 mx-auto" />
          </div>

          {/* Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card brutal className="bg-brutal-black text-brutal-green p-5 border-2 border-brutal-black flex flex-col justify-between select-none shadow-brutal-sm">
              <div className="font-mono text-[10px] text-brutal-gray uppercase">{t.sysCpu}</div>
              <div className="font-mono text-3xl font-bold my-3 text-center">
                {sysCpu}%
              </div>
              <div className="w-full bg-brutal-dark h-2 rounded-full overflow-hidden border border-brutal-gray/30">
                <div className="bg-brutal-green h-full transition-all duration-300" style={{ width: `${sysCpu}%` }}></div>
              </div>
            </Card>

            <Card brutal className="bg-brutal-black text-brutal-green p-5 border-2 border-brutal-black flex flex-col justify-between select-none shadow-brutal-sm">
              <div className="font-mono text-[10px] text-brutal-gray uppercase">{t.sysRam}</div>
              <div className="font-mono text-3xl font-bold my-3 text-center">
                {sysRam} <span className="text-sm text-brutal-gray">GiB</span>
              </div>
              <div className="w-full bg-brutal-dark h-2 rounded-full overflow-hidden border border-brutal-gray/30">
                <div className="bg-brutal-green h-full transition-all duration-300" style={{ width: `${(sysRam / 64) * 100}%` }}></div>
              </div>
            </Card>

            <Card brutal className="bg-brutal-black text-brutal-green p-5 border-2 border-brutal-black flex flex-col justify-between select-none shadow-brutal-sm">
              <div className="font-mono text-[10px] text-brutal-gray uppercase">{t.sysNetwork}</div>
              <div className="font-mono text-3xl font-bold my-3 text-center">
                {sysNetwork} <span className="text-sm text-brutal-gray">kb/s</span>
              </div>
              <div className="flex gap-1 justify-center h-4 items-end mt-1">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-brutal-green w-1 rounded-sm transition-all duration-500"
                    style={{ height: `${Math.floor(Math.random() * 12 + 2)}px` }}
                  ></div>
                ))}
              </div>
            </Card>
          </div>

          {/* Embedded Datadog iFrames */}
          <div className="space-y-6 pt-4">
            {minecraftEvent.monitoring && minecraftEvent.monitoring.map((mon) => {
              const isOpened = activeDashboard === mon.title;

              return (
                <div key={mon.title}>
                  <Card brutal className="bg-brutal-white border-4 border-brutal-black overflow-hidden flex flex-col shadow-brutal">
                    <div className="p-6 border-b-2 border-brutal-black bg-brutal-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                      <div className="space-y-1">
                        <h3 className="font-mono font-bold text-base text-brutal-black">{mon.title}</h3>
                        <p className="text-xs text-brutal-gray font-mono max-w-xl">{mon.description}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          onClick={() => setActiveDashboard(isOpened ? null : mon.title)}
                          variant="default"
                          className="font-mono text-xs cursor-pointer flex-1 sm:flex-none text-center border-2 border-brutal-black shadow-brutal-sm"
                        >
                          {isOpened ? t.collapseBtn : t.deployBtn}
                        </Button>
                        <a href={mon.dashboard_url} target="_blank" rel="noopener noreferrer" className="block w-auto">
                          <Button variant="outline" className="font-mono text-xs cursor-pointer flex items-center justify-center gap-1 border-2 border-brutal-black shadow-brutal-sm">
                            <i className="ph ph-arrow-square-out text-sm"></i>
                          </Button>
                        </a>
                      </div>
                    </div>

                    {isOpened && (
                      <div className="border-t border-brutal-black bg-brutal-dark h-[450px] w-full relative">
                        {/* Simulated loading screen */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-brutal-white gap-3 z-0 pointer-events-none">
                          <span className="text-lg font-mono animate-pulse">ESTABLISHING ENCRYPTED SECURE LINK TO DATADOG...</span>
                          <span className="text-[10px] text-brutal-gray font-mono">IFRAME DATA STREAMING</span>
                        </div>
                        <iframe
                          src={mon.dashboard_url}
                          title={mon.title}
                          loading="lazy"
                          className="w-full h-full border-0 relative z-10 bg-transparent"
                        />
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </main>
  );
}

export default function MinecraftProjectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING RESOURCE BUFFER...</span>
      </div>
    }>
      <MinecraftProjectContent />
    </Suspense>
  );
}
