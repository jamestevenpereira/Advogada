import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * BorderBeamComponent creates an animated laser-like border effect around its container.
 * Highly configurable via inputs for size, duration, colors, and delay.
 */
@Component({
  selector: 'app-border-beam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './border-beam.component.html'
})
export class BorderBeamComponent {
  /** Size of the beam in pixels */
  size = input<number>(250);
  /** Duration of one full loop in seconds */
  duration = input<number>(15);
  /** Anchor point for the beam animation */
  anchor = input<number>(90);
  /** Width of the animated border */
  borderWidth = input<number>(1.5);
  /** Starting color of the beam */
  colorFrom = input<string>('#78572b');
  /** Ending color of the beam */
  colorTo = input<string>('#0c3835');
  /** Animation delay in seconds */
  delay = input<number>(0);

  protected cn = cn;
}
