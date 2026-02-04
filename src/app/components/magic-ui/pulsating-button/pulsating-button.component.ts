import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * PulsatingButtonComponent displays a button with a pulsating background effect.
 * Perfect for primary Call-to-Actions (CTAs) that need to stand out.
 */
@Component({
    selector: 'app-pulsating-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button
      [class]="cn(
        'relative text-center cursor-pointer flex justify-center items-center rounded-lg text-white bg-primary px-4 py-2',
        class()
      )"
      [style.--pulse-color]="pulseColor()"
      [style.--duration]="duration()"
    >
      <div class="relative z-10">
        <ng-content />
      </div>
      <div class="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse-button -translate-x-1/2 -translate-y-1/2 -z-10"></div>
    </button>
  `,
    styles: [`
    @keyframes pulse-button {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
      }
    }
    .animate-pulse-button {
      animation: pulse-button var(--duration) ease-out infinite;
    }
  `]
})
export class PulsatingButtonComponent {
    /** Optional additional CSS classes for the button */
    class = input<string>('');
    /** Color of the pulse effect, defaults to the brand primary color */
    pulseColor = input<string>('var(--primary)');
    /** Duration of the pulse animation */
    duration = input<string>('1.5s');

    protected cn = cn;
}
