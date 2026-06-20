import './styles/main.scss';
import './styles/portfolio.scss';
import './styles/dossier.scss';

import * as dataEN from './data/data';
import * as dataES from './data/data_es';

// --- Global State ---
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

let currentLang = localStorage.getItem('lang') || 'en';
let currentMode = localStorage.getItem('mode') || 'creativo'; // 'creativo' | 'serio'
let currentDossierTheme = localStorage.getItem('dossier_theme') || 'light'; // 'light' | 'dark'
let isHubCollapsed = false; // Expanded by default

if (currentDossierTheme !== 'light' && currentDossierTheme !== 'dark') {
  currentDossierTheme = 'light';
}

function getLanguageData(): any {
  return currentLang === 'es' ? dataES : dataEN;
}

const app = document.querySelector<HTMLDivElement>('#app')!;

/**
 * Global Modal Logic for Minecraft Iframes
 */
const openRetroModal = (contentHTML: string, title?: string) => {
  const modal = document.getElementById('mc-iframe-modal');
  const modalBody = document.querySelector('.mc-modal-body');
  const modalTitle = document.getElementById('mc-modal-title');
  if (modal && modalBody) {
    if (title && modalTitle) modalTitle.innerText = title;
    modalBody.innerHTML = contentHTML;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
};

const closeRetroModal = () => {
  const modal = document.getElementById('mc-iframe-modal');
  const modalBody = document.querySelector('.mc-modal-body');
  if (modal) {
    modal.classList.remove('is-active');
    if (modalBody) modalBody.innerHTML = '';
    document.body.style.overflow = '';
  }
};

/**
 * Main Application Rendering Logic
 * Injects HTML based on state (mode/lang) and re-attaches events.
 */
function render() {
  const { profile, skills, experience, projects, minecraftEvent, upnEcosystem, certifications } = getLanguageData();

  const seriousLabel = currentLang === 'es' ? 'SERIO' : 'PROFESSIONAL';
  const creativeLabel = currentLang === 'es' ? 'RETRO' : 'CREATIVE';
  const themeToggleLabel = currentDossierTheme === 'light'
    ? (currentLang === 'es' ? 'Tema negro' : 'Black theme')
    : (currentLang === 'es' ? 'Tema blanco' : 'White theme');
  const dossierText = {
    summary: currentLang === 'es' ? 'Resumen Profesional' : 'Executive Summary',
    footprint: currentLang === 'es' ? 'Trayectoria Profesional' : 'Professional Footprint',
    ecosystem: currentLang === 'es' ? 'Ecosistema CEV' : 'CEV Ecosystem',
    stack: currentLang === 'es' ? 'Stack Principal' : 'Core Stack',
    certifications: currentLang === 'es' ? 'Certificaciones Técnicas' : 'Technical Certifications',
    projects: currentLang === 'es' ? 'Proyectos Destacados' : 'Featured Projects',
    vision: currentLang === 'es' ? 'Visión Operativa' : 'Operational Vision',
    contact: currentLang === 'es' ? 'Contacto' : "Let's Connect",
    navSummary: currentLang === 'es' ? 'Resumen' : 'Summary',
    navExperience: currentLang === 'es' ? 'Experiencia' : 'Experience',
    navEcosystem: currentLang === 'es' ? 'Ecosistema' : 'Ecosystem',
    navStack: currentLang === 'es' ? 'Tecnologías' : 'Stack',
    navCertifications: currentLang === 'es' ? 'Certificaciones' : 'Certifications',
    navProjects: currentLang === 'es' ? 'Proyectos' : 'Projects',
    navVision: currentLang === 'es' ? 'Visión' : 'Vision',
    navContact: currentLang === 'es' ? 'Contacto' : 'Contact',
    years: currentLang === 'es' ? 'Años Exp.' : 'Years Exp.',
    focused: currentLang === 'es' ? 'Enfoque' : 'Focused',
    export: currentLang === 'es' ? 'Exportar PDF' : 'Export PDF'
  };

  app.innerHTML = `
    <!-- FLOATING CONTROL HUB -->
    <div class="floating-hub hub-theme-${currentMode} ${isHubCollapsed ? 'is-collapsed' : ''}">
      <button id="hub-collapse-toggle" class="hub-collapse-btn" title="${isHubCollapsed ? 'Expandir' : 'Contraer'}">
        <i class="fa-solid ${isHubCollapsed ? 'fa-chevron-up' : 'fa-chevron-down'}"></i>
      </button>
      <div class="hub-content">
        <div class="hub-group mode-toggle">
          <button id="hub-toggle-serio" class="${currentMode === 'serio' ? 'is-active' : ''}" title="${seriousLabel}">
            <i class="fa-solid fa-user-tie"></i>
            <span>${seriousLabel}</span>
          </button>
          <button id="hub-toggle-creativo" class="${currentMode === 'creativo' ? 'is-active' : ''}" title="${creativeLabel}">
            <i class="fa-solid fa-terminal"></i>
            <span>${creativeLabel}</span>
          </button>
        </div>
        <div class="hub-divider"></div>
        <div class="hub-group lang-toggle">
          <button id="hub-lang-en" class="${currentLang === 'en' ? 'is-active' : ''}">EN</button>
          <button id="hub-lang-es" class="${currentLang === 'es' ? 'is-active' : ''}">ES</button>
        </div>
      </div>
    </div>

    <!-- RETRO SIDEBAR (CREATIVE ONLY) -->
    <aside class="retro-sidebar-main ${currentMode === 'serio' ? 'mode-hidden' : ''}">
      <button id="sidebar-mobile-toggle" class="sidebar-toggle-btn block round">
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="block fixed accent sidebar-container" style="--block-accent-color: #1a7f64; --block-background-color: #0c0d15;">
            <div class="sidebar-links">
          <a href="${profile.github}" target="_blank" title="GitHub" class="sidebar-link sidebar-link-github"><i class="fa-brands fa-github"></i></a>
          <a href="${profile.linkedin}" target="_blank" title="LinkedIn" class="sidebar-link sidebar-link-linkedin"><i class="fa-brands fa-linkedin"></i></a>
          <a href="mailto:${profile.email}" title="Email" class="sidebar-link sidebar-link-email"><i class="fa-solid fa-envelope"></i></a>
                <div class="sidebar-divider"></div>
          <a href="#about" title="About" class="sidebar-link sidebar-link-about"><i class="fa-solid fa-user-gear"></i></a>
          <a href="#experience" title="Experience" class="sidebar-link sidebar-link-experience"><i class="fa-solid fa-briefcase"></i></a>
          <a href="#ecosystem" title="Ecosystem" class="sidebar-link sidebar-link-ecosystem"><i class="fa-solid fa-microchip"></i></a>
          <a href="#telemetry" title="Telemetry" class="sidebar-link sidebar-link-telemetry"><i class="fa-solid fa-gauge-high"></i></a>
            </div>
        </div>
    </aside>

    <!-- WRAPPER MODE INJECTION -->
    <div class="monitor-wrapper mode-${currentMode}">
      
      <!-- ================================================================
           § RETRO MONITOR (ORIGINAL DETAILED CREATIVE DESIGN)
           ================================================================ -->
      <div class="retro-monitor ${currentMode === 'serio' ? 'mode-hidden' : ''}">
        <header class="block with-title fade-in-up portfolio-header" id="top">
          <h2 class="title">ROOT@JVEGA: ~</h2>
          <div class="portfolio-header-content">
            
            <!-- IDENTITY BLOCK -->
            <div class="block fixed identity-box-main ">
              <div class="scanlines-overlay accent"></div>
              <p class="identity-pretitle">, ~ whoami <span class="terminal-cursor"></span></p>
              <h1 class="identity-name">${profile.name}</h1>
              <p class="identity-location">[ ${profile.location.toUpperCase()} ]</p>
            </div>

            <!-- CONTACT BLOCK (./get_contact.sh) -->
            <div class="block fixed contact-box-main">
              <p class="shell-prompt"><span class="prompt-arrow">➜</span> <span class="prompt-home">~</span> ./get_contact.sh</p>
              <div class="contact-entry">
                <i class="fa-solid fa-envelope contact-icon contact-icon-email"></i>
                <a href="mailto:${profile.email}" class="contact-link">${profile.email}</a>
                </div>
              <div class="contact-entry">
                <i class="fa-brands fa-github contact-icon contact-icon-github"></i>
                <a href="${profile.github}" target="_blank" class="contact-link">github/Jov-glitch</a>
                </div>
              <div class="contact-entry">
                <i class="fa-brands fa-linkedin contact-icon contact-icon-linkedin"></i>
                <a href="${profile.linkedin}" target="_blank" class="contact-link">linkedin/jose-vega</a>
                </div>
            </div>

            <!-- ROLE & CORE BADGES -->
            <div class="badge-stack-main">
              <div class="block fixed badge-item-row">
                <div class="badge-label-side">ROLE</div>
                <div class="badge-value-side badge-value-role">${profile.title.split('|')[0].trim()}</div>
                </div>
              <div class="block fixed badge-item-row">
                <div class="badge-label-side">CORE</div>
                <div class="badge-value-side badge-value-core">${profile.title.split('|')[1].trim()}</div>
                </div>
            </div>

            <!-- TAGLINE QUOTE BOX -->
            <div class="block fixed tagline-box-main accent">
              <div class="scanlines-overlay"></div>
              <p class="tagline-text">
                <span class="tagline-quote tagline-quote-open">"</span>
                    ${profile.tagline}
                <span class="tagline-quote tagline-quote-close">"</span>
                </p>
            </div>

            <!-- HEADER NAV BUTTONS -->
            <div class="header-nav-buttons-main">
              <a href="#about" class="nes-btn is-primary nav-slash-btn nav-tone-about">/about</a>
              <a href="#event" class="nes-btn is-error nav-slash-btn nav-tone-event">/event</a>
              <a href="#experience" class="nes-btn is-warning nav-slash-btn nav-tone-experience">/experience</a>
              <a href="#labs" class="nes-btn is-success nav-slash-btn nav-tone-projects">/projects</a>
              <a href="#ecosystem" class="nes-btn is-normal nav-slash-btn nav-tone-ecosystem">/ecosystem</a>
              <a href="#telemetry" class="nes-btn is-error nav-slash-btn nav-tone-telemetry">/telemetry</a>
            </div>
          </div>
        </header>

        <main class="main-content">
          <!-- ABOUT -->
          <section id="about" class="block fixed with-title fade-in-up portfolio-section-about">
            <h2 class="title">👨‍💻 ${currentLang === 'es' ? 'PERFIL_EJECUTIVO' : 'EXECUTIVE_PROFILE'}</h2>
            <div class="about-content">
              ${profile.about.split('\n\n').map((para: string, i: number) =>
    i === 0 ? `
              <div class="block accent fixed about-accent-block">
                <p>${para}</p>
              </div>
              ` : `
              <p class="about-plain-text">${para}</p>
              `).join('')}
            </div>
          </section>

          <!-- MINECRAFT EVENT -->
          ${minecraftEvent.active ? `
          <section id="event" class="block with-title fade-in-up portfolio-section-event">
            <h2 class="title">${minecraftEvent.title}</h2>
            <div class="event-body">
              <div class="block accent event-accent-block">
                <p class="event-description">${minecraftEvent.description}</p>
                <p class="event-subtext">
                  ${currentLang === 'es' ? 'Explora un mundo persistente con arquitectura en la nube de alto rendimiento.' : 'Explore a persistent world with high-performance cloud architecture.'}
                </p>
              </div>
              <a href="${minecraftEvent.link}" class="nes-btn is-error event-btn">${minecraftEvent.buttonText}</a>
            </div>
          </section>
          ` : `
          <section id="event" class="block with-title fade-in-up portfolio-section-event">
            <h2 class="title">${minecraftEvent.title}</h2>
            <div class="event-body">
              <div class="block accent event-accent-block">
                <p class="event-description">${minecraftEvent.closingTitle}</p>
                <p class="event-subtext">${minecraftEvent.closingDescription}</p>
              </div>
              <div class="block accent event-accent-block">
                <p class="event-description">${currentLang === 'es' ? 'AGRADECIMIENTO FINAL' : 'FINAL THANK YOU'}</p>
                <p class="event-subtext">${minecraftEvent.closingMessage}</p>
              </div>
            </div>
          </section>
          `}

          <!-- EXPERIENCE -->
          <section id="experience" class="block fixed with-title fade-in-up portfolio-section-experience">
            <h2 class="title">💼 ${currentLang === 'es' ? 'HUELLA_PROFESIONAL' : 'PROFESSIONAL_FOOTPRINT'}</h2>
            <div class="experience-list">
              ${experience.map((exp: any, idx: number) => {
      const PALETTES = [
        { accent: '#9d5bb5', shadow: '#5e2a7a', bullet: '#c084fc', period: '#f59e0b' },
        { accent: '#1d4ed8', shadow: '#1e3a8a', bullet: '#60a5fa', period: '#f59e0b' },
      ];
      const p = PALETTES[idx % PALETTES.length];
      return `
                <div class="block fixed portfolio-experience-card" style="--block-accent-color: ${p.accent}; --block-shadow-color: ${p.shadow}; border-color: ${p.accent};">
                  <div class="accent block fixed experience-header" style="--block-accent-color: ${p.accent}; --block-shadow-color: ${p.shadow}; border-bottom-color: ${p.shadow};">
                    <div class="role-info">
                      <h3>${exp.role}</h3>
                      <a href="${exp.link}" ${exp.link.startsWith('http') ? 'target="_blank"' : ''}>@ ${exp.company} ↗</a>
                    </div>
                    <span class="block inline accent fixed period-badge" style="--block-accent-color: ${p.period}; --block-shadow-color: #92400e;">${exp.period}</span>
                  </div>
                  <div class="experience-body">
                    ${exp.achievements.map((a: string) => `
                    <div class="achievement-item">
                      <span class="achievement-arrow" style="color: ${p.bullet};">▶</span>
                      <p class="achievement-text">${a}</p>
                    </div>`).join('')}
                  </div>
                </div>`;
    }).join('')}
            </div>
          </section>

          <!-- STACK -->
          <section id="stack" class="block fixed with-title fade-in-up portfolio-section-stack">
            <h2 class="title">🛠️ CORE STACK</h2>
            <div class="grid-2-col stack-grid">
              ${skills.map((s: any, si: number) => {
      const colors = [{ a: '#10b981', s: '#065f46', t: '#6ee7b7' }, { a: '#1d4ed8', s: '#1e3a8a', t: '#93c5fd' }, { a: '#9d5bb5', s: '#5e2a7a', t: '#d8b4fe' }];
      const sp = colors[si % colors.length];
      return `
              <div class="block fixed portfolio-stack-card" style="--block-accent-color: ${sp.a}; --block-shadow-color: ${sp.s}; border-color: ${sp.a};">
                <div class="accent block fixed stack-header" style="--block-accent-color: ${sp.a}; --block-shadow-color: ${sp.s};">
                  <span class="stack-header-arrow">▶</span>
                  <h3>${s.category}</h3>
                </div>
                <div class="stack-body">
                  ${s.items.map((item: any) => `
                  <div class="stack-item">
                    <p class="stack-item-name" style="color: ${sp.t};">${item.name}</p>
                    <div class="stack-item-tags-container">
                      ${item.description.map((desc: string, di: number) => `
                      <span class="block inline accent stack-tag" 
                            style="--block-accent-color: ${sp.a}; --block-shadow-color: ${sp.s}; filter: brightness(${0.8 + (di % 3) * 0.15}); animation-delay: ${(di * 0.08).toFixed(2)}s;">
                        ${desc}
                      </span>`).join('')}
                    </div>
                  </div>`).join('')}
                </div>
              </div>`;
    }).join('')}
            </div>
          </section>

          <!-- LABS/PROJECTS -->
          <section id="labs" class="block fixed with-title fade-in-up portfolio-section-projects">
            <h2 class="title">🔬 ${currentLang === 'es' ? 'LABS_EXPERIMENTALES' : 'EXPERIMENTAL_LABS'}</h2>
            <div class="projects-grid">
              ${projects.map((proj: any, idx: number) => {
      const PALETTES = [{ a: '#9d5bb5', s: '#5e2a7a', t: '#c084fc' }, { a: '#1d4ed8', s: '#1e3a8a', t: '#60a5fa' }, { a: '#0f766e', s: '#134e4a', t: '#2dd4bf' }];
      const p = PALETTES[idx % PALETTES.length];
      return `
              <div class="block project-card fixed portfolio-project-card is-clickable" data-type="project" data-id="${idx}" style="--block-accent-color: ${p.a}; --block-shadow-color: ${p.s}; border-color: ${p.a};">
                <div class="accent block fixed project-header" style="--block-accent-color: ${p.a}; --block-shadow-color: ${p.s};">
                  <span class="project-header-arrow">▶</span>
                  <h3>${proj.title}</h3>
                </div>
                <div class="project-body">
                  <p class="project-desc">${proj.description}</p>
                  <div class="project-purpose" style="border-left-color: ${p.a}; box-shadow: inset 3px 0 12px rgba(0,0,0,0.4);">
                    <p class="purpose-label" style="color: ${p.t};">▶ CORE PURPOSE</p>
                    <p class="purpose-text">${proj.purpose || ''}</p>
                  </div>
                  <div class="project-tags">
                    ${proj.stack.map((tech: string) => `
                    <span class="block inline accent fixed project-tag" style="--block-accent-color: ${p.a}; --block-shadow-color: ${p.s};">${tech}</span>`).join('')}
                  </div>
                </div>
              </div>`;
    }).join('')}
            </div>
          </section>

          <!-- ECOSYSTEM DETAILED -->
          <section id="ecosystem" class="block fixed with-title fade-in-up portfolio-section-ecosystem">
            <h2 class="title">🏢 ${upnEcosystem.title.toUpperCase()}</h2>
            <div class="ecosystem-container">
              <div class="block accent fixed portfolio-ecosystem-header-block">
                <div class="header-main">
                  <h1 class="glitch-text" data-text="${upnEcosystem.title.toUpperCase()}">${upnEcosystem.title.toUpperCase()}</h1>
                  <p class="subtitle">${upnEcosystem.subtitle}</p>
                </div>
                <div class="tagline-box">
                  <p>"${upnEcosystem.tagline}"</p>
                </div>
                <div class="header-stack">
                  ${upnEcosystem.stack.map((tech: string) => `<span class="block inline fixed stack-pill">${tech}</span>`).join('')}
                </div>
              </div>

              <div class="grid-3-col overview-grid" style="margin: 2rem 0; gap: 1.5rem;">
                <div class="block fixed overview-card problem">
                    <div class="card-label">PROBLEM_SPACE</div>
                    <p>${upnEcosystem.overview.problem}</p>
                </div>
                <div class="block fixed overview-card solution">
                    <div class="card-label">ARCHITECTURE_SOLUTION</div>
                    <p>${upnEcosystem.overview.solution}</p>
                </div>
                <div class="block fixed overview-card impact">
                    <div class="card-label">OPERATIONAL_IMPACT</div>
                    <p>${upnEcosystem.overview.impact}</p>
                </div>
              </div>

              <div class="portfolio-ecosystem-grid">
                ${upnEcosystem.modules.map((mod: any, idx: number) => {
      const MOD_PALETTES = [{ a: '#9d5bb5', s: '#5e2a7a', t: '#c084fc' }, { a: '#0f766e', s: '#134e4a', t: '#2dd4bf' }, { a: '#1d4ed8', s: '#1e3a8a', t: '#60a5fa' }];
      const p = MOD_PALETTES[idx % MOD_PALETTES.length];
      const engCategories = Object.entries(mod.engineering || {}).map(([key, value]: [string, any]) => `
                    <div class="eng-item">
                      <span class="eng-concept" style="color: ${p.t};">${key.toUpperCase()}: ${value.concept}</span>
                      <ul class="eng-features">
                        ${value.features.map((f: string) => `<li># ${f}</li>`).join('')}
                      </ul>
                    </div>`).join('');

      return `
                  <div class="block module-card fixed portfolio-ecosystem-card is-clickable" data-type="module" data-id="${mod.id}" style="--block-accent-color: ${p.a}; --block-shadow-color: ${p.s}; border-color: ${p.a};">
                    <div class="accent block fixed module-header" style="--block-accent-color: ${p.a}; --block-shadow-color: ${p.s};">
                      <h3>${mod.title}</h3>
                    </div>
                    <div class="module-body">
                      <p class="module-desc">${mod.description}</p>
                      <div class="engineering-box">
                        <p class="eng-label" style="color: ${p.t}; border-bottom-color: ${p.a};">▶ ENGINEERING_DEEP_DIVE</p>
                        <div class="eng-content">${engCategories}</div>
                      </div>
                      <div class="rationale-box" style="border-left-color: ${p.a};">
                        <p class="rationale-text">"${mod.solution_rationale}"</p>
                      </div>
                    </div>
                  </div>`;
    }).join('')}
              </div>
            </div>
          </section>

          <!-- TELEMETRY -->
          <section id="telemetry" class="block with-title fade-in-up portfolio-section-telemetry" style="border-color: var(--accent-blue);">
            <h2 class="title" style="color: var(--accent-blue); text-shadow: 2px 2px 0px rgba(0,0,0,0.5);">📊 ${currentLang === 'es' ? 'TELEMETRÍA_EN_VIVO' : 'LIVE_TELEMETRY'}</h2>
            <div class="telemetry-container">
              ${minecraftEvent.monitoring.map((mon: any) => {
      const safeId = `dash-${mon.title.replace(/\s+/g, '-').toLowerCase()}`;
      return `
                <div class="block portfolio-telemetry-card" style="border-left: 5px solid var(--accent-blue); background: rgba(59, 130, 246, 0.03);">
                  <div class="telemetry-header">
                    <div class="telemetry-info">
                      <h3 style="color: #fff; margin-bottom: 0.4rem;">${mon.title}</h3>
                      <p style="font-size: 0.65rem; color: var(--text-dim);">${mon.description}</p>
                    </div>
                    <button class="nes-btn is-primary toggle-dashboard" data-target="${safeId}" style="height: 40px; font-size: 0.6rem;">[ DESPLEGAR ]</button>
                  </div>
                  <div id="${safeId}" class="telemetry-dashboard" style="display: none;">
                    <iframe src="${mon.dashboard_url}" title="${mon.title}" loading="lazy"></iframe>
                  </div>
                </div>`;
    }).join('')}
            </div>
          </section>

          <!-- VISION -->
          <section id="vision" class="block with-title fade-in-up portfolio-section-vision">
            <h2 class="title">🎯 ${currentLang === 'es' ? 'VISIÓN_OPERATIVA' : 'OPERATIONAL_VISION'}</h2>
            <div class="block accent vision-card">
              <p>${profile.vision}</p>
            </div>
          </section>

          <footer class="terminal-footer">
            <p>PROD_VER: 2.0.4 | NODE: GCP-US-CENTRAL | ${new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>

      <!-- ================================================================
           § PROFESSIONAL DOSSIER (MODERN VIEW)
           ================================================================ -->
      <div id="dossier-view" class="dossier-overlay theme-${currentDossierTheme} ${currentMode === 'serio' ? 'is-active' : ''}">
        <div class="dossier-blob"></div>
        <button class="dossier-theme-btn" id="dossier-theme-toggle">${themeToggleLabel}</button>
        <button class="dossier-close-btn" id="close-dossier" onclick="window.print()">${dossierText.export}</button>
        
        <div class="dossier-container">
          <header class="dossier-hero">
            <div class="dossier-avatar-container">
              <div class="avatar-glow"></div>
              <img src="/favicon.png" alt="Profile">
            </div>
            <div class="dossier-hero-info">
              <p class="subtitle">${profile.title}</p>
              <h1>${profile.name}</h1>
              <p class="hero-meta">${profile.tagline}</p>
              <p class="hero-meta hero-location">${profile.location}</p>
              <div class="stats">
                <div class="stat"><span class="val">3+</span><span class="lbl">${dossierText.years}</span></div>
                <div class="stat"><span class="val">GCP</span><span class="lbl">${dossierText.focused}</span></div>
              </div>
            </div>
          </header>

          <div class="dossier-grid">
            <aside class="dossier-sidebar">
              <a href="#d-summary" class="nav-link is-active"><i class="fa-solid fa-user-tie"></i> ${dossierText.navSummary}</a>
              <a href="#d-experience" class="nav-link"><i class="fa-solid fa-briefcase"></i> ${dossierText.navExperience}</a>
              <a href="#d-ecosystem" class="nav-link"><i class="fa-solid fa-network-wired"></i> ${dossierText.navEcosystem}</a>
              <a href="#d-stack" class="nav-link"><i class="fa-solid fa-layer-group"></i> ${dossierText.navStack}</a>
              <a href="#d-certifications" class="nav-link"><i class="fa-solid fa-certificate"></i> ${dossierText.navCertifications}</a>
              <a href="#d-projects" class="nav-link"><i class="fa-solid fa-diagram-project"></i> ${dossierText.navProjects}</a>
              <a href="#d-vision" class="nav-link"><i class="fa-solid fa-bullseye"></i> ${dossierText.navVision}</a>
              <a href="#d-contact" class="nav-link"><i class="fa-solid fa-id-card"></i> ${dossierText.navContact}</a>
            </aside>

            <main class="dossier-content">
              <section class="dossier-section" id="d-summary">
                <h2>${dossierText.summary}</h2>
                <div class="dossier-card">
                  <p>${profile.about.replace(/\n\n/g, '<br><br>')}</p>
                </div>
              </section>

              <section class="dossier-section" id="d-experience">
                <h2>${dossierText.footprint}</h2>
                ${experience.map((exp: any) => `
                <div class="dossier-card">
                  <div class="exp-header"><h3>${exp.role}</h3><span>${exp.period}</span></div>
                  ${exp.link && exp.link.startsWith('http')
      ? `<a href="${exp.link}" target="_blank" class="company">${exp.company}</a>`
      : `<span class="company">${exp.company}</span>`}
                  <ul class="achievements">${exp.achievements.map((a: string) => `<li>${a}</li>`).join('')}</ul>
                </div>`).join('')}
              </section>

              <section class="dossier-section" id="d-ecosystem">
                <h2>${dossierText.ecosystem}</h2>
                <div class="dossier-tabs" id="ecosystem-tabs">
                  ${upnEcosystem.modules.map((mod: any, i: number) => `
                  <button class="tab-btn ${i === 0 ? 'is-active' : ''}" data-target="mod-${mod.id}">${mod.title.split(':')[0]}</button>`).join('')}
                </div>
                <div class="dossier-modules-container">
                  ${upnEcosystem.modules.map((mod: any, i: number) => `
                  <div class="tab-content ${i === 0 ? 'is-active' : ''}" id="mod-${mod.id}">
                    <div class="dossier-card">
                      <h3 class="module-title">${mod.title}</h3>
                      <p class="module-subtitle">${mod.subtitle}</p>
                      <p>${mod.description}</p>
                      <div class="eng-pill-grid">
                        ${Object.entries(mod.engineering || {}).map(([key, val]: [string, any]) => `
                        <div class="eng-pill">
                          <p class="pill-label">${key.toUpperCase()}</p>
                          <p class="pill-concept">${val.concept}</p>
                          <ul>${val.features.map((f: string) => `<li>${f}</li>`).join('')}</ul>
                        </div>`).join('')}
                      </div>
                    </div>
                  </div>`).join('')}
                </div>
              </section>

              <section class="dossier-section" id="d-stack">
                <h2>${dossierText.stack}</h2>
                <div class="skill-tags skill-tags-detailed">
                  ${skills.map((cat: any) => cat.items.map((s: any) => `
                    <div class="skill-tag skill-tag-detailed">
                      <span class="skill-name">${s.name}</span>
                      <span class="skill-meta">${(s.description || []).slice(0, 2).join(' · ')}</span>
                    </div>
                  `).join('')).join('')}
              </section>

              <section class="dossier-section" id="d-certifications">
                <h2>${dossierText.certifications}</h2>
                <div class="dossier-project-grid">
                  ${certifications.map((cat: any) => `
                    <div class="dossier-card">
                      <h3 class="module-title" style="display: flex; align-items: center; gap: 0.5rem; text-align: left;">
                        <i class="${cat.category.toLowerCase().includes('redes') || cat.category.toLowerCase().includes('network') ? 'ph ph-broadcast text-brutal-blue' : 'ph ph-shield-check text-brutal-green'}"></i>
                        ${cat.category}
                      </h3>
                      <div class="space-y-3 font-mono" style="margin-top: 1rem;">
                        ${cat.items.map((item: any) => `
                          <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem; padding: 0.6rem; background: rgba(128,128,128,0.05); border: 1px solid rgba(128,128,128,0.15); border-radius: 4px; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.8rem; font-weight: 600; font-family: 'Outfit'; text-align: left;">
                              ${item.name}
                            </span>
                            <span style="font-size: 0.7rem; background: rgba(128,128,128,0.12); padding: 0.1rem 0.4rem; white-space: nowrap; font-weight: bold; border-radius: 2px;">
                              ${item.date}
                            </span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>

              <section class="dossier-section" id="d-projects">
                <h2>${dossierText.projects}</h2>
                <div class="dossier-project-grid">
                  ${projects.map((proj: any) => `
                    <div class="dossier-card project-card-serious">
                      <h3 class="module-title">${proj.title}</h3>
                      <p class="module-subtitle">${proj.purpose || ''}</p>
                      <p>${proj.description}</p>
                      <div class="skill-tags">
                        ${(proj.stack || []).map((tech: string) => `<span class="skill-tag">${tech}</span>`).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>

              <section class="dossier-section" id="d-vision">
                <h2>${dossierText.vision}</h2>
                <div class="dossier-card">
                  <p>${profile.vision}</p>
                </div>
              </section>

              <section class="dossier-section" id="d-contact">
                <h2>${dossierText.contact}</h2>
                <div class="contact-grid">
                  <a href="mailto:${profile.email}" class="contact-pill"><i class="fa-solid fa-envelope"></i> ${profile.email}</a>
                  <a href="${profile.linkedin}" target="_blank" class="contact-pill"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                  <a href="${profile.github}" target="_blank" class="contact-pill"><i class="fa-brands fa-github"></i> GitHub</a>
                </div>
                <button class="dossier-export-btn" onclick="window.print()">${dossierText.export}</button>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FOR IFRAMES -->
    <div id="mc-iframe-modal" class="mc-modal">
        <div class="mc-modal-content">
            <div class="mc-modal-header">
                <h4 class="mc-modal-title" id="mc-modal-title">BROWSER_NODE</h4>
                <button class="mc-modal-close" id="mc-modal-close">X</button>
            </div>
            <div class="mc-modal-body"><iframe id="mc-modal-iframe" src=""></iframe></div>
        </div>
    </div>
  `;

  attachEventListeners();
  initDashboardToggles();
  initDossierInteractivity();
  initModalLogic();
}

/**
 * HUB SWITCHERS
 */
function attachEventListeners() {
  const getThemeToggleLabel = () => currentDossierTheme === 'light'
    ? (currentLang === 'es' ? 'Tema negro' : 'Black theme')
    : (currentLang === 'es' ? 'Tema blanco' : 'White theme');

  document.getElementById('hub-toggle-serio')?.addEventListener('click', () => {
    currentMode = 'serio';
    localStorage.setItem('mode', 'serio');
    updateModeUI();
  });
  document.getElementById('hub-toggle-creativo')?.addEventListener('click', () => {
    currentMode = 'creativo';
    localStorage.setItem('mode', 'creativo');
    updateModeUI();
  });
  document.getElementById('hub-lang-en')?.addEventListener('click', () => {
    currentLang = 'en';
    localStorage.setItem('lang', 'en');
    render();
  });
  document.getElementById('hub-lang-es')?.addEventListener('click', () => {
    currentLang = 'es';
    localStorage.setItem('lang', 'es');
    render();
  });
  document.getElementById('hub-collapse-toggle')?.addEventListener('click', () => {
    isHubCollapsed = !isHubCollapsed;
    localStorage.setItem('hub_collapsed', isHubCollapsed.toString());
    const hub = document.querySelector('.floating-hub');
    const icon = document.querySelector('#hub-collapse-toggle i');
    if (hub) hub.classList.toggle('is-collapsed', isHubCollapsed);
    if (icon) {
      icon.classList.remove('fa-chevron-up', 'fa-chevron-down');
      icon.classList.add(isHubCollapsed ? 'fa-chevron-up' : 'fa-chevron-down');
    }
  });

  document.getElementById('sidebar-mobile-toggle')?.addEventListener('click', () => {
    const sidebar = document.querySelector('.retro-sidebar-main');
    const icon = document.querySelector('#sidebar-mobile-toggle i');
    if (sidebar) sidebar.classList.toggle('is-visible');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  document.getElementById('dossier-theme-toggle')?.addEventListener('click', () => {
    currentDossierTheme = currentDossierTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('dossier_theme', currentDossierTheme);

    const dossier = document.getElementById('dossier-view');
    if (dossier) {
      dossier.classList.remove('theme-light', 'theme-dark');
      dossier.classList.add(`theme-${currentDossierTheme}`);
    }

    const themeBtn = document.getElementById('dossier-theme-toggle');
    if (themeBtn) {
      themeBtn.textContent = getThemeToggleLabel();
    }
  });

  // New helper to update just the mode classes without re-rendering everything
  function updateModeUI() {
    const wrapper = document.querySelector('.monitor-wrapper');
    const retro = document.querySelector('.retro-monitor');
    const dossier = document.getElementById('dossier-view');
    const hub = document.querySelector('.floating-hub');
    const sidebar = document.querySelector('.retro-sidebar-main');

    // Update labels and active states in the hub
    document.getElementById('hub-toggle-serio')?.classList.toggle('is-active', currentMode === 'serio');
    document.getElementById('hub-toggle-creativo')?.classList.toggle('is-active', currentMode === 'creativo');

    if (hub) {
      hub.classList.toggle('hub-theme-creativo', currentMode === 'creativo');
      hub.classList.toggle('hub-theme-serio', currentMode === 'serio');
    }

    if (wrapper) {
      wrapper.className = `monitor-wrapper mode-${currentMode}`;
    }
    if (retro) retro.classList.toggle('mode-hidden', currentMode === 'serio');
    if (sidebar) sidebar.classList.toggle('mode-hidden', currentMode === 'serio');
    if (dossier) dossier.classList.toggle('is-active', currentMode === 'serio');
  }

  // MODULE/PROJECT CLICK FOR MODALS
  document.querySelectorAll('.is-clickable').forEach(card => {
    card.addEventListener('click', () => {
      const { projects, upnEcosystem } = getLanguageData();
      const type = card.getAttribute('data-type');
      const id = card.getAttribute('data-id');
      let data: any;

      if (type === 'project' && id) {
        data = projects[parseInt(id)];
      } else if (type === 'module' && id) {
        data = upnEcosystem.modules.find((m: any) => m.id === id);
      }

      if (data) {
        const modalHTML = `
          <div class="retro-modal-creative-wrapper" style="padding: 1.5rem; color: #fff; font-family: 'Outfit'; max-width: 1000px; margin: 0 auto;">
            
            <!-- MODAL HEADER -->
            <div class="block fixed accent modal-creative-header" style="--block-accent-color: #1a7f64; margin-bottom: 2rem; padding: 1.5rem; border: 4px solid #fff; position: relative;">
                <div class="scanlines-overlay" style="position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 50%); background-size: 100% 4px; pointer-events: none;"></div>
                <h2 style="font-family: 'Press Start 2P'; font-size: 1.2rem; color: #fff; text-shadow: 3px 3px 0 #000; margin: 0;">${data.title.toUpperCase()}</h2>
                <div style="height: 4px; width: 60px; background: #f59e0b; margin-top: 0.8rem;"></div>
                <p style="color: #6ee7b7; font-size: 0.85rem; margin-top: 1rem; font-family: 'Press Start 2P'; letter-spacing: 1px;">[ SYSTEM_ID: ${data.id || 'MOD-01'} ]</p>
            </div>

            <!-- MODAL DESCRIPTION -->
            <div class="block fixed description-box" style="background: #0a0b14; padding: 1.5rem; margin-bottom: 2rem; border-color: rgba(255,255,255,0.2); border-width: 2px;">
                <p style="font-size: 0.95rem; line-height: 1.8; color: #cbd5e1; text-align: justify;">${data.description}</p>
            </div>

            <!-- ENGINEERING SPECIFICATIONS (DYNAMIC EXPANSION) -->
            ${data.engineering ? `
            <div class="engineering-grid" style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2.5rem; width: 100%;">
                ${Object.entries(data.engineering).map(([key, val]: [string, any], idx: number) => {
          const colors = ['#9d5bb5', '#f59e0b', '#3b82f6'];
          const color = colors[idx % colors.length];
          return `
                    <div class="block fixed eng-spec-card" style="padding: 1.2rem; background: #0c0d15; border-color: ${color}; border-width: 3px; box-shadow: 4px 4px 0 #000; flex: 1 1 300px; min-height: 180px; display: flex; flex-direction: column;">
                        <h3 style="font-family: 'Press Start 2P'; font-size: 0.78rem; color: ${color}; margin-bottom: 1rem;">▶ ${key.toUpperCase()}</h3>
                        <p style="font-size: 0.9rem; font-weight: bold; color: #fff; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; line-height: 1.5;">${val.concept}</p>
                        <ul style="font-size: 0.86rem; color: #cbd5e1; list-style-type: square; padding-left: 1.2rem; line-height: 1.7; flex: 1;">
                            ${val.features.map((f: string) => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    `;
        }).join('')}
            </div>
            ` : ''}

            <!-- SOLUTION RATIONALE -->
            ${data.solution_rationale ? `
            <div class="block fixed rationale-box" style="background: #064e3b; border-color: #10b981; padding: 1.5rem; margin-bottom: 2.5rem; position: relative;">
                <i class="fa-solid fa-quote-left" style="position: absolute; top: -0.8rem; left: 1rem; font-size: 2rem; color: rgba(16, 185, 129, 0.3);"></i>
                <p style="font-style: italic; font-size: 0.95rem; color: #6ee7b7; text-align: center; line-height: 1.7;">"${data.solution_rationale}"</p>
            </div>
            ` : ''}

            <!-- MODAL FOOTER BUTTONS -->
            <div class="modal-footer-creative" style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem;">
                <button class="block round accent close-modal-creative-btn" onclick="document.getElementById('mc-modal-close').click()" style="--block-accent-color: #dc2626; color: #fff; padding: 0.8rem 2.5rem; transition: transform 0.2s; cursor: pointer;">
                    <span style="font-family: 'Press Start 2P'; font-size: 0.78rem;">TERMINATE SESSION</span>
                </button>
            </div>
          </div>
        `;
        openRetroModal(modalHTML, 'MODULE_SPEC_v2.5');
      }
    });
  });
}

/**
 * TELEMETRY TOGGLES
 */
function initDashboardToggles() {
  document.querySelectorAll('.toggle-dashboard').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      const targetId = el.getAttribute('data-target')!;
      const target = document.getElementById(targetId)!;
      const monTitle = el.closest('.telemetry-header')?.querySelector('h3')?.innerText || 'DASHBOARD';
      const iframeUrl = target.querySelector('iframe')?.src || '';

      if (window.innerWidth <= 768) {
        openRetroModal(`<iframe src="${iframeUrl}" title="${monTitle}" style="width: 100%; height: 80vh; border: none;"></iframe>`, monTitle);
        return;
      }

      if (target.style.display === 'none') {
        target.style.display = 'block';
        el.innerText = '[ OCULTAR ]';
        el.classList.replace('is-primary', 'is-error');
      } else {
        target.style.display = 'none';
        el.innerText = '[ DESPLEGAR ]';
        el.classList.replace('is-error', 'is-primary');
      }
    });
  });
}

/**
 * MODAL CLOSE
 */
function initModalLogic() {
  document.getElementById('mc-modal-close')?.addEventListener('click', closeRetroModal);
}

/**
 * DOSSIER INTERACTIVITY
 */
function initDossierInteractivity() {
  const dossierView = document.getElementById('dossier-view');
  if (!dossierView) return;

  // Tabs
  dossierView.querySelectorAll('#ecosystem-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target')!;
      dossierView.querySelectorAll('#ecosystem-tabs .tab-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      dossierView.querySelectorAll('.tab-content').forEach(c => c.classList.remove('is-active'));
      document.getElementById(targetId)?.classList.add('is-active');
    });
  });

  // Sidebar highlight
  const navLinks = dossierView.querySelectorAll('.dossier-sidebar .nav-link');
  const sections = dossierView.querySelectorAll('.dossier-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
      }
    });
  }, { root: dossierView, rootMargin: '-10% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
  window.scrollTo(0, 0);
}

// Initial Boot
render();
window.scrollTo(0, 0);
setTimeout(() => window.scrollTo(0, 0), 100);
