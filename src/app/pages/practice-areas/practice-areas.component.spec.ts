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
});
