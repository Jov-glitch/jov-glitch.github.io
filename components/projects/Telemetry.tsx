"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface MonitoringItem {
  title: string;
  description: string;
  dashboard_url: string;
}

interface MinecraftEvent {
  monitoring: MonitoringItem[];
}

interface TelemetryProps {
  minecraftEvent: MinecraftEvent;
  lang: "es" | "en";
}

export function Telemetry({ minecraftEvent, lang }: TelemetryProps) {
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

  const t = {
    es: {
      sectionTitle: "📊 Telemetría en Vivo",
      sectionSubtitle: "Visualización en tiempo real del estado de nodos y servidores de homelab.",
      yamlHeader: "VIRTUAL_TELEMETRY // TELEMETRY_DASHBOARD",
      sysCpu: "Carga del CPU",
      sysRam: "RAM Física",
      sysNetwork: "Tráfico de Red",
      collapseBtn: "[- Ocultar Panel]",
      deployBtn: "[+ Desplegar Telemetría]",
    },
    en: {
      sectionTitle: "📊 Live Telemetry",
      sectionSubtitle: "Real-time state and telemetry for homelab nodes and systems.",
      yamlHeader: "VIRTUAL_TELEMETRY // TELEMETRY_DASHBOARD",
      sysCpu: "CPU Load",
      sysRam: "Physical RAM",
      sysNetwork: "Network Traffic",
      collapseBtn: "[- Collapse Panel]",
      deployBtn: "[+ Deploy Telemetry]",
    },
  }[lang];

  return (
    <section id="telemetry" className="py-24 px-4 bg-brutal-white border-t-4 border-brutal-black w-full select-none">
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
            <span className="mr-2 sm:mr-3 inline-block">📊</span>
            {t.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto mb-6">
            {t.sectionSubtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </motion.div>

        {/* Live dashboard simulations */}
        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card brutal className="bg-brutal-black text-brutal-green p-6 border-2 border-brutal-black flex flex-col justify-between select-none shadow-brutal-sm">
            <div className="font-mono text-[10px] text-brutal-gray uppercase">{t.sysCpu}</div>
            <div className="font-mono text-4xl font-bold my-4 text-center">
              {sysCpu}%
            </div>
            <div className="w-full bg-brutal-dark h-2.5 rounded-full overflow-hidden border border-brutal-gray/30">
              <div className="bg-brutal-green h-full transition-all duration-300" style={{ width: `${sysCpu}%` }}></div>
            </div>
          </Card>

          <Card brutal className="bg-brutal-black text-brutal-green p-6 border-2 border-brutal-black flex flex-col justify-between select-none shadow-brutal-sm">
            <div className="font-mono text-[10px] text-brutal-gray uppercase">{t.sysRam}</div>
            <div className="font-mono text-4xl font-bold my-4 text-center">
              {sysRam} <span className="text-base text-brutal-gray">GiB</span>
            </div>
            <div className="w-full bg-brutal-dark h-2.5 rounded-full overflow-hidden border border-brutal-gray/30">
              <div className="bg-brutal-green h-full transition-all duration-300" style={{ width: `${(sysRam / 64) * 100}%` }}></div>
            </div>
          </Card>

          <Card brutal className="bg-brutal-black text-brutal-green p-6 border-2 border-brutal-black flex flex-col justify-between select-none shadow-brutal-sm">
            <div className="font-mono text-[10px] text-brutal-gray uppercase">{t.sysNetwork}</div>
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
                <Card brutal className="bg-brutal-white border-2 border-brutal-black overflow-hidden flex flex-col shadow-brutal-sm">
                  <div className="p-6 border-b border-brutal-black bg-brutal-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h3 className="font-mono font-bold text-lg text-brutal-black">{mon.title}</h3>
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
    </section>
  );
}
