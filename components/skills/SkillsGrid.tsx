"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface Skill {
  category: string;
  items: {
    name: string;
    description: string[];
  }[];
}

interface SkillsGridProps {
  skills: Skill[];
  lang: "es" | "en";
}

export function SkillsGrid({ skills, lang }: SkillsGridProps) {
  const t = {
    es: {
      title: "Habilidades & Tecnologías",
      ctaBtn: "¡CONOCE MÁS DETALLES DE MIS HABILIDADES!",
    },
    en: {
      title: "Skills & Expertise",
      ctaBtn: "LEARN MORE DETAILS ABOUT MY SKILLS!",
    },
  }[lang];

  return (
    <section id="skills" className="bg-brutal-light w-full px-4 py-20 border-t-4 border-brutal-black select-none">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={staggerItemVariants} className="mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-wrench animate-pulse text-brutal-blue"></i>
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-brutal-blue mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory) => (
            <motion.div key={skillCategory.category} variants={staggerItemVariants}>
              <Card brutal interactive className="h-full flex flex-col p-4 sm:p-5">
                <CardHeader className="pb-3 pt-1 items-center px-0">
                  <CardTitle className="text-base sm:text-lg font-mono font-bold uppercase tracking-tight text-center mb-2 line-clamp-1">{skillCategory.category}</CardTitle>
                  <div className="h-0.5 w-8 bg-brutal-blue" />
                </CardHeader>
                <CardContent className="flex-1 px-0 pb-1">
                  <div className="space-y-4">
                    {skillCategory.items.map((skill, itemIdx) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-1.5 flex flex-col items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIdx * 0.05, duration: 0.3 }}
                      >
                        <h4 className="font-mono font-bold text-[10px] uppercase text-brutal-gray tracking-wider text-center">{skill.name}</h4>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {skill.description.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-[10px] font-mono py-0.5 px-2">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learn More CTA */}
        <motion.div variants={staggerItemVariants} className="mt-16 text-center">
          <a href="/skills">
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
