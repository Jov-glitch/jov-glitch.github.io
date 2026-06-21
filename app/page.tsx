"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Component imports
import { Navbar } from "@/components/common/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/common/About";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { ServicesSection } from "@/components/skills/ServicesSection";
import { GridProyectos } from "@/components/projects/GridProyectos";
import { Ecosystem } from "@/components/projects/Ecosystem";
import { Telemetry } from "@/components/projects/Telemetry";
import { Timeline } from "@/components/experience/Timeline";
import { Footer } from "@/components/common/Footer";
import { Dossier } from "@/components/common/Dossier";
import { KpisSection } from "@/components/common/KpisSection";
import { ComposeHub } from "@/components/projects/ComposeHub";
import { InteractiveConsole } from "@/components/projects/InteractiveConsole";
import { BrutalWindow } from "@/components/ui/BrutalWindow";
import { RetroBackground } from "@/components/common/RetroBackground";
import { Certifications } from "@/components/skills/Certifications";

// Data imports
import * as dataEn from "@/data/data";
import * as dataEs from "@/data/data_es";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [mode, setMode] = useState<"creativo" | "serio">("creativo");
  const [mounted, setMounted] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  useEffect(() => {
    // Read selections on client mount
    const savedLang = localStorage.getItem("portfolio_lang") as "es" | "en";
    const savedMode = localStorage.getItem("portfolio_mode") as "creativo" | "serio";
    if (savedLang) setLang(savedLang);
    if (savedMode) setMode(savedMode);

    setMounted(true);
  }, []);

  const handleLangChange = (l: "es" | "en") => {
    setLang(l);
    localStorage.setItem("portfolio_lang", l);
  };

  const handleModeChange = (m: "creativo" | "serio") => {
    setMode(m);
    localStorage.setItem("portfolio_mode", m);
  };

  // GSAP animations for scroll reveal
  useEffect(() => {
    if (!mounted || mode === "serio") return;

    // Timeout to ensure elements are rendered
    const timer = setTimeout(() => {
      const textElements = document.querySelectorAll(".text-reveal-line");
      textElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted, mode, lang]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brutal-white text-brutal-black flex flex-col items-center justify-center font-mono font-bold text-lg select-none">
        <div className="flex items-center gap-3">
          <i className="ph ph-arrows-clockwise animate-spin text-brutal-red text-xl"></i>
          <span>BOOTING JV_SYSTEM_v2.0.4...</span>
        </div>
        <div className="text-xs text-brutal-gray mt-2 uppercase tracking-widest">
          Checking local registry keys
        </div>
      </div>
    );
  }

  const activeData = lang === "es" ? dataEs : dataEn;

  // Render the modern serious layout
  if (mode === "serio") {
    return (
      <Dossier
        profile={activeData.profile}
        skills={activeData.skills}
        experience={activeData.experience}
        upnEcosystem={activeData.upnEcosystem}
        projects={activeData.projects}
        kpis={activeData.kpis}
        certifications={activeData.certifications}
        lang={lang}
        onClose={() => handleModeChange("creativo")}
      />
    );
  }

  // Render the brutalist creative layout
  return (
    <main className="pt-16 bg-brutal-white min-h-screen text-brutal-black relative selection:bg-brutal-red selection:text-brutal-white">
      {/* Background canvas and CRT overlays */}
      <RetroBackground mode="creativo" />
      <div className="crt-overlay crt-flicker-animation" />
      <div className="crt-vignette" />

      {/* Floating control bar */}
      <Navbar
        lang={lang}
        setLang={handleLangChange}
        mode={mode}
        setMode={handleModeChange}
      />

      {/* Sections */}
      <Hero profile={activeData.profile} lang={lang} />
      <About
        about={activeData.profile.about}
        vision={activeData.profile.vision}
        location={activeData.profile.location}
        lang={lang}
      />
      <Timeline experience={activeData.experience} lang={lang} />
      <SkillsGrid skills={activeData.skills} lang={lang} />
      <ServicesSection services={activeData.services} lang={lang} />
      <Certifications certifications={activeData.certifications} lang={lang} />
      <GridProyectos projects={activeData.projects} lang={lang} />
      <Ecosystem ecosystem={activeData.upnEcosystem} lang={lang} />
      <ComposeHub lang={lang} />
      {/* <Telemetry minecraftEvent={activeData.minecraftEvent} lang={lang} />*/}
      <KpisSection kpis={activeData.kpis} lang={lang} />
      <Footer
        email={activeData.profile.email}
        github={activeData.profile.github}
        linkedin={activeData.profile.linkedin}
        lang={lang}
      />

      {/* Floating System Console Button (Creative Mode Only) */}
      {mode === "creativo" && (
        <div className="fixed bottom-6 right-6 z-40 print:hidden select-none">
          <motion.div
            whileHover={{ y: -3, boxShadow: "6px 6px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setIsConsoleOpen(true)}
              className="bg-brutal-green text-brutal-black border-4 border-brutal-black font-mono font-black text-sm px-5 py-3 shadow-brutal flex items-center gap-2 cursor-pointer hover:bg-brutal-white transition-colors"
              title={lang === "es" ? "Abrir consola del sistema" : "Open system console"}
            >
              <i className="ph ph-terminal text-lg"></i>
              <span>SYSTEM_CONSOLE</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* Global Console Modal */}
      {isConsoleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brutal-black/40 backdrop-blur-xs select-none">
          <div className="w-full max-w-3xl">
            <BrutalWindow
              title={lang === "es" ? "CONSOLA DE DIAGNÓSTICO // JV_SYSTEM" : "DIAGNOSTIC CONSOLE // JV_SYSTEM"}
              isOpen={isConsoleOpen}
              onClose={() => setIsConsoleOpen(false)}
              statusBarText="STATUS: INTERACTIVE_SHELL"
            >
              <div className="text-left">
                <InteractiveConsole
                  command="docker compose up -d"
                  logs={[
                    "[INFO] Booting JV_SYSTEM_v2.0.4 on Ryzen 5 2600X...",
                    "[INFO] Connecting to secure Zero-Trust Tailscale mesh network...",
                    "[OK] Connection established. Gateway IP: 100.64.0.1",
                    "[INFO] Loading docker container stacks from local storage...",
                    "[OK] 14 containers loaded and checked. Health: 100%",
                    "[INFO] Deploying portfolio frontend using Next.js Turbopack...",
                    "[SUCCESS] JV_SYSTEM operational. Type 'help' to see available commands."
                  ]}
                />
              </div>
            </BrutalWindow>
          </div>
        </div>
      )}
    </main>
  );
}
