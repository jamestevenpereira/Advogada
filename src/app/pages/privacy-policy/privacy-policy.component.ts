import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { SeoService } from '../../services/seo.service';

/**
 * PrivacyPolicyComponent displays the GDPR compliant privacy policy of the firm.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, BlurFadeComponent],
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent {
  constructor() {
    inject(SeoService).update({
      title: 'Política de Privacidade',
      description: 'Consulte a nossa política de privacidade e saiba como tratamos os seus dados pessoais com total segurança e confidencialidade.',
      canonical: 'https://www.conceicaolopesadvogada.pt/politica-privacidade',
    });
  }
}

