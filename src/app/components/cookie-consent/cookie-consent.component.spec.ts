import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieConsentComponent } from './cookie-consent.component';
import { provideRouter } from '@angular/router';

describe('CookieConsentComponent', () => {
    let component: CookieConsentComponent;
    let fixture: ComponentFixture<CookieConsentComponent>;

    beforeEach(async () => {
        // Clear localStorage before tests
        localStorage.clear();

        await TestBed.configureTestingModule({
            imports: [CookieConsentComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(CookieConsentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show banner initially if no consent in localStorage', () => {
        expect(component.showBanner()).toBeTrue();
    });

    it('should hide banner when accepted', () => {
        component.acceptCookies();
        expect(component.showBanner()).toBeFalse();
        expect(localStorage.getItem('cookieConsent')).toBe('accepted');
    });

    it('should hide banner when declined', () => {
        component.declineCookies();
        expect(component.showBanner()).toBeFalse();
        expect(localStorage.getItem('cookieConsent')).toBe('declined');
    });
});
