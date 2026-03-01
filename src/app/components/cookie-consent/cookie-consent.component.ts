import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Cookie } from 'lucide-angular';

/**
 * CookieConsentComponent presents a privacy banner to the user.
 * It manages the user's consent status using browser local storage.
 */
@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './cookie-consent.component.html'
})
export class CookieConsentComponent implements OnInit {
  /** Signal that controls the visibility of the cookie banner */
  showBanner = signal(false);

  /** Icons used in the template */
  Cookie = Cookie;

  private platformId = inject(PLATFORM_ID);

  /**
   * Initializes the component and checks for existing consent.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        // Small delay for better UX
        setTimeout(() => this.showBanner.set(true), 1500);
      }
    }
  }

  /**
   * Marks cookies as accepted and hides the banner.
   */
  acceptCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'accepted');
    }
    this.showBanner.set(false);
  }

  /**
   * Marks cookies as declined and hides the banner.
   */
  declineCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'declined');
    }
    this.showBanner.set(false);
  }
}

