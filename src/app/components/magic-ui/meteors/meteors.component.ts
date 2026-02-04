import { Component, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

/**
 * MeteorsComponent creates a falling meteor effect, perfect for backgrounds.
 */
@Component({
    selector: 'app-meteors',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span
      *ngFor="let style of meteorStyles()"
      [class]="meteorClasses"
      [style.top]="style.top"
      [style.left]="style.left"
      [style.animationDelay]="style.animationDelay"
      [style.animationDuration]="style.animationDuration"
    ></span>
  `,
    styles: [`
    @keyframes meteor {
      0% {
        transform: rotate(215deg) translateX(0);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: rotate(215deg) translateX(-500px);
        opacity: 0;
      }
    }
    .animate-meteor {
      animation: meteor 5s linear infinite;
    }
  `]
})
export class MeteorsComponent implements OnInit {
    number = input<number>(20);
    class = input<string>('');

    meteorStyles = signal<any[]>([]);

    get meteorClasses(): string {
        return this.cn(
            'animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            this.class()
        );
    }

    ngOnInit() {
        const styles = Array.from({ length: this.number() }, () => ({
            top: '0px',
            left: Math.floor(Math.random() * (400 - -400) + -400) + 'px',
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
        }));
        this.meteorStyles.set(styles);
    }

    protected cn = cn;
}
