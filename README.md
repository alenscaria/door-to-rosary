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