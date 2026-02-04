import { Component, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { cn } from '../../../utils/cn';

/**
 * WordRotateComponent sequentially displays a list of words with a slide animation.
 * Ideal for catchy headlines and dynamic hero sections.
 */
@Component({
    selector: 'app-word-rotate',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './word-rotate.component.html',
    animations: [
        trigger('rotate', [
            transition(':enter, * => *', [
                style({ opacity: 0, transform: 'translateY(100%)' }),
                animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0%)' }))
            ]),
            transition('* => void', [
                animate('0.5s ease-in', style({ opacity: 0, transform: 'translateY(-100%)' }))
            ])
        ])
    ]
})
export class WordRotateComponent {
    /** List of words to rotate through */
    words = input<string[]>([]);
    /** Duration in milliseconds for each word to stay on screen */
    duration = input<number>(2500);
    /** Optional additional CSS classes for the word container */
    class = input<string>('');

    /** Current index of the word being displayed */
    currentIndex = signal(0);
    protected cn = cn;

    constructor() {
        effect((onCleanup) => {
            const interval = setInterval(() => {
                this.currentIndex.set((this.currentIndex() + 1) % this.words().length);
            }, this.duration());

            onCleanup(() => clearInterval(interval));
        });
    }
}
