"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface Project {
  title: string;
  description: string;
  stack: string[];
  purpose: string;
  link?: string;
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="py-20 px-4 bg-brutal-white min-h-screen flex items-center"
    >
      <motion.div
        className="max-w-6xl w-full mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        {/* Section Title */}
        <motion.div variants={staggerItemVariants} className="mb-16">
          <h2 className="text-5xl md:text-6xl font-mono font-black uppercase tracking-tighter mb-2">
            Featured Projects
          </h2>
          <div className="h-1 w-32 bg-brutal-red" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              variants={staggerItemVariants}
              whileHover={{
                y: -4,
                boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.95)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card brutal interactive className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-brutal-gray font-mono">
                    {project.purpose}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-6">
                  {/* Description */}
                  <p className="text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="font-mono font-bold text-sm uppercase tracking-wider mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  {project.link && (
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="mt-auto pt-4 border-t-2 border-brutal-black"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="border-0 p-0">
                          Learn More →
                        </Button>
                      </a>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
