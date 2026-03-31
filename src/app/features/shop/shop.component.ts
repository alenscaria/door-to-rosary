import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product, ProductCategory } from '../../core/models/product.model';

const ALL_CATEGORIES = [
  { slug: '',              label: 'All' },
  { slug: 'rosary',        label: 'Rosaries' },
  { slug: 'bracelet',      label: 'Bracelets' },
  { slug: 'komboskini',    label: 'Komboskini' },
  { slug: 'macrame',       label: 'Macrame' },
  { slug: 'keychain',      label: 'Keychains' },
  { slug: 'return-gift',   label: 'Return Gifts' },
];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, CommonModule, ProductCardComponent],
  template: `
    <div class="page-content">
      <div class="container">

        <!-- Header -->
        <div class="shop-header fade-up">
          <div>
            <p class="section-eyebrow">Browse</p>
            <h1 class="shop-title">All products</h1>
          </div>
          <p class="shop-sub">Handcrafted rosaries, bracelets &amp; gifts</p>
        </div>

        <!-- Filter pills -->
        <div class="filter-row fade-up fade-up-delay-1">
          @for (cat of categories; track cat.slug) {
            <button
              class="chip"
              [class.selected]="activeCategory() === cat.slug"
              (click)="setCategory(cat.slug)">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Results -->
        @if (filtered().length) {
          <div class="products-grid">
            @for (product of filtered(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        } @else {
          <div class="empty-state">
            <div class="empty-icon">📦</div>
            <h3>No products found</h3>
            <p>Try a different category or check back soon.</p>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .shop-header {
      padding: var(--space-lg) 0 var(--space-md);
    }
    .shop-title {
      font-size: clamp(1.8rem, 5vw, 3rem);
      margin: 4px 0 8px;
    }
    .shop-sub {
      font-size: 0.875rem;
      color: var(--clr-taupe);
      margin: 0;
    }
    .filter-row {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: var(--space-md);
      scrollbar-width: none;
      margin-bottom: var(--space-md);
    }
    .filter-row::-webkit-scrollbar { display: none; }
    .filter-row .chip { flex-shrink: 0; }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-md);
      padding-bottom: var(--space-lg);
    }
    @media (min-width: 600px) {
      .products-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 900px) {
      .products-grid { grid-template-columns: repeat(4, 1fr); }
    }
  `]
})
export class ShopComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  categories = ALL_CATEGORIES;
  activeCategory = signal<string>('');
  allProducts = signal<Product[]>([]);

  filtered = computed(() => {
    const cat = this.activeCategory();
    return cat
      ? this.allProducts().filter(p => p.category === cat)
      : this.allProducts();
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.activeCategory.set(params['category']);
    });
    this.productService.getAll().subscribe(p => this.allProducts.set(p));
  }

  setCategory(slug: string) {
    this.activeCategory.set(slug);
  }
}
