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
      title: 'Sobre a Dra. Conceição Lopes — Advogada em Nelas',
      description: 'Conheça o percurso, formação e valores da Dra. Conceição Lopes. 7 anos de carreira dedicados ao Direito da Família, Civil, Trabalho e Comercial em Nelas.',
      canonical: 'https://www.conceicaolopesadvogada.pt/sobre',
    });
  }
}

