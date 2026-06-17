"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface MonitoringItem {
  title: string;
  description: string;
  dashboard_url: string;
}

interface MinecraftEvent {
  active: boolean;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  serverIp: string;
  mapLink: string;
  closingTitle: string;
  closingDescription: string;
  closingMessage: string;
  modpack: {
    link: string;
    description: string;
    instructions: string;
  };
  aboutEvent: string;
  gamerStory: string;
  rules: { title: string; desc: string }[];
  architecture: { title: string; details: string[] }[];
  monitoring: MonitoringItem[];
}

interface TelemetryProps {
  minecraftEvent: MinecraftEvent;
  lang: "es" | "en";
}

export function Telemetry({ minecraftEvent, lang }: TelemetryProps) {
  const [activeTab, setActiveTab] = useState<"event" | "telemetry">("event");
  const [copied, setCopied] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null);

  // Simulated metrics state for live network visualization
  const [sysCpu, setSysCpu] = useState(12);
  const [sysRam, setSysRam] = useState(48);
  const [sysNetwork, setSysNetwork] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setSysCpu(Math.floor(Math.random() * 20 + 8)); // 8% - 28%
      setSysRam(prev => {
        const diff = Math.random() * 2 - 1;
        const next = prev + diff;
        return Number(Math.min(Math.max(next, 47), 51).toFixed(1));
      });
      setSysNetwork(Math.floor(Math.random() * 40 + 100)); // 100 - 140 kb/s
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(minecraftEvent.serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="telemetry" className="py-24 px-4 bg-brutal-light border-t-4 border-brutal-black w-full">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4">
            <span className="mr-2 sm:mr-3 inline-block">🧱</span>
            {lang === "es" ? "Archivo de Eventos & Telemetría" : "Event Archive & Telemetry"}
          </h2>
          <div className="h-1 w-20 bg-brutal-red mx-auto mb-8" />

          {/* Section Selector */}
          <div className="inline-flex border-2 border-brutal-black bg-brutal-white font-mono font-bold text-sm shadow-brutal-sm">
            <button
              onClick={() => setActiveTab("event")}
              className={`px-6 py-2.5 cursor-pointer transition-colors border-r-2 border-brutal-black ${
                activeTab === "event" ? "bg-brutal-red text-brutal-white" : "hover:bg-brutal-light text-brutal-black"
              }`}
            >
              {lang === "es" ? "🕹️ Servidor de Minecraft" : "🕹️ Minecraft Server"}
            </button>
            <button
              onClick={() => setActiveTab("telemetry")}
              className={`px-6 py-2.5 cursor-pointer transition-colors ${
                activeTab === "telemetry" ? "bg-brutal-red text-brutal-white" : "hover:bg-brutal-light text-brutal-black"
              }`}
            >
              {lang === "es" ? "📊 Telemetría en Vivo" : "📊 Live Telemetry"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "event" && (
            <motion.div
              key="event"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainerVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Minecraft event info (8 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div variants={staggerItemVariants}>
                  <Card brutal className="relative overflow-hidden bg-brutal-white">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brutal-red" />
                    <CardHeader>
                      <CardTitle className="text-2xl mb-1">{minecraftEvent.title}</CardTitle>
                      <p className="text-xs text-brutal-gray font-mono uppercase tracking-wider">{minecraftEvent.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-brutal-light p-4 border-2 border-brutal-black">
                        <div className="flex-1 font-mono text-sm">
                          <span className="text-brutal-gray font-bold">IP:</span>{" "}
                          <span className="font-black text-base select-all text-brutal-black">{minecraftEvent.serverIp}</span>
                        </div>
                        <Button onClick={copyIp} variant={copied ? "secondary" : "default"} className="font-mono text-xs cursor-pointer">
                          {copied ? (lang === "es" ? "¡COPIADO!" : "COPIED!") : (lang === "es" ? "COPIAR IP" : "COPY IP")}
                        </Button>
                      </div>

                      <div className="border-t border-brutal-black pt-4 space-y-4 text-sm leading-relaxed">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-red">
                          [ {lang === "es" ? "Sobre el Evento" : "About the Event"} ]
                        </h4>
                        <p>{minecraftEvent.aboutEvent}</p>
                      </div>

                      <div className="border-t border-brutal-black pt-4 space-y-4">
                        <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-red">
                          [ {lang === "es" ? "ModPack Oficial" : "Official ModPack"} ]
                        </h4>
                        <p className="text-sm leading-relaxed">{minecraftEvent.modpack.description}</p>
                        <div className="bg-yellow-50 border-2 border-yellow-500/30 p-3 text-xs text-yellow-900 font-mono">
                          <span className="font-black">💡 {lang === "es" ? "INSTRUCCIONES:" : "INSTRUCTIONS:"}</span> {minecraftEvent.modpack.instructions}
                        </div>
                        <a href={minecraftEvent.modpack.link} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="outline" className="w-full font-mono text-xs cursor-pointer">
                            📥 {lang === "es" ? "Descargar Modpack (.zip)" : "Download Modpack (.zip)"}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Gamer bio */}
                <motion.div variants={staggerItemVariants}>
                  <Card brutal className="bg-brutal-black text-brutal-white border-brutal-black">
                    <CardHeader>
                      <CardTitle className="text-xl text-brutal-red font-mono uppercase tracking-wider">
                        🎮 {lang === "es" ? "Historia Gamer" : "Gamer Story"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-brutal-light space-y-4">
                      <p className="font-serif italic">"{minecraftEvent.gamerStory}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Rules & Architecture (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div variants={staggerItemVariants}>
                  <Card brutal className="bg-brutal-white">
                    <CardHeader>
                      <CardTitle className="text-xl uppercase tracking-wider">
                        📜 {lang === "es" ? "Reglas de Convivencia" : "Server Rules"}
                      </CardTitle>
                      <div className="h-0.5 w-12 bg-brutal-red mt-2" />
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {minecraftEvent.rules.map((rule, idx) => (
                          <li key={idx} className="flex gap-3 items-start border-b border-brutal-light pb-3 last:border-0 last:pb-0">
                            <span className="w-6 h-6 rounded-full bg-brutal-black text-brutal-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="font-mono font-bold text-sm uppercase text-brutal-black">{rule.title}</h4>
                              <p className="text-xs text-brutal-gray mt-0.5">{rule.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={staggerItemVariants}>
                  <Card brutal className="bg-brutal-white">
                    <CardHeader>
                      <CardTitle className="text-xl uppercase tracking-wider">
                        ⚙️ {lang === "es" ? "Arquitectura del Servidor" : "Server Architecture"}
                      </CardTitle>
                      <div className="h-0.5 w-12 bg-brutal-red mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {minecraftEvent.architecture.map((layer, idx) => (
                        <div key={idx} className="space-y-1.5">
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
            </motion.div>
          )}

          {activeTab === "telemetry" && (
            <motion.div
              key="telemetry"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainerVariants}
              className="space-y-8"
            >
              {/* Live dashboard simulations */}
              <motion.div variants={staggerItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card brutal className="bg-brutal-black text-brutal-green p-4 border-2 border-brutal-black flex flex-col justify-between select-none">
                  <div className="font-mono text-[10px] text-brutal-gray uppercase">CPU_LOAD</div>
                  <div className="font-mono text-4xl font-bold my-4 text-center">
                    {sysCpu}%
                  </div>
                  <div className="w-full bg-brutal-dark h-2 rounded-full overflow-hidden border border-brutal-gray/30">
                    <div className="bg-brutal-green h-full transition-all duration-300" style={{ width: `${sysCpu}%` }}></div>
                  </div>
                </Card>

                <Card brutal className="bg-brutal-black text-brutal-green p-4 border-2 border-brutal-black flex flex-col justify-between select-none">
                  <div className="font-mono text-[10px] text-brutal-gray uppercase">PHYSICAL_RAM</div>
                  <div className="font-mono text-4xl font-bold my-4 text-center">
                    {sysRam} <span className="text-base text-brutal-gray">GiB</span>
                  </div>
                  <div className="w-full bg-brutal-dark h-2 rounded-full overflow-hidden border border-brutal-gray/30">
                    <div className="bg-brutal-green h-full transition-all duration-300" style={{ width: `${(sysRam / 64) * 100}%` }}></div>
                  </div>
                </Card>

                <Card brutal className="bg-brutal-black text-brutal-green p-4 border-2 border-brutal-black flex flex-col justify-between select-none">
                  <div className="font-mono text-[10px] text-brutal-gray uppercase">NET_TRAFFIC</div>
                  <div className="font-mono text-4xl font-bold my-4 text-center">
                    {sysNetwork} <span className="text-base text-brutal-gray">kb/s</span>
                  </div>
                  <div className="flex gap-1 justify-center h-4 items-end mt-1">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-brutal-green w-1 rounded-sm transition-all duration-500"
                        style={{ height: `${Math.floor(Math.random() * 16 + 2)}px` }}
                      ></div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Embedded Datadog iFrames */}
              <div className="space-y-6">
                {minecraftEvent.monitoring.map((mon) => {
                  const isOpened = activeDashboard === mon.title;

                  return (
                    <motion.div key={mon.title} variants={staggerItemVariants}>
                      <Card brutal className="bg-brutal-white border-2 border-brutal-black overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-brutal-black bg-brutal-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-1">
                            <h3 className="font-mono font-bold text-lg text-brutal-black">{mon.title}</h3>
                            <p className="text-xs text-brutal-gray font-mono max-w-xl">{mon.description}</p>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Button
                              onClick={() => setActiveDashboard(isOpened ? null : mon.title)}
                              variant="default"
                              className="font-mono text-xs cursor-pointer flex-1 sm:flex-none text-center"
                            >
                              {isOpened ? (lang === "es" ? "[- COLAPSAR ]" : "[- COLLAPSE ]") : (lang === "es" ? "[+ DESPLEGAR TELEMETRÍA ]" : "[+ DEPLOY TELEMETRY ]")}
                            </Button>
                            <a href={mon.dashboard_url} target="_blank" rel="noopener noreferrer" className="block w-auto">
                              <Button variant="outline" className="font-mono text-xs cursor-pointer flex items-center justify-center gap-1">
                                <span>↗</span>
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
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
