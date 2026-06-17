export const profile = {
    name: "Jose Vega",
    title: "Cloud Engineer Junior | DevOps & IaC Specialist",
    tagline: "La infraestructura es el límite de la computación moderna; yo construyo los cimientos.",
    location: "Zamora, Michoacán",
    email: "contact@jessvega.me",
    github: "https://github.com/Jov-glitch",
    linkedin: "https://www.linkedin.com/in/jose-vega-a477b13a3/",
    about: `Soy un Ingeniero en Sistemas en formación (8vo Semestre, TecNM Zamora) apasionado por la Infraestructura como Código (IaC) y la automatización de sistemas Linux. Mi enfoque profesional se centra en eliminar la intervención manual mediante el uso de herramientas de orquestación y provisión, bajo la premisa de que si un sistema se configura manualmente por SSH, es una falla de diseño.

Actualmente gestiono la infraestructura crítica de una institución pública de educación superior, donde lidero la migración de servicios legacy hacia arquitecturas containerizadas, optimizando la resiliencia y escalabilidad de los sistemas académicos.`,
    vision: "Mi meta a corto plazo es obtener la certificación Google Cloud Associate (GCP ACE) y profundizar en el ecosistema de Kubernetes (Helm) para la orquestación a gran escala. Creo firmemente que en la era de la IA, el valor diferencial de un ingeniero radica en la capacidad de garantizar la confiabilidad, seguridad y persistencia de la infraestructura que soporta los modelos."
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
            { name: "Databases", description: ["MySQL", "MariaDB", "Optimización de consultas"] }
        ]
    }
];

export const experience = [
    {
        role: "Administrador de Sistemas & Líder de Proyecto",
        company: "CEV Environment (Universidad Pública)",
        period: "2024 - Actual",
        link: "#ecosystem",
        achievements: [
            "Arquitecto Jefe del 'Control Escolar Virtual': Ecosistema distribuido con separación de entornos (Local/Web) bajo principios Zero-Trust.",
            "Liderazgo técnico en la migración de bases de datos relacionales estocásticas hacia APIs RESTful modernas (Diana API).",
            "Implementación de redes Mesh VPN (Tailscale) y Hardening perimetral (OPNsense) para blindar servicios internos.",
            "Optimización masiva del despliegue local mediante contenedores Docker y flujos de trabajo con DDEV."
        ]
    },
    {
        role: "Cloud Infrastructure Architect (HomeLab & Freelance)",
        company: "V-Net Labs",
        period: "2022 - Actual",
        link: "https://github.com/Jov-glitch",
        achievements: [
            "Diseño y despliegue de infraestructuras para comunidades gaming sobre AWS (EC2/GCP), gestionando auto-scaling de recursos.",
            "Administrador de sistemas Linux para despliegues de alta disponibilidad, integrando monitoreo avanzado (Datadog/Prometheus).",
            "Especialista en Hardening de servidores SSH y Nginx para mitigar ataques automatizados y ataques de fuerza bruta."
        ]
    }
];

export const kpis = [
    {
        metric: "4.8s",
        label: "RTO (Tiempo de Recuperación)",
        detail: "Motor de restauración 100% automatizado (ETL)",
        icon: "⚡"
    },
    {
        metric: "0",
        label: "Puertos WAN Expuestos",
        detail: "Red Mesh VPN privada y perímetro Zero-Trust",
        icon: "🛡️"
    },
    {
        metric: "<10ms",
        label: "Latencia del Middleware",
        detail: "Capa de abstracción de base de datos de Diana API",
        icon: "📡"
    }
];

