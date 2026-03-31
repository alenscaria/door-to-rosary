import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
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
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="page-content">
      <div class="container">

        <a routerLink="/shop" class="back-link">← Back to shop</a>

        @if (product()) {
          <div class="detail-layout fade-up">
            <!-- Image area -->
            <div class="detail-img" [style.background]="imgBg()">
              <span class="detail-icon">{{ icon() }}</span>
              @for (tag of product()!.tags; track tag) {
                <span class="badge badge-gold detail-tag">{{ tag }}</span>
              }
            </div>

            <!-- Info -->
            <div class="detail-info">
              <p class="section-eyebrow">{{ product()!.category | titlecase }}</p>
              <h1 class="detail-title">{{ product()!.name }}</h1>
              <p class="detail-desc">{{ product()!.description }}</p>

              <div class="divider"></div>

              <div class="detail-actions">
                <button class="btn btn-wa btn-full" (click)="orderWhatsApp()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 2C6.48 2 2 6.481 2 12c0 1.958.56 3.777 1.512 5.329L2 22l4.809-1.492A9.942 9.942 0 0012 22c5.52 0 10-4.48 10-10S17.519 2 12 2z" opacity=".4"/></svg>
                  Enquire on WhatsApp
                </button>
                <a routerLink="/customize" class="btn btn-outline btn-full">Customise this style</a>
              </div>

              <p class="detail-note">
                All pieces are handmade to order. Delivery time is 3–7 working days.
              </p>
            </div>
          </div>
        } @else {
          <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>Product not found</h3>
            <a routerLink="/shop" class="btn btn-primary">Browse shop</a>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .back-link {
      display: inline-block;
      padding: var(--space-md) 0 var(--space-sm);
      font-size: 0.85rem;
      color: var(--clr-taupe);
      text-decoration: none;
    }
    .back-link:hover { color: var(--clr-ink); }

    .detail-layout {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
      padding-bottom: var(--space-2xl);
    }
    @media (min-width: 768px) {
      .detail-layout { flex-direction: row; gap: var(--space-2xl); }
    }

    .detail-img {
      border-radius: var(--radius-xl);
      min-height: 260px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      flex-shrink: 0;
      flex: 1;
    }
    @media (min-width: 768px) {
      .detail-img { width: 340px; flex: none; min-height: 380px; }
    }
    .detail-icon { font-size: 5rem; }
    .detail-tag {
      position: absolute;
      top: 16px; left: 16px;
    }
    .detail-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .detail-title {
      font-size: clamp(1.8rem, 5vw, 2.5rem);
      margin: 4px 0;
    }
    .detail-desc {
      font-size: 0.95rem;
      line-height: 1.8;
      color: var(--clr-bark);
    }
    .detail-actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    .detail-note {
      font-size: 0.78rem;
      color: var(--clr-warm-gray);
      text-align: center;
      margin: 0;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product = signal<Product | undefined>(undefined);

  icon()   { return CATEGORY_ICONS[this.product()?.category ?? ''] ?? '📦'; }
  imgBg()  { return CATEGORY_BG[this.product()?.category ?? '']   ?? '#f5f5f0'; }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(id).subscribe(p => this.product.set(p));
  }

  orderWhatsApp() {
    const p = this.product();
    if (!p) return;
    const msg = encodeURIComponent(`Hi! I'm interested in ordering: *${p.name}*. Could you please share more details?`);
    window.open(`https://wa.me/+91XXXXXXXXXX?text=${msg}`, '_blank');
  }
}
