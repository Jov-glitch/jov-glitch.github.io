export const profile = {
    name: "Jose Vega",
    title: "Junior Cloud Engineer | DevOps & IaC Specialist",
    tagline: "Infrastructure is the limit of modern computing; I build the foundations.",
    location: "Zamora, Michoacán, Mexico",
    email: "contact@jessvega.me",
    github: "https://github.com/Jov-glitch",
    linkedin: "https://www.linkedin.com/in/jose-vega-a477b13a3/",
    about: `I am a Systems Engineer in training (8th Semester, TecNM Zamora) passionate about Infrastructure as Code (IaC) and Linux system automation. My professional focus centers on eliminating manual intervention through orchestration and provisioning tools, under the premise that if a system is manual configured via SSH, it is a design failure.

Currently, I manage critical infrastructure at a public higher education institution, where I lead the migration of legacy services to containerized architectures, optimizing the resilience and scalability of academic systems.`,
    vision: "My short-term goal is to obtain the Google Cloud Associate certification (GCP ACE) and deepen my knowledge in the Kubernetes ecosystem (Helm) for large-scale orchestration. I firmly believe that in the AI era, an engineer's competitive edge lies in the ability to guarantee the reliability, security, and persistence of the infrastructure supporting the models."
};

export const skills = [
    {
        category: "Cloud & Orchestration",
        items: [
            { name: "Public Cloud", description: ["AWS (EC2, S3, IAM)", "GCP (Associate Cloud Engineer Candidate)"] },
            { name: "Containers", description: ["Docker", "Docker Swarm", "Portainer", "Proxmox VE"] },
            { name: "IaC & Automation", description: ["Terraform", "Advanced Bash Scripting"] },
            { name: "Networking", description: ["Tailscale (Mesh VPN)", "OPNsense", "Zero-Trust Architecture"] }
        ]
    },
    {
        category: "Systems & Security",
        items: [
            { name: "OS Focus", description: ["Linux Power User (Fedora Workstation / Server, Debian)"] },
            { name: "Hardening", description: ["Nginx Hardening", "SSH Security", "Systemd Management"] },
            { name: "Observability", description: ["Datadog", "Prometheus & Grafana (Self-hosted)"] }
        ]
    },
    {
        category: "Backend Development",
        items: [
            { name: "Languages", description: ["PHP 8+ (Laravel)"] },
            { name: "Databases", description: ["MySQL", "MariaDB", "Query Optimization"] }
        ]
    }
];

export const experience = [
    {
        role: "Systems Administrator & Project Lead",
        company: "CEV Environment (Public University)",
        period: "2024 - Present",
        link: "#ecosystem",
        achievements: [
            "Lead Architect of 'Control Escolar Virtual': Distributed ecosystem with environment separation (Local/Web) under Zero-Trust principles.",
            "Technical leadership in migrating stochastic relational databases to modern RESTful APIs (Diana API).",
            "Implementation of Mesh VPN (Tailscale) and perimeter Hardening (OPNsense) to shield internal services.",
            "Massive optimization of local deployment through Docker containers and DDEV workflows."
        ]
    },
    {
        role: "Cloud Infrastructure Architect (HomeLab & Freelance)",
        company: "V-Net Labs",
        period: "2022 - Present",
        link: "https://github.com/Jov-glitch",
        achievements: [
            "Design and deployment of gaming community infrastructures on AWS (EC2/GCP), managing resource auto-scaling.",
            "Linux systems administrator for high-availability deployments, integrating advanced monitoring (Datadog/Prometheus).",
            "Specialist in SSH and Nginx server Hardening to mitigate automated attacks and brute force attempts."
        ]
    }
];

export const kpis = [
    {
        metric: "4.8s",
        label: "RTO (Recovery Time)",
        detail: "Restoration Engine completely automated (ETL)",
        icon: "⚡"
    },
    {
        metric: "0",
        label: "Exposed WAN Ports",
        detail: "Private mesh VPN & Zero-Trust network perimeter",
        icon: "🛡️"
    },
    {
        metric: "<10ms",
        label: "Middleware Latency",
        detail: "Diana API database abstraction layer",
        icon: "📡"
    }
];

