export const profile = {
    name: "Jose Vega",
    title: "Cloud Engineer Junior | DevOps & IaC Specialist",
    tagline: "La infraestructura es el límite de la computación moderna; yo construyo los cimientos.",
    location: "Zamora, Michoacán",
    email: "contact@jessvega.me",
    github: "https://github.com/Jov-glitch",
    linkedin: "https://www.linkedin.com/in/jose-vega-a477b13a3/",
    about: `Tecnólogo en Sistemas y Redes con un perfil híbrido enfocado en la Administración de Infraestructura, Ciberseguridad y Desarrollo de Software. Cuento con una sólida base en el diseño y optimización de redes empresariales (CCNA), ciberseguridad aplicada y gestión de entornos virtuales. Actualmente lidero equipos de desarrollo para la entrega de proyectos complejos de software y administro infraestructuras locales y en la nube (Docker/Linux), garantizando la escalabilidad, seguridad y alta disponibilidad de los servicios.

Bajo la premisa de que si un sistema se configura manualmente por SSH es una falla de diseño, enfoco mi labor profesional en la eliminación de la intervención manual mediante automatización, orquestación y principios Zero-Trust.`,
    vision: "Mi meta a corto plazo es obtener la certificación Google Cloud Associate (GCP ACE) y profundizar en el ecosistema de Kubernetes (Helm) para la orquestación a gran escala. Creo firmemente que en la era de la IA, el valor diferencial de un ingeniero radica en la capacidad de garantizar la confiabilidad, seguridad y persistencia de la infraestructura que soporta los modelos."
};

