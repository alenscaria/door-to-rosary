import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type">
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: calc(var(--bottom-nav-h) + 16px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
      width: max-content;
      max-width: 90vw;
    }
    .toast {
      padding: 10px 20px;
      border-radius: var(--radius-pill);
      font-size: 0.85rem;
      font-weight: 500;
      white-space: nowrap;
      animation: toastIn 0.3s var(--ease) both;
      text-align: center;
    }
    .toast-info    { background: var(--clr-ink);     color: var(--clr-cream); }
    .toast-success { background: var(--clr-success);  color: white; }
    .toast-error   { background: var(--clr-danger);   color: white; }

    @keyframes toastIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (min-width: 768px) {
      .toast-container {
        bottom: 32px;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
