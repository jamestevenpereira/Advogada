import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieConsentComponent],
  template: `
    <app-header />
    <main class="min-h-screen pt-20">
      <router-outlet />
    </main>
    <app-footer />
    <app-cookie-consent />
  `,
  styles: [],
})
export class AppComponent { }
