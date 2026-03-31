import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Door To Rosary — Handcrafted Sacred Beads'
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
        title: 'Shop — Door To Rosary'
      },
      {
        path: 'shop/:id',
        loadComponent: () => import('./features/shop/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
        title: 'Product — Door To Rosary'
      },
      {
        path: 'customize',
        loadComponent: () => import('./features/customizer/customizer.component').then(m => m.CustomizerComponent),
        title: 'Design Your Rosary — Door To Rosary'
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
        title: 'About — Door To Rosary'
      },
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-shell/admin-shell.component').then(m => m.AdminShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/product-list/product-list.component').then(m => m.ProductListComponent),
        title: 'Admin — Products'
      },
      {
        path: 'products/new',
        loadComponent: () => import('./features/admin/product-form/product-form.component').then(m => m.ProductFormComponent),
        title: 'Admin — Add Product'
      },
      {
        path: 'products/edit/:id',
        loadComponent: () => import('./features/admin/product-form/product-form.component').then(m => m.ProductFormComponent),
        title: 'Admin — Edit Product'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
