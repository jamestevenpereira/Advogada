import { Component, input, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * DotPatternComponent creates a grid of dots that can follow the mouse
 * or just provide a subtle background texture.
 */
@Component({
    selector: 'app-dot-pattern',
    standalone: true,
    imports: [CommonModule],
    template: `
    <svg
      [class]="cn('pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/30', class())"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          [id]="id"
          [attr.width]="width()"
          [attr.height]="height()"
          patternUnits="userSpaceOnAdd"
          [attr.x]="x()"
          [attr.y]="y()"
        >
          <circle
            [attr.cx]="cx()"
            [attr.cy]="cy()"
            [attr.r]="cr()"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" [attr.stroke-width]="0" [attr.fill]="'url(#' + id + ')'" />
    </svg>
  `,
    styles: [``]
})
export class DotPatternComponent {
    class = input<string>('');
    width = input<number>(20);
    height = input<number>(20);
    x = input<number>(0);
    y = input<number>(0);
    cx = input<number>(1);
    cy = input<number>(1);
    cr = input<number>(1);

    protected id = `dot-pattern-${Math.random().toString(36).substr(2, 9)}`;
    protected cn = cn;
}
