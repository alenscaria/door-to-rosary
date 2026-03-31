import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { Product } from '../../../core/models/product.model';

const CATEGORY_ICONS: Record<string, string> = {
  'rosary': '📿', 'bracelet': '🪬', 'komboskini': '🧵',
  'macrame': '🎨', 'keychain': '🔑', 'return-gift': '🎁'
};

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="admin-page">

      <!-- Page header -->
      <div class="page-hdr">
        <div>
          <h2 class="admin-title">Products</h2>
          <p class="admin-sub">{{ products().length }} items in catalogue</p>
        </div>
        <a routerLink="/admin/products/new" class="btn btn-primary">+ Add product</a>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-card">
          <p class="stat-label">Total</p>
          <p class="stat-val">{{ products().length }}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">Featured</p>
          <p class="stat-val">{{ featuredCount() }}</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">Available</p>
          <p class="stat-val">{{ availableCount() }}</p>
        </div>
      </div>

      <!-- Table -->
      @if (products().length) {
        <div class="table-wrap">
          <table class="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th class="hide-sm">Category</th>
                <th>Status</th>
                <th class="hide-sm">Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (product of products(); track product.id) {
                <tr>
                  <td>
                    <div class="product-cell">
                      <div class="product-thumb">{{ ICONS[product.category] }}</div>
                      <div>
                        <p class="product-name-cell">{{ product.name }}</p>
                        <p class="product-tags">{{ product.tags.join(', ') }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="hide-sm">
                    <span class="badge badge-gray">{{ product.category }}</span>
                  </td>
                  <td>
                    <span class="badge" [class]="product.isAvailable ? 'badge-green' : 'badge-red'">
                      {{ product.isAvailable ? 'Available' : 'Unavailable' }}
                    </span>
                  </td>
                  <td class="hide-sm">
                    <span class="badge" [class]="product.isFeatured ? 'badge-gold' : 'badge-gray'">
                      {{ product.isFeatured ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td>
                    <div class="action-btns">
                      <a [routerLink]="['/admin/products/edit', product.id]" class="btn btn-ghost btn-sm">Edit</a>
                      <button class="btn btn-danger btn-sm" (click)="confirmDelete(product)">Delete</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <h3>No products yet</h3>
          <p>Add your first product to get started.</p>
          <a routerLink="/admin/products/new" class="btn btn-primary">Add product</a>
        </div>
      }

      <!-- Delete confirm modal -->
      @if (deleteTarget()) {
        <div class="modal-overlay" (click)="cancelDelete()">
          <div class="modal" (click)="$event.stopPropagation()">
            <h3>Delete product?</h3>
            <p>Are you sure you want to delete <strong>{{ deleteTarget()!.name }}</strong>? This cannot be undone.</p>
            <div class="modal-actions">
              <button class="btn btn-outline" (click)="cancelDelete()">Cancel</button>
              <button class="btn btn-danger" (click)="doDelete()">Yes, delete</button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .admin-page { max-width: 900px; }
    .page-hdr {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-lg);
      gap: var(--space-md);
    }
    .admin-title {
      font-size: clamp(1.4rem, 3vw, 2rem);
      margin-bottom: 4px;
    }
    .admin-sub { font-size: 0.85rem; color: var(--clr-taupe); margin: 0; }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
      margin-bottom: var(--space-xl);
    }
    .stat-card {
      background: white;
      border-radius: var(--radius-lg);
      border: 1px solid var(--clr-sand);
      padding: var(--space-md);
      text-align: center;
    }
    .stat-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--clr-warm-gray);
      margin-bottom: 4px;
    }
    .stat-val { font-size: 1.8rem; font-family: var(--font-display); color: var(--clr-ink); margin: 0; }

    .table-wrap {
      background: white;
      border-radius: var(--radius-lg);
      border: 1px solid var(--clr-sand);
      overflow: hidden;
      overflow-x: auto;
    }
    .product-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .product-table thead {
      background: var(--clr-parchment);
      border-bottom: 1px solid var(--clr-sand);
    }
    .product-table th {
      text-align: left;
      padding: 10px 16px;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--clr-taupe);
      font-weight: 500;
      white-space: nowrap;
    }
    .product-table td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--clr-sand);
      vertical-align: middle;
    }
    .product-table tbody tr:last-child td { border-bottom: none; }
    .product-table tbody tr:hover td { background: var(--clr-cream); }

    .product-cell { display: flex; align-items: center; gap: 10px; }
    .product-thumb {
      width: 38px; height: 38px;
      border-radius: var(--radius-md);
      background: var(--clr-parchment);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    .product-name-cell { font-weight: 500; color: var(--clr-ink); margin: 0; font-size: 0.875rem; }
    .product-tags { font-size: 0.72rem; color: var(--clr-warm-gray); margin: 2px 0 0; }
    .action-btns { display: flex; gap: 6px; }

    @media (max-width: 600px) {
      .hide-sm { display: none; }
    }

    /* Modal */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(26,18,9,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 200;
      padding: var(--space-md);
    }
    .modal {
      background: white;
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      max-width: 380px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .modal h3 { font-size: 1.2rem; }
    .modal p { font-size: 0.9rem; color: var(--clr-bark); margin: 0; }
    .modal strong { color: var(--clr-ink); }
    .modal-actions { display: flex; gap: var(--space-sm); justify-content: flex-end; margin-top: var(--space-sm); }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private toast = inject(ToastService);

  products = signal<Product[]>([]);
  deleteTarget = signal<Product | null>(null);
  ICONS = CATEGORY_ICONS;

  featuredCount  = () => this.products().filter(p => p.isFeatured).length;
  availableCount = () => this.products().filter(p => p.isAvailable).length;

  ngOnInit() {
    this.productService.getAllAdmin().subscribe(p => this.products.set(p));
  }

  confirmDelete(p: Product) { this.deleteTarget.set(p); }
  cancelDelete()            { this.deleteTarget.set(null); }

  doDelete() {
    const p = this.deleteTarget();
    if (!p) return;
    this.productService.delete(p.id).subscribe(() => {
      this.products.update(list => list.filter(x => x.id !== p.id));
      this.toast.show(`"${p.name}" deleted`, 'success');
      this.deleteTarget.set(null);
    });
  }
}