export const upnEcosystem = {
    title: "Ecosistema Digital CEV",
    subtitle: "Infraestructura Crítica y Gestión Académica Distribuida",
    tagline: "Modernización de sistemas legacy mediante arquitecturas híbridas y seguridad Zero-Trust.",
    stack: ["PHP 8.2", "Laravel 11", "Docker", "DDEV", "Tailscale", "Proxmox", "OPNsense"],

    overview: {
        problem: "Un sistema monolítico legacy de +20 años con deuda técnica acumulada, riesgos de integridad de datos y exposición innecesaria a la red pública.",
        solution: "Diseño de un ecosistema desacoplado que separa la gestión administrativa (Local) de la consulta pública (Web) a través de un Middleware de alta disponibilidad.",
        impact: "Garantía de persistencia de datos históricos y modernización de la experiencia de usuario sin interrumpir la operación institucional."
    },

    modules: [
        {
            id: "cev-maestro",
            title: "CEV: Sistema Maestro (Cev-Local)",
            subtitle: "Panel de Control Administrativo de Alta Resiliencia",
            stack: ["PHP 8.2+", "MariaDB", "Automated Scripting", "UIkit", "FPDF/PHPExcel"],
            description: "Núcleo operativo encargado de la gestión de alta densidad de datos académicos y procesos institucionales críticos (inscripciones, actas y expedientes). Actúa como una 'bóveda digital' de gestión pesada bajo un entorno controlado y redundante.",
            solution_rationale: "CEV-Local garantiza la Soberanía Tecnológica institucional, proporcionando independencia operativa y un control absoluto sobre la rendición de cuentas académica bajo estándares de seguridad avanzada.",
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
    internal: true # Aislado de la WAN

volumes:
  db_data:`
        },
        {
            id: "diana-api",
            title: "Diana API: Core Middleware",
            subtitle: "Capa de Abstracción e Integración Institucional",
            stack: ["Laravel 11", "PHP 8.2+", "Token-Based Auth", "SQL Triggers"],
            description: "Infraestructura de servicios RESTful diseñada como el punto único de verdad del ecosistema. Proporciona una interfaz estandarizada y segura para la interacción entre los recursos académicos y los clientes finales.",
            solution_rationale: "Diana API consolida una base profesional para la expansión de servicios digitales, garantizando que la información sea accesible y auditable sin comprometer la privacidad institucional.",
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
            title: "Arquitectura de Infraestructura y Orquestación Segura",
            subtitle: "Private Data Center y Red Mesh de Alta Disponibilidad",
            stack: ["Virtualización (L1)", "Security Gateway", "Mesh VPN", "DNS Privado", "Docker"],
            description: "Diseño y despliegue de un ecosistema de red segmentado y virtualizado. La infraestructura está diseñada para eliminar la exposición de servicios críticos al internet público, centralizando la gestión mediante túneles cifrados y segmentación lógica de tráfico.",
            solution_rationale: "Esta arquitectura otorga Soberanía Tecnológica a la institución, transformando su infraestructura en una fortaleza privada capaz de soportar la próxima generación de servicios digitales educativos.",
            iacCode: `# Configuración de OPNsense & Tailscale
echo "[INFO] Segmentando redes VLAN académicas..."
# Bloquear tráfico cruzado entre VLANs por defecto
# Permitir solo IP de Admin autorizada a BD Cev-Local

# Configurar anuncios de rutas en Tailscale
tailscale up --advertise-routes=10.0.10.0/24,10.0.20.0/24 --accept-routes=false

# Aplicar hardening de configuración en Nginx
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
            subtitle: "Automatización de Procesos ETL y Disaster Recovery",
            stack: ["Bash", "MySQL CLI", "Linux Utils"],
            description: "Motor de automatización encargado de la reconstrucción, saneamiento y parcheo de la infraestructura de datos. Reduces el tiempo de despliegue y garantiza la integridad de la información mediante procesos idempotentes.",
            solution_rationale: "Este motor elimina el error humano y garantiza que la institución sea resiliente ante cualquier fallo, permitiendo una soberanía digital basada en procesos automáticos y auditables.",
            iacCode: `#!/bin/bash
# Motor de Restauración y Parcheo
set -euo pipefail

BACKUP_FILE="/backups/backup_master_2026.cevsys"
DB_NAME="cev_academic_db"

echo "[INFO] Iniciando restauración..."
if [ ! -f "$BACKUP_FILE" ]; then
    echo "[ERROR] Respaldo no encontrado!" >&2
    exit 1
fi

echo "[INFO] Descomprimiendo y aplicando parches..."
mysql -u root -p"\${DB_PASSWORD}" "$DB_NAME" < /app/database/schema_v4.2.sql
mysql -u root -p"\${DB_PASSWORD}" "$DB_NAME" -e "
    CALL SanitizeHistoricalRecords();
    CALL ApplyDatabasePatches();
"
echo "[SUCCESS] Estado del sistema: IDLE // Disaster Recovery Listo."`
        }
    ],

    tooling: [
        {
            name: "Core Restoration Engine",
            language: "Bash",
            purpose: "Automatización de procesos ETL y Disaster Recovery.",
            features: ["Dual logging", "Idempotencia", "Patching automático de base de datos"]
        }
    ]
};

