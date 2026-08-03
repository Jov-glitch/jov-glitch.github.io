export const profile = {
    name: "Jose Vega",
    title: "Junior Cloud Engineer | DevOps & IaC Specialist",
    tagline: "Infrastructure is the limit of modern computing; I build the foundations.",
    location: "Zamora, Michoacán, Mexico",
    email: "contact@jessvega.me",
    github: "https://github.com/Jov-glitch",
    linkedin: "https://www.linkedin.com/in/jose-vega-a477b13a3/",
    about: `Systems and Networks Technologist with a hybrid profile focused on Infrastructure Administration, Cybersecurity, and Software Development. I have a solid foundation in the design and optimization of enterprise networks (CCNA), applied cybersecurity, and virtual environment management. Currently, I lead development teams for the delivery of complex software projects and manage local and cloud infrastructures (Docker/Linux), ensuring the scalability, security, and high availability of services.

Under the premise that if a system is manually configured via SSH, it is a design failure, I center my professional focus on eliminating manual intervention through automation, orchestration, and Zero-Trust principles.`,
    vision: "My short-term goal is to obtain the Google Cloud Associate certification (GCP ACE) and deepen my knowledge in the Kubernetes ecosystem (Helm) for large-scale orchestration. I firmly believe that in the AI era, an engineer's competitive edge lies in the ability to guarantee the reliability, security, and persistence of the infrastructure supporting the models."
};

export const skills = [
    {
        category: "Virtualization & Containers",
        description: "Infrastructure isolation and resource optimization through containerization and hypervisors. I prioritize building reproducible, immutable environments over manual configurations.",
        details: [
            "Designing and implementing multi-container topologies using Docker Compose",
            "Container deployment, networking, and volume management with Docker & Podman",
            "Bare-metal hypervisor administration and VM orchestration using Proxmox VE",
            "Configuring isolated testing environments and local development environments"
        ],
        applications: [
            "Orchestrated local and production containers for the CEV Ecosystem",
            "Maintained home labs and game servers running on Fedora Server with Docker/Portainer",
            "Set up VM templates in Proxmox VE for automated provisioning"
        ],
        items: [
            { name: "Containers", description: ["Docker", "Podman", "Portainer", "Proxmox VE"] },
            { name: "Hypervisors", description: ["QEMU/KVM", "VirtualBox (Kali Linux pentesting)"] }
        ]
    },
    {
        category: "Cloud & Server Infrastructure",
        description: "Enterprise-grade server administration, shell scripting, and public cloud architecture. I focus on automated configuration management and server hardening.",
        details: [
            "Provisioning and security lifecycle management of AWS (EC2, S3, IAM) resources",
            "GCP architecture patterns, candidate for GCP Associate Cloud Engineer (ACE)",
            "Advanced Linux system administration (Fedora Server, Debian) and shell scripting",
            "Local development environment standardization using DDEV and Docker Compose"
        ],
        applications: [
            "Deployed game server clusters on AWS EC2 and GCP with auto-scaling policies",
            "Wrote automated backup and security auditing Bash scripts for production environments",
            "Standardized developer workflows for UPN-162 team using DDEV local environments"
        ],
        items: [
            { name: "Cloud Platforms", description: ["AWS (EC2, S3, IAM)", "GCP (Associate Cloud Engineer Candidate)"] },
            { name: "Linux OS", description: ["Fedora Server/Workstation", "Debian Linux", "Advanced Bash Scripting"] },
            { name: "Local Dev Env", description: ["DDEV", "Docker Compose"] }
        ]
    },
    {
        category: "Network Routing & Security",
        description: "Designing resilient network topologies, traffic control, and proactive security measures. Guided by CCNA standards and Zero-Trust access design.",
        details: [
            "Dynamic routing protocols (OSPFv2) and logical segmentation (VLANs & Trunking)",
            "Network access control list (IPv4 ACLs) configuration and traffic filtering",
            "Zero-Trust overlay networking using Tailscale mesh VPN to isolate sensitive databases",
            "OPNsense firewall administration, port forwarding, and Nginx reverse proxy hardening"
        ],
        applications: [
            "Designed and implemented private network mesh with Tailscale to secure CEV databases",
            "Configured OSPF routing protocols and trunk links in enterprise simulation environments",
            "Mitigated security threats (SQL Injection, unauthorized access) on public school portals"
        ],
        items: [
            { name: "Routing & Switching", description: ["OSPFv2 Protocols", "VLANs & Trunking", "CCNA Enterprise Specs"] },
            { name: "Applied Security", description: ["IPv4 ACLs", "Network Defense & Hardening", "SQL Injection Mitigation"] },
            { name: "Zero-Trust & VPNs", description: ["Tailscale Mesh VPN", "OPNsense Firewall", "SSH/Nginx Security"] }
        ]
    },
    {
        category: "Backend & Frameworks",
        description: "Developing high-performance, structured APIs and managing transactional relational database engines. I believe in clean code, automated migrations, and strict type systems.",
        details: [
            "Modern backend API development using PHP 8+ (Laravel) and TypeScript (Next.js)",
            "Database administration, schema migrations, and index optimization (MySQL, MariaDB)",
            "Designing secure ETL pipelines for offline-to-online data synchronization",
            "Query tuning to achieve low response times (<8ms averages)"
        ],
        applications: [
            "Designed the Diana API in Laravel 11 as the central data gateway for school systems",
            "Migrated and consolidated over 12,000 historical school records in MySQL",
            "Integrated React/Next.js frontend applications with centralized backends"
        ],
        items: [
            { name: "Languages & Frameworks", description: ["PHP 8+ (Laravel)", "TypeScript (React, Next.js)"] },
            { name: "Databases & ETL", description: ["MySQL", "MariaDB", "Query & Schema Optimization"] }
        ]
    },
    {
        category: "Standards & Governance",
        description: "Adhering to international quality standards for security management, software quality assurance, and IT service delivery.",
        details: [
            "Information Security Management System alignment based on ISO 27001 standards",
            "Software Process Improvement and Capability Determination (SPICE / ISO 33000)",
            "IT Service Management principles for operations and delivery (ISO 20000)",
            "Documentation of deployment processes and disaster recovery plans (DRP)"
        ],
        applications: [
            "Designed the disaster recovery plan (DRP) for the CEV database with a tested 4.8s RTO",
            "Implemented access audits and security compliance rules in the school ecosystem",
            "Structured development guidelines following software engineering best practices"
        ],
        items: [
            { name: "Best Practices", description: ["ISO 27001 (Security)", "ISO 33000 (SPICE Quality)", "ISO 20000 (IT Services)"] }
        ]
    }
];

