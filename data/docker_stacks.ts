// Entorno Institucional & HomeLab Docker Stacks Data Storage

// --- TRABAJO (ENTORNO INSTITUCIONAL) STACKS ---

export const docker_1 = {
  name: "Outline Wiki & Mailpit Stack",
  title: "Outline & Mailpit",
  tag: "trabajo",
  environment: "Entorno Institucional",
  description: "Ecosistema para documentación colaborativa estilo Notion con base de datos PostgreSQL, caché en Redis y Mailpit para capturar correos SMTP locales.",
  compose: `version: '3.8'

services:
  # --- OUTLINE (WIKI ESTILO NOTION) ---
  outline:
    image: docker.getoutline.com/outlinewiki/outline:latest
    container_name: dev_outline
    restart: always
    environment:
      - NODE_ENV=production
      - URL=http://docs.institutional.local
      - PORT=3000
      - SECRET_KEY=\${OUTLINE_SECRET_KEY:-[REDACTED_OUTLINE_SECRET_KEY]}
      - UTILS_SECRET=\${OUTLINE_UTILS_SECRET:-[REDACTED_OUTLINE_UTILS_SECRET]}
      - PGSSLMODE=disable
      - DATABASE_URL=postgres://\${DB_USER:-outline_user}:\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}@outline_db:5432/outline?sslmode=disable
      - REDIS_URL=redis://outline_redis:6379
      - REDIS_COLLABORATION_URL=redis://outline_redis:6379
      - SMTP_HOST=mailpit
      - SMTP_PORT=1025
      - SMTP_FROM_EMAIL=no-reply@institutional.local
      # Integración Gitea (Single Sign-On / OIDC)
      - OIDC_CLIENT_ID=\${OIDC_CLIENT_ID:-[REDACTED_OIDC_CLIENT_ID]}
      - OIDC_CLIENT_SECRET=\${OIDC_CLIENT_SECRET:-[REDACTED_OIDC_CLIENT_SECRET]}
      - OIDC_AUTH_URI=http://git.institutional.local/login/oauth/authorize
      - OIDC_TOKEN_URI=http://git.institutional.local/login/oauth/access_token
      - OIDC_USERINFO_URI=http://git.institutional.local/api/v1/user
      - OIDC_DISPLAY_NAME=Gitea Institucional
    volumes:
      - outline_storage:/var/lib/outline/data
    depends_on:
      - outline_db
      - outline_redis

  outline_db:
    image: postgres:15-alpine
    container_name: dev_outline_db
    restart: always
    environment:
      POSTGRES_USER: \${DB_USER:-outline_user}
      POSTGRES_PASSWORD: \${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
      POSTGRES_DB: outline
    volumes:
      - outline_db_data:/var/lib/postgresql/data

  outline_redis:
    image: redis:alpine
    container_name: dev_outline_redis
    restart: always

  # --- MAILPIT (CAPTURA DE CORREOS) ---
  mailpit:
    image: axllent/mailpit:latest
    container_name: dev_mailpit
    restart: unless-stopped
    volumes:
      - mailpit_db_data:/data
    environment:
      - MP_MAX_MESSAGES=2000
      - MP_DATABASE=/data/mailpit.db
      - MP_SMTP_AUTH_ACCEPT_ANY=1
      - MP_SMTP_AUTH_ALLOW_INSECURE=1

volumes:
  outline_db_data:
  outline_storage:
  mailpit_db_data:`
};

export const docker_2 = {
  name: "Planka Kanban Board",
  title: "Planka Kanban",
  tag: "trabajo",
  environment: "Entorno Institucional",
  description: "Tablero Kanban colaborativo auto-hospedado para organizar y planificar las tareas de desarrollo interno, persistido con PostgreSQL.",
  compose: `version: '3.8'

services:
  planka:
    image: ghcr.io/plankanban/planka:latest
    restart: on-failure
    volumes:
      - data:/app/data
    environment:
      - BASE_URL=http://planka.institutional.local/
      - DATABASE_URL=postgresql://\${DB_USER:-postgres}:\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}@postgres/planka
      - SECRET_KEY=\${PLANKA_SECRET_KEY:-[REDACTED_PLANKA_SECRET_KEY]}
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    restart: on-failure
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=planka
      - POSTGRES_HOST_AUTH_METHOD=trust
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d planka"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  data:
  db-data:`
};

