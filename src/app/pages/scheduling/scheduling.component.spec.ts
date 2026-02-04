import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulingComponent } from './scheduling.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SchedulingComponent', () => {
    let component: SchedulingComponent;
    let fixture: ComponentFixture<SchedulingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SchedulingComponent, ReactiveFormsModule, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SchedulingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form', () => {
        expect(component.schedulingForm).toBeDefined();
        expect(component.schedulingForm.get('firstName')).toBeDefined();
    });

    it('should be invalid when empty', () => {
        expect(component.schedulingForm.valid).toBeFalse();
    });

    it('should toggle submitted state', () => {
        component.submitted.set(true);
        expect(component.submitted()).toBeTrue();
        component.resetForm();
        expect(component.submitted()).toBeFalse();
    });
});
