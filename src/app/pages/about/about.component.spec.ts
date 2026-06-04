import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideRouter } from '@angular/router';

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AboutComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the lawyer name in an h2 heading', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const h2s = Array.from(compiled.querySelectorAll('h2'));
        const nameHeading = h2s.find(el => el.textContent?.includes('Dra. Conceição Lopes'));
        expect(nameHeading).toBeTruthy();
    });

    it('should have no h1 tag (heading hierarchy: h2 used within sections)', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')).toBeNull();
    });
});