export const docker_3 = {
  name: "Central Services Stack",
  title: "Servicios Centrales Institucionales",
  tag: "trabajo",
  environment: "Entorno Institucional",
  description: "Conjunto de servicios compartidos para almacenamiento, repositorios de código y documentación. Incluye Nginx Proxy Manager, base de datos centralizada MySQL, caché Redis, Nextcloud, Gitea, BookStack y Homepage.",
  compose: `version: '3.8'

services:
  proxy:
    image: jc21/nginx-proxy-manager:latest
    container_name: services_proxy
    restart: always
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./proxy_data:/data
      - ./proxy_letsencrypt:/etc/letsencrypt
    depends_on:
      - nextcloud
      - gitea
      - bookstack

  # --- BASE DE DATOS CENTRALIZADA ---
  db:
    image: mysql:8.0
    container_name: services_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASSWORD:-[REDACTED_ROOT_PASSWORD]}
    ports:
      - '3306:3306'
    volumes:
      - db_data:/var/lib/mysql
    command: --innodb_flush_log_at_trx_commit=2 # Optimización HDD

  # --- CACHÉ EN RAM PARA NEXTCLOUD ---
  redis:
    image: redis:alpine
    container_name: services_redis
    restart: always

  # --- NEXTCLOUD ---
  nextcloud:
    image: nextcloud:stable
    container_name: services_nextcloud
    restart: always
    depends_on:
      - db
      - redis
    environment:
      - MYSQL_HOST=db
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=root
      - MYSQL_PASSWORD=\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
      - REDIS_HOST=redis
      - PHP_MEMORY_LIMIT=2G # Colchón en RAM para compensar HDD lento
      - UPLOAD_MAX_FILESIZE=16G
      - POST_MAX_SIZE=16G
    volumes:
      - nextcloud_data:/var/www/html

  # --- GITEA (EL GIT INSTITUCIONAL) ---
  gitea:
    image: gitea/gitea:1.21
    container_name: services_gitea
    restart: always
    depends_on:
      - db
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=mysql
      - GITEA__database__HOST=db:3306
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=root
      - GITEA__database__PASSWD=\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
    volumes:
      - gitea_data:/data
    ports:
      - "2222:22"

  # --- BOOKSTACK (DOCUMENTACIÓN DE APIS Y FORMATOS) ---
  bookstack:
    image: lscr.io/linuxserver/bookstack:latest
    container_name: services_bookstack
    restart: always
    depends_on:
      - db
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Mexico_City
      - APP_URL=http://docs.institutional.local
      - APP_KEY=\${BOOKSTACK_APP_KEY:-[REDACTED_BOOKSTACK_APP_KEY]}
      - DB_HOST=db
      - DB_USER=root
      - DB_USERNAME=root
      - DB_PASS=\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
      - DB_PASSWORD=\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
      - DB_DATABASE=bookstack
    volumes:
      - bookstack_data:/config

  # --- HOMEPAGE (DASHBOARD) ---
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    volumes:
      - ./config/homepage:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      HOMEPAGE_ALLOWED_HOSTS: institutional.local

volumes:
  db_data:
  nextcloud_data:
  gitea_data:
  bookstack_data:`
};

// --- HOMELAB (PERSONAL) STACKS ---

export const docker_4 = {
  name: "Immich Media Server",
  title: "Immich Server",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Servidor auto-hospedado de copia de seguridad de fotos y videos (Alternativa a Google Photos) con base de datos vectorizada y motor de Machine Learning.",
  compose: `version: "3.8"

services:
  immich-server:
    container_name: immich_server
    image: ghcr.io/immich-app/immich-server:release
    restart: always
    environment:
      - DB_URL=postgres://\${DB_URL_USER:-casaos}:\${DB_URL_PASSWORD:-[REDACTED_DB_PASSWORD]}@database:5432/immich
      - IMMICH_MACHINE_LEARNING_URL=http://immich-machine-learning:3003
      - REDIS_HOSTNAME=redis
    volumes:
      - ./data/immich/upload:/usr/src/app/upload
    networks:
      - frontend_proxy
      - default
    depends_on:
      - database

  database:
    container_name: immich_postgres
    image: ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0
    restart: always
    environment:
      - POSTGRES_USER=\${DB_USER:-casaos}
      - POSTGRES_PASSWORD=\${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
      - POSTGRES_DB=immich
    volumes:
      - ./data/immich/pgdata:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 1000M
        reservations:
          memory: 256M

  immich-machine-learning:
    deploy:
      resources:
        limits:
          memory: 1024M
    container_name: immich_machine_learning
    image: ghcr.io/immich-app/immich-machine-learning:release
    restart: always
    volumes:
      - ./data/immich/model-cache:/cache

  redis:
    container_name: immich_redis
    image: redis:6.2-alpine
    restart: always

networks:
  frontend_proxy:
    external: true`
};

