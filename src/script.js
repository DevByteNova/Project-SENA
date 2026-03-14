// Interactividad del panel
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeHeaderNavigation();
    initializeCards();
    initializeTable();
    initializeLogoutButton();
});

// Sidebar Navigation
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Show content based on link text
            const page = link.textContent.trim();
            showPage(page);
        });
    });
}

// Header Navigation
function initializeHeaderNavigation() {
    const navLinks = document.querySelectorAll('.header-menu .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast(`Navegando a: ${link.textContent.trim()}`);
        });
    });
}

// Logout Button
function initializeLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', () => {
        window.location.href = 'login/login.html';
    });
}

// Page Navigation
function showPage(page) {
    switch (page) {
        case 'Panel':
            location.reload();
            break;
        case 'Analíticas':
            showAnalyticsPage();
            break;
        case 'Reportes':
            showReportsPage();
            break;
        case 'Usuarios':
            showUsersPage();
            break;
        case 'Ajustes':
            showSettingsPage();
            break;
        default:
            showToast('Página no disponible');
    }
}

function showAnalyticsPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Analíticas</h1>
            <p>Revisa tus métricas e insights detallados</p>
        </div>
        <section class="cards-grid">
            <div class="card">
                <div class="card-header">Visitas a la página</div>
                <div class="card-value">52,847</div>
                <div class="card-footer">+24% respecto a la semana pasada</div>
            </div>
            <div class="card">
                <div class="card-header">Tasa de rebote</div>
                <div class="card-value">32.5%</div>
                <div class="card-footer">-5% de mejora</div>
            </div>
            <div class="card">
                <div class="card-header">Duración media</div>
                <div class="card-value">4m 23s</div>
                <div class="card-footer">+12% respecto a la semana pasada</div>
            </div>
            <div class="card">
                <div class="card-header">Tasa de clics</div>
                <div class="card-value">8.7%</div>
                <div class="card-footer">+3% respecto a la semana pasada</div>
            </div>
        </section>
    `;
}

function showReportsPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Reportes</h1>
            <p>Genera y consulta reportes detallados</p>
        </div>
        <div class="charts-section">
            <div class="chart-container">
                <h2>Reporte mensual de ingresos</h2>
                <div class="placeholder">
                    <p>Aquí se mostraría el gráfico de ingresos</p>
                </div>
            </div>
            <div class="chart-container">
                <h2>Métricas de crecimiento</h2>
                <div class="placeholder">
                    <p>Aquí se mostraría el gráfico de crecimiento</p>
                </div>
            </div>
        </div>
    `;
}

function showUsersPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Usuarios</h1>
            <p>Gestiona y visualiza todos los usuarios</p>
        </div>
        <section class="table-section">
            <h2>Todos los usuarios</h2>
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Fecha de registro</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#U001</td>
                        <td>John Smith</td>
                        <td>john@example.com</td>
                        <td>15 ene 2025</td>
                        <td><span class="badge-success">Activo</span></td>
                    </tr>
                    <tr>
                        <td>#U002</td>
                        <td>Jane Doe</td>
                        <td>jane@example.com</td>
                        <td>20 feb 2025</td>
                        <td><span class="badge-success">Activo</span></td>
                    </tr>
                    <tr>
                        <td>#U003</td>
                        <td>Bob Johnson</td>
                        <td>bob@example.com</td>
                        <td>05 mar 2026</td>
                        <td><span class="badge-pending">Inactivo</span></td>
                    </tr>
                </tbody>
            </table>
        </section>
    `;
}

function showSettingsPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Ajustes</h1>
            <p>Configura las opciones del panel</p>
        </div>
        <section style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 1.5rem; color: #111827;">Preferencias</h2>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Tema</label>
                <select style="padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; width: 100%; max-width: 300px;">
                    <option>Modo oscuro</option>
                    <option selected>Modo claro</option>
                </select>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Notificaciones</label>
                <input type="checkbox" checked /> Habilitar notificaciones por correo
            </div>
            <button style="background-color: #a855f7; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Guardar ajustes</button>
        </section>
    `;
}

// Cards Hover Effect
function initializeCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const header = card.querySelector('.card-header').textContent;
            showCardDetails(header);
        });

        card.style.cursor = 'pointer';
    });
}

function showCardDetails(cardName) {
    showToast(`Mostrando detalles de: ${cardName}`);
}

// Table Row Interaction
function initializeTable() {
    const rows = document.querySelectorAll('.dashboard-table tbody tr');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            const id = row.querySelector('td').textContent;
            showToast(`Transacción seleccionada: ${id}`);
        });

        row.style.cursor = 'pointer';
    });
}

// Toast helper
function showToast(message, duration = 2300) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Console Welcome
console.log('%c Panel listo!', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('Haz clic en los elementos del sidebar, tarjetas y filas de la tabla para interactuar.');