export const skills = [
    {
        category: "Virtualización y Contenedores",
        description: "Aislamiento de infraestructura y optimización de recursos mediante contenedorización e hipervisores. Priorizo la construcción de entornos reproducibles e inmutables frente a las configuraciones manuales.",
        details: [
            "Diseño e implementación de topologías multi-contenedor usando Docker Compose",
            "Despliegue de contenedores, gestión de redes y volúmenes con Docker y Podman",
            "Administración de hipervisores bare-metal y orquestación de VMs con Proxmox VE",
            "Configuración de entornos de prueba aislados y entornos de desarrollo local"
        ],
        applications: [
            "Orquestación de contenedores locales y de producción para el Ecosistema CEV",
            "Mantenimiento de home labs y servidores de juegos corriendo en Fedora Server con Docker/Portainer",
            "Configuración de plantillas de VM en Proxmox VE para aprovisionamiento automatizado"
        ],
        items: [
            { name: "Contenedores", description: ["Docker", "Podman", "Portainer", "Proxmox VE"] },
            { name: "Hipervisores", description: ["QEMU/KVM", "VirtualBox (Kali Linux pentesting)"] }
        ]
    },
    {
        category: "Infraestructura Cloud y Servidores",
        description: "Administración de servidores de nivel empresarial, scripting en shell y arquitectura en la nube pública. Me enfoco en la gestión automatizada de configuraciones y el hardening de servidores.",
        details: [
            "Aprovisionamiento y gestión del ciclo de vida de recursos en AWS (EC2, S3, IAM)",
            "Patrones de arquitectura de GCP, candidato para GCP Associate Cloud Engineer (ACE)",
            "Administración avanzada de sistemas Linux (Fedora Server, Debian) y bash scripting",
            "Estandarización de entornos de desarrollo local utilizando DDEV y Docker Compose"
        ],
        applications: [
            "Despliegue de clústeres de servidores gaming en AWS EC2 y GCP con políticas de autoescalado",
            "Escritura de scripts de Bash automatizados para backups y auditorías de seguridad",
            "Estandarización de flujos de desarrollo para el equipo UPN-162 usando entornos locales DDEV"
        ],
        items: [
            { name: "Plataformas Cloud", description: ["AWS (EC2, S3, IAM)", "GCP (Candidato a Associate Cloud Engineer)"] },
            { name: "Sistemas Linux", description: ["Fedora Server/Workstation", "Debian Linux", "Advanced Bash Scripting"] },
            { name: "Entornos Locales", description: ["DDEV", "Docker Compose"] }
        ]
    },
    {
        category: "Enrutamiento y Seguridad de Red",
        description: "Diseño de topologías de red resilientes, control de tráfico y medidas de seguridad proactivas. Guiado por los estándares de CCNA y el diseño de accesos Zero-Trust.",
        details: [
            "Protocolos de enrutamiento dinámico (OSPFv2) y segmentación lógica (VLANs y Trunking)",
            "Configuración de listas de control de acceso a la red (ACLs IPv4) y filtrado de tráfico",
            "Redes superpuestas Zero-Trust mediante Tailscale mesh VPN para aislar bases de datos sensibles",
            "Administración de firewall OPNsense, redirección de puertos y hardening de proxy inverso Nginx"
        ],
        applications: [
            "Diseño e implementación de una red mesh privada con Tailscale para proteger las bases de datos de CEV",
            "Configuración de protocolos de enrutamiento OSPF y enlaces troncales en entornos simulados empresariales",
            "Mitigación de amenazas de seguridad (Inyección SQL, accesos no autorizados) en portales escolares públicos"
        ],
        items: [
            { name: "Enrutamiento y Conmutación", description: ["Protocolo OSPFv2", "VLANs y Trunking", "Especificaciones CCNA Enterprise"] },
            { name: "Seguridad Aplicada", description: ["ACLs IPv4", "Defensa de Red & Hardening", "Mitigación de SQL Injection"] },
            { name: "Zero-Trust y VPNs", description: ["Tailscale Mesh VPN", "OPNsense Firewall", "SSH/Nginx Security"] }
        ]
    },
    {
        category: "Desarrollo Backend y Frameworks",
        description: "Desarrollo de APIs estructuradas de alto rendimiento y gestión de motores de bases de datos relacionales transaccionales. Creo en el código limpio, migraciones automatizadas y sistemas de tipos estrictos.",
        details: [
            "Desarrollo moderno de APIs backend con PHP 8+ (Laravel) y TypeScript (Next.js)",
            "Administración de bases de datos, migraciones de esquema y optimización de índices (MySQL, MariaDB)",
            "Diseño de pipelines ETL seguros para sincronización de datos offline-a-online",
            "Tuning de consultas para lograr bajos tiempos de respuesta (<8ms promedio)"
        ],
        applications: [
            "Diseño de Diana API en Laravel 11 como la pasarela central de datos para sistemas escolares",
            "Migración y consolidación de más de 12,000 registros escolares históricos en MySQL",
            "Integración de aplicaciones frontend React/Next.js con backends centralizados"
        ],
        items: [
            { name: "Lenguajes y Frameworks", description: ["PHP 8+ (Laravel)", "TypeScript (React, Next.js)"] },
            { name: "Bases de Datos y ETL", description: ["MySQL", "MariaDB", "Optimización de Consultas"] }
        ]
    },
    {
        category: "Metodologías y Estándares",
        description: "Adhesión a estándares internacionales de calidad para la gestión de la seguridad, el aseguramiento de la calidad del software y la entrega de servicios de TI.",
        details: [
            "Alineación del Sistema de Gestión de Seguridad de la Información basado en normas ISO 27001",
            "Determinación de la Capacidad y Mejora del Proceso de Software (SPICE / ISO 33000)",
            "Principios de Gestión de Servicios de TI para operaciones y entrega (ISO 20000)",
            "Documentación de procesos de despliegue y planes de recuperación ante desastres (DRP)"
        ],
        applications: [
            "Diseño del plan de recuperación ante desastres (DRP) para la base de datos de CEV con un RTO probado de 4.8s",
            "Implementación de auditorías de acceso y reglas de cumplimiento de seguridad en el ecosistema escolar",
            "Estructuración de pautas de desarrollo siguiendo mejores prácticas de ingeniería de software"
        ],
        items: [
            { name: "Buenas Prácticas", description: ["ISO 27001 (Seguridad)", "ISO 33000 (Calidad SPICE)", "ISO 20000 (Gestión de Servicios TI)"] }
        ]
    }
];

