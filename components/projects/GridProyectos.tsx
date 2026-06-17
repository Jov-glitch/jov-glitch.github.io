"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrutalWindow } from "@/components/ui/BrutalWindow";
import { InteractiveConsole } from "@/components/projects/InteractiveConsole";
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

// Map each project to its appropriate command and simulated terminal logs
const PROJECT_LOG_DATA: Record<string, { command: string; logs: string[] }> = {
  "Minecraft Distributed Node (GCP)": {
    command: "docker compose up -d mc-server",
    logs: [
      "[INFO] pulling paper-minecraft:1.20.4 container image...",
      "[INFO] container mc-server-violet created.",
      "[INFO] spawning reverse-proxy (nginx container)...",
      "[INFO] binding cloudflare-ddns service...",
      "[SUCCESS] reverse-proxy successfully routing mc.jessvega.me -> port 25565",
      "[INFO] starting minecraft server core...",
      "[INFO] loading properties, world seed: -1938592948",
      "[INFO] preparing spawn area: 24%... 56%... 98%... Done!",
      "[INFO] BlueMap 3D Web Renderer initialized on port 8100",
      "[SUCCESS] node mc-server running in GCP Compute Engine (Ubuntu 25.10)",
      "[INFO] player check: guest connected from 127.0.0.1"
    ]
  },
  "Ryzen Bare-Metal HomeLab": {
    command: "ansible-playbook -i hosts deploy-swarm.yml",
    logs: [
      "PLAY [Deploy Docker Swarm Services to Fedora Server] ************************",
      "TASK [Gathering Facts] *******************************************************",
      "ok: [ryzen-node-1]",
      "TASK [Verify Docker Daemon is running] **************************************",
      "ok: [ryzen-node-1]",
      "TASK [Deploy Stack (Portainer, Prometheus, Grafana, Nginx)] ******************",
      "changed: [ryzen-node-1]",
      "TASK [Configure Prometheus Target Scrapers] **********************************",
      "changed: [ryzen-node-1]",
      "TASK [Verify HTTP Endpoints Health] ******************************************",
      "ok: [ryzen-node-1] => (item=http://localhost:9090/graph)",
      "ok: [ryzen-node-1] => (item=http://localhost:3000/login)",
      "PLAY RECAP *******************************************************************",
      "ryzen-node-1               : ok=5    changed=2    unreachable=0    failed=0"
    ]
  },
  "Infrastructure as Code (IaC) Workflows": {
    command: "./setup-workstation.sh --hyprland",
    logs: [
      "[INFO] Initializing Hyprland & Fedora Auto-Provisioning Script...",
      "[INFO] Checking user privileges... [OK] running as root",
      "[INFO] Updating DNF packages cache...",
      "[INFO] Installing dependencies: hyprland, waybar, kitty, rofi, dunst...",
      "[SUCCESS] 42 packages installed successfully.",
      "[INFO] Copying dotfiles from /git/dotfiles/hypr to ~/.config/hypr...",
      "[INFO] Hardening SSH config (/etc/ssh/sshd_config)...",
      "[WARN] PasswordAuthentication is set to YES. Disabling it now... [OK]",
      "[INFO] Hardening Nginx config & Systemd service limits... [OK]",
      "[SUCCESS] Hardening complete. System is zero-trust ready.",
      "[SUCCESS] Hyprland desktop environment configured. Restarting display manager..."
    ]
  }
};