export const experience = [
    {
        role: "Project Lead & Systems Administrator",
        company: "CEV Environment (Public University)",
        period: "February 2026 - Present",
        link: "#ecosystem",
        description: "Strategic direction and administration of the distributed school ecosystem infrastructure, coordinating workflows and implementing Zero-Trust security policies.",
        stack: ["Docker", "Tailscale", "Fedora Linux", "MySQL", "DDEV", "Nginx"],
        achievements: [
            "Direction and administration of the development team in charge of the maintenance, scalability, and deployment phase of the comprehensive ecosystem.",
            "Coordination of agile workflows and supervision of local and cloud architecture.",
            "Server hardening and Zero-Trust access policies to guarantee academic immutability and confidentiality."
        ],
        details: [
            "Technical management of local environments and workflows based on DDEV and Docker containers.",
            "Administration of private VPN accesses and tunnels using Tailscale to isolate student databases.",
            "Implementation of proactive monitoring and perimeter security audit logs."
        ],
        impact: [
            "Guarantee of high service availability during high-concurrency registration periods.",
            "Zero network security incidents registered under the new local administration and mesh VPN policies."
        ]
    },
    {
        role: "Software Systems Developer (CEV Local, CEV Web & Diana API)",
        company: "CEV Environment (Public University)",
        period: "2024 - February 2026",
        link: "#ecosystem",
        description: "Design and implementation from scratch of the three core components of the CEV Ecosystem: the local capture system (PHP/HTML/UIKit), the responsive institutional portal, and the unified Laravel API.",
        stack: ["Laravel", "PHP", "MySQL", "UIKit", "HTML", "CSS", "Tailwind CSS", "JavaScript"],
        achievements: [
            "Full design and development of 'CEV Local', an offline-first capture system built with PHP, HTML, and UIKit CSS for academic data capture.",
            "Development of 'Diana API' in Laravel 11.x, serving as a unified data gateway with immutable database triggers.",
            "Implementation of 'CEV Web', a responsive institutional portal for online school queries and registrations."
        ],
        details: [
            "Programming relational database logic and migrations to consolidate historical academic records.",
            "Building efficient ETL flows to synchronize local data with the centralized API.",
            "Integration of optimized and accessible user interfaces with Tailwind CSS on web portals."
        ],
        impact: [
            "Successful consolidation of over 12,000 historical school records into a unified relational engine.",
            "API response times optimized below 8ms on average through caching and prepared queries.",
            "RTO reduced to 4.8 seconds in disaster recovery drills (DRP) of the data engine."
        ]
    },
    {
        role: "Cloud Infrastructure Architect (HomeLab & Freelance)",
        company: "V-Net Labs",
        period: "2022 - Present",
        link: "https://github.com/Jov-glitch",
        description: "Design, administration, and auditing of self-hosted homelabs and cloud servers for gaming communities and private clients.",
        stack: ["Fedora Linux", "Docker", "AWS", "GCP", "Portainer", "Prometheus", "Datadog", "Nginx"],
        achievements: [
            "Self-Hosted Stacks Infrastructure: Designed and implemented local production and lab environments based on Fedora Linux.",
            "Microservices & Monitoring management using Docker containers and Portainer, optimizing advanced NVMe storage performance and network security.",
            "Design and deployment of gaming community infrastructures on AWS (EC2/GCP), managing resource auto-scaling.",
            "Linux systems administrator for high-availability deployments, integrating advanced monitoring (Datadog/Prometheus) and SSH/Nginx hardening."
        ],
        details: [
            "Virtualization and management of hardware HomeLab over Linux hypervisors and NVMe storage with redundant RAID arrays.",
            "Provisioning and basic Infrastructure as Code (IaC) for dynamic deployment of game servers and web services in AWS (EC2/S3) and GCP.",
            "Configuration of real-time monitoring pipelines using Prometheus, Grafana, and Datadog to supervise CPU, memory, and network metrics.",
            "Administration of secure web servers using Nginx, configuring SSL certificates with Let's Encrypt and protection against brute-force attacks."
        ],
        impact: [
            "Maintained 99.9% uptime on self-hosted services through automated backups and proactive monitoring.",
            "40% cost savings in cloud infrastructure for gaming communities through auto-scaling and resource size optimization.",
            "Successful deployment and testing of a productive Minecraft server in the cloud, integrating reverse proxy and telemetry."
        ]
    }
];