export const upnEcosystem = {
    title: "CEV Digital Ecosystem",
    subtitle: "Critical Infrastructure & Distributed Academic Management",
    tagline: "Modernizing legacy systems through hybrid architectures and Zero-Trust security.",
    stack: ["PHP 8.2", "Laravel 11", "Docker", "DDEV", "Tailscale", "Proxmox", "OPNsense"],

    overview: {
        problem: "A +20-year legacy monolithic system with accumulated technical debt, data integrity risks, and unnecessary public network exposure.",
        solution: "Design of a decoupled ecosystem that separates administrative management (Local) from public inquiries (Web) via a high-availability Middleware.",
        impact: "Guaranteeing historical data persistence and modernizing user experience without interrupting institutional operations."
    },

    modules: [
        {
            id: "cev-maestro",
            title: "CEV: Master System (Cev-Local)",
            subtitle: "High-Resilience Administrative Control Panel",
            stack: ["PHP 8.2+", "MariaDB", "Automated Scripting", "UIkit", "FPDF/PHPExcel"],
            description: "Operational core in charge of high-density academic data management and critical institutional processes (enrollments, records, and files). Acts as a heavy-management 'digital vault' under a controlled and redundant environment.",
            solution_rationale: "CEV-Local guarantees institutional Technological Sovereignty, providing operational independence and absolute control over academic accountability under advanced security standards.",
            iacCode: `version: "3.8"
services:
  cev-local-db:
    image: mariadb:10.11
    container_name: cev-database-vault
    environment:
      MARIADB_ROOT_PASSWORD: "\${DB_ROOT_PASSWORD}"
      MARIADB_DATABASE: "cev_academic_db"
    volumes:
      - db_data:/var/lib/mysql
      - ./backups:/backups
    networks:
      - cev-secure-net
    restart: unless-stopped

  cev-local-app:
    image: php:8.2-fpm-alpine
    container_name: cev-app-core
    volumes:
      - ./app:/var/www/html
    networks:
      - cev-secure-net
    restart: unless-stopped

networks:
  cev-secure-net:
    internal: true # Isolated from WAN

volumes:
  db_data:`
        },
        {
            id: "diana-api",
            title: "Diana API: Core Middleware",
            subtitle: "Capa de Abstracción e Integración Institucional",
            stack: ["Laravel 11", "PHP 8.2+", "Token-Based Auth", "SQL Triggers"],
            description: "RESTful services infrastructure designed as the single point of truth for the ecosystem. Provides a standardized and secure interface for interaction between academic resources and end clients.",
            solution_rationale: "Diana API consolidates a professional base for digital service expansion, ensuring information is accessible and auditable without compromising institutional privacy.",
            iacCode: `version: "3.8"
services:
  diana-api:
    image: php:8.2-fpm-alpine
    container_name: diana-api-middleware
    environment:
      APP_ENV: production
      APP_DEBUG: "false"
      DB_HOST: diana-api-db
    volumes:
      - ./src:/var/www/html
    networks:
      - cev-middleware-net
    restart: unless-stopped

  diana-api-db:
    image: mariadb:10.11
    container_name: diana-api-database
    environment:
      MARIADB_DATABASE: diana_middleware
    volumes:
      - diana_db:/var/lib/mysql
    networks:
      - cev-middleware-net
    restart: unless-stopped

networks:
  cev-middleware-net:

volumes:
  diana_db:`
        },
        {
            id: "secure-infra-orch",
            title: "Infrastructure Architecture & Secure Orchestration",
            subtitle: "Private Data Center & High-Availability Mesh Network",
            stack: ["Virtualization (L1)", "Security Gateway", "Mesh VPN", "Private DNS", "Docker"],
            description: "Design and deployment of a segmented and virtualized network ecosystem. The infrastructure is designed to eliminate exposure of critical services to the public internet, centralizing management through encrypted tunnels and logical traffic segmentation.",
            solution_rationale: "This architecture grants Technological Sovereignty to the institution, transforming its infrastructure into a private fortress capable of supporting the next generation of digital educational services.",
            iacCode: `# OPNsense & Tailscale Configuration
echo "[INFO] Segmenting academic VLAN networks..."
# Block all cross-VLAN traffic by default
# Allow only Authorized Admin IP to CEV-Local DB

# Configure Tailscale route advertisement
tailscale up --advertise-routes=10.0.10.0/24,10.0.20.0/24 --accept-routes=false

# Apply Nginx Hardening configuration
cat << 'EOF' > /etc/nginx/conf.d/security.conf
server_tokens off;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Content-Security-Policy "default-src 'self';" always;
EOF
systemctl reload nginx`
        },
        {
            id: "restoration-engine",
            title: "Core Data Restoration & Migration Engine",
            subtitle: "ETL Process Automation & Disaster Recovery",
            stack: ["Bash", "MySQL CLI", "Linux Utils"],
            description: "Automation engine in charge of rebuilding, sanitizing, and patching the data infrastructure. Reduces deployment time and guarantees information integrity through idempotent processes.",
            solution_rationale: "This engine eliminates human error and ensures the institution is resilient against any failure, enabling digital sovereignty based on automatic and auditable processes.",
            iacCode: `#!/bin/bash
# Core ETL & Database Patching Engine
set -euo pipefail

BACKUP_FILE="/backups/backup_master_2026.cevsys"
DB_NAME="cev_academic_db"

echo "[INFO] Initializing restore process..."
if [ ! -f "$BACKUP_FILE" ]; then
    echo "[ERROR] Backup file not found!" >&2
    exit 1
fi

echo "[INFO] Decompressing and patching..."
mysql -u root -p"\${DB_PASSWORD}" "$DB_NAME" < /app/database/schema_v4.2.sql
mysql -u root -p"\${DB_PASSWORD}" "$DB_NAME" -e "
    CALL SanitizeHistoricalRecords();
    CALL ApplyDatabasePatches();
"
echo "[SUCCESS] System state: IDLE // Disaster Recovery Ready."`
        }
    ],

    tooling: [
        {
            name: "Core Restoration Engine",
            language: "Bash",
            purpose: "ETL process automation and Disaster Recovery.",
            features: ["Dual logging", "Idempotency", "Automatic database patching"]
        }
    ]
};

