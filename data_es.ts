export const profile = {
    name: "Jose Vega",
    title: "Cloud Engineer Junior | DevOps & IaC Specialist",
    tagline: "La infraestructura es el límite de la computación moderna; yo construyo los cimientos.",
    location: "Zamora, Michoacán",
    email: "contact@jessvega.me",
    github: "https://github.com/Jov-glitch",
    linkedin: "https://www.linkedin.com/in/jose-vega-a477b13a3/",
    about: `Soy un Ingeniero en Sistemas en formación (8vo Semestre, TecNM Zamora) apasionado por la Infraestructura como Código (IaC) y la automatización de sistemas Linux. Mi enfoque profesional se centra en eliminar la intervención manual mediante el uso de herramientas de orquestación y provisión, bajo la premisa de que si un sistema se configura manualmente por SSH, es una falla de diseño.

Actualmente gestiono la infraestructura crítica de la Universidad Pedagógica Nacional (UPN), donde lidero la migración de servicios legacy hacia arquitecturas containerizadas, optimizando la resiliencia y escalabilidad de los sistemas académicos.`,
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
        company: "UPN-162 (CEV Environment)",
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

export const upnEcosystem = {
    title: "Ecosistema Digital UPN-162",
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
            implementation: {
                architecture: "Aislamiento de la lógica administrativa para blindar la base de datos académica de consultas externas.",
                automation: "Flujos de trabajo automatizados para la integración y saneamiento de registros históricos en tiempo real.",
                reporting: "Generación de documentos oficiales con paridad institucional mediante motores de transformación de datos crudos."
            },
            engineering: {
                security: {
                    concept: "Hardening y Control Perimetral",
                    features: [
                        "Timed Security: Protocolo de descarga diferida para proteger activos de datos sensibles.",
                        "Identity Binding: Restricción de acceso basada en identidades verificadas y perímetros de red autorizados."
                    ]
                },
                reliability: {
                    concept: "Continuidad Operativa (Disaster Recovery)",
                    features: [
                        "Sandboxing: Clonación de entornos de producción para validación de cambios críticos sin riesgo de integridad.",
                        "Idempotencia: Garantía de estabilidad del sistema ante cualquier escenario de recuperación o despliegue."
                    ]
                },
                integrity: {
                    concept: "Persistencia y Auditoría",
                    features: [
                        "Ofuscación Forense: Protección de activos digitales mediante formatos propietarios para mitigar identificación externa.",
                        "Dual Logging: Trazabilidad sistemática de operaciones para auditorías técnicas post-evento."
                    ]
                }
            },
            solution_rationale: "CEV-Local garantiza la Soberanía Tecnológica institucional, proporcionando independencia operativa y un control absoluto sobre la rendición de cuentas académica bajo estándares de seguridad avanzada."
        },
        {
            id: "diana-api",
            title: "Diana API: Core Middleware",
            subtitle: "Capa de Abstracción e Integración Institucional",
            stack: ["Laravel 11", "PHP 8.2+", "Token-Based Auth", "SQL Triggers"],
            description: "Infraestructura de servicios RESTful diseñada como el punto único de verdad del ecosistema. Proporciona una interfaz estandarizada y segura para la interacción entre los recursos académicos y los clientes finales.",
            engineering: {
                security: {
                    concept: "Aislamiento de Identidad y Sesión",
                    features: [
                        "Arquitectura Multi-capa: Separación lógica estricta entre la gestión de accesos y la base de datos de negocio.",
                        "Single-Session Policy: Mecanismo de revocación automática de accesos para prevenir el uso concurrente no autorizado."
                    ]
                },
                integrity: {
                    concept: "Auditoría Forense Nativa",
                    features: [
                        "Triggers Inmutables: Registro de cambios a nivel de motor de datos, independiente de la lógica de aplicación.",
                        "IP Audit: Vinculación de acciones críticas a la identidad digital y origen de red para trazabilidad total."
                    ]
                },
                scalability: {
                    concept: "Interoperabilidad y Rendimiento",
                    features: [
                        "RESTful Architecture: Comunicación estandarizada para clientes web, móviles y dashboards analíticos.",
                        "Data Normalization: Acceso directo a esquemas de datos saneados para respuestas de baja latencia."
                    ]
                }
            },
            solution_rationale: "Diana API consolida una base profesional para la expansión de servicios digitales, garantizando que la información sea accesible y auditable sin comprometer la privacidad institucional."
        },
        {
            id: "secure-infra-orch",
            title: "Arquitectura de Infraestructura y Orquestación Segura",
            subtitle: "Private Data Center y Red Mesh de Alta Disponibilidad",
            stack: ["Virtualización (L1)", "Security Gateway", "Mesh VPN", "DNS Privado", "Docker"],
            description: "Diseño y despliegue de un ecosistema de red segmentado y virtualizado. La infraestructura está diseñada para eliminar la exposición de servicios críticos al internet público, centralizando la gestión mediante túneles cifrados y segmentación lógica de tráfico.",
            engineering: {
                security: {
                    concept: "Defensa en Profundidad y Zero-Trust",
                    features: [
                        "Stealth Infrastructure: Servicios invisibles ante escaneos externos mediante red mesh cifrada.",
                        "Micro-segmentación: Aislamiento estricto de recursos académicos mediante perímetros lógicos."
                    ]
                },
                reliability: {
                    concept: "Resiliencia Institucional",
                    features: [
                        "Snapshot-Based Recovery: Puntos de restauración inmediatos para garantizar continuidad operativa.",
                        "DNS Recursivo Hardened: Resolución de nombres privada que mejora la seguridad y velocidad interna."
                    ]
                },
                scalability: {
                    concept: "Capacidad de Innovación (Future-Proof)",
                    features: [
                        "Arquitectura Modular: Lista para integrar IA local, IoT y servicios de nube privada.",
                        "Containerización: Despliegue ágil de microservicios aislados, replicables y escalables."
                    ]
                }
            },
            solution_rationale: "Esta arquitectura otorga Soberanía Tecnológica a la institución, transformando su infraestructura en una fortaleza privada capaz de soportar la próxima generación de servicios digitales educativos."
        },
        {
            id: "restoration-engine",
            title: "Core Data Restoration & Migration Engine",
            subtitle: "Automatización de Procesos ETL y Disaster Recovery",
            stack: ["Bash", "MySQL CLI", "Linux Utils"],
            description: "Motor de automatización encargado de la reconstrucción, saneamiento y parcheo de la infraestructura de datos. Reduce el tiempo de despliegue y garantiza la integridad de la información mediante procesos idempotentes.",
            engineering: {
                automation: {
                    concept: "Infraestructura como Código (IaC)",
                    features: [
                        "Idempotencia: Garantía de retorno a un estado estable independientemente de ejecuciones previas.",
                        "Patching Automático: Evolución de esquemas de datos legacy a estructuras modernas en tiempo real."
                    ]
                },
                reliability: {
                    concept: "Disaster Recovery",
                    features: [
                        "Dual Logging: Trazabilidad forense de éxitos y errores para auditoría de despliegue.",
                        "RTO Optimizado: Recuperación total del ecosistema académico en cuestión de minutos."
                    ]
                },
                security: {
                    concept: "Protección de Activos",
                    features: [
                        "Ofuscación de Respaldos: Uso de formatos propietarios (.cevsys) para mitigar identificación externa.",
                        "Sanitización de Datos: Limpieza automática de inconsistencias antes de la puesta en producción."
                    ]
                }
            },
            solution_rationale: "Este motor elimina el error humano y garantiza que la institución sea resiliente ante cualquier fallo, permitiendo una soberanía digital basada en procesos automáticos y auditables."
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
        purpose: "Evento comunitario con monitoreo en tiempo real y arquitectura de red segura."
    },
    {
        title: "Ryzen Bare-Metal HomeLab",
        description: "Un entorno de pruebas persistente basado en un Ryzen 2600x corriendo Fedora Server con orquestación distribuida.",
        stack: ["Docker Swarm", "Ansible", "Nginx", "Prometheus"],
        purpose: "Experimentación con alta disponibilidad y resiliencia de servicios auto-hospedados."
    },
    {
        title: "Infrastructure as Code (IaC) Workflows",
        description: "Desarrollo de Playbooks de Ansible y scripts de Bash para el despliegue automático de estaciones de trabajo y hardening de servidores.",
        stack: ["Bash", "Ansible", "Hyprland", "Fedora"],
        purpose: "Eliminar la 'configuración manual por SSH' y estandarizar despliegues de servidores web."
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
