import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * ShinyButtonComponent creates a premium button with a subtle "shining" animation
 * that moves across the button.
 */
@Component({
    selector: 'app-shiny-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button
      [class]="cn(
        'group relative flex items-center justify-center overflow-hidden rounded-lg bg-secondary px-9 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/40 active:scale-[0.97] cursor-pointer',
        class()
      )"
    >
      <div class="relative z-10 flex items-center gap-2">
        <ng-content />
      </div>
      
      <!-- Shiny Overlay -->
      <div 
        class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
      ></div>
      
      <!-- Constant Subtle Glow -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]"></div>
    </button>
  `,
    styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ShinyButtonComponent {
    class = input<string>('');

    protected cn = cn;
}
