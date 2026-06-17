"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as dockerData from "../../docker_stacks";

interface StackData {
  name: string;
  title: string;
  tag: string;
  environment: string;
  description: string;
  compose: string;
}

interface DossierProps {
  profile: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    about: string;
    vision: string;
  };
  skills: {
    category: string;
    items: { name: string; description: string[] }[];
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    link?: string;
    achievements: string[];
  }[];
  upnEcosystem: {
    title: string;
    subtitle: string;
    tagline: string;
    stack: string[];
    overview: { problem: string; solution: string; impact: string };
    modules: { id: string; title: string; subtitle: string; stack: string[]; description: string; solution_rationale: string }[];
  };
  projects: {
    title: string;
    description: string;
    stack: string[];
    purpose: string;
    link?: string;
  }[];
  kpis: {
    metric: string;
    label: string;
    detail: string;
    icon: string;
  }[];
  lang: "es" | "en";
  onClose: () => void;
}

export function Dossier({
  profile,
  skills,
  experience,
  upnEcosystem,
  projects,
  kpis,
  lang,
  onClose,
}: DossierProps) {
  const [dossierTheme, setDossierTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<string>(upnEcosystem.modules[0].id);
  const [activeSection, setActiveSection] = useState<string>("d-summary");

  useEffect(() => {
    const sections = [
      "d-summary",
      "d-experience",
      "d-ecosystem",
      "d-stack",
      "d-projects",
      "d-stacks",
      "d-vision",
      "d-contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const t = {
    es: {
      summary: "Resumen Profesional",
      footprint: "Trayectoria Profesional",
      ecosystem: "Proyecto Destacado: Ecosistema CEV",
      stack: "Competencias Técnicas",
      projects: "Otros Proyectos",
      stacks: "Orquestación Docker (Stacks)",
      vision: "Visión Técnica",
      contact: "Contacto & Enlaces",
      export: "Exportar PDF (Imprimir)",
      years: "Años de Trayectoria",
      focused: "Orquestación & Cloud",
      navSummary: "Resumen",
      navExperience: "Experiencia",
      navEcosystem: "Ecosistema CEV",
      navStack: "Habilidades",
      navProjects: "Proyectos",
      navStacks: "Docker Stacks",
      navVision: "Visión",
      navContact: "Contacto",
      back: "Volver a Modo Creativo ↩",
    },
    en: {
      summary: "Professional Summary",
      footprint: "Professional Footprint",
      ecosystem: "Featured Project: CEV Ecosystem",
      stack: "Technical Expertise",
      projects: "Other Projects",
      stacks: "Docker Orchestration Stacks",
      vision: "Operational Vision",
      contact: "Contact & Links",
      export: "Export PDF (Print)",
      years: "Years of Experience",
      focused: "Orchestration & Cloud",
      navSummary: "Summary",
      navExperience: "Experience",
      navEcosystem: "CEV Ecosystem",
      navStack: "Skills",
      navProjects: "Projects",
      navStacks: "Docker Stacks",
      navVision: "Vision",
      navContact: "Contact",
      back: "Back to Creative Mode ↩",
    },
  }[lang];

  const getTabLabel = (id: string, currentLang: "es" | "en") => {
    const labels: Record<string, { es: string; en: string }> = {
      "cev-maestro": { es: "CEV", en: "CEV" },
      "diana-api": { es: "Diana API", en: "Diana API" },
      "secure-infra-orch": { es: "Infra & Redes", en: "Infra & Net" },
      "restoration-engine": { es: "Motor ETL", en: "ETL Engine" },
    };
    return labels[id]?.[currentLang] || id;
  };

  const toggleTheme = () => {
    setDossierTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto font-sans print:bg-white print:text-black transition-colors duration-300 dossier-grid-pattern",
        dossierTheme === "light"
          ? "bg-slate-50 text-slate-900"
          : "bg-slate-950 text-slate-100 dark"
      )}
    >
      {/* Floating control buttons (Hidden on Print) */}
      <div className="fixed top-0 left-0 right-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-end gap-2 z-50 print:hidden sm:fixed sm:top-6 sm:right-6 sm:left-auto sm:bg-transparent sm:dark:bg-transparent sm:border-0 sm:px-0 sm:py-0">
        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          className={`px-3 py-1.5 text-xs font-mono font-bold border-2 border-current hover:bg-current hover:text-white transition-colors cursor-pointer rounded-sm ${
            dossierTheme === "light" ? "text-slate-900" : "text-slate-100"
          }`}
        >
          <span className="sm:hidden">🌓</span>
          <span className="hidden sm:inline">{dossierTheme === "light" ? "DARK_MODE" : "LIGHT_MODE"}</span>
        </button>

        {/* Export to PDF */}
        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 text-xs font-mono font-bold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer rounded-sm"
        >
          <span className="sm:hidden">📥 PDF</span>
          <span className="hidden sm:inline">{t.export}</span>
        </button>

        {/* Back to Creative Mode */}
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-mono font-bold border-2 border-brutal-red text-brutal-red hover:bg-brutal-red hover:text-white transition-colors cursor-pointer rounded-sm"
        >
          <span className="sm:hidden">↩ Volver</span>
          <span className="hidden sm:inline">{t.back}</span>
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto pt-20 pb-16 px-4 sm:px-6 md:px-8 sm:py-16">
        {/* Layout Header */}
        <header className="border-b-2 border-slate-200 dark:border-slate-800 pb-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-brutal-red uppercase">
              {profile.title}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-mono">
              {profile.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-serif italic max-w-2xl">
              "{profile.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              📍 {profile.location}
            </p>
          </div>
          <div className="flex gap-8 border-l-2 border-slate-200 dark:border-slate-800 pl-6 h-fit py-1.5 font-mono">
            <div className="text-center sm:text-left">
              <span className="block text-2xl font-black">3+</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{t.years}</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-2xl font-black">GCP / IaC</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{t.focused}</span>
            </div>
          </div>
        </header>

        {/* Metric Highlights Row (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b-2 border-slate-200 dark:border-slate-800 pb-10">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="p-5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm flex items-start gap-4 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-800 rounded-sm font-mono text-xl flex-shrink-0">
                {kpi.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-slate-100">
                    {kpi.metric}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {kpi.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-normal">
                  {kpi.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation (Hidden on Print) */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-2 sticky top-6 self-start print:hidden">
            <a
              href="#d-summary"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-summary"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              👤 {t.navSummary}
            </a>
            <a
              href="#d-experience"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-experience"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              💼 {t.navExperience}
            </a>
            <a
              href="#d-ecosystem"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-ecosystem"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              🏢 {t.navEcosystem}
            </a>
            <a
              href="#d-stack"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-stack"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              🛠️ {t.navStack}
            </a>
            <a
              href="#d-projects"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-projects"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              📦 {t.navProjects}
            </a>
            <a
              href="#d-stacks"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-stacks"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              🐳 {t.navStacks}
            </a>
            <a
              href="#d-vision"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-vision"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              🎯 {t.navVision}
            </a>
            <a
              href="#d-contact"
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors w-full border-l-2",
                activeSection === "d-contact"
                  ? "border-brutal-red text-brutal-red bg-slate-200/50 dark:bg-slate-800/50 font-bold"
                  : "border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              )}
            >
              📞 {t.navContact}
            </a>
          </aside>

          {/* Main Content Areas */}
          <main className="lg:col-span-9 print:col-span-12 w-full space-y-16">
            {/* Professional Summary */}
            <section id="d-summary" className="space-y-4 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.summary}
              </h2>
              <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm">
                <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                  {profile.about}
                </p>
              </div>
            </section>

            {/* Experience Footprint */}
            <section id="d-experience" className="space-y-6 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.footprint}
              </h2>
              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 space-y-8 ml-3 sm:ml-4">
                {experience.map((exp, idx) => (
                  <div
                    key={`${exp.company}-${idx}`}
                    className="relative group"
                  >
                    {/* Visual dot indicator on the vertical line */}
                    <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4.5 h-4.5 bg-slate-50 dark:bg-slate-950 border-2 border-slate-900 dark:border-slate-100 rounded-full group-hover:border-brutal-red transition-colors duration-200 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-slate-100 group-hover:bg-brutal-red rounded-full" />
                    </div>

                    <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 font-mono">
                            {exp.role}
                          </h3>
                          {exp.link && exp.link.startsWith("http") ? (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold text-brutal-red hover:underline"
                            >
                              {exp.company}
                            </a>
                          ) : (
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                              {exp.company}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 font-bold">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {exp.achievements.map((ach, aidx) => (
                          <li key={aidx} className="flex gap-2 items-start text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                            <span className="text-brutal-red mt-1">▪</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CEV Digital Ecosystem */}
            <section id="d-ecosystem" className="space-y-6 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.ecosystem}
              </h2>
              <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-mono uppercase text-slate-800 dark:text-slate-200">
                    {upnEcosystem.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">{upnEcosystem.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-slate-200 dark:border-slate-800 py-4 font-mono text-xs">
                  <div>
                    <span className="block text-slate-400 uppercase font-black mb-1">Problem Space</span>
                    <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{upnEcosystem.overview.problem}</p>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase font-black mb-1">Architecture Solution</span>
                    <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{upnEcosystem.overview.solution}</p>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase font-black mb-1">Operational Impact</span>
                    <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{upnEcosystem.overview.impact}</p>
                  </div>
                </div>

                {/* Sub-tabs for the modules */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 print:hidden">
                    {upnEcosystem.modules.map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setActiveTab(mod.id)}
                        className={cn(
                          "px-3 py-1.5 font-mono text-xs font-semibold cursor-pointer border rounded-sm transition-all duration-200",
                          activeTab === mod.id
                            ? "bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100"
                            : "bg-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 border-slate-200 dark:border-slate-800 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                        )}
                      >
                        {getTabLabel(mod.id, lang)}
                      </button>
                    ))}
                  </div>

                  {/* Module details */}
                  {upnEcosystem.modules.map((mod) => {
                    const isSelected = mod.id === activeTab;

                    return (
                      <div
                        key={mod.id}
                        className={cn(
                          "space-y-4 animate-fade-in",
                          isSelected
                            ? "block"
                            : "hidden print:block print:border-t print:border-slate-200 dark:print:border-slate-800 print:pt-6 print:mt-6"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-1">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 font-mono text-sm uppercase">
                            {mod.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{mod.subtitle}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {mod.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.stack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-[9px] font-mono">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-4 py-1 italic text-xs text-slate-500 dark:text-slate-400 font-serif">
                          "{mod.solution_rationale}"
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Technical Expertise */}
            <section id="d-stack" className="space-y-4 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.stack}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((cat, idx) => (
                  <div
                    key={`${cat.category}-${idx}`}
                    className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm space-y-4"
                  >
                    <h3 className="font-bold font-mono text-sm uppercase text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1.5">
                      {cat.category}
                    </h3>
                    <div className="space-y-3 font-mono">
                      {cat.items.map((it) => (
                        <div key={it.name} className="space-y-1">
                          <span className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                            {it.name}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {it.description.map((desc) => (
                              <span
                                key={desc}
                                className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5"
                              >
                                {desc}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section id="d-projects" className="space-y-6 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.projects}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm flex flex-col justify-between h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                        <h3 className="font-bold font-mono text-base text-slate-900 dark:text-slate-100 uppercase">
                          {proj.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wider uppercase">
                          {proj.purpose}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {proj.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                      {proj.stack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[10px] font-mono">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Docker Stacks */}
            <section id="d-stacks" className="space-y-6 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.stacks}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(() => {
                  const allStacks: StackData[] = Object.keys(dockerData)
                    .filter((key) => key.startsWith("docker_"))
                    .map((key) => (dockerData as any)[key] as StackData);
                  
                  return allStacks.map((stack) => (
                    <div
                      key={stack.name}
                      className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm flex flex-col justify-between h-full"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                          <h3 className="font-bold font-mono text-base text-slate-900 dark:text-slate-100 uppercase">
                            {stack.title}
                          </h3>
                          <Badge variant="outline" className="text-[9px] font-mono tracking-wider uppercase bg-transparent text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 w-fit">
                            {stack.environment}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {stack.description}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase font-black mb-1 select-none">Docker Compose File Preview</span>
                        <pre className="text-[10px] font-mono leading-relaxed bg-slate-200 dark:bg-slate-950 p-3 rounded-sm overflow-x-auto text-slate-800 dark:text-slate-200 max-h-48 border border-slate-300 dark:border-slate-900 scrollbar-thin">
                          {stack.compose}
                        </pre>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </section>

            {/* Operational Vision */}
            <section id="d-vision" className="space-y-4 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.vision}
              </h2>
              <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm">
                <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-serif italic">
                  "{profile.vision}"
                </p>
              </div>
            </section>

            {/* Contact & Links */}
            <section id="d-contact" className="space-y-4 scroll-mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase text-brutal-red border-b border-slate-200 dark:border-slate-800 pb-2">
                {t.contact}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                  <span className="block text-slate-400 uppercase tracking-widest mb-1">Email</span>
                  <a href={`mailto:${profile.email}`} className="text-brutal-red hover:underline text-sm font-black">
                    {profile.email}
                  </a>
                </div>
                <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                  <span className="block text-slate-400 uppercase tracking-widest mb-1">GitHub</span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brutal-red hover:underline text-sm font-black"
                  >
                    github.com/Jov-glitch ↗
                  </a>
                </div>
                <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                  <span className="block text-slate-400 uppercase tracking-widest mb-1">LinkedIn</span>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brutal-red hover:underline text-sm font-black"
                  >
                    linkedin.com/in/jose-vega ↗
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 pt-8 text-center text-xs font-mono text-slate-400">
          <p>
            Jose Vega // {profile.title} // Zamora, Michoacán, México
          </p>
          <p className="mt-1">
            Generated via Portfolio Engine v2.0.4 - Printed: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
