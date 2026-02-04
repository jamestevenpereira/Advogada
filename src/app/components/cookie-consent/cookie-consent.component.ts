import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  /**
   * Initializes the component and checks for existing consent.
   */
  ngOnInit(): void {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX
      setTimeout(() => this.showBanner.set(true), 1500);
    }
  }

  /**
   * Marks cookies as accepted and hides the banner.
   */
  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showBanner.set(false);
  }

  /**
   * Marks cookies as declined and hides the banner.
   */
  declineCookies(): void {
    localStorage.setItem('cookieConsent', 'declined');
    this.showBanner.set(false);
  }
}
