import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';

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
export class CookiePolicyComponent { }