export const projects = [
    {
        title: "Minecraft Distributed Node (GCP)",
        description: "Despliegue de un servidor de Minecraft productivo utilizando Google Cloud. Incluye proxy inverso Nginx, visualización 3D web (BlueMap) y pack de mods optimizado.",
        stack: ["Docker", "GCP", "Nginx", "Cloudflare"],
        purpose: "Evento comunitario con monitoreo en tiempo real y arquitectura de red segura.",
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
        description: "Un entorno de pruebas persistente basado en un Ryzen 2600x corriendo Fedora Server con orquestación distribuida.",
        stack: ["Docker Swarm", "Ansible", "Nginx", "Prometheus"],
        purpose: "Experimentación con alta disponibilidad y resiliencia de servicios auto-hospedados.",
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
        description: "Desarrollo de Playbooks de Ansible y scripts de Bash para el despliegue automático de estaciones de trabajo y hardening de servidores.",
        stack: ["Bash", "Ansible", "Hyprland", "Fedora"],
        purpose: "Eliminar la 'configuración manual por SSH' y estandarizar despliegues de servidores web.",
        iacCode: `#!/bin/bash
# Script de Hardening de Servidor (Fedora/Debian)
set -euo pipefail

echo "[INFO] Ejecutando Hardening de SSH..."
SSHD_CONFIG="/etc/ssh/sshd_config"

sed -i 's/^#\\?PermitRootLogin.*/PermitRootLogin no/' "$SSHD_CONFIG"
sed -i 's/^#\\?PasswordAuthentication.*/PasswordAuthentication no/' "$SSHD_CONFIG"
sed -i 's/^#\\?PubkeyAuthentication.*/PubkeyAuthentication yes/' "$SSHD_CONFIG"

echo "[INFO] Configurando reglas del Firewall UFW..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

systemctl restart sshd
echo "[SUCCESS] Hardening aplicado con seguridad."`
    },
    {
        title: "FeDots-43 (Linux Dotfiles)",
        description: "Mi configuración personalizada de entorno de trabajo Linux. Incluye la configuración del gestor de ventanas Hyprland, playbooks de Ansible y scripts utilitarios para entornos Fedora/Debian.",
        stack: ["Bash", "Ansible", "Hyprland", "Fedora", "Lua"],
        purpose: "Estandarización del despliegue de estaciones de trabajo y automatización de interfaces de usuario.",
        link: "https://github.com/JessVolet/FeDots-43",
        iacCode: `# Configuración de atajos de teclado de Hyprland
$mainMod = SUPER
bind = $mainMod, Q, exec, alacritty
bind = $mainMod, C, killactive,
bind = $mainMod, M, exit,
bind = $mainMod, E, exec, dolphin
bind = $mainMod, V, togglefloating,
bind = $mainMod, R, exec, wofi --show drun

# Script bash de auto-instalación
echo "[DOTFILES] Copiando configuraciones a ~/.config/hypr..."
mkdir -p ~/.config/hypr
cp -r ./hypr/* ~/.config/hypr/
echo "[DOTFILES] Configuraciones del Gestor de Ventanas aplicadas."`
    },
    {
        title: "Prueba Técnica (FrontEnd)",
        description: "Aplicación interactiva desarrollada en React que demuestra maquetación basada en componentes, hooks personalizados y optimización de renderizado.",
        stack: ["React", "TypeScript", "TailwindCSS", "Vite", "REST APIs"],
        purpose: "Evaluación técnica de desarrollo interactivo y consumo optimizado de endpoints.",
        link: "https://github.com/JessVolet/PruebaTecnicaUPN-FrontEnd",
        iacCode: `// Hook personalizado de React para filtrado dinámico
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
    title: "🧱 ARCHIVO DEL EVENTO: MINECRAFT HUB 🧱",
    description: "El evento de Minecraft ya quedó cerrado, pero dejo este espacio como archivo y agradecimiento.",
    buttonText: "EVENTO FINALIZADO",
    link: "/minecraft-project/",
    serverIp: "mc.jessvega.me",
    mapLink: "https://mapa.jessvega.me",
    closingTitle: "GRACIAS POR HACERLO POSIBLE",
    closingDescription: "Gracias a todas las personas involucradas: jugadores, builders, testers y apoyo técnico. Su energía, ideas y reportes ayudaron a darle vida al servidor.",
    closingMessage: "Este proyecto queda cerrado con mucho cariño y como recuerdo del trabajo en equipo que lo hizo posible.",
    modpack: {
        link: "https://www.mediafire.com/file/vv3k5wlxkxg327j/ModPack-PrismLauncher%2528recomended%2529.zip/file",
        description: "Pack de mods oficial del servidor. Incluye Aether, owo-lib y Simple Voice Chat.",
        instructions: "Se recomienda usar Prism Launcher para importar el archivo .zip directamente."
    },
    aboutEvent: "He habilitado un servidor de Minecraft temporal (por 1 mes). Es un espacio para relajarnos, construir cosas geniales y compartir.",
    gamerStory: "Más allá de los contenedores y el código, soy un jugador. Fue a través de los juegos donde descubrí mi pasión por la tecnología; desde optimizar configuraciones en FPS por que mi computadora no podia correrlos, hasta administrar servidores de Minecraft hace mas de 10 años. Soy ese jugador fanático empedernido de los juegos de antiguos. Sí, soy flamero de corazón cuando las cosas no se hacen con excelencia, porque creo que tanto en el gaming como en la ingeniería, se debe de dar el maximo de uno.",
    bgImage: "/src/img/dirty_bg_mc.jpg",
    rules: [
        { title: "Respeto mutuo", desc: "Trata a los demás como te gustaría ser tratado." },
        { title: "No griefing", desc: "Respeta las construcciones ajenas. (incluyendo carteles)" },
        { title: "Uso justo", desc: "Evita granjas que puedan dañar el lag del servidor de manera extrema." },
        { title: "Diviértete", desc: "Ese es el objetivo principal del evento." }
    ],
    architecture: [
        {
            title: "1. Capa de Cómputo (Cloud & Virtualización)",
            details: [
                "Proveedor: Google Cloud Platform (GCP).",
                "Instancia: VM en Compute Engine corriendo Ubuntu 25.10 (Plucky Puffin).",
                "Orquestación: Se utilizó Docker y Docker Compose para encapsular los servicios."
            ]
        },
        {
            title: "2. Capa de Red y Acceso Web (Networking)",
            details: [
                "Proxy Inverso (Nginx): Recibe las peticiones en el puerto 80 y las redirige internamente.",
                "Seguridad DNS (Cloudflare): El dominio jessvega.me está detrás del proxy de Cloudflare.",
                "Firewall Perimetral: Puertos limitados a 22 SSH, 80 Web y 25565 Juego."
            ]
        }
    ],
    monitoring: [
        {
            title: "Homelab Bare-Metal Metrics",
            description: "Monitoreo persistente de mi infraestructura local basada en Ryzen 5 2600x. Seguimiento granular de CPU (System/Idle), uso de RAM física vs Swap y visualización de consumo de contenedores Docker.",
            dashboard_url: "https://p.us5.datadoghq.com/sb/f837429d-eb8d-11f0-91c7-ca160a8299b1-df2cb84313a1251e968213a617859b0c"
        },
        {
            title: "GCP Virtual Node Status",
            description: "Estado operativo del nodo en Google Cloud (mc-server-violet.red). Monitoreo de latencia NTP, tráfico de red entrante/saliente y estado del FileSystem para el servidor de Minecraft.",
            dashboard_url: "https://p.us5.datadoghq.com/sb/f837429d-eb8d-11f0-91c7-ca160a8299b1-ac69c0c7bfdeeeccccac56c01b68c366"
        }
    ]
};
