"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import * as dataEn from "@/data";
import * as dataEs from "@/data_es";

export default function MinecraftProjectPage() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

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
  const { minecraftEvent } = activeData;

  const copyIp = () => {
    navigator.clipboard.writeText(minecraftEvent.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    es: {
      backBtn: "← Volver al Inicio",
      pageTitle: "🧱 Archivo del Servidor Minecraft",
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
    },
    en: {
      backBtn: "← Back to Home",
      pageTitle: "🧱 Minecraft Server Archive",
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
    },
  }[lang];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold select-none">
        <span>LOADING RESOURCE BUFFER...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brutal-white text-brutal-black selection:bg-brutal-red selection:text-brutal-white font-mono p-4 sm:p-6 md:p-8">
      {/* Top Bar Navigation */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b-4 border-brutal-black pb-4 select-none">
        <a href="/">
          <Button variant="default" className="font-mono font-bold text-xs cursor-pointer border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-0.5">
            {t.backBtn}
          </Button>
        </a>

        {/* Language selector */}
        <div className="flex border-2 border-brutal-black font-mono text-xs shadow-brutal-sm">
          <button
            onClick={() => handleLangChange("es")}
            className={`px-3 py-1 font-bold cursor-pointer transition-colors border-r-2 border-brutal-black ${
              lang === "es" ? "bg-brutal-red text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => handleLangChange("en")}
            className={`px-3 py-1 font-bold cursor-pointer transition-colors ${
              lang === "en" ? "bg-brutal-red text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Page Layout */}
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        {/* Header Titles */}
        <motion.div variants={staggerItemVariants} className="text-center mb-16 select-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            {t.pageTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto">
            {t.pageSubtitle}
          </p>
          <div className="h-1.5 w-24 bg-brutal-red mx-auto mt-6" />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={staggerItemVariants}>
              <Card brutal className="relative overflow-hidden bg-brutal-white border-2 border-brutal-black shadow-brutal">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brutal-red" />
                <CardHeader>
                  <CardTitle className="text-2xl mb-1">{minecraftEvent.title}</CardTitle>
                  <p className="text-xs text-brutal-gray font-mono uppercase tracking-wider">{minecraftEvent.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* IP connection box */}
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
                    <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-red">
                      [ {t.aboutTitle} ]
                    </h4>
                    <p className="font-sans font-medium text-slate-700">{minecraftEvent.aboutEvent}</p>
                  </div>

                  {/* ModPack Info */}
                  <div className="border-t-2 border-brutal-black pt-6 space-y-4">
                    <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-red">
                      [ {t.modpackTitle} ]
                    </h4>
                    <p className="text-sm leading-relaxed font-sans font-medium text-slate-700">{minecraftEvent.modpack.description}</p>
                    <div className="bg-yellow-50 border-2 border-yellow-500/30 p-3 text-xs text-yellow-900 font-mono shadow-brutal-sm">
                      <span className="font-black">💡 {t.instructions}</span> {minecraftEvent.modpack.instructions}
                    </div>
                    <a href={minecraftEvent.modpack.link} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full font-mono text-xs cursor-pointer border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-0.5">
                        📥 {t.downloadZip}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gamer story card */}
            <motion.div variants={staggerItemVariants}>
              <Card brutal className="bg-brutal-black text-brutal-white border-2 border-brutal-black shadow-brutal select-text">
                <CardHeader>
                  <CardTitle className="text-xl text-brutal-red font-mono uppercase tracking-wider">
                    🎮 {t.gamerTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-brutal-light font-serif italic text-justify">
                  "{minecraftEvent.gamerStory}"
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Rules card */}
            <motion.div variants={staggerItemVariants}>
              <Card brutal className="bg-brutal-white border-2 border-brutal-black shadow-brutal">
                <CardHeader>
                  <CardTitle className="text-xl uppercase tracking-wider flex items-center gap-2">
                    <span>📜</span> {t.rulesTitle}
                  </CardTitle>
                  <div className="h-0.5 w-12 bg-brutal-red mt-2" />
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {minecraftEvent.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3 items-start border-b-2 border-brutal-light pb-3 last:border-0 last:pb-0">
                        <span className="w-6 h-6 rounded-full bg-brutal-black text-brutal-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 border border-brutal-black">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-mono font-bold text-sm uppercase text-brutal-black">{rule.title}</h4>
                          <p className="text-xs text-brutal-gray font-sans font-medium mt-1">{rule.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Server architecture card */}
            <motion.div variants={staggerItemVariants}>
              <Card brutal className="bg-brutal-white border-2 border-brutal-black shadow-brutal">
                <CardHeader>
                  <CardTitle className="text-xl uppercase tracking-wider flex items-center gap-2">
                    <span>⚙️</span> {t.archTitle}
                  </CardTitle>
                  <div className="h-0.5 w-12 bg-brutal-red mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {minecraftEvent.architecture.map((layer, idx) => (
                    <div key={idx} className="space-y-1.5 border-b border-dashed border-brutal-gray/20 pb-3 last:border-0 last:pb-0">
                      <h4 className="font-mono font-bold text-xs uppercase text-brutal-red">
                        {layer.title}
                      </h4>
                      <ul className="space-y-1 text-xs font-mono text-brutal-dark">
                        {layer.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex gap-2 items-start">
                            <span>❯</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
