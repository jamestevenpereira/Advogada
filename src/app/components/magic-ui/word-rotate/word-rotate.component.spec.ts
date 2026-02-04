import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordRotateComponent } from './word-rotate.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WordRotateComponent', () => {
    let component: WordRotateComponent;
    let fixture: ComponentFixture<WordRotateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordRotateComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(WordRotateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
