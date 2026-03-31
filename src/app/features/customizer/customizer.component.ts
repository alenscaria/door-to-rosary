import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeadColor, BeadMaterial, CrossStyle, CustomizationConfig, RosaryType } from '../../core/models/product.model';

const BEAD_COLORS: BeadColor[] = [
  { id: 'purple', name: 'Amethyst',   hex: '#7F77DD' },
  { id: 'pink',   name: 'Rose',       hex: '#D4537E' },
  { id: 'teal',   name: 'Teal',       hex: '#1D9E75' },
  { id: 'blue',   name: 'Sapphire',   hex: '#378ADD' },
  { id: 'red',    name: 'Ruby',       hex: '#E24B4A' },
  { id: 'amber',  name: 'Amber',      hex: '#EF9F27' },
  { id: 'white',  name: 'Pearl',      hex: '#F0EDE5' },
  { id: 'black',  name: 'Onyx',       hex: '#2C2C2A' },
  { id: 'green',  name: 'Jade',       hex: '#639922' },
  { id: 'gold',   name: 'Gold',       hex: '#b8922a' },
];

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-content">
      <div class="container">

        <!-- Header -->
        <div class="cust-header fade-up">
          <p class="section-eyebrow">One of a kind</p>
          <h1>Design your rosary</h1>
          <p class="cust-sub">Choose your style, beads, and details — we'll handcraft it for you.</p>
        </div>

        <!-- Step indicator -->
        <div class="steps-bar fade-up fade-up-delay-1">
          @for (step of steps; track step.n) {
            <div class="step-item" [class.active]="currentStep() === step.n" [class.done]="currentStep() > step.n">
              <div class="step-circle">
                @if (currentStep() > step.n) { <span>✓</span> }
                @else { <span>{{ step.n }}</span> }
              </div>
              <span class="step-label">{{ step.label }}</span>
            </div>
            @if (!$last) { <div class="step-line" [class.done]="currentStep() > step.n"></div> }
          }
        </div>

        <div class="cust-body">

          <!-- Live preview -->
          <div class="preview-card fade-up">
            <p class="preview-label">Live preview</p>
            <div class="bead-row">
              @for (b of previewBeads; track $index) {
                <div class="p-bead"
                  [style.background]="config().color.hex"
                  [style.width]="b === 'small' ? '12px' : '18px'"
                  [style.height]="b === 'small' ? '12px' : '18px'"
                  [style.opacity]="b === 'small' ? '0.6' : '1'">
                </div>
              }
            </div>
            <p class="preview-summary">
              {{ typeLabel() }} · {{ materialLabel() }} · {{ config().color.name }}
            </p>
          </div>

          <!-- Step panels -->
          @if (currentStep() === 1) {
            <div class="step-panel fade-up">
              <h3 class="step-title">Choose a type</h3>
              <div class="type-grid">
                @for (t of rosaryTypes; track t.value) {
                  <button class="type-card"
                    [class.selected]="config().type === t.value"
                    (click)="setType(t.value)">
                    <span class="type-icon">{{ t.icon }}</span>
                    <span class="type-name">{{ t.label }}</span>
                    <span class="type-desc">{{ t.desc }}</span>
                  </button>
                }
              </div>
            </div>
          }

          @if (currentStep() === 2) {
            <div class="step-panel fade-up">
              <h3 class="step-title">Bead material</h3>
              <div class="chip-group" style="margin-bottom: var(--space-lg);">
                @for (m of materials; track m.value) {
                  <button class="chip" [class.selected]="config().material === m.value" (click)="setMaterial(m.value)">
                    {{ m.label }}
                  </button>
                }
              </div>

              <h3 class="step-title">Bead colour</h3>
              <div class="color-grid">
                @for (c of beadColors; track c.id) {
                  <button class="color-btn"
                    [class.selected]="config().color.id === c.id"
                    [style.background]="c.hex"
                    [title]="c.name"
                    (click)="setColor(c)">
                  </button>
                }
              </div>
              <p class="color-name-display">{{ config().color.name }}</p>
            </div>
          }

          @if (currentStep() === 3) {
            <div class="step-panel fade-up">
              <h3 class="step-title">Cross / centrepiece style</h3>
              <div class="chip-group">
                @for (c of crossStyles; track c.value) {
                  <button class="chip" [class.selected]="config().crossStyle === c.value" (click)="setCross(c.value)">
                    {{ c.label }}
                  </button>
                }
              </div>
            </div>
          }

          @if (currentStep() === 4) {
            <div class="step-panel fade-up">
              <h3 class="step-title">Special requests</h3>
              <textarea
                class="form-control"
                rows="4"
                placeholder="E.g. personalised name tag, specific length, gift wrapping, bulk order…"
                [(ngModel)]="notes"
                style="margin-bottom: var(--space-lg);">
              </textarea>

              <div class="summary-card">
                <p class="summary-title">Your order summary</p>
                <div class="summary-rows">
                  <div class="summary-row"><span>Type</span><span>{{ typeLabel() }}</span></div>
                  <div class="summary-row"><span>Material</span><span>{{ materialLabel() }}</span></div>
                  <div class="summary-row"><span>Colour</span><span>{{ config().color.name }}</span></div>
                  <div class="summary-row"><span>Cross</span><span>{{ crossLabel() }}</span></div>
                  @if (notes) {
                    <div class="summary-row"><span>Notes</span><span class="notes-val">{{ notes }}</span></div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- Navigation -->
          <div class="step-nav">
            @if (currentStep() > 1) {
              <button class="btn btn-outline" (click)="prevStep()">← Back</button>
            } @else {
              <div></div>
            }

            @if (currentStep() < 4) {
              <button class="btn btn-primary" (click)="nextStep()">Continue →</button>
            } @else {
              <button class="btn btn-wa" (click)="sendWhatsApp()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                  <path d="M12 2C6.48 2 2 6.481 2 12c0 1.958.56 3.777 1.512 5.329L2 22l4.809-1.492A9.942 9.942 0 0012 22c5.52 0 10-4.48 10-10S17.519 2 12 2z" opacity=".4"/>
                </svg>
                Send via WhatsApp
              </button>
            }
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .cust-header { padding: var(--space-lg) 0 var(--space-md); }
    .cust-header h1 { font-size: clamp(1.8rem, 5vw, 3rem); margin: 4px 0 8px; }
    .cust-sub { font-size: 0.9rem; color: var(--clr-taupe); margin: 0; }

    .steps-bar {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-xl);
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 4px;
    }
    .steps-bar::-webkit-scrollbar { display: none; }
    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .step-circle {
      width: 28px; height: 28px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem;
      font-weight: 500;
      background: var(--clr-sand);
      color: var(--clr-taupe);
      transition: all 0.2s;
    }
    .step-item.active .step-circle {
      background: var(--clr-gold);
      color: white;
    }
    .step-item.done .step-circle {
      background: var(--clr-ink);
      color: var(--clr-cream);
    }
    .step-label {
      font-size: 0.68rem;
      color: var(--clr-warm-gray);
      white-space: nowrap;
    }
    .step-item.active .step-label { color: var(--clr-ink); font-weight: 500; }
    .step-line {
      flex: 1;
      height: 1px;
      background: var(--clr-sand);
      min-width: 20px;
      margin: 0 4px;
      margin-bottom: 20px;
      transition: background 0.2s;
    }
    .step-line.done { background: var(--clr-ink); }

    .cust-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      padding-bottom: var(--space-2xl);
    }

    /* Preview */
    .preview-card {
      background: var(--clr-parchment);
      border-radius: var(--radius-lg);
      border: 1px solid var(--clr-sand);
      padding: var(--space-lg);
      text-align: center;
    }
    .preview-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--clr-warm-gray);
      margin-bottom: var(--space-md);
    }
    .bead-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
      margin-bottom: var(--space-sm);
    }
    .p-bead {
      border-radius: 50%;
      transition: background 0.3s;
    }
    .preview-summary {
      font-size: 0.8rem;
      color: var(--clr-taupe);
      margin: 0;
    }

    /* Step panels */
    .step-panel {
      background: white;
      border-radius: var(--radius-lg);
      border: 1px solid var(--clr-sand);
      padding: var(--space-lg);
    }
    .step-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--clr-ink);
      margin-bottom: var(--space-md);
    }

    /* Type grid */
    .type-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-sm);
    }
    .type-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: var(--space-md) var(--space-sm);
      border: 1px solid var(--clr-sand);
      border-radius: var(--radius-lg);
      background: white;
      cursor: pointer;
      transition: all 0.15s;
      text-align: center;
    }
    .type-card:hover { border-color: var(--clr-warm-gray); background: var(--clr-parchment); }
    .type-card.selected {
      border-color: var(--clr-ink);
      background: var(--clr-ink);
    }
    .type-card.selected .type-name { color: var(--clr-cream); }
    .type-card.selected .type-desc { color: var(--clr-warm-gray); }
    .type-icon { font-size: 2rem; }
    .type-name { font-size: 0.85rem; font-weight: 500; color: var(--clr-ink); }
    .type-desc { font-size: 0.72rem; color: var(--clr-taupe); }

    /* Colors */
    .color-grid {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: var(--space-sm);
    }
    .color-btn {
      width: 34px; height: 34px;
      border-radius: 50%;
      border: 3px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
      outline: none;
    }
    .color-btn:hover { transform: scale(1.1); }
    .color-btn.selected {
      border-color: var(--clr-ink);
      box-shadow: 0 0 0 2px white inset;
    }
    .color-name-display {
      font-size: 0.8rem;
      color: var(--clr-taupe);
      margin: 0;
      font-style: italic;
    }

    /* Summary */
    .summary-card {
      background: var(--clr-parchment);
      border-radius: var(--radius-lg);
      padding: var(--space-md);
      border: 1px solid var(--clr-sand);
    }
    .summary-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--clr-taupe);
      margin-bottom: var(--space-md);
    }
    .summary-rows { display: flex; flex-direction: column; gap: 8px; }
    .summary-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
    }
    .summary-row span:first-child { color: var(--clr-taupe); }
    .summary-row span:last-child { font-weight: 500; color: var(--clr-ink); }
    .notes-val {
      max-width: 200px;
      text-align: right;
      color: var(--clr-taupe) !important;
      font-weight: 400 !important;
      font-size: 0.8rem;
    }

    /* Nav */
    .step-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-md);
    }
    .step-nav .btn { flex: 1; max-width: 200px; }
  `]
})
export class CustomizerComponent {
  currentStep = signal(1);
  notes = '';
  beadColors = BEAD_COLORS;

  private _config = signal<CustomizationConfig>({
    type: 'classic-rosary',
    material: 'glass',
    color: BEAD_COLORS[0],
    crossStyle: 'silver-cross',
    notes: ''
  });
  config = this._config.asReadonly();

  steps = [
    { n: 1, label: 'Type'   },
    { n: 2, label: 'Beads'  },
    { n: 3, label: 'Cross'  },
    { n: 4, label: 'Review' },
  ];

  rosaryTypes = [
    { value: 'classic-rosary' as RosaryType, label: 'Classic Rosary', icon: '📿', desc: '5-decade rosary' },
    { value: 'bracelet'       as RosaryType, label: 'Bracelet',        icon: '🪬', desc: 'Wearable decade' },
    { value: 'komboskini'     as RosaryType, label: 'Komboskini',      icon: '🧵', desc: 'Orthodox rope' },
    { value: 'keychain'       as RosaryType, label: 'Keychain',        icon: '🔑', desc: 'Compact keepsake' },
  ];

  materials = [
    { value: 'glass'   as BeadMaterial, label: 'Glass' },
    { value: 'crystal' as BeadMaterial, label: 'Crystal' },
    { value: 'wood'    as BeadMaterial, label: 'Wood' },
    { value: 'pearl'   as BeadMaterial, label: 'Pearl' },
    { value: 'macrame' as BeadMaterial, label: 'Macrame' },
  ];

  crossStyles = [
    { value: 'silver-cross' as CrossStyle, label: 'Silver cross' },
    { value: 'gold-cross'   as CrossStyle, label: 'Gold cross' },
    { value: 'wooden-cross' as CrossStyle, label: 'Wooden cross' },
    { value: 'medal'        as CrossStyle, label: 'Medal' },
    { value: 'none'         as CrossStyle, label: 'No cross' },
  ];

  previewBeads = ['lg','lg','lg','lg','sm','lg','lg','lg','lg','lg','sm','lg','lg'];

  typeLabel()     { return this.rosaryTypes.find(t => t.value === this.config().type)?.label ?? ''; }
  materialLabel() { return this.materials.find(m => m.value === this.config().material)?.label ?? ''; }
  crossLabel()    { return this.crossStyles.find(c => c.value === this.config().crossStyle)?.label ?? ''; }

  setType(v: RosaryType)       { this._config.update(c => ({ ...c, type: v })); }
  setMaterial(v: BeadMaterial) { this._config.update(c => ({ ...c, material: v })); }
  setColor(v: BeadColor)       { this._config.update(c => ({ ...c, color: v })); }
  setCross(v: CrossStyle)      { this._config.update(c => ({ ...c, crossStyle: v })); }

  nextStep() { if (this.currentStep() < 4) this.currentStep.update(s => s + 1); }
  prevStep() { if (this.currentStep() > 1) this.currentStep.update(s => s - 1); }

  sendWhatsApp() {
    const c = this.config();
    const msg = [
      `Hi! I'd like to order a custom rosary:`,
      `• Type: ${this.typeLabel()}`,
      `• Material: ${this.materialLabel()}`,
      `• Colour: ${c.color.name}`,
      `• Cross: ${this.crossLabel()}`,
      this.notes ? `• Notes: ${this.notes}` : null,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/+91XXXXXXXXXX?text=${encodeURIComponent(msg)}`, '_blank');
  }
}
