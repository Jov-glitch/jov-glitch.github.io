"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface Project {
  title: string;
  description: string;
  stack: string[];
  purpose: string;
  link?: string;
  iacCode?: string;
}

interface GridProyectosProps {
  projects: Project[];
  lang: "es" | "en";
}

export function GridProyectos({ projects, lang }: GridProyectosProps) {
  return (
    <section id="projects" className="bg-brutal-white w-full px-4 py-14 border-t-4 border-brutal-black select-none">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="mb-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-mono font-bold uppercase tracking-tighter mb-3 flex items-center justify-center gap-3">
            <i className="ph ph-package"></i>
            {lang === "es" ? "Proyectos Destacados" : "Featured Projects"}
          </h2>
          <div className="h-1 w-16 bg-brutal-red mx-auto" />
        </motion.div>

        {/* Projects Grid — horizontal compact list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              variants={staggerItemVariants}
              whileHover={{ y: -4, boxShadow: "8px 8px 0px rgba(0,0,0,0.9)" }}
              transition={{ duration: 0.15 }}
            >
              <a href={`/projects?id=${idx}`} className="block group">
                <div className="border-4 border-brutal-black bg-white shadow-brutal-sm p-5 flex flex-col gap-4 relative overflow-hidden h-full">
                  {/* Red top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brutal-red" />

                  {/* Title + purpose */}
                  <div className="pt-1">
                    <h3 className="font-mono font-black text-base uppercase tracking-tight leading-snug line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-brutal-gray font-mono uppercase tracking-wider mt-1 line-clamp-1">
                      {project.purpose}
                    </p>
                  </div>

                  {/* Short description */}
                  <p className="text-xs leading-relaxed line-clamp-2 text-brutal-dark font-sans">
                    {project.description}
                  </p>

                  {/* Stack badges — max 3 */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[11px] px-2 py-0.5 border border-brutal-black rounded-none font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-[11px] px-2 py-0.5 rounded-none font-mono"
                      >
                        +{project.stack.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="border-t border-brutal-black pt-3 mt-auto">
                    <span className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-red group-hover:text-brutal-black transition-colors">
                      {lang === "es" ? "Ver Detalles →" : "View Details →"}
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
