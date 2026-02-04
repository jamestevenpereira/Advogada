import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';

/**
 * PrivacyPolicyComponent displays the GDPR compliant privacy policy of the firm.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, BlurFadeComponent],
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent { }
