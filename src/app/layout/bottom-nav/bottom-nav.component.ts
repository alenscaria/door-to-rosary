import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="bnav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        <span>Home</span>
      </a>
      <a routerLink="/shop" routerLinkActive="active" class="bnav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span>Shop</span>
      </a>
      <a routerLink="/customize" routerLinkActive="active" class="bnav-item bnav-center">
        <div class="bnav-center-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
        </div>
        <span>Custom</span>
      </a>
      <a routerLink="/about" routerLinkActive="active" class="bnav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>About</span>
      </a>
      <a routerLink="/admin" routerLinkActive="active" class="bnav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <span>Admin</span>
      </a>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: var(--bottom-nav-h);
      background: rgba(250,247,242,0.96);
      backdrop-filter: blur(12px);
      border-top: 1px solid var(--clr-sand);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 100;
      padding: 0 var(--space-sm);
      padding-bottom: env(safe-area-inset-bottom, 0);
    }
    .bnav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      flex: 1;
      text-decoration: none;
      color: var(--clr-warm-gray);
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      padding: 6px 0;
      transition: color 0.2s;
    }
    .bnav-item svg {
      width: 22px; height: 22px;
    }
    .bnav-item.active {
      color: var(--clr-ink);
    }
    .bnav-center { position: relative; }
    .bnav-center-btn {
      width: 44px; height: 44px;
      background: var(--clr-ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -18px;
      box-shadow: 0 4px 12px rgba(26,18,9,0.25);
    }
    .bnav-center-btn svg {
      width: 20px; height: 20px;
      stroke: var(--clr-cream);
    }
    .bnav-center.active .bnav-center-btn {
      background: var(--clr-gold);
    }

    @media (min-width: 768px) {
      .bottom-nav { display: none; }
    }
  `]
})
export class BottomNavComponent {}
