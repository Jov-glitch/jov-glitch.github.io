"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface FooterProps {
  email: string;
  github: string;
  linkedin: string;
  lang: "es" | "en";
}

export function Footer({ email, github, linkedin, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const t = {
    es: {
      cta: "Trabajemos Juntos",
      btn: "Contactar",
      connect: "Conectar",
      nav: "Navegación",
      info: "Información",
      title: "Ingeniero Cloud & Especialista DevOps",
      subtitle: "Construyendo infraestructura confiable para la era de la IA",
      rights: "Todos los derechos reservados.",
      tech: "Creado con Next.js, React & Tailwind CSS",
      skills: "Habilidades",
      projects: "Proyectos",
      experience: "Experiencia",
      ecosystem: "Ecosistema CEV",
    },
    en: {
      cta: "Let's Work Together",
      btn: "Get in Touch",
      connect: "Connect",
      nav: "Navigation",
      info: "Info",
      title: "Cloud Engineer & DevOps Specialist",
      subtitle: "Building reliable infrastructure for the AI era",
      rights: "All rights reserved.",
      tech: "Built with Next.js, React & Tailwind CSS",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      ecosystem: "CEV Ecosystem",
    },
  }[lang];

  return (
    <footer className="bg-brutal-black text-brutal-white px-4 border-t-4 border-brutal-black">
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
          className="py-16 sm:py-24"
        >
          {/* CTA Section */}
          <motion.div variants={staggerItemVariants} className="mb-16 border-b border-brutal-white/25 pb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-black uppercase tracking-tighter mb-10 text-brutal-white">
              {t.cta}
            </h2>
            <a href={`mailto:${email}`} className="inline-block">
              <motion.div whileHover={{ y: -3, boxShadow: "12px 12px 0px rgba(255, 0, 0, 0.95)" }} whileTap={{ scale: 0.95 }}>
                <Button variant="reverse" className="font-mono font-bold text-lg px-10 py-5 h-auto cursor-pointer">
                  {t.btn}
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <motion.div variants={staggerItemVariants}>
              <h3 className="font-mono font-bold uppercase tracking-wider mb-5 text-brutal-red">{t.connect}</h3>
              <div className="space-y-3">
                <a href={github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">GitHub ↗</a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">LinkedIn ↗</a>
                <a href={`mailto:${email}`} className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">Email ↗</a>
              </div>
            </motion.div>
            
            <motion.div variants={staggerItemVariants}>
              <h3 className="font-mono font-bold uppercase tracking-wider mb-5 text-brutal-red">{t.nav}</h3>
              <div className="space-y-3">
                <a href="#skills" className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">{t.skills}</a>
                <a href="#projects" className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">{t.projects}</a>
                <a href="#ecosystem" className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">{t.ecosystem}</a>
                <a href="#experience" className="font-mono text-sm hover:text-brutal-red transition-colors block text-brutal-light">{t.experience}</a>
              </div>
            </motion.div>
            
            <motion.div variants={staggerItemVariants}>
              <h3 className="font-mono font-bold uppercase tracking-wider mb-5 text-brutal-red">{t.info}</h3>
              <p className="font-mono text-sm text-brutal-light">{t.title}</p>
              <p className="font-mono text-xs text-brutal-gray mt-2">{t.subtitle}</p>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div variants={staggerItemVariants} className="border-t border-brutal-white/20 pt-8">
            <p className="font-mono text-sm text-brutal-light">© {currentYear} Jose Vega. {t.rights}</p>
            <p className="font-mono text-[10px] text-brutal-gray mt-2">{t.tech}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
