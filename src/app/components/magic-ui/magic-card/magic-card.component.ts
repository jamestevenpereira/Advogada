import { Component, input, signal, ElementRef, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * MagicCardComponent provides a spotlight effect that follows the mouse cursor.
 * Ported from Magic UI (React) to Angular.
 */
@Component({
    selector: 'app-magic-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './magic-card.component.html',
    styleUrl: './magic-card.component.scss'
})
export class MagicCardComponent {
    /** Size of the gradient spotlight effect in pixels */
    gradientSize = input<number>(200);
    /** Color of the gradient effect */
    gradientColor = input<string>('#D9D9D955');
    /** Opacity of the gradient effect */
    gradientOpacity = input<number>(0.8);
    /** Additional CSS classes */
    class = input<string>('');

    /** Current mouse X position relative to the element */
    mouseX = signal<number>(0);
    /** Current mouse Y position relative to the element */
    mouseY = signal<number>(0);

    private el = inject(ElementRef);
    protected cn = cn;

    /**
     * Tracks mouse movement over the card to update the spotlight position.
     */
    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        const rect = this.el.nativeElement.getBoundingClientRect();
        this.mouseX.set(event.clientX - rect.left);
        this.mouseY.set(event.clientY - rect.top);
    }
}
