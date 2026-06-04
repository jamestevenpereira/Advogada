import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeAreasComponent } from './practice-areas.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PracticeAreasComponent', () => {
    let component: PracticeAreasComponent;
    let fixture: ComponentFixture<PracticeAreasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PracticeAreasComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(PracticeAreasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should list multiple practice areas', () => {
        expect(component.practiceAreas.length).toBeGreaterThan(0);
    });

    it('should use h2 for the main section title, not h1', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')).toBeNull();
        const h2s = Array.from(compiled.querySelectorAll('h2'));
        const areasHeading = h2s.find(el => el.textContent?.includes('Áreas de Especialização'));
        expect(areasHeading).toBeTruthy();
    });
});