export const docker_5 = {
  name: "MySQL Standalone Server",
  title: "MySQL Standalone",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Contenedor de base de datos MySQL 8.0 independiente para pruebas y experimentación local de bases de datos relacionales en homelab.",
  compose: `version: "3.8"

services:
  db:
    image: mysql:8.0
    container_name: mysql_container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASSWORD:-[REDACTED_ROOT_PASSWORD]}
      MYSQL_DATABASE: \${DB_NAME:-vsynlo}
      MYSQL_USER: \${DB_USER:-vsynlo}
      MYSQL_PASSWORD: \${DB_PASSWORD:-[REDACTED_DB_PASSWORD]}
    networks:
      - frontend_proxy
      - default
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:

networks:
  frontend_proxy:
    external: true`
};

export const docker_6 = {
  name: "RustDesk Connection Server",
  title: "RustDesk Server",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Servidor de conexión y señalización propio para administración remota y soporte técnico utilizando RustDesk.",
  compose: `services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"
    depends_on:
      - hbbr
    restart: unless-stopped
  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped`
};

export const docker_7 = {
  name: "FileBrowser File Manager",
  title: "FileBrowser",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Administrador de archivos basado en interfaz web ligero y rápido para navegar por directorios del Homelab.",
  compose: `services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    user: "1000:1000"
    command: -d /database/filebrowser.db -a 0.0.0.0 -p 80 -r /srv
    ports:
      - 18080:80
    volumes:
      - ./data/nube:/srv
      - ./data/filebrowser/filebrowser.db:/database/filebrowser.db
      - ./data/filebrowser/settings.json:/config/settings.json
    restart: unless-stopped`
};

export const docker_8 = {
  name: "Gitea Server (Homelab Version)",
  title: "Gitea Homelab",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Servidor git git-hosting auto-hospedado para repositorios de configuraciones personales en homelab, integrado con proxy reverso.",
  compose: `version: "3"

networks:
  gitea:
    external: false
  frontend_proxy:
    external: true

services:
  server:
    image: docker.gitea.com/gitea:1.25.4
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - gitea
      - frontend_proxy
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "222:22"`
};

export const docker_9 = {
  name: "Uptime Kuma Monitor",
  title: "Uptime Kuma",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Herramienta de monitoreo auto-hospedada con interfaz intuitiva para rastrear el tiempo de actividad de servicios del Homelab.",
  compose: `services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    restart: unless-stopped
    volumes:
      - ./data:/app/data
    networks:
      - frontend_proxy

networks:
  frontend_proxy:
    external: true`
};

