import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

/**
 * AboutComponent displays the biography and professional profile of the lawyer.
 * It uses a split-screen layout with a prominent professional photo.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, BlurFadeComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor() {
    inject(SeoService).update({
      title: 'Sobre a Advogada — Nelas, Viseu',
      description: 'Dra. Conceição Lopes (Cédula 66631C), advogada em Nelas com 7 anos de experiência no Distrito de Viseu. Especialista em Direito da Família, Civil e Comercial.',
      canonical: 'https://www.conceicaolopesadvogada.pt/sobre',
    });
  }
}

