import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '../../services/seo.service';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let seoSpy: jasmine.SpyObj<SeoService>;

    beforeEach(async () => {
        seoSpy = jasmine.createSpyObj('SeoService', ['update']);

        await TestBed.configureTestingModule({
            imports: [HomeComponent, NoopAnimationsModule],
            providers: [
                provideRouter([]),
                { provide: SeoService, useValue: seoSpy },
                { provide: DOCUMENT, useValue: document }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the lawyer name', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Conceição Lopes');
    });

    it('should have testimonials', () => {
        expect(component.testimonials.length).toBeGreaterThan(0);
    });

    it('should call SeoService.update with Viseu-targeting title and description', () => {
        expect(seoSpy.update).toHaveBeenCalledWith(jasmine.objectContaining({
            title: jasmine.stringContaining('Viseu'),
            description: jasmine.stringContaining('Viseu'),
            canonical: 'https://www.conceicaolopes-advogada.pt/'
        }));
    });

    it('should have 6 FAQ items', () => {
        expect(component.faqs.length).toBe(6);
    });
});
