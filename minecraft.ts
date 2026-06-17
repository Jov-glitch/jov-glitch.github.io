/* =========================================================================
   MINECRAFT FRAMEWORK (mock)
   ========================================================================= */
import './styles/main.scss';
import './styles/minecraft-framework.css';
import './styles/minecraft-page.scss';
import { minecraftEvent } from './data';

// Clase especial para el body
document.body.classList.add('mc-page-body');

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
<div class="retro-monitor">
    <div class="mc-retro-viewport">
        <!-- HEADER -->
        <header class="block fixed with-title mc-header-new" style="--block-accent-color: #3b4252; --block-shadow-color: #000;">
            <h2 class="title">SERVER_CONTROL_PANEL: ~</h2>
            
            <div class="mc-header-layout">
                <!-- PANEL IZQUIERDO: IP & STATUS CMD -->
                <div class="mc-header-left">
                    <div class="block accent mc-ip-display-block" style="--block-accent-color: #4CAF50; --block-shadow-color: #1b5e20;">
                        <p class="mc-prompt">
                            <span class="mc-prompt-arrow">➜</span>
                            <span class="mc-prompt-tilde">~</span>
                            <span class="mc-prompt-cmd">connect --node</span>
                        </p>
                        <h1 class="mc-server-ip-title">
                           ${minecraftEvent.serverIp.toUpperCase()}
                        </h1>
                        <div class="mc-status-badge">
                            <span id="live-status-dot" class="status-dot"></span>
                            <span id="live-status-text">${minecraftEvent.active ? 'ESCANER DE RED...' : 'EVENTO CERRADO'}</span>
                        </div>
                    </div>
                </div>

                <!-- PANEL DERECHO: MINI STATS -->
                <div class="mc-header-right">
                    <div class="mc-stats-grid">
                        <div class="block accent mc-stat-card" style="--block-accent-color: #3182ce; --block-shadow-color: #2c5282;">
                            <span class="stat-label">VERSION</span>
                            <p id="live-version" class="stat-value">${minecraftEvent.active ? 'cargando....' : 'ARCHIVED'}</p>
                        </div>
                        <div class="block accent mc-stat-card" style="--block-accent-color: #9f7aea; --block-shadow-color: #6b46c1;">
                            <span class="stat-label">PLAYERS</span>
                            <p id="live-players" class="stat-value">${minecraftEvent.active ? 'cargando....' : '0 / 0'}</p>
                        </div>
                        <div class="block accent mc-stat-card" style="--block-accent-color: #795548; --block-shadow-color: #4e342e;">
                            <span class="stat-label">ACCESS</span>
                            <p class="stat-value">${minecraftEvent.active ? 'PUBLIC' : 'ARCHIVE'}</p>
                        </div>
                    </div>
                    
                    <div class="mc-header-actions">
                        <button id="logout-btn" class="block fixed accent mc-exit-btn" 
                                style="--block-accent-color: #ff4757; --block-shadow-color: #c0392b;">
                            <span class="mc-power-icon">⏻</span> TERMINATE_SESSION
                        </button>
                    </div>
                </div>
            </div>
        </header>

        ${minecraftEvent.active ? '' : `
        <section class="mc-styled-card">
            <div class="mc-card-header-gray"><h2 class="mc-card-title">📦 Archivo del evento</h2></div>
            <div class="mc-card-body">
                <h4 class="mc-modpack-desc">${minecraftEvent.closingDescription}</h4>
                <div class="mc-access-status" style="margin-top: 1.5rem;">
                    <span class="status-indicator"></span>
                    <span class="status-text">CERRADO CON AGRADECIMIENTO</span>
                </div>
            </div>
        </section>
        `}

        <div class="mc-card-container">

            <!-- BLUEMAP -->
            <section class="mc-styled-card">
                <div class="mc-card-header-blue mc-map-header">
                    <h2 class="mc-card-title">🌍 Mapa Global 3D</h2>
                    <a href="${minecraftEvent.mapLink}" target="_blank" class="button button-normal mc-map-expand-btn">[ EXPANDIR PANTALLA ]</a>
                </div>
                <div class="block fixed mc-map-container" style="--block-accent-color: #3b4252; --block-shadow-color: #000; padding: 0;">
                    <iframe src="${minecraftEvent.mapLink}" title="Mapa 3D" loading="lazy"></iframe>
                </div>
            </section>

            <!-- MODPACK -->
            <section class="mc-styled-card">
                <div class="mc-card-header-purple"><h2 class="mc-card-title">📦 Paquete de Mods Oficial</h2></div>
                <div class="mc-card-body mc-modpack-body">
                    <h4 class="mc-modpack-desc">${minecraftEvent.modpack.description}</h4>
                    <a href="${minecraftEvent.modpack.link}" target="_blank" class="button button-secondary mc-modpack-btn">[ DESCARGAR MODPACK .ZIP ]</a>
                    <div class="mc-modpack-guide" style="margin-top: 3rem;">
                        <h4 class="guide-title">🚀 Guía de Instalación Quick-Start:</h4>
                        <ul class="guide-list">
                            <li>${minecraftEvent.modpack.instructions}</li>
                            <li>Importa el .zip directamente en la interfaz principal de Prism Launcher.</li>
                            <li>Usa la tecla <strong class="guide-key">'V'</strong> para configurar el chat de proximidad dentro del mundo.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- IP ADDRESS -->
            <section class="mc-styled-card mc-access-card">
                <div class="mc-card-header-green"><h2 class="mc-card-title">🎮 Acceso al Servidor</h2></div>
                <div class="mc-card-body mc-access-body">
                    <div class="mc-access-info">
                        <div class="mc-access-desc">${minecraftEvent.aboutEvent}</div>
                        
                        <div class="mc-access-status">
                            <span class="status-indicator"></span>
                            <span class="status-text">PUERTO POR DEFECTO: 25565 // JAVA EDITION</span>
                        </div>
                    </div>

                    <div id="copy-ip" class="block fixed accent mc-ip-block" style="--block-accent-color: #4CAF50; --block-shadow-color: #1b5e20;">
                        <div class="ip-block-header">
                            <span class="terminal-symbol">➜</span>
                            <p id="copy-status" class="mc-copy-status-text">NODE_ADDRESS_STABLE</p>
                        </div>
                        <h3 class="mc-ip-text">${minecraftEvent.serverIp}</h3>
                        <div class="mc-copy-hint-wrapper">
                            <span class="mc-copy-hint">[ CLICK PARA VINCULAR AL PORTAPAPELES ]</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- NORMAS & INFRAESTRUCTURA -->
            <div class="mc-rules-infra-grid">
                <section class="mc-styled-card">
                    <div class="mc-card-header-brown"><h2 class="mc-card-title">📜 Normas</h2></div>
                    <div class="mc-card-body">
                        <ul class="nes-list is-disc mc-rules-list">
                            ${minecraftEvent.rules.map(r => `<li class="rule-item"><strong class="rule-title">${r.title}:</strong> <span class="rule-desc">${r.desc}</span></li>`).join('')}
                        </ul>
                    </div>
                </section>
                <section class="mc-styled-card">
                    <div class="mc-card-header-gray"><h2 class="mc-card-title">🔌 Infraestructura</h2></div>
                    <div class="mc-card-body mc-infra-body">
                        <div class="mc-infra-list">
                          ${minecraftEvent.architecture.map(a => `
                            <div class="mc-infra-item">
                                <h3 class="infra-item-title">${a.title}</h3>
                                <ul class="infra-detail-list">
                                    ${a.details.map(d => `<li class="infra-detail-item">${d}</li>`).join('')}
                                </ul>
                            </div>
                          `).join('')}
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
        <footer class="mc-footer" style="margin-top: 3rem;">
          Terminal Jvega // Project: Minecraft Hub // 2026
        </footer>
    </div>
