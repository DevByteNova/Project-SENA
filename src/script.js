// Dashboard Interactivity
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeNavigation();
    initializeCards();
    initializeTable();
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

// Navigation Header
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.header-menu .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Navigating to ${link.textContent}`);
        });
    });
}

// Page Navigation
function showPage(page) {
    const mainContent = document.querySelector('.main-content');
    
    switch(page) {
        case 'Dashboard':
            location.reload();
            break;
        case 'Analytics':
            showAnalyticsPage();
            break;
        case 'Reports':
            showReportsPage();
            break;
        case 'Users':
            showUsersPage();
            break;
        case 'Settings':
            showSettingsPage();
            break;
    }
}

function showAnalyticsPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Analytics</h1>
            <p>View your detailed analytics and insights</p>
        </div>
        <section class="cards-grid">
            <div class="card">
                <div class="card-header">Page Views</div>
                <div class="card-value">52,847</div>
                <div class="card-footer">+24% from last week</div>
            </div>
            <div class="card">
                <div class="card-header">Bounce Rate</div>
                <div class="card-value">32.5%</div>
                <div class="card-footer">-5% improvement</div>
            </div>
            <div class="card">
                <div class="card-header">Avg. Duration</div>
                <div class="card-value">4m 23s</div>
                <div class="card-footer">+12% from last week</div>
            </div>
            <div class="card">
                <div class="card-header">Click Rate</div>
                <div class="card-value">8.7%</div>
                <div class="card-footer">+3% from last week</div>
            </div>
        </section>
    `;
}

function showReportsPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Reports</h1>
            <p>Generate and view detailed reports</p>
        </div>
        <div class="charts-section">
            <div class="chart-container">
                <h2>Monthly Revenue Report</h2>
                <div class="placeholder">
                    <p>Revenue chart would be displayed here</p>
                </div>
            </div>
            <div class="chart-container">
                <h2>Growth Metrics</h2>
                <div class="placeholder">
                    <p>Growth chart would be displayed here</p>
                </div>
            </div>
        </div>
    `;
}

function showUsersPage() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Users</h1>
            <p>Manage and view all users</p>
        </div>
        <section class="table-section">
            <h2>All Users</h2>
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Join Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#U001</td>
                        <td>John Smith</td>
                        <td>john@example.com</td>
                        <td>Jan 15, 2025</td>
                        <td><span class="badge-success">Active</span></td>
                    </tr>
                    <tr>
                        <td>#U002</td>
                        <td>Jane Doe</td>
                        <td>jane@example.com</td>
                        <td>Feb 20, 2025</td>
                        <td><span class="badge-success">Active</span></td>
                    </tr>
                    <tr>
                        <td>#U003</td>
                        <td>Bob Johnson</td>
                        <td>bob@example.com</td>
                        <td>Mar 5, 2026</td>
                        <td><span class="badge-pending">Inactive</span></td>
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
            <h1>Settings</h1>
            <p>Manage your dashboard settings</p>
        </div>
        <section style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 1.5rem; color: #111827;">Preferences</h2>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Theme</label>
                <select style="padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; width: 100%; max-width: 300px;">
                    <option>Dark Mode</option>
                    <option selected>Light Mode</option>
                </select>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Notifications</label>
                <input type="checkbox" checked /> Enable email notifications
            </div>
            <button style="background-color: #a855f7; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Save Settings</button>
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
    alert(`Viewing details for: ${cardName}`);
}

// Table Row Interaction
function initializeTable() {
    const rows = document.querySelectorAll('.dashboard-table tbody tr');
    
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const id = row.querySelector('td').textContent;
            alert(`Transaction selected: ${id}`);
        });
        
        row.style.cursor = 'pointer';
    });
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
console.log('%c Dashboard Ready!', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('Try clicking on sidebar items, cards, and table rows for interactive features!');