export const projects = [
    {
        title: "Minecraft Distributed Node (GCP)",
        description: "Deployment of a productive Minecraft server using Google Cloud. Includes Nginx reverse proxy, 3D web visualization (BlueMap), and optimized mod pack.",
        stack: ["Docker", "GCP", "Nginx", "Cloudflare"],
        purpose: "Community event with real-time monitoring and secure network architecture.",
        iacCode: `version: "3.8"
services:
  mc-server:
    image: itzg/minecraft-server:java17
    container_name: mc-server-violet
    ports:
      - "25565:25565"
    environment:
      EULA: "TRUE"
      TYPE: "PAPER"
      VERSION: "1.20.4"
      MEMORY: "6G"
      INIT_MEMORY: "2G"
      SEED: "-1938592948"
    volumes:
      - mc-data:/data
    restart: unless-stopped

  nginx-proxy:
    image: nginx:alpine
    container_name: mc-nginx-proxy
    ports:
      - "80:80"
      - "8100:8100"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped

volumes:
  mc-data:`
    },
    {
        title: "Ryzen Bare-Metal HomeLab",
        description: "A persistent test environment based on a Ryzen 2600x running Fedora Server with distributed orchestration.",
        stack: ["Docker Swarm", "Ansible", "Nginx", "Prometheus"],
        purpose: "Experimentation with high availability and resilience of self-hosted services.",
        iacCode: `- name: Deploy Docker Swarm Services to HomeLab
  hosts: homelab_servers
  become: yes
  tasks:
    - name: Ensure Docker is active
      systemd:
        name: docker
        state: started
        enabled: yes

    - name: Initialize Docker Swarm (if not active)
      shell: docker swarm init --advertise-addr {{ ansible_default_ipv4.address }}
      register: swarm_init
      failed_when: false
      changed_when: "'Swarm initialized' in swarm_init.stdout"

    - name: Deploy Monitoring Stack (Prometheus/Grafana)
      docker_stack:
        state: present
        name: monitoring
        compose:
          - /opt/monitoring/docker-compose.yml`
    },
    {
        title: "Infrastructure as Code (IaC) Workflows",
        description: "Development of Ansible Playbooks and Bash scripts for automatic workstation deployment and server hardening.",
        stack: ["Bash", "Ansible", "Hyprland", "Fedora"],
        purpose: "Eliminating 'manual configuration via SSH' and standardizing web server deployments.",
        iacCode: `#!/bin/bash
# Hardening Server Script (Fedora/Debian)
set -euo pipefail

echo "[INFO] Running SSH Hardening..."
SSHD_CONFIG="/etc/ssh/sshd_config"

sed -i 's/^#\\?PermitRootLogin.*/PermitRootLogin no/' "$SSHD_CONFIG"
sed -i 's/^#\\?PasswordAuthentication.*/PasswordAuthentication no/' "$SSHD_CONFIG"
sed -i 's/^#\\?PubkeyAuthentication.*/PubkeyAuthentication yes/' "$SSHD_CONFIG"

echo "[INFO] Configuring UFW Firewall rules..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

systemctl restart sshd
echo "[SUCCESS] Hardening applied safely."`
    },
    {
        title: "FeDots-43 (Linux Dotfiles)",
        description: "My personal Linux workstation environment setup. Includes customized Hyprland window manager configurations, automated shell deployment playbooks, and utility scripting for Fedora/Debian environments.",
        stack: ["Bash", "Ansible", "Hyprland", "Fedora", "Lua"],
        purpose: "Standardizing development workstation deployment and automation of graphical window environments.",
        link: "https://github.com/JessVolet/FeDots-43",
        iacCode: `# Hyprland key bindings configuration snippet
$mainMod = SUPER
bind = $mainMod, Q, exec, alacritty
bind = $mainMod, C, killactive,
bind = $mainMod, M, exit,
bind = $mainMod, E, exec, dolphin
bind = $mainMod, V, togglefloating,
bind = $mainMod, R, exec, wofi --show drun

# Auto-install shell script snippet
echo "[DOTFILES] Copying configs to ~/.config/hypr..."
mkdir -p ~/.config/hypr
cp -r ./hypr/* ~/.config/hypr/
echo "[DOTFILES] Window Manager configurations applied."`
    },
    {
        title: "Technical Assessment (FrontEnd)",
        description: "A technical React application demonstrating component-driven development, custom hook implementation, optimized state management, and semantic responsive styling.",
        stack: ["React", "TypeScript", "TailwindCSS", "Vite", "REST APIs"],
        purpose: "Technical test showcase displaying interactive data grid and filter optimization.",
        link: "https://github.com/JessVolet/PruebaTecnicaUPN-FrontEnd",
        iacCode: `// Sample React custom hook for data filtering
import { useState, useMemo } from 'react';

export function useDataFilter<T>(items: T[], key: keyof T) {
  const [query, setQuery] = useState('');
  
  const filteredItems = useMemo(() => {
    if (!query) return items;
    return items.filter(item => 
      String(item[key]).toLowerCase().includes(query.toLowerCase())
    );
  }, [items, key, query]);
  
  return { query, setQuery, filteredItems };
}`
    }
];