</div>

<!-- RETRO MODAL FOR IFRAMES -->
<div id="mc-iframe-modal" class="mc-modal">
    <div class="mc-modal-content">
        <div class="mc-modal-header">
            <h4 class="mc-modal-title" id="mc-modal-title">BROWSER_NODE_VIEWER</h4>
            <button class="mc-modal-close" id="mc-modal-close">X</button>
        </div>
        <div class="mc-modal-body">
            <iframe id="mc-modal-iframe" src=""></iframe>
        </div>
    </div>
</div>
`;

// LIVE API LOGIC
const fetchServerStatus = async () => {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/mc.jessvega.me');
        const data = await response.json();

        const statusDot = document.getElementById('live-status-dot');
        const statusText = document.getElementById('live-status-text');
        const versionEl = document.getElementById('live-version');
        const playersEl = document.getElementById('live-players');

        if (data.online) {
            if (statusDot) statusDot.style.background = '#4CAF50';
            if (statusText) {
                statusText.innerText = 'STATUS: ONLINE';
                statusText.style.color = '#4CAF50';
            }
            if (versionEl) versionEl.innerText = data.version || '1.21.1';
            if (playersEl) playersEl.innerText = `${data.players.online} / ${data.players.max}`;
        } else {
            if (statusDot) statusDot.style.background = '#ff4757';
            if (statusText) {
                statusText.innerText = 'STATUS: OFFLINE';
                statusText.style.color = '#ff4757';
            }
        }
    } catch (err) {
        console.error('Error fetching server status:', err);
        const statusText = document.getElementById('live-status-text');
        if (statusText) statusText.innerText = 'STATUS: ERROR';
    }
};

if (minecraftEvent.active) {
    fetchServerStatus();
}

// COPIADO
const copyBlock = document.getElementById('copy-ip');
const copyStatus = document.getElementById('copy-status');
let isCopying = false;
if (copyBlock && copyStatus) {
    copyBlock.addEventListener('click', () => {
        if (isCopying) return;
        isCopying = true;

        document.body.classList.add('mc-copying-active');

        navigator.clipboard.writeText(minecraftEvent.serverIp).then(() => {
            const originalText = copyStatus.innerText;
            copyStatus.innerText = '◈ ENLACE VINCULADO ◈';
            setTimeout(() => {
                copyStatus.innerText = originalText;
                document.body.classList.remove('mc-copying-active');
                isCopying = false;
            }, 3000);
        });
    });
}

// === PAGE EXIT ANIMATION — LOGOUT → Main Portfolio ===
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        document.body.classList.add('mc-page-exiting');
        setTimeout(() => {
            window.location.href = '/';
        }, 480);
    });
}

// === MODAL LOGIC ===
const modal = document.getElementById('mc-iframe-modal');
const modalIframe = document.getElementById('mc-modal-iframe') as HTMLIFrameElement;
const modalTitle = document.getElementById('mc-modal-title');
const modalClose = document.getElementById('mc-modal-close');

const openIframeModal = (url: string, title: string) => {
    if (modal && modalIframe && modalTitle) {
        modalIframe.src = url;
        modalTitle.innerText = title;
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }
};

const closeIframeModal = () => {
    if (modal && modalIframe) {
        modal.classList.remove('is-active');
        modalIframe.src = '';
        document.body.style.overflow = '';
    }
};

if (modalClose) modalClose.addEventListener('click', closeIframeModal);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeIframeModal();
    });
}

// Map Expand Button Logic
const mapExpandBtn = document.querySelector('.mc-map-expand-btn');
if (mapExpandBtn) {
    mapExpandBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            openIframeModal(minecraftEvent.mapLink, 'WORLD_MAP_NODE: 3D_RENDER');
        }
    });
}

const mapContainer = document.querySelector('.mc-map-container');
if (mapContainer) {
    mapContainer.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            openIframeModal(minecraftEvent.mapLink, 'WORLD_MAP_NODE: 3D_RENDER');
        }
    });
}
