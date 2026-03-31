import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { ProductCategory } from '../../../core/models/product.model';

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'rosary',      label: 'Rosary' },
  { value: 'bracelet',    label: 'Bracelet' },
  { value: 'komboskini',  label: 'Komboskini' },
  { value: 'macrame',     label: 'Macrame' },
  { value: 'keychain',    label: 'Keychain' },
  { value: 'return-gift', label: 'Return Gift' },
];

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="admin-page">

      <div class="form-header">
        <a routerLink="/admin/products" class="back-link">← Products</a>
        <h2 class="admin-title">{{ isEdit ? 'Edit product' : 'Add product' }}</h2>
        <p class="admin-sub">{{ isEdit ? 'Update the product details below.' : 'Fill in the details to add a new product to the catalogue.' }}</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="product-form">

        <div class="form-card">
          <h4 class="form-section-title">Basic information</h4>

          <div class="form-group">
            <label class="form-label" for="name">Product name *</label>
            <input id="name" type="text" class="form-control" formControlName="name"
              placeholder="e.g. Classic Pearl Rosary"
              [class.invalid]="isInvalid('name')" />
            @if (isInvalid('name')) {
              <span class="error-msg">Name is required</span>
            }
          </div>

          <div class="form-group">
            <label class="form-label" for="category">Category *</label>
            <select id="category" class="form-control" formControlName="category"
              [class.invalid]="isInvalid('category')">
              <option value="">Select a category</option>
              @for (c of categories; track c.value) {
                <option [value]="c.value">{{ c.label }}</option>
              }
            </select>
            @if (isInvalid('category')) {
              <span class="error-msg">Category is required</span>
            }
          </div>

          <div class="form-group">
            <label class="form-label" for="description">Description *</label>
            <textarea id="description" class="form-control" formControlName="description"
              rows="4" placeholder="Describe the product — materials, style, who it's for…"
              [class.invalid]="isInvalid('description')">
            </textarea>
            @if (isInvalid('description')) {
              <span class="error-msg">Description is required</span>
            }
          </div>

          <div class="form-group">
            <label class="form-label" for="imageUrl">Image URL</label>
            <input id="imageUrl" type="url" class="form-control" formControlName="imageUrl"
              placeholder="https://…" />
            <span class="hint">Leave blank to use the default category icon for now.</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="tags">Tags</label>
            <input id="tags" type="text" class="form-control" formControlName="tagsInput"
              placeholder="popular, pearl, silver (comma-separated)" />
            <span class="hint">Used for search and filter. Separate with commas.</span>
          </div>
        </div>

        <div class="form-card">
          <h4 class="form-section-title">Visibility</h4>

          <div class="toggle-row">
            <div>
              <p class="toggle-label">Available</p>
              <p class="toggle-desc">Show this product in the shop</p>
            </div>
            <label class="toggle">
              <input type="checkbox" formControlName="isAvailable" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-row">
            <div>
              <p class="toggle-label">Featured</p>
              <p class="toggle-desc">Show on the home page as a featured piece</p>
            </div>
            <label class="toggle">
              <input type="checkbox" formControlName="isFeatured" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="form-actions">
          <a routerLink="/admin/products" class="btn btn-outline">Cancel</a>
          <button type="submit" class="btn btn-primary" [disabled]="saving()">
            {{ saving() ? 'Saving…' : (isEdit ? 'Update product' : 'Add product') }}
          </button>
        </div>

      </form>
    </div>
  `,
  styles: [`
    .admin-page { max-width: 640px; }
    .form-header { margin-bottom: var(--space-xl); }
    .back-link {
      display: inline-block;
      font-size: 0.85rem;
      color: var(--clr-taupe);
      text-decoration: none;
      margin-bottom: var(--space-md);
    }
    .back-link:hover { color: var(--clr-ink); }
    .admin-title { font-size: clamp(1.4rem, 3vw, 2rem); margin-bottom: 4px; }
    .admin-sub { font-size: 0.85rem; color: var(--clr-taupe); margin: 0; }

    .product-form { display: flex; flex-direction: column; gap: var(--space-lg); }

    .form-card {
      background: white;
      border-radius: var(--radius-lg);
      border: 1px solid var(--clr-sand);
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
    }
    .form-section-title {
      font-size: 0.85rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--clr-taupe);
      margin-bottom: var(--space-lg);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--clr-sand);
    }

    .form-control.invalid { border-color: var(--clr-danger); }
    .error-msg { font-size: 0.75rem; color: var(--clr-danger); }
    .hint { font-size: 0.75rem; color: var(--clr-warm-gray); }

    /* Toggles */
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-md) 0;
      border-bottom: 1px solid var(--clr-sand);
    }
    .toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
    .toggle-label { font-size: 0.9rem; font-weight: 500; color: var(--clr-ink); margin: 0; }
    .toggle-desc  { font-size: 0.78rem; color: var(--clr-taupe); margin: 2px 0 0; }

    .toggle { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
      position: absolute; inset: 0;
      background: var(--clr-sand);
      border-radius: 12px;
      transition: background 0.2s;
      cursor: pointer;
    }
    .toggle-slider::after {
      content: '';
      position: absolute;
      left: 3px; top: 3px;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: white;
      transition: transform 0.2s;
      box-shadow: var(--shadow-sm);
    }
    .toggle input:checked + .toggle-slider { background: var(--clr-gold); }
    .toggle input:checked + .toggle-slider::after { transform: translateX(20px); }

    .form-actions {
      display: flex;
      gap: var(--space-md);
      justify-content: flex-end;
      padding-bottom: var(--space-2xl);
    }
    button[disabled] { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class ProductFormComponent implements OnInit {
  private fb      = inject(FormBuilder);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private svc     = inject(ProductService);
  private toast   = inject(ToastService);

  categories = CATEGORIES;
  isEdit = false;
  editId = '';
  saving = signal(false);

  form = this.fb.group({
    name:        ['', Validators.required],
    category:    ['', Validators.required],
    description: ['', Validators.required],
    imageUrl:    [''],
    tagsInput:   [''],
    isAvailable: [true],
    isFeatured:  [false],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editId = id;
      this.svc.getById(id).subscribe(p => {
        if (!p) return;
        this.form.patchValue({
          name:        p.name,
          category:    p.category,
          description: p.description,
          imageUrl:    p.imageUrl,
          tagsInput:   p.tags.join(', '),
          isAvailable: p.isAvailable,
          isFeatured:  p.isFeatured,
        });
      });
    }
  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.invalid && ctrl?.touched;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.saving.set(true);
    const v = this.form.value;
    const tags = (v.tagsInput ?? '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const payload = {
      name:        v.name!,
      category:    v.category as ProductCategory,
      description: v.description!,
      imageUrl:    v.imageUrl ?? '',
      tags,
      isAvailable: v.isAvailable ?? true,
      isFeatured:  v.isFeatured ?? false,
    };

    const obs$ = this.isEdit
      ? this.svc.update(this.editId, payload)
      : this.svc.create(payload);

    obs$.subscribe({
      next: () => {
        this.toast.show(this.isEdit ? 'Product updated!' : 'Product added!', 'success');
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.toast.show('Something went wrong. Please try again.', 'error');
        this.saving.set(false);
      }
    });
  }
}