export const minecraftEvent = {
    active: false,
    title: "🧱 MINECRAFT HUB EVENT ARCHIVE 🧱",
    description: "The Minecraft event is now closed, but I'm keeping this space as an archive and a thank-you.",
    buttonText: "EVENT CLOSED",
    link: "/minecraft-project/",
    serverIp: "mc.jessvega.me",
    mapLink: "https://mapa.jessvega.me",
    closingTitle: "THANK YOU FOR MAKING IT HAPPEN",
    closingDescription: "Thanks to everyone involved: players, builders, testers, and technical support. Your energy, ideas, and reports helped bring the server to life.",
    closingMessage: "This project closes with appreciation and as a reminder of the team effort that made it possible.",
    modpack: {
        link: "https://www.mediafire.com/file/vv3k5wlxkxg327j/ModPack-PrismLauncher%2528recomended%2529.zip/file",
        description: "Official server modpack. Includes Aether, owo-lib, and Simple Voice Chat.",
        instructions: "It is recommended to use Prism Launcher to import the .zip file directly."
    },
    aboutEvent: "I've enabled a temporary Minecraft server (for 1 month). It's a space for us to relax, build cool things, and share.",
    gamerStory: "Beyond containers and code, I am a gamer. It was through games that I discovered my passion for technology; from optimizing FPS settings because my computer couldn't run them, to managing Minecraft servers over 10 years ago. I'm that hardcore fan of retro games. Yes, I'm a 'flamer' at heart when things aren't done with excellence, because I believe that in both gaming and engineering, one must give their absolute best.",
    bgImage: "/src/img/dirty_bg_mc.jpg",
    rules: [
        { title: "Mutual Respect", desc: "Treat others as you would like to be treated." },
        { title: "No Griefing", desc: "Respect others' constructions (including signs)." },
        { title: "Fair Use", desc: "Avoid farms that could cause extreme server lag." },
        { title: "Have Fun", desc: "That is the event's main goal." }
    ],
    architecture: [
        {
            title: "1. Compute Layer (Cloud & Virtualization)",
            details: [
                "Provider: Google Cloud Platform (GCP).",
                "Instance: VM on Compute Engine running Ubuntu 25.10 (Plucky Puffin).",
                "Orchestration: Docker and Docker Compose were used to encapsulate services."
            ]
        },
        {
            title: "2. Network & Web Access Layer (Networking)",
            details: [
                "Reverse Proxy (Nginx): Receives requests on port 80 and redirects them internally.",
                "DNS Security (Cloudflare): The jessvega.me domain is behind Cloudflare's proxy.",
                "Perimeter Firewall: Ports limited to 22 SSH, 80 Web, and 25565 Game."
            ]
        }
    ],
    monitoring: [
        {
            title: "Homelab Bare-Metal Metrics",
            description: "Persistent monitoring of my local infrastructure based on Ryzen 5 2600x. Granular tracking of CPU (System/Idle), physical RAM vs Swap usage, and Docker container consumption visualization.",
            dashboard_url: "https://p.us5.datadoghq.com/sb/f837429d-eb8d-11f0-91c7-ca160a8299b1-df2cb84313a1251e968213a617859b0c"
        },
        {
            title: "GCP Virtual Node Status",
            description: "Operational status of the Google Cloud node (mc-server-violet.red). Monitoring of NTP latency, incoming/outgoing network traffic, and FileSystem state for the Minecraft server.",
            dashboard_url: "https://p.us5.datadoghq.com/sb/f837429d-eb8d-11f0-91c7-ca160a8299b1-ac69c0c7bfdeeeccccac56c01b68c366"
        }
    ]
};
