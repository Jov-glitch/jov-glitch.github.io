"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface BlueprintProps {
  lang: "es" | "en";
}

interface NodeDetail {
  title: string;
  tech: string;
  ports: string;
  policy: string;
  desc: string;
  status: string;
}

export function InfrastructureBlueprint({ lang }: BlueprintProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const t = {
    es: {
      title: "Plano del Ecosistema de Red UPN-162",
      subtitle: "Pasa el cursor sobre los nodos de infraestructura para ver detalles operativos en tiempo real.",
      sidebarHeader: "CONSOLA DE MONITOREO DE RED",
      defaultSidebar: "APUNTAR CURSOR A UN NODO DE INFRAESTRUCTURA PARA DESPLEGAR MÉTRICAS Y POLÍTICAS DE SEGURIDAD...",
      ports: "Puertos:",
      tech: "Tecnología:",
      policy: "Política:",
      status: "Estado:",
    },
    en: {
      title: "UPN-162 Network Ecosystem Blueprint",
      subtitle: "Hover over infrastructure nodes to inspect real-time operational details and telemetry.",
      sidebarHeader: "NETWORK MONITORING CONSOLE",
      defaultSidebar: "HOVER AN INFRASTRUCTURE NODE TO DEPLOY METRICS AND SECURITY POLICIES...",
      ports: "Ports:",
      tech: "Technology:",
      policy: "Policy:",
      status: "Status:",
    }
  }[lang];

  const nodeDetails: Record<string, Record<"es" | "en", NodeDetail>> = {
    cloudflare: {
      es: {
        title: "Cloudflare WAN Proxy",
        tech: "Anycast CDN, DDoS Protection, SSL Offloading",
        ports: "80 (HTTP) -> 443 (HTTPS)",
        policy: "Proxying de dominio público jessvega.me. Ofuscación de IPs reales.",
        desc: "Punto de entrada público a los servicios. Mitiga ataques volumétricos y distribuye tráfico web de consulta académica.",
        status: "ACTIVE // HEALTHY"
      },
      en: {
        title: "Cloudflare WAN Proxy",
        tech: "Anycast CDN, DDoS Protection, SSL Offloading",
        ports: "80 (HTTP) -> 443 (HTTPS)",
        policy: "Proxy public domain jessvega.me. Mask backend production IP.",
        desc: "Public entry point for external web requests. Mitigates volumetric attacks and serves academic public queries.",
        status: "ACTIVE // HEALTHY"
      }
    },
    opnsense: {
      es: {
        title: "OPNsense Perimeter Firewall",
        tech: "BSD Packet Filter, Intrusion Detection (IDS), NAT",
        ports: "WAN (80, 443) -> LAN VLAN segments",
        policy: "Drop WAN requests addressing database ports (3306, 5432). Allow only web proxies.",
        desc: "Firewall perimetral y puerta de enlace principal. Separa la DMZ, la red interna de administración y los hosts de cómputo.",
        status: "SECURED // IPS_ON"
      },
      en: {
        title: "OPNsense Perimeter Firewall",
        tech: "BSD Packet Filter, Intrusion Detection (IDS), NAT",
        ports: "WAN (80, 443) -> LAN VLAN segments",
        policy: "Drop WAN requests addressing database ports (3306, 5432). Allow only web proxies.",
        desc: "Perimeter firewall and gateway routing. Segregates DMZ, administrative LAN, and backend computing nodes.",
        status: "SECURED // IPS_ON"
      }
    },
    tailscale: {
      es: {
        title: "Tailscale Mesh VPN Tunnel",
        tech: "WireGuard protocol, Zero-Trust network layer",
        ports: "UDP 41641 (Encrypted Tunnel)",
        policy: "Only authenticated administrative nodes can join CEV network. Node authorization required.",
        desc: "Red mesh privada cifrada. Permite a los administradores e investigadores acceder directamente a bases de datos aisladas.",
        status: "CONNECTED // ACTIVE"
      },
      en: {
        title: "Tailscale Mesh VPN Tunnel",
        tech: "WireGuard protocol, Zero-Trust network layer",
        ports: "UDP 41641 (Encrypted Tunnel)",
        policy: "Only authenticated administrative nodes can join CEV network. Node authorization required.",
        desc: "Private encrypted mesh network. Allows secure administrative sessions to connect directly to isolated database layers.",
        status: "CONNECTED // ACTIVE"
      }
    },
    proxmox: {
      es: {
        title: "Proxmox VE (L1 Hypervisor)",
        tech: "KVM Virtualization, LXC Containers, ZFS Storage",
        ports: "Management port 8006 (TLS)",
        policy: "Cluster backups configured at 03:00 UTC (idempotent snapshot checkpoints).",
        desc: "Servidor físico bare-metal Ryzen. Hospeda las máquinas virtuales segmentadas en VLANs que corren la infraestructura.",
        status: "ONLINE // TEMP 42C"
      },
      en: {
        title: "Proxmox VE (L1 Hypervisor)",
        tech: "KVM Virtualization, LXC Containers, ZFS Storage",
        ports: "Management port 8006 (TLS)",
        policy: "Cluster backups configured at 03:00 UTC (idempotent snapshot checkpoints).",
        desc: "Bare-metal Ryzen physical host. Orchestrates segmented virtual machines and LXC containers on local hardware.",
        status: "ONLINE // TEMP 42C"
      }
    },
    swarm: {
      es: {
        title: "Docker Swarm Orchestrator",
        tech: "Docker Swarm Core, Overlay Networking",
        ports: "Internal Swarm communication ports",
        policy: "Container scaling based on load. Automatic healthcheck restarts.",
        desc: "Entorno de contenedores Docker Swarm. Organiza la ejecución y el escalamiento automático de Diana API y microservicios.",
        status: "ACTIVE // 4 REPLICAS"
      },
      en: {
        title: "Docker Swarm Orchestrator",
        tech: "Docker Swarm Core, Overlay Networking",
        ports: "Internal Swarm communication ports",
        policy: "Container scaling based on load. Automatic healthcheck restarts.",
        desc: "Container runtime engine. Organizes replication, internal DNS routing, and automatic scaling of Diana API modules.",
        status: "ACTIVE // 4 REPLICAS"
      }
    },
    diana: {
      es: {
        title: "Diana API: Core Middleware",
        tech: "Laravel 11, PHP 8.2+, Redis Caching",
        ports: "Internal bridge network, Port 8000",
        policy: "Bearer Token required. Concurrent session limiting active.",
        desc: "Punto único de verdad del ecosistema. Proporciona la pasarela RESTful para transacciones académicas seguras.",
        status: "RUNNING // LATENCY 8ms"
      },
      en: {
        title: "Diana API: Core Middleware",
        tech: "Laravel 11, PHP 8.2+, Redis Caching",
        ports: "Internal bridge network, Port 8000",
        policy: "Bearer Token required. Concurrent session limiting active.",
        desc: "Single source of truth middleware. Exposes the RESTful API endpoints for secure, audited academic operations.",
        status: "RUNNING // LATENCY 8ms"
      }
    },
    cevlocal: {
      es: {
        title: "CEV-Local (Database Vault)",
        tech: "MariaDB 10.11, SQL Immutable triggers, Automated Backups",
        ports: "Port 3306 (Internal Isolated VLAN only)",
        policy: "No public routing allowed. Access only via Diana API or mesh VPN.",
        desc: "Bóveda de datos históricos y control escolar. Protegido mediante triggers forenses que loguean cambios y accesos de red.",
        status: "ISOLATED // SECURE"
      },
      en: {
        title: "CEV-Local (Database Vault)",
        tech: "MariaDB 10.11, SQL Immutable triggers, Automated Backups",
        ports: "Port 3306 (Internal Isolated VLAN only)",
        policy: "No public routing allowed. Access only via Diana API or mesh VPN.",
        desc: "Core academic database vault. Hardened via immutable triggers logging transactions and IPs for forensic audit.",
        status: "ISOLATED // SECURE"
      }
    }
  };

  const getActiveDetail = () => {
    if (!activeNode) return null;
    return nodeDetails[activeNode]?.[lang];
  };

  const detail = getActiveDetail();

  return (
    <div className="flex flex-col xl:flex-row gap-6 border-2 border-brutal-black p-4 bg-brutal-light select-none w-full">
      {/* SVG Canvas (75% width on large screens) */}
      <div className="flex-1 bg-brutal-white border-2 border-brutal-black p-2 relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-x-auto scrollbar-thin">
        <svg
          viewBox="0 0 800 450"
          className="w-full max-w-[800px] h-auto font-mono"
          style={{ minWidth: "600px" }}
        >
          {/* Grid Background Pattern */}
          <defs>
            <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Connection Lines & Network Paths */}
          {/* WAN to Firewall */}
          <path
            d="M 120 120 L 220 120"
            fill="none"
            stroke="#000000"
            strokeWidth="3"
            strokeDasharray="8 6"
            className="animate-[dash_20s_linear_infinite]"
          />
          {/* Firewall to Proxmox/Swarm */}
          <path
            d="M 320 120 L 410 120 L 410 200 L 480 200"
            fill="none"
            stroke="#000000"
            strokeWidth="3"
            strokeDasharray="8 6"
            className="animate-[dash_25s_linear_infinite]"
          />
          {/* Tailscale Tunnel directly to CEV-Local DB */}
          <path
            d="M 120 340 L 410 340 L 410 280 L 480 280"
            fill="none"
            stroke="#ff0000"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-[dash_15s_linear_infinite]"
          />
          
          {/* internal connections inside swarm */}
          <path
            d="M 580 200 L 630 200 L 630 250 L 660 250"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 580 280 L 660 280"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* NODE 1: Cloudflare WAN */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setActiveNode("cloudflare")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="30"
              y="70"
              width="100"
              height="80"
              fill={activeNode === "cloudflare" ? "#ff0000" : "#ffffff"}
              stroke="#000"
              strokeWidth="3"
              className="transition-colors duration-150"
            />
            <text x="80" y="105" textAnchor="middle" fontWeight="bold" fontSize="11" fill={activeNode === "cloudflare" ? "#fff" : "#000"}>
              CLOUDFLARE
            </text>
            <text x="80" y="125" textAnchor="middle" fontSize="9" fill={activeNode === "cloudflare" ? "#fff" : "#666"}>
              [ WAN PROXY ]
            </text>
            <circle cx="130" cy="120" r="4" fill="#000" />
          </g>

          {/* NODE 2: OPNsense Firewall */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveNode("opnsense")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="220"
              y="70"
              width="100"
              height="80"
              fill={activeNode === "opnsense" ? "#ff0000" : "#ffffff"}
              stroke="#000"
              strokeWidth="3"
              className="transition-colors duration-150"
            />
            <text x="270" y="105" textAnchor="middle" fontWeight="bold" fontSize="11" fill={activeNode === "opnsense" ? "#fff" : "#000"}>
              OPNSENSE
            </text>
            <text x="270" y="125" textAnchor="middle" fontSize="9" fill={activeNode === "opnsense" ? "#fff" : "#666"}>
              [ GATEWAY ]
            </text>
            <circle cx="220" cy="120" r="4" fill="#000" />
            <circle cx="320" cy="120" r="4" fill="#000" />
          </g>

          {/* NODE 3: Tailscale VPN */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveNode("tailscale")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="30"
              y="300"
              width="100"
              height="80"
              fill={activeNode === "tailscale" ? "#ff0000" : "#ffffff"}
              stroke="#000"
              strokeWidth="3"
              className="transition-colors duration-150"
            />
            <text x="80" y="335" textAnchor="middle" fontWeight="bold" fontSize="11" fill={activeNode === "tailscale" ? "#fff" : "#000"}>
              TAILSCALE
            </text>
            <text x="80" y="355" textAnchor="middle" fontSize="9" fill={activeNode === "tailscale" ? "#fff" : "#666"}>
              [ MESH VPN ]
            </text>
            <circle cx="130" cy="340" r="4" fill="#ff0000" />
          </g>

          {/* CONTAINER NODE 4: Proxmox Host L1 */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveNode("proxmox")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="440"
              y="60"
              width="330"
              height="330"
              fill="transparent"
              stroke={activeNode === "proxmox" ? "#ff0000" : "#000000"}
              strokeWidth="4"
              strokeDasharray="6 6"
              className="transition-colors duration-150"
            />
            <text x="605" y="80" textAnchor="middle" fontWeight="bold" fontSize="12" fill={activeNode === "proxmox" ? "#ff0000" : "#000000"}>
              PROXMOX VE BARE-METAL SERVER
            </text>
          </g>

          {/* CONTAINER NODE 5: Docker Swarm Cluster */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveNode("swarm")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="460"
              y="110"
              width="290"
              height="260"
              fill="rgba(0, 0, 0, 0.02)"
              stroke={activeNode === "swarm" ? "#ff0000" : "#000000"}
              strokeWidth="3"
              className="transition-colors duration-150"
            />
            <text x="605" y="130" textAnchor="middle" fontWeight="bold" fontSize="10" fill={activeNode === "swarm" ? "#ff0000" : "#000000"}>
              DOCKER SWARM ORCHESTRATOR
            </text>
          </g>

          {/* NODE 6: Diana API Container */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveNode("diana")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="480"
              y="160"
              width="100"
              height="80"
              fill={activeNode === "diana" ? "#ff0000" : "#ffffff"}
              stroke="#000"
              strokeWidth="3"
              className="transition-colors duration-150"
            />
            <text x="530" y="195" textAnchor="middle" fontWeight="bold" fontSize="10" fill={activeNode === "diana" ? "#fff" : "#000"}>
              DIANA API
            </text>
            <text x="530" y="215" textAnchor="middle" fontSize="8" fill={activeNode === "diana" ? "#fff" : "#666"}>
              [ MIDDLEWARE ]
            </text>
            <circle cx="480" cy="200" r="4" fill="#000" />
            <circle cx="580" cy="200" r="4" fill="#000" />
          </g>

          {/* NODE 7: CEV-Local DB Vault Container */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveNode("cevlocal")}
            onMouseLeave={() => setActiveNode(null)}
          >
            <rect
              x="640"
              y="220"
              width="100"
              height="110"
              fill={activeNode === "cevlocal" ? "#ff0000" : "#ffffff"}
              stroke="#000"
              strokeWidth="3"
              className="transition-colors duration-150"
            />
            <text x="690" y="260" textAnchor="middle" fontWeight="bold" fontSize="10" fill={activeNode === "cevlocal" ? "#fff" : "#000"}>
              CEV-LOCAL
            </text>
            <text x="690" y="280" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ff0000" className={activeNode === "cevlocal" ? "fill-white" : ""}>
              [ DATABASE ]
            </text>
            <text x="690" y="300" textAnchor="middle" fontSize="8" fill={activeNode === "cevlocal" ? "#fff" : "#666"}>
              SECURE VAULT
            </text>
            <circle cx="640" cy="280" r="4" fill="#ff0000" />
            <circle cx="690" cy="220" r="4" fill="#000" />
          </g>
        </svg>
      </div>

      {/* Sidebar Monitoring Panel (25% width) */}
      <div className="w-full xl:w-72 bg-brutal-black text-brutal-green font-mono p-4 text-xs flex flex-col justify-between border-2 border-brutal-black shadow-inner min-h-[300px]">
        <div>
          {/* Sidebar Title */}
          <div className="pb-2 border-b border-brutal-dark/50 flex justify-between items-center text-[10px] text-brutal-gray mb-3">
            <span>{t.sidebarHeader}</span>
            <span className="w-2 h-2 rounded-full bg-brutal-green animate-pulse"></span>
          </div>

          {/* Active Node Info */}
          {detail ? (
            <div className="space-y-3 animate-[stagger-in_0.2s_ease-out]">
              <h4 className="text-brutal-white font-bold text-sm tracking-wider uppercase border-b border-brutal-dark/30 pb-1">
                {detail.title}
              </h4>
              <p className="text-[10px] text-brutal-gray leading-normal">{detail.desc}</p>
              
              <div className="space-y-1.5 pt-2 text-[10px]">
                <div>
                  <span className="text-brutal-gray font-bold block">{t.tech}</span>
                  <span className="text-brutal-light">{detail.tech}</span>
                </div>
                <div>
                  <span className="text-brutal-gray font-bold block">{t.ports}</span>
                  <span className="text-yellow-400 font-bold">{detail.ports}</span>
                </div>
                <div>
                  <span className="text-brutal-gray font-bold block">{t.policy}</span>
                  <span className="text-brutal-red">{detail.policy}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-brutal-gray/80 py-8 text-center italic leading-relaxed text-[10px]">
              {t.defaultSidebar}
            </div>
          )}
        </div>

        {/* Console status footer */}
        <div className="border-t border-brutal-dark/50 pt-2 mt-4 flex justify-between text-[8px] text-brutal-gray uppercase tracking-widest">
          <span>{t.status} {detail ? detail.status : "STANDBY"}</span>
          <span>NODE_ANALYSIS</span>
        </div>
      </div>
    </div>
  );
}
