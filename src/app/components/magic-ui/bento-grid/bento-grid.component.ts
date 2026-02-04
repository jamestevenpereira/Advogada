import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * BentoGridComponent provides a grid layout for bento-style cards.
 * It's fully responsive and supports dynamic child content.
 */
@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bento-grid.component.html'
})
export class BentoGridComponent {
  /** Optional additional CSS classes for the grid container */
  class = input<string>('');
  protected cn = cn;
}

/**
 * BentoCardComponent represents an individual item within a BentoGrid.
 * It features a premium hover effect and structured content layout.
 */
@Component({
  selector: 'app-bento-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bento-card.component.html'
})
export class BentoCardComponent {
  /** Title of the card */
  title = input<string>('');
  /** Brief description or content for the card */
  description = input<string>('');
  /** Optional additional CSS classes for the card container */
  class = input<string>('');

  protected cn = cn;
}