export const kpis = [
    {
        metric: "4.8s",
        label: "RTO (Recovery Time)",
        detail: "Restoration Engine completely automated (ETL)",
        icon: "ph ph-lightning"
    },
    {
        metric: "0",
        label: "Exposed WAN Ports",
        detail: "Private mesh VPN & Zero-Trust network perimeter",
        icon: "ph ph-shield-check"
    },
    {
        metric: "<10ms",
        label: "Middleware Latency",
        detail: "Diana API database abstraction layer",
        icon: "ph ph-broadcast"
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
        link: "/minecraft-project",
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
    link: "https://mc.jessvega.me/",
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
                "Provider: **[Google Cloud Platform (GCP)](/skills?cat=1)**.",
                "Instance: VM on Compute Engine running Ubuntu 25.10 (Plucky Puffin).",
                "Orchestration: **[Docker](/skills?cat=0)** and **[Docker Compose](/skills?cat=0)** were used to encapsulate services."
            ]
        },
        {
            title: "2. Network & Web Access Layer (Networking)",
            details: [
                "Reverse Proxy: **[Nginx](/skills?cat=2)** receives requests on port 80 and redirects them internally.",
                "DNS Security: The domain is behind **[Cloudflare's Proxy](/skills?cat=2)**.",
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

export const certifications = [
    {
        category: "Networking (Cisco Certified Network Associate - CCNA)",
        items: [
            {
                name: "CCNA: Enterprise Networking, Security, and Automation (CCNA 3)",
                date: "June 2026",
                description: "Advanced enterprise network configuration, emphasizing security, virtualization, and network automation workflows.",
                details: [
                    "OSPFv2 (single and multi-area) routing configuration and troubleshooting",
                    "Network security concepts including ACLs, threat mitigation, and secure device access",
                    "WAN technologies, virtualization, and IPsec/GRE VPN tunneling architectures",
                    "Network automation tools and concepts (APIs, JSON, RESTCONF, Puppet, Chef, Ansible)"
                ],
                rolesEnabled: [
                    "Configure and troubleshoot complex enterprise routing and switching structures",
                    "Design and implement secure site-to-site VPNs and logically segment networks",
                    "Orchestrate network device configurations programmatically using Python and configuration management APIs"
                ]
            },
            {
                name: "CCNA: Switching, Routing, and Wireless Essentials (CCNA 2)",
                date: "June 2025",
                description: "Core technologies for routing, switching, and wireless communication in enterprise local area networks (LANs).",
                details: [
                    "VLAN configuration, trunking, and Inter-VLAN routing techniques",
                    "Redundant topology management using Spanning Tree Protocol (STP/RSTP) and EtherChannel link aggregation",
                    "Dynamic addressing configuration (DHCPv4 and DHCPv6) and SLAAC",
                    "WLAN architectures, wireless security, static routing, and routing troubleshooting"
                ],
                rolesEnabled: [
                    "Design and segment local networks through VLANs to optimize traffic and enhance security",
                    "Prevent loops and configure link redundancy for high-availability local switching",
                    "Deploy and secure corporate wireless access points and configure dynamic host address allocations"
                ]
            },
            {
                name: "CCNA: Introduction to Networks (CCNA 1)",
                date: "January 2025",
                description: "Fundamental networking models, architectures, protocol suites, and basic Cisco device configurations.",
                details: [
                    "OSI Reference Model and TCP/IP protocol suites",
                    "IP addressing schemes (IPv4 and IPv6 subnetting - Variable Length Subnet Masking - VLSM)",
                    "Ethernet operations, media types, cabling, and basic command-line configuration of Cisco routers and switches"
                ],
                rolesEnabled: [
                    "Plan and compute efficient IP addressing schemes to prevent address depletion",
                    "Perform initial setup and basic terminal security hardening on Cisco switches and routers",
                    "Understand base packet flow and physical network infrastructure requirements"
                ]
            }
        ]
    },
    {
        category: "Cybersecurity (Cisco / Specializations)",
        items: [
            {
                name: "Introduction to Cybersecurity (Badge & Certificate)",
                date: "December 2025",
                description: "Overview of the cybersecurity landscape, threat analysis, and risk management concepts.",
                details: [
                    "Common security vulnerabilities, threat vectors, malware, and social engineering techniques",
                    "Core concepts of confidentiality, integrity, and availability (CIA Triad)",
                    "Basic encryption algorithms and security policies for personal and organizational defense"
                ],
                rolesEnabled: [
                    "Identify and evaluate base-level organizational security risks",
                    "Promote and implement basic cybersecurity awareness policies and controls"
                ]
            },
            {
                name: "Network Defense & Resources Specialist",
                date: "December 2025",
                description: "Techniques for monitoring, defending, and hardening corporate network boundaries and resources.",
                details: [
                    "Firewall rule management, Network Address Translation (NAT) security, and access lists",
                    "Intrusion Detection (IDS) and Intrusion Prevention Systems (IPS) setup",
                    "Network traffic sniffing, logging, and port scanning techniques"
                ],
                rolesEnabled: [
                    "Manage firewall perimeters and enforce strict logical network access control",
                    "Monitor network traffic for anomalies and configure automated threat blocking rules"
                ]
            },
            {
                name: "System Safeguards",
                date: "October 2025",
                description: "Security baselines and hardening strategies for endpoints, operating systems, and servers.",
                details: [
                    "Local access control lists, OS file permissions, and directory auditing",
                    "Linux (Debian/Fedora) and Windows Server operating system hardening",
                    "Database security controls and access authorization auditing"
                ],
                rolesEnabled: [
                    "Apply OS hardening strategies, securing services against brute force and unauthorized escalation",
                    "Audit server environments for local file permission vulnerabilities and apply access restrictions"
                ]
            },
            {
                name: "Threat Analysis",
                date: "September 2025",
                description: "Auditing vulnerabilities, parsing security logs, and managing security information.",
                details: [
                    "Security Information and Event Management (SIEM) data parsing",
                    "Packet capturing and packet analysis using Wireshark to isolate network intrusion footprints",
                    "Vulnerability scanning and SQL injection mitigation audits"
                ],
                rolesEnabled: [
                    "Audit web database layers to mitigate SQL injection vulnerabilities and insecure APIs",
                    "Analyze security event logs and perform basic incident response investigations"
                ]
            },
            {
                name: "Cybersecurity Administration",
                date: "September 2025",
                description: "Implementing cybersecurity frameworks, administrative controls, and business continuity policies.",
                details: [
                    "Compliance mapping against ISO 27001 security standards",
                    "Disaster recovery planning, risk management frameworks, and business continuity policies",
                    "Incident response plan drafting and administrative control verification"
                ],
                rolesEnabled: [
                    "Map organizational IT controls to international standards like ISO 27001",
                    "Draft comprehensive incident response plans and disaster recovery protocols"
                ]
            }
        ]
    }
];

export const services = [
    {
        id: "custom-software",
        title: "Custom Software Systems",
        subtitle: "Enterprise-grade desktop & web applications",
        icon: "ph ph-code",
        description: "End-to-end design and coding of scalable software solutions. I specialize in building robust local capture systems and unified web API backends.",
        longDescription: "I develop tailored applications designed to fit specific institutional workflows, prioritizing security, offline reliability, and fast synchronization protocols.",
        useCases: [
            "Developed 'CEV Local', an offline-first capture system using **[PHP / HTML / UIKit](/skills?cat=3)** to allow field workers to capture data securely without internet.",
            "Designed and implemented 'Diana API' using **[PHP / Laravel](/skills?cat=3)** as a unified, cached gateway with response times below 8ms.",
            "Built responsive web portals using **[TypeScript / React](/skills?cat=3)** and **[Tailwind CSS](/skills?cat=3)** for online administrative processing."
        ],
        technicalStack: ["PHP", "Laravel", "MySQL", "UIKit", "TypeScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
        id: "self-hosted-infra",
        title: "Local & Self-Hosted Infrastructure",
        subtitle: "Private cloud, storage, and code hosting",
        icon: "ph ph-cloud",
        description: "Deploying local, self-hosted services for organizations that cannot permit public cloud hosting due to legal, audit, or confidentiality restrictions.",
        longDescription: "I specialize in removing reliance on third-party cloud services by deploying secure local servers, offering complete control over institutional files, code repositories, and user collaborations.",
        useCases: [
            "Configured local private code repositories using **[Git](/skills?cat=1)** and self-hosted environments to prevent external leakage of proprietary source code.",
            "Deployed **[Nextcloud](/skills?cat=1)** as a highly secure, private alternative to Google Drive, ensuring full file audit compliance and local encryption.",
            "Orchestrated local container groups using **[Docker Compose](/skills?cat=0)** and monitored logs to guarantee high availability and easy disaster recovery."
        ],
        technicalStack: ["Git", "Nextcloud", "Docker", "Docker Compose", "Fedora Linux", "Debian", "Portainer", "Nginx"]
    },
    {
        id: "networking-security",
        title: "Network Security & Hardening",
        subtitle: "Zero-Trust tunnels & perimeter defense",
        icon: "ph ph-broadcast",
        description: "Designing isolated networking overlays and auditing perimeters to protect databases and systems from unauthorized access or injections.",
        longDescription: "I design resilient network structures adhering to strict security policies, ensuring encrypted private tunnels for administration and robust server-level hardening.",
        useCases: [
            "Established private mesh VPN networks using **[Tailscale](/skills?cat=2)** to isolate student databases, making them accessible only to audited administrators.",
            "Implemented security rules and port-forwarding with **[OPNsense Firewalls](/skills?cat=2)** to filter malicious traffic and mitigate intrusion vectors.",
            "Conducted server audits and configured **[Nginx reverse proxies](/skills?cat=2)** with SSL and hardened SSH profiles to prevent brute force attacks."
        ],
        technicalStack: ["Tailscale", "OPNsense", "Nginx", "Firewalls", "ISO 27001", "Linux Hardening", "SQL Injection Mitigation"]
    }
];
