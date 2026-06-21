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
      sectionTitle: "Telemetría en Vivo",
      sectionSubtitle: "Visualización en tiempo real del estado de nodos y servidores de homelab.",
      sysCpu: "Carga del CPU",
      sysRam: "RAM Física",
      sysNetwork: "Tráfico de Red",
      ctaBtn: "¡VER TELEMETRÍA Y DETALLES DEL EVENTO!",
    },
    en: {
      sectionTitle: "Live Telemetry",
      sectionSubtitle: "Real-time state and telemetry for homelab nodes and systems.",
      sysCpu: "CPU Load",
      sysRam: "Physical RAM",
      sysNetwork: "Network Traffic",
      ctaBtn: "VIEW FULL TELEMETRY & EVENT ARCHIVE!",
    },
  }[lang];

  return (
    <section id="telemetry" className="py-20 px-4 bg-brutal-white border-t-4 border-brutal-black w-full select-none">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-chart-bar animate-pulse text-brutal-red"></i>
            {t.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto mb-6">
            {t.sectionSubtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </motion.div>

        {/* Live dashboard simulations */}
        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </motion.div>

        {/* View Full Event Archive & Telemetry CTA */}
        <motion.div variants={staggerItemVariants} className="mt-12 text-center">
          <a href="/minecraft-project">
            <button className="bg-brutal-red text-brutal-white font-mono font-black text-sm px-8 py-4 border-4 border-brutal-black shadow-brutal hover:bg-brutal-white hover:text-brutal-black transition-colors cursor-pointer inline-flex items-center gap-2">
              <span>{t.ctaBtn}</span>
              <i className="ph ph-arrow-right text-lg"></i>
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
