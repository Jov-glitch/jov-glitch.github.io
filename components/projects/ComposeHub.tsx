"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import * as dockerData from "../../docker_stacks";

interface StackData {
  name: string;
  title: string;
  tag: string;
  environment: string;
  description: string;
  compose: string;
}

interface ComposeHubProps {
  lang: "es" | "en";
}

export function ComposeHub({ lang }: ComposeHubProps) {
  // Extract stacks starting with "docker_"
  const allStacks: StackData[] = Object.keys(dockerData)
    .filter((key) => key.startsWith("docker_"))
    .map((key) => (dockerData as any)[key] as StackData);

  const [activeTab, setActiveTab] = useState<"trabajo" | "homelab">("trabajo");
  const filteredStacks = allStacks.filter((s) => s.tag === activeTab);
  
  // Set default selected stack for the tab
  const [selectedStack, setSelectedStack] = useState<StackData>(
    filteredStacks[0] || allStacks[0]
  );

  // If tab changes, auto-select first stack of that tab
  const handleTabChange = (tab: "trabajo" | "homelab") => {
    setActiveTab(tab);
    const firstOfTab = allStacks.find((s) => s.tag === tab);
    if (firstOfTab) {
      setSelectedStack(firstOfTab);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedStack.compose);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    es: {
      sectionTitle: "Repositorio Docker Compose",
      sectionSubtitle: "Catálogo interactivo de infraestructura como código auto-hospedada.",
      tabWork: "Trabajo / Entorno Institucional",
      tabHomelab: "HomeLab / Red Personal",
      copyBtn: "Copiar YAML",
      copiedBtn: "¡Copiado!",
      sidebarTitle: "SELECCIONA UN STACK",
      noStacks: "No hay stacks disponibles para este entorno.",
      yamlHeader: "VIRTUAL_TERMINAL // DOCKER_COMPOSE.YML",
    },
    en: {
      sectionTitle: "Docker Compose Repository",
      sectionSubtitle: "Interactive catalog of self-hosted infrastructure as code.",
      tabWork: "Work / Institutional Environment",
      tabHomelab: "HomeLab / Personal Net",
      copyBtn: "Copy YAML",
      copiedBtn: "Copied!",
      sidebarTitle: "SELECT A STACK",
      noStacks: "No stacks available for this environment.",
      yamlHeader: "VIRTUAL_TERMINAL // DOCKER_COMPOSE.YML",
    },
  }[lang];

  return (
    <section id="compose-hub" className="py-24 px-4 bg-brutal-light border-t-4 border-brutal-black w-full select-none">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-cube"></i>
            {t.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto mb-6">
            {t.sectionSubtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-red mx-auto mb-8" />

          {/* Environment Tabs */}
          <div className="flex border-4 border-brutal-black font-mono text-sm max-w-xl mx-auto shadow-brutal">
            <button
              onClick={() => handleTabChange("trabajo")}
              className={`flex-1 py-3 px-4 font-bold cursor-pointer transition-colors border-r-4 border-brutal-black ${
                activeTab === "trabajo" ? "bg-brutal-red text-brutal-white" : "bg-brutal-white hover:bg-brutal-light text-brutal-black"
              }`}
            >
              {t.tabWork}
            </button>
            <button
              onClick={() => handleTabChange("homelab")}
              className={`flex-1 py-3 px-4 font-bold cursor-pointer transition-colors ${
                activeTab === "homelab" ? "bg-brutal-red text-brutal-white" : "bg-brutal-white hover:bg-brutal-light text-brutal-black"
              }`}
            >
              {t.tabHomelab}
            </button>
          </div>
        </motion.div>

        {/* Interactive Stacks Dashboard */}
        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stacks Sidebar Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-[580px] overflow-y-auto scrollbar-thin pr-2">
            <h3 className="font-mono font-bold text-xs uppercase text-brutal-gray tracking-wider mb-1">
              {t.sidebarTitle}
            </h3>
            {filteredStacks.length > 0 ? (
              filteredStacks.map((stack, idx) => {
                const isSelected = selectedStack.name === stack.name;
                return (
                  <button
                    key={stack.name}
                    onClick={() => setSelectedStack(stack)}
                    className={`w-full text-left p-4 border-2 border-brutal-black shadow-brutal-sm cursor-pointer transition-all ${
                      isSelected
                        ? "bg-brutal-black text-brutal-white -translate-y-1 shadow-brutal"
                        : "bg-brutal-white text-brutal-black hover:bg-brutal-light hover:-translate-y-0.5 hover:shadow-brutal"
                    }`}
                  >
                    <p className="font-mono text-[9px] uppercase opacity-75 font-semibold mb-1">
                      STACK 0{idx + 1}
                    </p>
                    <h4 className="font-mono font-bold text-sm sm:text-base uppercase tracking-wider truncate">
                      {stack.title}
                    </h4>
                  </button>
                );
              })
            ) : (
              <p className="text-sm font-mono text-brutal-gray">{t.noStacks}</p>
            )}
          </div>

          {/* Stacks Content Viewer */}
          <div className="lg:col-span-8">
            <Card brutal className="border-2 border-brutal-black p-0 h-[580px] flex flex-col bg-brutal-white">
              {/* Header Title Bar */}
              <div className="bg-brutal-black text-brutal-white p-3 flex justify-between items-center border-b-2 border-brutal-black select-none">
                <div className="font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brutal-green rounded-full animate-pulse inline-block"></span>
                  <span>{selectedStack.title.toUpperCase()}</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono px-2 py-0.5 border-brutal-white/40 text-brutal-white bg-transparent">
                  {selectedStack.environment}
                </Badge>
              </div>

              {/* Description box */}
              <div className="border-b-2 border-brutal-black bg-brutal-light/50 p-4">
                <h4 className="font-mono font-bold text-sm uppercase mb-1">
                  {selectedStack.name}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-brutal-dark leading-relaxed">
                  {selectedStack.description}
                </p>
              </div>

              {/* Terminal code view */}
              <div className="flex-1 bg-brutal-black text-brutal-green font-mono p-4 text-xs overflow-y-auto relative flex flex-col">
                <div className="text-brutal-gray pb-2 border-b border-brutal-dark/40 text-[10px] mb-3 flex justify-between items-center select-none">
                  <span>{t.yamlHeader}</span>
                  <Button
                    onClick={handleCopy}
                    variant="default"
                    className="h-6 text-[9px] bg-brutal-white text-brutal-black hover:bg-brutal-red hover:text-brutal-white transition-all cursor-pointer border border-brutal-black font-bold px-2 py-0 rounded-sm"
                  >
                    {copied ? t.copiedBtn : t.copyBtn}
                  </Button>
                </div>
                <pre className="flex-1 overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed select-text text-slate-100 selection:bg-brutal-red selection:text-white">
                  {selectedStack.compose}
                </pre>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
