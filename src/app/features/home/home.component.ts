import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ProductCardComponent],
  template: `
    <div class="page-content">

      <!-- Hero -->
      <section class="hero">
        <div class="hero-bg-pattern" aria-hidden="true"></div>
        <div class="container">
          <div class="hero-inner fade-up">
            <p class="section-eyebrow">Handcrafted with love</p>
            <h1 class="hero-title">Sacred beads,<br><em>crafted for you</em></h1>
            <p class="hero-sub">
              Rosaries, bracelets, komboskini &amp; macrame gifts —
              each piece made by hand, with intention.
            </p>
            <div class="hero-actions">
              <a routerLink="/shop" class="btn btn-primary">Explore shop</a>
              <a routerLink="/customize" class="btn btn-outline">Design yours ✦</a>
            </div>
          </div>
          <div class="hero-beads" aria-hidden="true">
            @for (bead of heroBeads; track $index) {
              <div class="hero-bead" [style.background]="bead" [style.animation-delay]="$index * 0.05 + 's'"></div>
            }
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="categories-section">
        <div class="container">
          <p class="section-eyebrow fade-up">Browse by type</p>
          <h2 class="section-h fade-up fade-up-delay-1">What are you looking for?</h2>
          <div class="categories-grid">
            @for (cat of categories; track cat.slug) {
              <a [routerLink]="['/shop']" [queryParams]="{category: cat.slug}"
                 class="cat-card fade-up" [style.animation-delay]="cat.delay">
                <div class="cat-icon-wrap" [style.background]="cat.bg">
                  <span>{{ cat.icon }}</span>
                </div>
                <p class="cat-name">{{ cat.name }}</p>
                <p class="cat-sub">{{ cat.sub }}</p>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Featured products -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="section-eyebrow fade-up">Handpicked</p>
              <h2 class="section-h fade-up fade-up-delay-1">Featured pieces</h2>
            </div>
            <a routerLink="/shop" class="view-all fade-up fade-up-delay-2">View all →</a>
          </div>
          <div class="products-grid">
            @for (product of featured(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        </div>
      </section>

      <!-- Custom CTA banner -->
      <section class="container">
        <div class="cta-banner fade-up">
          <div class="cta-content">
            <p class="section-eyebrow">Made just for you</p>
            <h3>Design your own rosary</h3>
            <p>Pick your beads, colours, and cross style. We'll handcraft it especially for you.</p>
            <div class="cta-steps">
              @for (step of steps; track step) {
                <div class="cta-step">
                  <div class="cta-step-dot"></div>
                  <span>{{ step }}</span>
                </div>
                @if (!$last) { <span class="cta-arrow">→</span> }
              }
            </div>
            <a routerLink="/customize" class="btn btn-primary">Start customizing</a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    /* Hero */
    .hero {
      position: relative;
      padding: calc(var(--top-nav-h) + 48px) 0 56px;
      overflow: hidden;
      background: var(--clr-parchment);
    }
    .hero-bg-pattern {
      position: absolute; inset: 0;
      background-image: radial-gradient(circle at 20% 50%, rgba(184,146,42,0.06) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(74,63,48,0.05) 0%, transparent 40%);
      pointer-events: none;
    }
    .hero .container {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }
    .hero-title {
      font-size: clamp(2.4rem, 8vw, 4rem);
      line-height: 1.1;
      margin: var(--space-sm) 0 var(--space-md);
    }
    .hero-title em {
      font-style: italic;
      color: var(--clr-gold);
    }
    .hero-sub {
      font-size: 0.95rem;
      color: var(--clr-bark);
      max-width: 340px;
      margin-bottom: var(--space-lg);
      line-height: 1.7;
    }
    .hero-actions {
      display: flex;
      gap: var(--space-md);
      flex-wrap: wrap;
    }
    .hero-beads {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: var(--space-md) 0;
    }
    .hero-bead {
      width: 20px; height: 20px;
      border-radius: 50%;
      animation: fadeUp 0.5s var(--ease) both;
      opacity: 0.85;
    }

    /* Categories */
    .categories-section {
      padding: var(--space-xl) 0;
    }
    .section-h {
      font-size: clamp(1.3rem, 4vw, 2rem);
      margin-bottom: var(--space-lg);
    }
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
    }
    @media (min-width: 480px) {
      .categories-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 768px) {
      .categories-grid { grid-template-columns: repeat(6, 1fr); gap: var(--space-md); }
    }
    .cat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: var(--space-md) var(--space-sm);
      background: white;
      border: 1px solid var(--clr-sand);
      border-radius: var(--radius-lg);
      text-decoration: none;
      transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
      text-align: center;
    }
    .cat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }
    .cat-icon-wrap {
      width: 44px; height: 44px;
      border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
    }
    .cat-name {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--clr-ink);
      margin: 0;
    }
    .cat-sub {
      font-size: 0.68rem;
      color: var(--clr-warm-gray);
      margin: 0;
    }

    /* Featured */
    .featured-section {
      padding: var(--space-xl) 0;
      background: var(--clr-parchment);
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: var(--space-lg);
    }
    .view-all {
      font-size: 0.85rem;
      color: var(--clr-gold);
      text-decoration: none;
      font-weight: 500;
      white-space: nowrap;
      padding-bottom: 4px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-md);
    }
    @media (min-width: 768px) {
      .products-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 1100px) {
      .products-grid { grid-template-columns: repeat(4, 1fr); }
    }

    /* CTA Banner */
    .cta-banner {
      background: var(--clr-ink);
      border-radius: var(--radius-xl);
      padding: var(--space-xl) var(--space-lg);
      margin-bottom: var(--space-xl);
    }
    .cta-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .cta-content .section-eyebrow { color: var(--clr-gold-light); }
    .cta-content h3 {
      font-size: clamp(1.3rem, 4vw, 2rem);
      color: var(--clr-cream);
    }
    .cta-content p {
      color: var(--clr-warm-gray);
      font-size: 0.9rem;
      max-width: 340px;
    }
    .cta-steps {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex-wrap: wrap;
    }
    .cta-step {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: var(--clr-sand);
    }
    .cta-step-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--clr-gold);
    }
    .cta-arrow { color: var(--clr-taupe); font-size: 0.75rem; }
  `]
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  featured = this.productService.featured;

  heroBeads = [
    '#b8922a','#7F77DD','#1D9E75','#D4537E','#378ADD',
    '#EF9F27','#E24B4A','#b8922a','#AFA9EC','#9FE1CB',
  ];

  categories = [
    { slug: 'rosary',       name: 'Rosaries',     sub: '12 styles',  icon: '📿', bg: '#EEEDFE', delay: '0.05s' },
    { slug: 'bracelet',     name: 'Bracelets',    sub: '8 styles',   icon: '🪬', bg: '#E1F5EE', delay: '0.10s' },
    { slug: 'komboskini',   name: 'Komboskini',   sub: 'Prayer rope',icon: '🧵', bg: '#F1EFE8', delay: '0.15s' },
    { slug: 'macrame',      name: 'Macrame',      sub: 'Crafts',     icon: '🎨', bg: '#FBEAF0', delay: '0.20s' },
    { slug: 'keychain',     name: 'Keychains',    sub: 'Keepsakes',  icon: '🔑', bg: '#E6F1FB', delay: '0.25s' },
    { slug: 'return-gift',  name: 'Return Gifts', sub: 'All occasions',icon:'🎁',bg: '#FAEEDA', delay: '0.30s' },
  ];

  steps = ['Pick beads', 'Choose color', 'Select cross', 'Order via WhatsApp'];

  ngOnInit() {}
}
