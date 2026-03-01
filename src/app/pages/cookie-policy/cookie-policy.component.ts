import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { SeoService } from '../../services/seo.service';

/**
 * CookiePolicyComponent displays information about the cookies used on the website.
 * Part of the GDRP compliance requirements.
 */
@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule, BlurFadeComponent],
  templateUrl: './cookie-policy.component.html'
})
export class CookiePolicyComponent {
  constructor() {
    inject(SeoService).update({
      title: 'Política de Cookies',
      description: 'Informação sobre o uso de cookies no nosso website para melhorar a sua experiência de navegação.',
      canonical: 'https://www.conceicaolopesadvogada.pt/politica-cookies',
    });
  }
}

