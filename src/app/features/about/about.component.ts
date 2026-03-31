import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-content">
      <div class="container">

        <section class="about-hero fade-up">
          <p class="section-eyebrow">Our story</p>
          <h1>Crafted with<br><em>devotion</em></h1>
          <p class="about-lead">
            Each rosary, bracelet, and macrame piece is made by hand —
            one bead at a time, with prayer and care.
          </p>
        </section>

        <div class="divider"></div>

        <section class="about-values fade-up">
          @for (v of values; track v.title) {
            <div class="value-card">
              <span class="value-icon">{{ v.icon }}</span>
              <div>
                <h4>{{ v.title }}</h4>
                <p>{{ v.desc }}</p>
              </div>
            </div>
          }
        </section>

        <div class="divider"></div>

        <section class="contact-section fade-up">
          <p class="section-eyebrow">Get in touch</p>
          <h2>Questions or bulk orders?</h2>
          <p class="contact-desc">
            We love hearing from you — whether it's a single custom piece or
            return gifts for a big occasion.
          </p>
          <div class="contact-actions">
            <a href="https://wa.me/+91XXXXXXXXXX" target="_blank" class="btn btn-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 2C6.48 2 2 6.481 2 12c0 1.958.56 3.777 1.512 5.329L2 22l4.809-1.492A9.942 9.942 0 0012 22c5.52 0 10-4.48 10-10S17.519 2 12 2z" opacity=".4"/>
              </svg>
              WhatsApp us
            </a>
            <a href="https://instagram.com" target="_blank" class="btn btn-outline">Instagram →</a>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    .about-hero {
      padding: var(--space-lg) 0 var(--space-xl);
    }
    .about-hero h1 {
      font-size: clamp(2rem, 6vw, 3.5rem);
      margin: 8px 0 var(--space-md);
    }
    .about-hero h1 em { font-style: italic; color: var(--clr-gold); }
    .about-lead {
      font-size: 1rem;
      color: var(--clr-bark);
      max-width: 400px;
      line-height: 1.8;
    }
    .about-values {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      padding: var(--space-lg) 0;
    }
    .value-card {
      display: flex;
      gap: var(--space-md);
      align-items: flex-start;
    }
    .value-icon { font-size: 1.8rem; flex-shrink: 0; }
    .value-card h4 {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--clr-ink);
    }
    .value-card p {
      font-size: 0.875rem;
      color: var(--clr-taupe);
      margin: 0;
    }
    .contact-section { padding: var(--space-lg) 0 var(--space-2xl); }
    .contact-section h2 { font-size: clamp(1.3rem, 4vw, 2rem); margin: 6px 0 var(--space-md); }
    .contact-desc {
      font-size: 0.9rem;
      color: var(--clr-bark);
      max-width: 360px;
      margin-bottom: var(--space-lg);
    }
    .contact-actions { display: flex; gap: var(--space-md); flex-wrap: wrap; }
  `]
})
export class AboutComponent {
  values = [
    { icon: '🙏', title: 'Made with prayer', desc: 'Every bead is strung with intention. Our pieces are more than jewellery — they are companions in prayer.' },
    { icon: '🌿', title: 'Natural materials', desc: 'We use glass, crystal, wood, and semi-precious stones. Authentic materials for authentic devotion.' },
    { icon: '🎁', title: 'Perfect for gifting', desc: 'Rosaries, bracelets, and macrame crafts make meaningful gifts for baptisms, weddings, and first communions.' },
    { icon: '✉️', title: 'Custom orders welcome', desc: 'Have a specific colour, style, or occasion in mind? Reach out — we love creating something truly personal.' },
  ];
}
