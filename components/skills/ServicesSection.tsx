"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  technicalStack: string[];
}

interface ServicesSectionProps {
  services: Service[];
  lang: "es" | "en";
}

export function ServicesSection({ services, lang }: ServicesSectionProps) {
  const t = {
    es: {
      title: "¿En qué te puedo ayudar?",
      subtitle: "Casos de uso reales, soluciones autohospedadas y desarrollo ágil",
      ctaBtn: "¡EXPLORAR CASOS DE USO DETALLADOS!",
    },
    en: {
      title: "How Can I Help You?",
      subtitle: "Real-world use cases, self-hosted deployments, and agile engineering",
      ctaBtn: "EXPLORE DETAILED USE CASES!",
    },
  }[lang];

  return (
    <section id="services" className="bg-brutal-white w-full px-4 py-24 border-t-4 border-brutal-black select-none relative">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-hand-waving animate-bounce text-brutal-green"></i>
            {t.title}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-brutal-gray uppercase tracking-widest max-w-xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <div className="h-1 w-20 bg-brutal-green mx-auto" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div key={service.id} variants={staggerItemVariants}>
              <Card brutal interactive className="h-full flex flex-col p-6 text-left bg-brutal-light">
                <CardHeader className="pb-3 pt-1 px-0 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 flex items-center justify-center bg-brutal-black text-white border-2 border-brutal-black font-mono font-bold text-lg">
                      0{idx + 1}
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-brutal-black bg-white rounded-none">
                      <i className={`${service.icon} text-brutal-black text-xl`}></i>
                    </div>
                  </div>
                  <div className="mt-2">
                    <CardTitle className="text-lg sm:text-xl font-mono font-black uppercase tracking-tight leading-tight line-clamp-1">
                      {service.title}
                    </CardTitle>
                    <span className="font-mono text-[9px] font-bold text-brutal-gray uppercase tracking-wider block mt-1">
                      {service.subtitle}
                    </span>
                  </div>
                  <div className="h-0.5 w-10 bg-brutal-green mt-2" />
                </CardHeader>
                <CardContent className="flex-1 px-0 pb-1 flex flex-col justify-between gap-6">
                  <p className="text-xs sm:text-sm leading-relaxed text-brutal-dark font-sans font-medium">
                    {service.description}
                  </p>
                  
                  {/* Compact Tech Badges */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] font-bold text-brutal-gray uppercase tracking-wider block">
                      CORE TOOLS //
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technicalStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[9px] font-mono py-0.5 px-1.5 border border-brutal-black bg-white text-brutal-black">
                          {tech}
                        </Badge>
                      ))}
                      {service.technicalStack.length > 4 && (
                        <Badge variant="outline" className="text-[9px] font-mono py-0.5 px-1.5 border border-brutal-black bg-brutal-black text-white">
                          +{service.technicalStack.length - 4} MORE
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Explore Detailed Use Cases CTA */}
        <motion.div variants={staggerItemVariants} className="mt-16 text-center">
          <a href="/services">
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
