"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import { InfrastructureBlueprint } from "@/components/projects/InfrastructureBlueprint";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  stack: string[];
  description: string;
  solution_rationale: string;
  iacCode?: string;
  engineering?: Record<
    string,
    {
      concept: string;
      features: string[];
    } | undefined
  >;
}

interface EcosystemProps {
  ecosystem: {
    title: string;
    subtitle: string;
    tagline: string;
    stack: string[];
    overview: {
      problem: string;
      solution: string;
      impact: string;
    };
    modules: Module[];
  };
  lang: "es" | "en";
}

// Simulated real-time logs for each module to show in the live console
const MODULE_LOGS: Record<string, string[]> = {
  "cev-maestro": [
    "[INFO] Initializing Cev-Local Admin Vault...",
    "[OK] Identity verified: Admin Token bound to local MAC address.",
    "[INFO] Executing Timed Security check...",
    "[OK] High-density data downloads locked. Deferred download protocol active.",
    "[INFO] Scanning academic records... 12,492 records verified.",
    "[WARN] Detected 3 character discrepancies in historical table. Auto-sanitizing...",
    "[OK] Table records alignment completed.",
    "[INFO] System sandboxed. Production DB protected.",
    "[SUCCESS] CEV Master System status: IDLE // 100% stable."
  ],
  "diana-api": [
    "[INFO] Launching Diana API Core...",
    "[INFO] Laravel 11.x boot success. API route cache loaded.",
    "[DB] Triggers verify: SQL Inmutable triggers active on system catalogs.",
    "[REQ] GET /api/v1/auth/session - Token validated. User: admin-cev",
    "[REQ] POST /api/v1/sync/delta - 12 changes detected. Processing triggers...",
    "[DB] IP check: Sync requested from auth-node. VPN route confirmed.",
    "[REQ] GET /api/v1/students/records - 200 OK - 8.4ms",
    "[SECURITY] Single-Session Policy check: Active. No duplicate sessions found.",
    "[SUCCESS] Diana API Middleware: Running // Latency 8ms"
  ],
  "secure-infra-orch": [
    "[INFO] Mapping network mesh virtual topology...",
    "[VPN] Tailscale interface utun8 up. IP: 100.82.90.1",
    "[FIREWALL] OPNsense rule loaded: Drop all WAN packets targeting local port 3306.",
    "[INFO] Testing private DNS recursions... mc-server-violet.red -> 100.82.90.4 [OK]",
    "[DOCKER] Spawning swarm containers: reverse-proxy, metrics-collector, portainer",
    "[MONITORING] Datadog agent reporting telemetry packets to us5.datadoghq.com",
    "[SECURITY] Port scanner defense active. Stealth infrastructure mask enabled.",
    "[SUCCESS] Mesh VPN zero-trust perimeter verified. System invisible to WAN."
  ],
  "restoration-engine": [
    "[INFO] Triggering restoration script engine...",
    "[INFO] Backup file source verified: backup_master_2026.cevsys",
    "[INFO] Reading metadata signature... Verifying checksums... [OK]",
    "[DB] Dropping legacy tables. Rebuilding clean relational schema...",
    "[DB] Executing dynamic queries differential patch...",
    "[DB] Applying sanitization algorithms to sensitive records...",
    "[SUCCESS] Database patched to schema v4.2.1",
    "[RTO] Restoration execution completed. Time: 4.8 seconds.",
    "[SUCCESS] System state: IDLE // Disaster Recovery Ready."
  ]
};