export function GridProyectos({ projects, lang }: GridProyectosProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "stack" | "code" | "console">("overview");
  const [copiedCode, setCopiedCode] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
    setActiveTab("overview");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Find standard logs based on project title, or fallback to Minecraft as generic template
  const getLogData = (title: string) => {
    return PROJECT_LOG_DATA[title] || PROJECT_LOG_DATA["Minecraft Distributed Node (GCP)"];
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="projects" className="bg-brutal-white w-full px-4 py-24 border-t-4 border-brutal-black">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={staggerItemVariants} className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-4">
            <span className="mr-2 sm:mr-3 inline-block">📦</span>
            {lang === "es" ? "Proyectos Destacados" : "Featured Projects"}
          </h2>
          <div className="h-1 w-20 bg-brutal-red mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItemVariants}
              whileHover={{ y: -6, boxShadow: "12px 12px 0px rgba(0, 0, 0, 0.95)" }}
              transition={{ duration: 0.15 }}
              onClick={() => openModal(project)}
              className="cursor-pointer h-full"
            >
              <Card brutal interactive className="h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-brutal-red" />

                <CardHeader className="pb-4 items-center">
                  <CardTitle className="text-xl mb-2 line-clamp-2">{project.title}</CardTitle>
                  <p className="text-xs text-brutal-gray font-mono uppercase tracking-wider">{project.purpose}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-4 pb-6">
                  <p className="text-sm leading-relaxed line-clamp-3 flex-1">{project.description}</p>

                  <div className="space-y-2">
                    <p className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-dark">Stack</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                      {project.stack.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{project.stack.length - 3}</Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brutal-black mt-auto">
                    <button className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-red hover:text-brutal-black transition-colors cursor-pointer">
                      {lang === "es" ? "Ver Detalles →" : "View Details →"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {modalOpen && selectedProject && (
            <BrutalWindow
              title={selectedProject.title}
              isOpen={modalOpen}
              onClose={closeModal}
              statusBarText={`RUNNING: ${selectedProject.purpose}`}
            >
              {/* Window Internal Tabs */}
              <div className="flex flex-wrap border-b-2 border-brutal-black mb-6 font-mono text-xs font-bold bg-brutal-light self-start">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 border-r-2 border-brutal-black transition-colors cursor-pointer ${
                    activeTab === "overview" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                  }`}
                >
                  {lang === "es" ? "📋 Resumen" : "📋 Overview"}
                </button>
                <button
                  onClick={() => setActiveTab("stack")}
                  className={`px-4 py-2 border-r-2 border-brutal-black transition-colors cursor-pointer ${
                    activeTab === "stack" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                  }`}
                >
                  {lang === "es" ? "⚙️ Stack" : "⚙️ Stack"}
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-2 border-r-2 border-brutal-black transition-colors cursor-pointer ${
                    activeTab === "code" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                  }`}
                >
                  {lang === "es" ? "📜 Código IaC" : "📜 IaC Code"}
                </button>
                <button
                  onClick={() => setActiveTab("console")}
                  className={`px-4 py-2 transition-colors cursor-pointer ${
                    activeTab === "console" ? "bg-brutal-black text-brutal-white" : "bg-brutal-white hover:bg-brutal-light"
                  }`}
                >
                  {lang === "es" ? "📡 Consola" : "📡 Console"}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="space-y-6 text-left">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-mono font-bold text-xs uppercase tracking-wider mb-2 text-brutal-gray">
                        [ {lang === "es" ? "Detalles del Proyecto" : "Project Description"} ]
                      </h3>
                      <p className="text-base leading-relaxed text-brutal-black whitespace-pre-line">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono font-bold text-xs uppercase text-brutal-gray block mb-1">
                        {lang === "es" ? "Propósito del Proyecto" : "Project Purpose"}
                      </span>
                      <p className="text-sm font-mono font-bold text-brutal-red uppercase">
                        ❯ {selectedProject.purpose}
                      </p>
                    </div>

                    {selectedProject.link && (
                      <div className="pt-6 border-t-2 border-brutal-black">
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="default" className="w-full font-mono font-bold cursor-pointer rounded-sm">
                            {lang === "es" ? "Explorar Proyecto en Línea ↗" : "Explore Project Online ↗"}
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-4">
                    <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-gray mb-2">
                      [ {lang === "es" ? "Habilidades Utilizadas" : "Complete Tech Stack"} ]
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <Badge key={tech} variant="default" className="text-sm font-mono px-3 py-1 border-2 border-brutal-black bg-brutal-white text-brutal-black rounded-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "code" && (
                  <div className="space-y-4">
                    <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-brutal-gray mb-2">
                      [ {lang === "es" ? "SCRIPTS DE AUTOMATIZACIÓN E INFRAESTRUCTURA" : "IaC & AUTOMATION WORKFLOWS"} ]
                    </h3>
                    {selectedProject.iacCode ? (
                      <div className="relative border-2 border-brutal-black bg-brutal-black text-brutal-white font-mono p-4 text-xs rounded-brutal shadow-inner max-h-[300px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap leading-relaxed select-text font-mono text-[11px]">
                          <code>{selectedProject.iacCode}</code>
                        </pre>
                        <button
                          onClick={() => copyCodeToClipboard(selectedProject.iacCode || "")}
                          className="absolute top-2 right-2 bg-brutal-light text-brutal-black border-2 border-brutal-black font-mono text-[9px] px-2 py-1 hover:bg-brutal-red hover:text-brutal-white transition-all cursor-pointer font-bold rounded-sm"
                        >
                          {copiedCode ? (lang === "es" ? "¡COPIADO!" : "COPIED!") : "COPY_CODE"}
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm font-mono text-brutal-gray">
                        {lang === "es" ? "No hay scripts de automatización disponibles." : "No automation scripts available."}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "console" && (
                  <div className="space-y-4">
                    <InteractiveConsole
                      command={getLogData(selectedProject.title).command}
                      logs={getLogData(selectedProject.title).logs}
                    />
                  </div>
                )}
              </div>
            </BrutalWindow>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