export const experience = [
    {
        role: "Líder de Proyecto & Administrador de Sistemas",
        company: "CEV Environment (Universidad Pública)",
        period: "Febrero 2026 - Actual",
        link: "#ecosystem",
        description: "Dirección estratégica y administración de la infraestructura del ecosistema escolar distribuido, coordinando flujos de trabajo e implementando políticas de seguridad Zero-Trust.",
        stack: ["Docker", "Tailscale", "Fedora Linux", "MySQL", "DDEV", "Nginx"],
        achievements: [
            "Dirección y administración del equipo de desarrollo a cargo de la fase de mantenimiento, escalabilidad y despliegue del ecosistema integral.",
            "Coordinación de flujos de trabajo ágiles y supervisión de la arquitectura local y en la nube.",
            "Hardening de servidores y políticas de acceso Zero-Trust para garantizar la inmutabilidad y confidencialidad académica."
        ],
        details: [
            "Gestión técnica de entornos y flujos de trabajo locales basados en DDEV y contenedores Docker.",
            "Administración de accesos y túneles VPN privados utilizando Tailscale para aislar bases de datos de alumnos.",
            "Implementación de monitoreo proactivo y registros de auditoría de seguridad perimetral."
        ],
        impact: [
            "Garantía de alta disponibilidad de los servicios durante los periodos de alta concurrencia de inscripciones.",
            "Cero incidencias de seguridad de red registradas bajo el nuevo esquema de administración local y políticas VPN mesh."
        ]
    },
    {
        role: "Desarrollador de Sistemas de Software (CEV Local, CEV Web & Diana API)",
        company: "CEV Environment (Universidad Pública)",
        period: "2024 - Febrero 2026",
        link: "#ecosystem",
        description: "Diseño e implementación desde cero de los tres componentes clave del Ecosistema CEV: la aplicación local de escritorio (.NET/C#), el portal institucional responsivo y la API Laravel unificada.",
        stack: ["Laravel", "PHP", "MySQL", "C#", ".NET", "Tailwind CSS", "JavaScript"],
        achievements: [
            "Diseño y desarrollo completo de 'CEV Local', un aplicativo de escritorio robusto en .NET/C# para la captura académica offline.",
            "Desarrollo de 'Diana API' en Laravel 11.x, sirviendo como pasarela de datos unificada con disparadores inmutables de base de datos.",
            "Implementación de 'CEV Web', un portal institucional responsivo para la consulta e inscripción escolar en línea."
        ],
        details: [
            "Programación de lógica de base de datos relacional y migraciones para consolidar registros históricos académicos.",
            "Construcción de flujos ETL eficientes para sincronizar datos locales a la API centralizada.",
            "Integración de interfaces de usuario optimizadas y accesibles con Tailwind CSS en portales web."
        ],
        impact: [
            "Consolidación exitosa de más de 12,000 registros escolares históricos en un motor relacional unificado.",
            "Tiempo de respuesta de API optimizado a menos de 8ms promedio mediante almacenamiento en caché y consultas preparadas.",
            "Reducción del RTO a 4.8 segundos en simulacros de recuperación ante desastres (DRP) del motor de datos."
        ]
    },
    {
        role: "Cloud Infrastructure Architect (HomeLab & Freelance)",
        company: "V-Net Labs",
        period: "2022 - Actual",
        link: "https://github.com/Jov-glitch",
        description: "Diseño, administración y auditoría de infraestructuras autohospedadas (HomeLab) y servidores en la nube para comunidades y clientes privados.",
        stack: ["Fedora Linux", "Docker", "AWS", "GCP", "Portainer", "Prometheus", "Datadog", "Nginx"],
        achievements: [
            "Gestión de Infraestructura Autohospedada: Diseño e implementación de laboratorios y entornos de producción locales basados en Fedora Linux.",
            "Gestión de microservicios y herramientas de monitoreo mediante contenedores Docker y Portainer, optimizando el rendimiento de almacenamiento avanzado (NVMe) y la seguridad de red.",
            "Diseño y despliegue de infraestructuras para comunidades gaming sobre AWS (EC2/GCP), gestionando auto-scaling de recursos.",
            "Administrador de sistemas Linux para despliegues de alta disponibilidad, integrando monitoreo avanzado (Datadog/Prometheus) y hardening de servidores SSH/Nginx."
        ],
        details: [
            "Virtualización y gestión de hardware HomeLab sobre hipervisores Linux y almacenamiento NVMe con arreglos RAID redundantes.",
            "Provisionamiento e infraestructura como código (IaC) básica para el despliegue dinámico de servidores de juego y servicios web en AWS (EC2/S3) y GCP.",
            "Configuración de pipelines de monitoreo en tiempo real usando Prometheus, Grafana y Datadog para supervisar métricas de CPU, memoria y tráfico de red.",
            "Administración de servidores web seguros mediante Nginx, configurando certificados SSL con Let's Encrypt y protección contra ataques por fuerza bruta."
        ],
        impact: [
            "Mantenimiento de un uptime del 99.9% en servicios autohospedados mediante automatización de respaldos y monitoreo proactivo.",
            "Ahorro de costos del 40% en infraestructura cloud para comunidades gaming mediante optimización de auto-scaling y dimensionamiento de recursos.",
            "Despliegue y pruebas exitosas de un servidor de Minecraft productivo en la nube integrando proxy inverso y monitoreo dinámico."
        ]
    }
];

