import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';

const CATEGORY_ICONS: Record<string, string> = {
  'rosary': '📿', 'bracelet': '🪬', 'komboskini': '🧵',
  'macrame': '🎨', 'keychain': '🔑', 'return-gift': '🎁'
};
const CATEGORY_BG: Record<string, string> = {
  'rosary': '#EEEDFE', 'bracelet': '#E1F5EE', 'komboskini': '#F1EFE8',
  'macrame': '#FBEAF0', 'keychain': '#E6F1FB', 'return-gift': '#FAEEDA'
};

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <a [routerLink]="['/shop', product.id]" class="product-card fade-up">
      <div class="product-img" [style.background]="imgBg">
        <span class="product-icon">{{ icon }}</span>
        @if (product.tags.includes('popular')) {
          <span class="badge badge-gold card-badge">Popular</span>
        } @else if (product.tags.includes('new')) {
          <span class="badge badge-green card-badge">New</span>
        } @else if (product.tags.includes('gift')) {
          <span class="badge badge-gray card-badge">Gift</span>
        }
      </div>
      <div class="product-body">
        <p class="product-category">{{ product.category | titlecase }}</p>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-desc">{{ product.description | slice:0:72 }}…</p>
        <div class="product-footer">
          <span class="enquire-link">Enquire →</span>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .product-card {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: var(--radius-lg);
      border: 1px solid var(--clr-sand);
      overflow: hidden;
      text-decoration: none;
      transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
    }
    .product-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }
    .product-img {
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .product-icon { font-size: 2.5rem; }
    .card-badge {
      position: absolute;
      top: 8px; left: 8px;
    }
    .product-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .product-category {
      font-size: 0.68rem;
      color: var(--clr-warm-gray);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 0;
    }
    .product-name {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 500;
      color: var(--clr-ink);
      line-height: 1.3;
    }
    .product-desc {
      font-size: 0.75rem;
      color: var(--clr-taupe);
      line-height: 1.5;
      margin: 2px 0 0;
    }
    .product-footer {
      margin-top: auto;
      padding-top: 10px;
    }
    .enquire-link {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--clr-gold);
      letter-spacing: 0.02em;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  get icon(): string { return CATEGORY_ICONS[this.product.category] ?? '📦'; }
  get imgBg(): string { return CATEGORY_BG[this.product.category] ?? '#f5f5f0'; }
}