export function Ecosystem({ ecosystem, lang }: EcosystemProps) {
  const [selectedModule, setSelectedModule] = useState<Module>(ecosystem.modules[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "engineering" | "console" | "code">("overview");
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Console state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConsoleRunning, setIsConsoleRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update selected module if language switches
  useEffect(() => {
    const updated = ecosystem.modules.find(m => m.id === selectedModule.id) || ecosystem.modules[0];
    setSelectedModule(updated);
  }, [ecosystem, selectedModule.id]);

  // Run simulated logs for the active module console
  const runConsoleSim = () => {
    setIsConsoleRunning(true);
    setConsoleLogs([]);
    const logs = MODULE_LOGS[selectedModule.id] || ["No logs available"];
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < logs.length) {
        setConsoleLogs(prev => [...prev, logs[current]]);
        current++;
      } else {
        setIsConsoleRunning(false);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    return runConsoleSim();
  }, [selectedModule.id]);

  // Scroll console to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleLogs, isConsoleRunning]);

  // Accent color mapping for the modules
  const getColors = (idx: number) => {
    const colors = [
      { border: "border-purple-600", bg: "bg-purple-600", text: "text-purple-600", shadow: "shadow-purple-950/20" },
      { border: "border-teal-600", bg: "bg-teal-600", text: "text-teal-600", shadow: "shadow-teal-950/20" },
      { border: "border-blue-600", bg: "bg-blue-600", text: "text-blue-600", shadow: "shadow-blue-950/20" },
      { border: "border-brutal-red", bg: "bg-brutal-red", text: "text-brutal-red", shadow: "shadow-red-950/20" }
    ];
    return colors[idx % colors.length];
  };

  const getModuleIndex = (id: string) => {
    return ecosystem.modules.findIndex(m => m.id === id);
  };

  const currentColors = getColors(getModuleIndex(selectedModule.id));

  const copyCodeToClipboard = () => {
    if (selectedModule.iacCode) {
      navigator.clipboard.writeText(selectedModule.iacCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section id="ecosystem" className="py-24 px-4 bg-brutal-white border-t-4 border-brutal-black w-full">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Title */}
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4">
            <span className="mr-2 sm:mr-3 inline-block">🏢</span>
            {lang === "es" ? "Ecosistema Digital UPN-162" : "UPN-162 Digital Ecosystem"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto mb-6">
            {ecosystem.subtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-red mx-auto mb-8" />
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {ecosystem.stack.map(tech => (
              <Badge key={tech} variant="default" className="text-xs bg-brutal-black text-brutal-white border-brutal-black font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Overview: Problem, Solution, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div variants={staggerItemVariants}>
            <Card brutal className="h-full border-t-4 border-t-brutal-red">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono text-brutal-red uppercase tracking-wider">
                  [ {lang === "es" ? "Espacio de Problema" : "Problem Space"} ]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-brutal-dark">{ecosystem.overview.problem}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={staggerItemVariants}>
            <Card brutal className="h-full border-t-4 border-t-brutal-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono text-brutal-black uppercase tracking-wider">
                  [ {lang === "es" ? "Solución Arquitectónica" : "Architecture Solution"} ]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-brutal-dark">{ecosystem.overview.solution}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={staggerItemVariants}>
            <Card brutal className="h-full border-t-4 border-t-brutal-green">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono text-brutal-green uppercase tracking-wider">
                  [ {lang === "es" ? "Impacto Operacional" : "Operational Impact"} ]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-brutal-dark">{ecosystem.overview.impact}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Interactive Modules Dashboard */}
        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-mono font-bold text-xs uppercase text-brutal-gray tracking-wider mb-2">
              {lang === "es" ? "SELECCIONA UN MÓDULO" : "SELECT A MODULE"}
            </h3>
            {ecosystem.modules.map((mod, idx) => {
              const colors = getColors(idx);
              const isSelected = selectedModule.id === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setSelectedModule(mod);
                    // Don't auto-reset architecture tab, since it's global
                    if (activeTab !== "architecture") {
                      setActiveTab("overview");
                    }
                  }}
                  className={`w-full text-left p-4 border-2 border-brutal-black shadow-brutal-sm cursor-pointer transition-all ${
                    isSelected
                      ? `${colors.bg} text-brutal-white -translate-y-1 shadow-brutal`
                      : "bg-brutal-light text-brutal-black hover:bg-brutal-white hover:-translate-y-0.5 hover:shadow-brutal"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase opacity-75 font-semibold mb-1">
                    MODULE 0{idx + 1}
                  </p>
                  <h4 className="font-mono font-bold text-sm sm:text-base uppercase tracking-wider truncate">
                    {mod.title.split(":")[0]}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Module Detail Panel (8 cols) */}
          <div className="lg:col-span-8">
            <Card brutal className={`relative ${currentColors.shadow} border-2 border-brutal-black p-0 h-[580px] flex flex-col`}>
              {/* Header Title Bar */}
              <div className="bg-brutal-black text-brutal-white p-3 flex justify-between items-center border-b-2 border-brutal-black select-none">
                <div className="font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brutal-green rounded-full animate-pulse inline-block"></span>
                  <span>{activeTab === "architecture" ? (lang === "es" ? "PLANO DE RED VIRTUAL" : "VIRTUAL NETWORK BLUEPRINT") : selectedModule.title.toUpperCase()}</span>
                </div>
                <div className="text-[10px] text-brutal-gray font-mono uppercase hidden sm:block">
                  {activeTab === "architecture" ? "UPN-162_TOPOLOGY" : selectedModule.subtitle}
                </div>
              </div>

              {/* Module Stack & Tabs */}
              <div className="border-b-2 border-brutal-black bg-brutal-light px-3 py-2 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                <div className="flex flex-wrap gap-1.5">
                  {selectedModule.stack.map(tech => (
                    <Badge key={tech} variant="outline" className="text-[10px] font-mono px-2 py-0.5 border-brutal-black bg-brutal-white">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap border border-brutal-black text-xs font-mono font-bold self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-3 py-1.5 cursor-pointer transition-colors border-r border-brutal-black ${
                      activeTab === "overview" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                    }`}
                  >
                    {lang === "es" ? "Resumen" : "Overview"}
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`px-3 py-1.5 cursor-pointer transition-colors border-r border-brutal-black ${
                      activeTab === "architecture" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                    }`}
                  >
                    {lang === "es" ? "Arquitectura" : "Architecture"}
                  </button>
                  <button
                    onClick={() => setActiveTab("engineering")}
                    className={`px-3 py-1.5 cursor-pointer transition-colors border-r border-brutal-black ${
                      activeTab === "engineering" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                    }`}
                  >
                    {lang === "es" ? "Ingeniería" : "Engineering"}
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1.5 cursor-pointer transition-colors border-r border-brutal-black ${
                      activeTab === "code" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                    }`}
                  >
                    {lang === "es" ? "Código IaC" : "IaC Code"}
                  </button>
                  <button
                    onClick={() => setActiveTab("console")}
                    className={`px-3 py-1.5 cursor-pointer transition-colors ${
                      activeTab === "console" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                    }`}
                  >
                    {lang === "es" ? "Terminal" : "Terminal"}
                  </button>
                </div>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 p-6 overflow-y-auto bg-brutal-white flex flex-col">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-gray mb-2">
                          [ {lang === "es" ? "DESCRIPCIÓN OPERATIVA" : "OPERATIONAL DESCRIPTION"} ]
                        </h4>
                        <p className="text-base sm:text-lg leading-relaxed text-brutal-black">
                          {selectedModule.description}
                        </p>
                      </div>

                      <div className="bg-brutal-light border-l-4 border-l-brutal-black p-4 mt-6">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-dark mb-1">
                          ⚡ {lang === "es" ? "Justificación de Ingeniería" : "Solution Rationale"}
                        </h4>
                        <p className="text-sm italic text-brutal-dark font-serif">
                          "{selectedModule.solution_rationale}"
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "architecture" && (
                    <motion.div
                      key="architecture"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full flex-1 flex flex-col justify-center"
                    >
                      <InfrastructureBlueprint lang={lang} />
                    </motion.div>
                  )}

                  {activeTab === "engineering" && (
                    <motion.div
                      key="engineering"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-gray">
                        [ {lang === "es" ? "PROFUNDIZACIÓN DE INGENIERÍA" : "ENGINEERING DEEP DIVE"} ]
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedModule.engineering &&
                          Object.entries(selectedModule.engineering).map(([key, details]) => {
                            if (!details) return null;
                            return (
                              <div key={key} className="border border-brutal-black p-4 rounded-brutal bg-brutal-light">
                                <h5 className="font-mono font-bold text-xs uppercase text-brutal-red mb-2">
                                  ❯ {key.toUpperCase()}: {details.concept}
                                </h5>
                                <ul className="space-y-1.5 font-mono text-[11px] text-brutal-dark">
                                  {details.features.map((feat, fidx) => (
                                    <li key={fidx} className="flex gap-2 items-start">
                                      <span className="text-brutal-black font-bold">#</span>
                                      <span>{feat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        {!selectedModule.engineering && (
                          <div className="col-span-2 p-6 border border-dashed border-brutal-gray/50 text-center font-mono text-xs text-brutal-gray">
                            {lang === "es" ? "Consulte el diagrama de red o la configuración de código para ver especificaciones." : "See network diagram or code configuration tabs for architecture specs."}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "code" && selectedModule.iacCode && (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col"
                    >
                      <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-gray">
                        [ {lang === "es" ? "CONFIGURACIÓN INFRAESTRUCTURA COMO CÓDIGO (IaC)" : "INFRASTRUCTURE AS CODE (IaC) CONFIGURATION"} ]
                      </h4>
                      <div className="relative border-2 border-brutal-black bg-brutal-black text-brutal-white font-mono p-4 text-xs rounded-brutal shadow-inner flex-1 max-h-[300px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap leading-relaxed select-text font-mono text-[11px]">
                          <code>{selectedModule.iacCode}</code>
                        </pre>
                        <button
                          onClick={copyCodeToClipboard}
                          className="absolute top-2 right-2 bg-brutal-light text-brutal-black border-2 border-brutal-black font-mono text-[9px] px-2 py-1 hover:bg-brutal-red hover:text-brutal-white transition-all cursor-pointer font-bold rounded-sm"
                        >
                          {copiedCode ? (lang === "es" ? "¡COPIADO!" : "COPIED!") : "COPY_CODE"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "console" && (
                    <motion.div
                      key="console"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col justify-between flex-1"
                    >
                      <div className="flex-1 bg-brutal-black text-brutal-green font-mono p-4 text-xs rounded-brutal h-[260px] overflow-y-auto flex flex-col gap-1.5 border border-brutal-black shadow-inner" ref={scrollRef}>
                        <div className="text-brutal-gray pb-2 border-b border-brutal-dark/40 text-[10px]">
                          UPN-162 CORE SYSTEM // MODULE: {selectedModule.id.toUpperCase()}
                        </div>
                        
                        {consoleLogs.map((log, idx) => {
                          if (!log) return null;
                          let color = "text-brutal-green";
                          if (log.includes("[ERROR]") || log.includes("[SECURITY]")) color = "text-brutal-red";
                          if (log.includes("[WARN]")) color = "text-yellow-400";
                          return (
                            <div key={idx} className={`${color} whitespace-pre-wrap leading-relaxed`}>
                              {log}
                            </div>
                          );
                        })}

                        {isConsoleRunning && (
                          <div className="text-brutal-white animate-pulse">
                            ⏳ Fetching subsystem buffers...
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2 justify-end">
                        <button
                          onClick={runConsoleSim}
                          disabled={isConsoleRunning}
                          className="bg-brutal-black text-brutal-white hover:bg-brutal-red hover:text-brutal-white border-2 border-brutal-black font-mono font-bold text-xs px-4 py-2 cursor-pointer uppercase transition-colors disabled:opacity-50 rounded-sm"
                        >
                          {lang === "es" ? "▷ Reiniciar Registro" : "▷ Restart Console"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Bar */}
              <div className="bg-brutal-light border-t-2 border-brutal-black p-2 flex justify-between items-center text-[10px] font-mono font-bold text-brutal-dark select-none">
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isConsoleRunning ? "bg-yellow-400" : "bg-brutal-green"} inline-block`}></span>
                  <span>STATUS: {isConsoleRunning ? "BUSY" : "ONLINE"}</span>
                </div>
                <div>SECURE_SHIELD_V4</div>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
