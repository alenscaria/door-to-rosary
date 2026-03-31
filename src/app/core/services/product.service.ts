import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';
import { environment } from '../../../environments/environment';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Pearl Rosary',
    description: 'Elegant white glass pearl beads strung on a durable cord with a silver-toned crucifix. Perfect for daily prayer and devotion.',
    category: 'rosary',
    imageUrl: '',
    tags: ['popular', 'pearl', 'silver'],
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Sandalwood Rosary',
    description: 'Handcrafted from natural fragrant sandalwood beads. Warm earthy tones with a wooden crucifix. Each piece is unique.',
    category: 'rosary',
    imageUrl: '',
    tags: ['wood', 'natural', 'fragrant'],
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Crystal Rosary Bracelet',
    description: 'Delicate faceted crystal beads on an elastic band. A wearable prayer reminder that doubles as beautiful jewellery.',
    category: 'bracelet',
    imageUrl: '',
    tags: ['crystal', 'bracelet', 'wearable'],
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Komboskini Prayer Rope',
    description: 'Traditional Orthodox prayer rope with 33 hand-tied wool knots. Black cord with red accents. For the Jesus Prayer.',
    category: 'komboskini',
    imageUrl: '',
    tags: ['orthodox', 'prayer rope', 'wool'],
    isFeatured: false,
    isAvailable: true,
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Wedding Return Gift Set',
    description: 'Mini rosary + handmade jute pouch set. Ideal as a thoughtful return gift for weddings, baptisms, and first communions.',
    category: 'return-gift',
    imageUrl: '',
    tags: ['gift', 'wedding', 'bulk-available'],
    isFeatured: true,
    isAvailable: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'Macrame Wall Cross',
    description: 'Boho-inspired macrame cross with natural cotton cord. A beautiful home décor piece and meaningful housewarming gift.',
    category: 'macrame',
    imageUrl: '',
    tags: ['macrame', 'home decor', 'gift'],
    isFeatured: false,
    isAvailable: true,
    createdAt: '2024-01-06',
    updatedAt: '2024-01-06',
  },
  {
    id: '7',
    name: 'Cross Bead Keychain',
    description: 'Compact beaded cross keychain in your choice of color. A pocket-sized reminder of faith, great as everyday carry.',
    category: 'keychain',
    imageUrl: '',
    tags: ['keychain', 'pocket', 'gift'],
    isFeatured: false,
    isAvailable: true,
    createdAt: '2024-01-07',
    updatedAt: '2024-01-07',
  },
  {
    id: '8',
    name: 'Rose Quartz Rosary',
    description: 'Semi-precious rose quartz beads paired with gold-tone findings. Soft pink tones exude grace and serenity.',
    category: 'rosary',
    imageUrl: '',
    tags: ['rose quartz', 'semi-precious', 'gold'],
    isFeatured: false,
    isAvailable: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`;

  // Local state (mock — replace with real API calls)
  private _products = signal<Product[]>(MOCK_PRODUCTS);

  products   = this._products.asReadonly();
  featured   = computed(() => this._products().filter(p => p.isFeatured && p.isAvailable));

  constructor(private http: HttpClient) {}

  // --- Public storefront ---
  getAll(category?: ProductCategory): Observable<Product[]> {
    // TODO: return this.http.get<Product[]>(this.apiUrl, { params: category ? { category } : {} });
    const result = category
      ? this._products().filter(p => p.category === category && p.isAvailable)
      : this._products().filter(p => p.isAvailable);
    return of(result);
  }

  getById(id: string): Observable<Product | undefined> {
    // TODO: return this.http.get<Product>(`${this.apiUrl}/${id}`);
    return of(this._products().find(p => p.id === id));
  }

  // --- Admin ---
  getAllAdmin(): Observable<Product[]> {
    // TODO: return this.http.get<Product[]>(`${this.apiUrl}/admin`);
    return of(this._products());
  }

  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    // TODO: return this.http.post<Product>(this.apiUrl, product);
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this._products.update(products => [...products, newProduct]);
    return of(newProduct);
  }

  update(id: string, product: Partial<Product>): Observable<Product> {
    // TODO: return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
    this._products.update(products =>
      products.map(p => p.id === id ? { ...p, ...product, updatedAt: new Date().toISOString() } : p)
    );
    return of(this._products().find(p => p.id === id)!);
  }

  delete(id: string): Observable<void> {
    // TODO: return this.http.delete<void>(`${this.apiUrl}/${id}`);
    this._products.update(products => products.filter(p => p.id !== id));
    return of(undefined);
  }
}
