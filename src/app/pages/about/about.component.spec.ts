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

    it('should display the lawyer name in an h1 heading', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1.main-title')?.textContent?.trim()).toContain('Dra. Conceição Lopes');
    });

    it('should have exactly one h1 element (page primary heading)', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const h1s = compiled.querySelectorAll('h1');
        expect(h1s.length).toBe(1);
    });
});