export const docker_10 = {
  name: "OwnCloud Server Hub",
  title: "OwnCloud Server",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Nube de almacenamiento de archivos clásica estructurada con MariaDB y caché Redis bajo docker compose modular.",
  compose: `version: "3"

volumes:
  files:
    driver: local
  mysql:
    driver: local
  redis:
    driver: local

services:
  owncloud:
    image: owncloud/server:\${OWNCLOUD_VERSION}
    container_name: owncloud_server
    restart: always
    networks:
      - frontend_proxy
      - default
    depends_on:
      - mariadb
      - redis
    environment:
      - OWNCLOUD_DOMAIN=\${OWNCLOUD_DOMAIN}
      - OWNCLOUD_TRUSTED_DOMAINS=\${OWNCLOUD_TRUSTED_DOMAINS}
      - OWNCLOUD_DB_TYPE=mysql
      - OWNCLOUD_DB_NAME=owncloud
      - OWNCLOUD_DB_USERNAME=owncloud
      - OWNCLOUD_DB_PASSWORD=\${OWNCLOUD_DB_PASSWORD:-[REDACTED_PASSWORD]}
      - OWNCLOUD_DB_HOST=mariadb
      - OWNCLOUD_ADMIN_USERNAME=\${ADMIN_USERNAME}
      - OWNCLOUD_ADMIN_PASSWORD=\${ADMIN_PASSWORD}
      - OWNCLOUD_MYSQL_UTF8MB4=true
      - OWNCLOUD_REDIS_ENABLED=true
      - OWNCLOUD_REDIS_HOST=redis
    healthcheck:
      test: ["CMD", "/usr/bin/healthcheck"]
      interval: 30s
      timeout: 10s
      retries: 5
    volumes:
      - files:/mnt/data

  mariadb:
    image: mariadb:10.11
    container_name: owncloud_mariadb
    restart: always
    networks:
      - default
    environment:
      - MYSQL_ROOT_PASSWORD=\${DB_ROOT_PASSWORD:-[REDACTED_PASSWORD]}
      - MYSQL_USER=owncloud
      - MYSQL_PASSWORD=\${DB_PASSWORD:-[REDACTED_PASSWORD]}
      - MYSQL_DATABASE=owncloud
      - MARIADB_AUTO_UPGRADE=1
    command: ["--max-allowed-packet=128M", "--innodb-log-file-size=64M"]
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-u", "root", "--password=\${DB_ROOT_PASSWORD:-[REDACTED_PASSWORD]}"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - mysql:/var/lib/mysql

  redis:
    image: redis:6
    container_name: owncloud_redis
    restart: always
    command: ["--databases", "1"]
    networks:
      - default
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - redis:/data

networks:
  frontend_proxy:
    external: true`
};

export const docker_11 = {
  name: "Dashy Portal Dashboard",
  title: "Dashy Portal",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Lanzador de aplicaciones personalizable (Dashy) para agrupar enlaces a tus servicios personales expuestos en la red local.",
  compose: `services:
  dashy:
    image: lissy93/dashy:latest
    container_name: dashy
    volumes:
      - ./conf.yml:/app/user-data/conf.yml
    ports:
      - 4005:8080
    restart: always`
};

export const docker_12 = {
  name: "HomeAssistant Core Server",
  title: "HomeAssistant",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Servidor de automatización y domótica para el control de dispositivos del hogar mediante red host.",
  compose: `services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - ./data/homeassistant:/config
    restart: unless-stopped
    network_mode: host`
};

export const docker_13 = {
  name: "Nginx Proxy Manager Routing Gateway",
  title: "NPM Gateway",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Servidor de proxy reverso Nginx Proxy Manager asignado a la interfaz de Tailscale para routing interno seguro de subdominios.",
  compose: `services:
  npm:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: nginx-proxy
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '81:81'
      - '\${TAILSCALE_IP:-[REDACTED_TAILSCALE_IP]}:22:22'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      frontend_proxy:
        ipv4_address: 172.16.0.14

networks:
  frontend_proxy:
    external: true`
};

export const docker_14 = {
  name: "AdGuard Home DNS AdBlocker",
  title: "AdGuard Home",
  tag: "homelab",
  environment: "V-Net Labs",
  description: "Servidor DNS recursivo privado con filtrado de anuncios a nivel de red, configurado sobre la interfaz segura de Tailscale.",
  compose: `services:
  adguardhome:
    image: adguard/adguardhome
    container_name: adguardhome
    restart: unless-stopped
    volumes:
      - ./workdir:/opt/adguardhome/work
      - ./confdir:/opt/adguardhome/conf
    networks:
      - frontend_proxy
    ports:
      - "\${TAILSCALE_IP:-[REDACTED_TAILSCALE_IP]}:53:53/tcp"
      - "\${TAILSCALE_IP:-[REDACTED_TAILSCALE_IP]}:53:53/udp"
      - "3002:3000/tcp"

networks:
  frontend_proxy:
    external: true`
};

export const homelabConfig = {
  moreDockerComposesDirectory: "/home/vsynlo/share/server/docker-composes"
};
