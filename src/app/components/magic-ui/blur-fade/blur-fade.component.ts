import { Component, input, signal, effect, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * BlurFadeComponent provides a scroll-triggered fade and blur animation.
 * It uses the Intersection Observer API to detect when the element enters the viewport.
 */
@Component({
  selector: 'app-blur-fade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blur-fade.component.html'
})
export class BlurFadeComponent {
  /** Optional additional CSS classes for the container */
  class = input<string>('');
  /** Delay in milliseconds before the animation starts */
  delay = input<number>(0);

  /** Signal tracking element visibility */
  isVisible = signal(false);

  private el = inject(ElementRef);
  protected cn = cn;

  constructor() {
    effect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
            observer.unobserve(this.el.nativeElement);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(this.el.nativeElement);
      return () => observer.disconnect();
    });
  }
}
