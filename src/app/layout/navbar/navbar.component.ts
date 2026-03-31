import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="navbar">
      <div class="navbar-inner">
        <a routerLink="/" class="logo">
          <span class="logo-text">Door To Rosary</span>
          <span class="logo-mark">✦</span>
        </a>
        <nav class="desktop-nav">
          <a routerLink="/"        routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
          <a routerLink="/shop"    routerLinkActive="active">Shop</a>
          <a routerLink="/customize" routerLinkActive="active">Custom</a>
          <a routerLink="/about"   routerLinkActive="active">About</a>
        </nav>
        <a routerLink="/admin" class="btn btn-sm btn-outline desktop-admin">Admin</a>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      height: var(--top-nav-h);
      background: rgba(250,247,242,0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--clr-sand);
    }
    .navbar-inner {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 0 var(--space-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .logo-text {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 500;
      color: var(--clr-ink);
      letter-spacing: 0.02em;
    }
    .logo-mark {
      color: var(--clr-gold);
      font-size: 0.9rem;
    }
    .desktop-nav {
      display: none;
      gap: var(--space-xl);
    }
    .desktop-nav a {
      font-size: 0.875rem;
      color: var(--clr-taupe);
      text-decoration: none;
      transition: color 0.2s;
      letter-spacing: 0.02em;
    }
    .desktop-nav a:hover,
    .desktop-nav a.active {
      color: var(--clr-ink);
    }
    .desktop-admin { display: none; }

    @media (min-width: 768px) {
      .desktop-nav { display: flex; }
      .desktop-admin { display: inline-flex; }
    }
  `]
})
export class NavbarComponent {}
