"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface CertificationItem {
  name: string;
  date: string;
  description?: string;
}

interface CertificationCategory {
  category: string;
  items: CertificationItem[];
}

interface CertificationsProps {
  certifications: CertificationCategory[];
  lang: "es" | "en";
}

export function Certifications({ certifications, lang }: CertificationsProps) {
  const t = {
    es: {
      title: "Certificaciones",
      subtitle: "Especializaciones y acreditaciones técnicas obtenidas recientemente.",
      ciscoBadge: "Cisco Certified",
      timelineLabel: "ACREDITACIONES ADQUIRIDAS",
      ctaBtn: "¡CONOCE MÁS Y VERIFICA MIS COMPETENCIAS!",
    },
    en: {
      title: "Certifications",
      subtitle: "Technical specializations and credentials obtained recently.",
      ciscoBadge: "Cisco Certified",
      timelineLabel: "ACCREDITATIONS ACQUIRED",
      ctaBtn: "LEARN MORE & VERIFY MY SKILLS!",
    },
  }[lang];

  // Helper to determine icons based on category
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("redes") || category.toLowerCase().includes("network")) {
      return "ph ph-broadcast text-brutal-blue text-2xl";
    }
    return "ph ph-shield-check text-brutal-green text-2xl";
  };

  return (
    <section id="certifications" className="bg-brutal-white w-full px-4 py-24 border-t-4 border-brutal-black select-none">
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
            <i className="ph ph-certificate text-brutal-red animate-pulse"></i>
            {t.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto mt-2">
            {t.subtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-red mx-auto mt-6" />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cat) => (
            <motion.div key={cat.category} variants={staggerItemVariants}>
              <Card brutal interactive className="h-full flex flex-col bg-brutal-light">
                <CardHeader className="pb-4 border-b-2 border-brutal-black bg-brutal-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-brutal-black rounded-none">
                      <i className={getCategoryIcon(cat.category)}></i>
                    </div>
                    <Badge variant="default" className="text-[10px] font-mono tracking-wider uppercase bg-brutal-red text-brutal-white border-none rounded-none py-0.5 px-2">
                      {t.ciscoBadge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-mono font-black uppercase text-left tracking-tight">
                    {cat.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <div className="text-left font-mono text-[10px] text-brutal-gray tracking-wider mb-4 border-b border-dashed border-brutal-gray/20 pb-2">
                    {t.timelineLabel}
                  </div>
                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-3 bg-brutal-white border-2 border-brutal-black shadow-brutal-sm hover:translate-x-1 transition-transform flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
                      >
                        <div className="space-y-1">
                          <h4 className="font-sans font-bold text-xs sm:text-sm text-brutal-black leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        <Badge variant="secondary" className="font-mono text-[9px] font-bold text-brutal-red border border-brutal-red bg-brutal-red/5 px-2 py-0.5 rounded-none flex-shrink-0 w-fit self-start sm:self-center">
                          {item.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learn More CTA */}
        <motion.div variants={staggerItemVariants} className="mt-16 text-center">
          <a href="/certifications">
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
