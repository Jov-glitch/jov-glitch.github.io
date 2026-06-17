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
    },
    en: {
      title: "Skills & Expertise",
    },
  }[lang];

  return (
    <section id="skills" className="bg-brutal-light w-full px-4 py-24 border-t-4 border-brutal-black">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={staggerItemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
            <i className="ph ph-wrench"></i>
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory) => (
            <motion.div key={skillCategory.category} variants={staggerItemVariants}>
              <Card brutal interactive className="h-full flex flex-col">
                <CardHeader className="pb-4 items-center">
                  <CardTitle className="text-xl mb-4">{skillCategory.category}</CardTitle>
                  <div className="h-0.5 w-10 bg-brutal-red" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-6">
                    {skillCategory.items.map((skill, itemIdx) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIdx * 0.1, duration: 0.4 }}
                      >
                        <h4 className="font-mono font-bold text-sm uppercase tracking-wider">{skill.name}</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {skill.description.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs font-mono">{tech}</Badge>
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
      </motion.div>
    </section>
  );
}
