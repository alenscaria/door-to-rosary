import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-wrap">

      <!-- Sidebar (desktop) -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span class="logo-text">Door To Rosary</span>
          <span class="logo-badge">Admin</span>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/admin/products" routerLinkActive="active" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Products
          </a>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="sidebar-link muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>
            View site
          </a>
        </div>
      </aside>

      <!-- Mobile top bar -->
      <div class="admin-mobile-bar">
        <span class="logo-text" style="font-family: var(--font-display); font-size:1.1rem;">Door To Rosary Admin</span>
        <div class="mobile-nav-pills">
          <a routerLink="/admin/products" routerLinkActive="active" class="pill">Products</a>
          <a routerLink="/" class="pill">← Site</a>
        </div>
      </div>

      <!-- Main content -->
      <main class="admin-content">
        <router-outlet />
      </main>

    </div>
  `,
  styles: [`
    .admin-wrap {
      display: flex;
      min-height: 100vh;
      background: var(--clr-parchment);
    }

    /* Sidebar */
    .sidebar {
      width: 220px;
      background: var(--clr-ink);
      flex-shrink: 0;
      display: none;
      flex-direction: column;
      padding: var(--space-lg) 0;
      position: sticky;
      top: 0;
      height: 100vh;
    }
    @media (min-width: 768px) {
      .sidebar { display: flex; }
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 var(--space-lg) var(--space-xl);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      margin-bottom: var(--space-lg);
    }
    .logo-text {
      font-family: var(--font-display);
      font-size: 1.2rem;
      color: var(--clr-cream);
    }
    .logo-badge {
      font-size: 0.65rem;
      background: var(--clr-gold);
      color: white;
      padding: 2px 7px;
      border-radius: var(--radius-pill);
      letter-spacing: 0.06em;
      font-weight: 500;
    }
    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 var(--space-sm);
      gap: 2px;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px var(--space-md);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: rgba(250,247,242,0.6);
      text-decoration: none;
      transition: all 0.15s;
    }
    .sidebar-link svg { width: 18px; height: 18px; flex-shrink: 0; }
    .sidebar-link:hover { background: rgba(255,255,255,0.08); color: var(--clr-cream); }
    .sidebar-link.active { background: rgba(255,255,255,0.12); color: var(--clr-cream); }
    .sidebar-link.muted { color: rgba(250,247,242,0.35); }
    .sidebar-footer {
      padding: var(--space-md) var(--space-sm) 0;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    /* Mobile bar */
    .admin-mobile-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px var(--space-md);
      background: var(--clr-ink);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    @media (min-width: 768px) {
      .admin-mobile-bar { display: none; }
    }
    .mobile-nav-pills { display: flex; gap: 6px; }
    .pill {
      font-size: 0.78rem;
      padding: 5px 12px;
      border-radius: var(--radius-pill);
      border: 1px solid rgba(255,255,255,0.2);
      color: rgba(250,247,242,0.7);
      text-decoration: none;
      transition: all 0.15s;
    }
    .pill.active, .pill:hover {
      background: rgba(255,255,255,0.12);
      color: var(--clr-cream);
    }

    /* Main */
    .admin-content {
      flex: 1;
      padding: var(--space-xl) var(--space-lg);
      overflow-y: auto;
    }
    @media (max-width: 767px) {
      .admin-content { padding: var(--space-md); }
    }
  `]
})
export class AdminShellComponent {}