export const kpis = [
    {
        metric: "4.8s",
        label: "RTO (Tiempo de Recuperación)",
        detail: "Motor de restauración 100% automatizado (ETL)",
        icon: "ph ph-lightning"
    },
    {
        metric: "0",
        label: "Puertos WAN Expuestos",
        detail: "Red Mesh VPN privada y perímetro Zero-Trust",
        icon: "ph ph-shield-check"
    },
    {
        metric: "<10ms",
        label: "Latencia del Middleware",
        detail: "Capa de abstracción de base de datos de Diana API",
        icon: "ph ph-broadcast"
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

export const certifications = [
    {
        category: "Redes (Cisco Certified Network Associate - CCNA)",
        items: [
            {
                name: "CCNA: Enterprise Networking, Security, and Automation (CCNA 3)",
                date: "Junio 2026",
                description: "Configuración avanzada de redes empresariales, enfatizando ciberseguridad, virtualización y automatización de flujos de trabajo de red.",
                details: [
                    "Configuración y solución de problemas del protocolo de enrutamiento dinámico OSPFv2 (área única y multiárea)",
                    "Conceptos de seguridad de red incluyendo ACLs de mitigación de amenazas y acceso seguro a dispositivos",
                    "Tecnologías WAN, virtualización de redes y arquitecturas de túneles VPN (IPsec y GRE)",
                    "Herramientas y conceptos de automatización de red (APIs, JSON, RESTCONF, Puppet, Chef, Ansible)"
                ],
                rolesEnabled: [
                    "Configurar y resolver problemas en estructuras complejas de enrutamiento y conmutación empresarial",
                    "Diseñar e implementar túneles VPN de sitio a sitio y segmentar redes lógicas de forma segura",
                    "Orquestar programáticamente la configuración de dispositivos de red mediante scripts de Python y APIs"
                ]
            },
            {
                name: "CCNA: Switching, Routing, and Wireless Essentials (CCNA 2)",
                date: "Junio 2025",
                description: "Tecnologías clave para el enrutamiento, conmutación y comunicaciones inalámbricas en redes locales (LAN) empresariales.",
                details: [
                    "Configuración de VLANs, enlaces troncales (trunking) y técnicas de enrutamiento inter-VLAN",
                    "Gestión de redundancia lógica mediante Spanning Tree Protocol (STP/RSTP) y agregación de enlaces EtherChannel",
                    "Configuración de direccionamiento dinámico (DHCPv4 y DHCPv6) y asignación sin estado SLAAC",
                    "Arquitecturas WLAN, seguridad inalámbrica, enrutamiento estático y resolución de problemas de enrutamiento"
                ],
                rolesEnabled: [
                    "Diseñar y segmentar redes locales mediante VLANs para optimizar el tráfico y mejorar la seguridad",
                    "Prevenir bucles físicos y configurar redundancia de enlaces para conmutación local de alta disponibilidad",
                    "Desplegar y asegurar puntos de acceso inalámbrico corporativos y configurar asignación de IPs dinámicas"
                ]
            },
            {
                name: "CCNA: Introduction to Networks (CCNA 1)",
                date: "Enero 2025",
                description: "Modelos fundamentales de red, arquitecturas, protocolos y configuración básica de dispositivos Cisco.",
                details: [
                    "Modelo de referencia OSI y suites de protocolos TCP/IP",
                    "Esquemas de direccionamiento IP (subneteo IPv4 e IPv6 mediante máscara de subred de longitud variable - VLSM)",
                    "Operaciones de Ethernet, medios físicos, cableado y configuración básica por interfaz de comando de routers y switches Cisco"
                ],
                rolesEnabled: [
                    "Planificar y calcular esquemas de direccionamiento IP eficientes para prevenir el agotamiento de direcciones",
                    "Realizar la instalación inicial y el hardening básico de terminales en switches y routers Cisco",
                    "Comprender el flujo básico de paquetes y los requisitos de infraestructura física de red"
                ]
            }
        ]
    },
    {
        category: "Ciberseguridad (Cisco / Especializaciones)",
        items: [
            {
                name: "Introducción a la Ciberseguridad (Badge & Certificate)",
                date: "Diciembre 2025",
                description: "Introducción al panorama de la ciberseguridad, análisis de amenazas y gestión de riesgos lógicos.",
                details: [
                    "Vulnerabilidades de seguridad comunes, vectores de amenazas, malware y técnicas de ingeniería social",
                    "Conceptos clave de confidencialidad, integridad y disponibilidad (Tríada CIA)",
                    "Algoritmos de cifrado básicos y diseño de políticas de seguridad para defensa personal y organizacional"
                ],
                rolesEnabled: [
                    "Identificar y evaluar riesgos de seguridad básicos a nivel organizacional",
                    "Promover y aplicar políticas y controles de concienciación en ciberseguridad corporativa"
                ]
            },
            {
                name: "Especialista en Recursos & Defensa de la Red",
                date: "Diciembre 2025",
                description: "Técnicas de monitoreo, defensa y hardening de perímetros y recursos de redes empresariales.",
                details: [
                    "Administración de reglas de firewalls, Traducción de Direcciones de Red (NAT) segura y listas de control de acceso",
                    "Configuración de sistemas de detección (IDS) y prevención de intrusos (IPS)",
                    "Técnicas de escaneo de puertos, registros de auditoría y análisis de tráfico de red"
                ],
                rolesEnabled: [
                    "Gestionar perímetros de seguridad lógicos y aplicar control de acceso estricto mediante firewalls",
                    "Monitorear el tráfico de red en busca de anomalías y configurar bloqueos automatizados ante vectores de ataque"
                ]
            },
            {
                name: "Salvaguardias del Sistema",
                date: "Octubre 2025",
                description: "Líneas base de seguridad y hardening de endpoints, sistemas operativos y servidores.",
                details: [
                    "Listas de control de acceso local, permisos de archivos en SO y auditoría de directorios",
                    "Hardening de sistemas operativos Linux (Debian/Fedora) y entornos Windows Server",
                    "Controles de seguridad en bases de datos y auditoría de autorizaciones de acceso"
                ],
                rolesEnabled: [
                    "Aplicar estrategias de hardening en servidores, protegiendo servicios críticos contra fuerza bruta y escalamiento no autorizado",
                    "Auditar entornos de servidor en busca de permisos de archivos vulnerables y aplicar restricciones de acceso robustas"
                ]
            },
            {
                name: "Análisis de Amenazas",
                date: "Septiembre 2025",
                description: "Auditoría de vulnerabilidades, análisis de logs de seguridad y gestión de información de incidentes.",
                details: [
                    "Procesamiento y análisis de datos en plataformas de gestión de eventos de seguridad (SIEM)",
                    "Captura de paquetes y análisis forense con Wireshark para aislar huellas de intrusión en red",
                    "Escaneo de vulnerabilidades y auditorías de mitigación de inyecciones SQL"
                ],
                rolesEnabled: [
                    "Auditar capas de datos de aplicaciones web para mitigar inyecciones SQL y asegurar el consumo de APIs",
                    "Analizar logs de eventos de seguridad y llevar a cabo investigaciones básicas de respuesta ante incidentes"
                ]
            },
            {
                name: "Administración de Ciberseguridad",
                date: "Septiembre 2025",
                description: "Implementación de marcos de ciberseguridad, controles administrativos y políticas de continuidad del negocio.",
                details: [
                    "Alineamiento y mapeo de controles de TI con el estándar de seguridad internacional ISO 27001",
                    "Planes de recuperación ante desastres (DRP), marcos de gestión de riesgos y políticas de continuidad",
                    "Redacción de planes de respuesta a incidentes y auditoría de controles administrativos"
                ],
                rolesEnabled: [
                    "Mapear controles de TI de una organización bajo estándares internacionales como la norma ISO 27001",
                    "Redactar planes de respuesta ante incidentes y protocolos de recuperación ante desastres"
                ]
            }
        ]
    }
];
