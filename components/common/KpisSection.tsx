"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface KpiItem {
  metric: string;
  label: string;
  detail: string;
  icon: string;
}

interface KpisSectionProps {
  kpis: KpiItem[];
  lang: "es" | "en";
}

export function KpisSection({ kpis, lang }: KpisSectionProps) {
  const t = {
    es: {
      title: "Telemetría de Impacto",
      subtitle: "Métricas cuantitativas del rendimiento y seguridad de la infraestructura implementada.",
    },
    en: {
      title: "Impact Telemetry",
      subtitle: "Quantitative metrics demonstrating the performance and security of deployed infrastructure.",
    },
  }[lang];

  return (
    <section className="bg-brutal-light w-full px-4 py-24 border-t-4 border-brutal-black">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-2">
            <i className="ph ph-chart-line-up"></i>
            {t.title}
          </h2>
          <p className="text-sm sm:text-base font-mono text-brutal-gray uppercase tracking-widest max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-red mx-auto mt-6" />
        </motion.div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              variants={staggerItemVariants}
              whileHover={{ y: -6, boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.95)" }}
              transition={{ duration: 0.15 }}
              className="bg-brutal-white border-2 border-brutal-black p-8 shadow-brutal flex flex-col justify-between relative text-left group overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                idx === 0 ? "bg-brutal-red" : idx === 1 ? "bg-brutal-black" : "bg-brutal-green"
              }`} />

              <div className="flex justify-between items-start mb-6">
                {/* Metric value */}
                <h3 className="text-5xl sm:text-6xl font-mono font-black tracking-tight text-brutal-black">
                  {kpi.metric}
                </h3>
                {/* Metric icon */}
                <span className="text-3xl bg-brutal-light w-12 h-12 flex items-center justify-center border-2 border-brutal-black rounded-sm shadow-brutal-sm group-hover:-translate-y-1 transition-transform">
                  <i className={kpi.icon}></i>
                </span>
              </div>

              <div className="space-y-2">
                {/* Metric Title */}
                <h4 className="font-mono font-bold text-sm uppercase tracking-wider text-brutal-black">
                  {kpi.label}
                </h4>
                {/* Metric Detail */}
                <p className="text-xs text-brutal-gray font-mono leading-relaxed">
                  {kpi.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
