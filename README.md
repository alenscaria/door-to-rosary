# Door To Rosary — Angular Frontend

A mobile-first Angular 17 web app for a handcrafted rosary business.
Designed to connect with an ASP.NET Core Web API backend.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, categories, featured products, CTA |
| `/shop` | Product catalogue with category filter |
| `/shop/:id` | Product detail with WhatsApp enquiry |
| `/customize` | 4-step rosary customizer → WhatsApp order |
| `/about` | Brand story + contact |
| `/admin` | Redirects to `/admin/products` |
| `/admin/products` | Product list with stats + delete |
| `/admin/products/new` | Add product form |
| `/admin/products/edit/:id` | Edit product form |

## Tech stack

- **Angular 17** (standalone components, signals)
- **Angular Router** (lazy-loaded feature routes)
- **Reactive Forms** (admin product form)
- **Angular Signals** (state management — no NgRx needed yet)
- **SCSS** (custom design tokens via CSS variables)

## Design system

Aesthetic: **Warm luxury / Sacred craft**
- Fonts: Cormorant Garamond (display) + DM Sans (body)
- Palette: warm parchment + deep ink + gold accent
- Mobile-first: 390px base, responsive up to 1200px
- Bottom nav for mobile; sidebar nav for admin desktop

## Setup

```bash
npm install
ng serve
```

Open http://localhost:4200

## Connecting to ASP.NET Core Web API

1. Update `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api'   // your local API port
};
```

2. Update `src/environments/environment.prod.ts` with your deployed API URL.

3. In `ProductService`, uncomment the `this.http.get/post/put/delete` lines
   and remove the mock `of(...)` returns. The API contract expected:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all available products (optional `?category=` param) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/admin` | Get all products (admin, no availability filter) |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

4. If your API is on a different origin during development, add a proxy config:

```json
// proxy.conf.json
{
  "/api": {
    "target": "http://localhost:5000",
    "changeOrigin": true
  }
}
```

Then in `angular.json` under `serve > options`:
```json
"proxyConfig": "proxy.conf.json"
```

## WhatsApp integration

Search for `+91XXXXXXXXXX` in the codebase and replace with your friend's
WhatsApp number in international format (no spaces or dashes).

Files to update:
- `src/app/features/shop/product-detail/product-detail.component.ts`
- `src/app/features/customizer/customizer.component.ts`
- `src/app/features/about/about.component.ts`

## Project structure

```
src/app/
├── core/
│   ├── models/product.model.ts      # TypeScript interfaces
│   └── services/
│       ├── product.service.ts       # API + mock data
│       └── toast.service.ts         # Global notifications
├── layout/
│   ├── shell/                       # Main layout wrapper
│   ├── navbar/                      # Top nav (desktop)
│   └── bottom-nav/                  # Bottom nav (mobile)
├── shared/
│   └── components/
│       ├── product-card/            # Reusable product card
│       └── toast/                   # Toast notifications
├── features/
│   ├── home/                        # Landing page
│   ├── shop/                        # Catalogue + detail
│   ├── customizer/                  # 4-step design flow
│   ├── about/                       # About + contact
│   └── admin/
│       ├── admin-shell/             # Admin layout (sidebar)
│       ├── product-list/            # List + delete
│       └── product-form/            # Add / edit form
├── app.routes.ts                    # All routes (lazy loaded)
├── app.config.ts                    # Angular providers
└── app.component.ts                 # Root component
```
