"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface ComposeHubProps {
  lang: "es" | "en";
}

export function ComposeHub({ lang }: ComposeHubProps) {
  const t = {
    es: {
      sectionTitle: "Demos de Trabajo",
      sectionSubtitle: "Catálogo interactivo de infraestructura como código auto-hospedada.",
      description: "Colección de 14 entornos listos para producción y laboratorios locales configurados mediante Docker Compose. Incluye wikis colaborativas, tableros Kanban, servidores de medios, bloqueadores de anuncios DNS y plataformas Git auto-hospedadas con Single Sign-On (OIDC).",
      ctaBtn: "Ver Stacks y Demos de Trabajo ↗",
      previewHeader: "PREVISUALIZACIÓN // COMPOSE_HUB",
    },
    en: {
      sectionTitle: "Work Demos",
      sectionSubtitle: "Interactive catalog of self-hosted infrastructure as code.",
      description: "Collection of 14 production-ready environments and homelab configurations deployed via Docker Compose. Features collaborative wikis, Kanban boards, media servers, DNS adblockers, and self-hosted Git portals integrated with Single Sign-On (OIDC).",
      ctaBtn: "View Stacks & Work Demos ↗",
      previewHeader: "PREVIEW // COMPOSE_HUB",
    },
  }[lang];

  const staticPreviewCode = `version: '3.8'

services:
  outline:
    image: docker.getoutline.com/outlinewiki/outline:latest
    container_name: dev_outline
    restart: always
    environment:
      - NODE_ENV=production
      - URL=http://docs.institutional.local
      - DATABASE_URL=postgres://outline_user:***@outline_db:5432/outline
      - REDIS_URL=redis://outline_redis:6379
      # Integración Gitea (SSO / OIDC)
      - OIDC_CLIENT_ID=gitea_sso_client
      - OIDC_CLIENT_SECRET=***
      - OIDC_AUTH_URI=http://git.institutional.local/login/oauth/authorize
    depends_on:
      - outline_db
      - outline_redis`;

  return (
    <section id="compose-hub" className="py-24 px-4 bg-brutal-light border-t-4 border-brutal-black w-full select-none">
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
            <i className="ph ph-cube"></i>
            {t.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-mono text-brutal-gray uppercase tracking-widest max-w-3xl mx-auto mb-6">
            {t.sectionSubtitle}
          </p>
          <div className="h-1 w-20 bg-amber-600 mx-auto" />
        </motion.div>

        {/* Teaser Content Panel */}
        <motion.div variants={staggerItemVariants}>
          <Card brutal className="border-4 border-brutal-black bg-white p-0 overflow-hidden shadow-brutal hover:shadow-brutal-hover transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column (Details & CTA) */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-2 border-brutal-black bg-amber-600 text-white font-mono text-xs py-1 px-3 rounded-none uppercase font-bold">
                      Docker Compose
                    </Badge>
                    <Badge variant="outline" className="border-2 border-brutal-black bg-white text-brutal-black font-mono text-xs py-1 px-3 rounded-none uppercase font-bold">
                      14 Stacks Deployed
                    </Badge>
                  </div>
                  <p className="font-sans font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="mt-8">
                  <a href="/work-demos">
                    <Button variant="default" className="font-mono font-black text-sm cursor-pointer border-4 border-brutal-black shadow-brutal bg-amber-600 hover:bg-amber-700 text-white py-6 px-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-brutal-sm transition-all flex items-center gap-2">
                      <i className="ph ph-arrow-square-out text-lg"></i>
                      {t.ctaBtn}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right Column (Terminal Preview) */}
              <div className="lg:col-span-6 border-t-4 lg:border-t-0 lg:border-l-4 border-brutal-black bg-brutal-black text-white p-0 flex flex-col font-mono text-xs h-[320px] lg:h-auto min-h-[300px]">
                {/* Terminal Titlebar */}
                <div className="bg-neutral-900 border-b-2 border-brutal-black p-3 flex justify-between items-center select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-600 rounded-full inline-block"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider ml-2">{t.previewHeader}</span>
                  </div>
                </div>
                {/* Code Pre */}
                <pre className="p-4 overflow-hidden select-none text-left text-emerald-400 font-semibold leading-relaxed flex-1 bg-neutral-950 opacity-80">
                  <code>{staticPreviewCode}</code>
                </pre>
              </div>

            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
