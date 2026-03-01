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
      title: 'Dra. Conceição Lopes | Advogada em Nelas',
      description: 'Conheça a trajetória da Dra. Conceição Lopes, advogada sediada na Av. João XXIII em Nelas, com foco em Direito Civil, Família e Comercial.',
      canonical: 'https://www.conceicaolopesadvogada.pt/sobre',
    });
  }
}

