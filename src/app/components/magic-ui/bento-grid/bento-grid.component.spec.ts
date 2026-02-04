import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BentoGridComponent, BentoCardComponent } from './bento-grid.component';

describe('BentoGridComponent', () => {
    let component: BentoGridComponent;
    let fixture: ComponentFixture<BentoGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BentoGridComponent, BentoCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BentoGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create bento grid', () => {
        expect(component).toBeTruthy();
    });
});

describe('BentoCardComponent', () => {
    let component: BentoCardComponent;
    let fixture: ComponentFixture<BentoCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BentoCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BentoCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create bento card', () => {
        expect(component).toBeTruthy();
    });
});
