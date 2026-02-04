import { Component, input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * MarqueeComponent provides an infinite scrolling effect for its child content.
 * Supports horizontal and vertical scrolling, reverse direction, and pause on hover.
 * 
 * NOTE: For reliable infinite scrolling, wrap your content in an <ng-template>.
 */
@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.component.html'
})
export class MarqueeComponent {
  /** Reference to the template provided as content child */
  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<any>;

  /** Optional additional CSS classes for the container */
  class = input<string>('');
  /** Whether the marquee should scroll vertically */
  vertical = input<boolean>(false);
  /** Whether the marquee should scroll in reverse direction */
  reverse = input<boolean>(false);
  /** Whether the animation should pause when the user hovers over it */
  pauseOnHover = input<boolean>(false);
  /** Number of times to repeat the content to ensure infinite scroll (Internal use) */
  repeat = input<number>(4);

  protected cn = cn;

  get containerClasses(): string {
    return this.cn(
      'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [flex-direction:row]',
      this.vertical() ? 'flex-col' : 'flex-row',
      this.class()
    );
  }

  get marqueeClasses(): string {
    return this.cn(
      'flex shrink-0 justify-around [gap:var(--gap)]',
      this.vertical() ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
      this.pauseOnHover() ? 'group-hover:[animation-play-state:paused]' : '',
      this.reverse() ? '[animation-direction:reverse]' : ''
    );
  }
}
