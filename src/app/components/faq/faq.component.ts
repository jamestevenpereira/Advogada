import { Component, Input, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';
import { BlurFadeComponent } from '../magic-ui/blur-fade/blur-fade.component';

export interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, LucideAngularModule, BlurFadeComponent],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  @Input() faqs: FaqItem[] = [];

  ChevronDown = ChevronDown;
  openIndex = signal<number | null>(null);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }
}
