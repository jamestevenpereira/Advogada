import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqComponent, FaqItem } from './faq.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('FaqComponent', () => {
    let component: FaqComponent;
    let fixture: ComponentFixture<FaqComponent>;

    const mockFaqs: FaqItem[] = [
        { q: 'Pergunta 1?', a: 'Resposta 1.' },
        { q: 'Pergunta 2?', a: 'Resposta 2.' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FaqComponent, NoopAnimationsModule],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(FaqComponent);
        component = fixture.componentInstance;
        component.faqs = mockFaqs;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render all FAQ questions', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button[data-faq-button]'));
        expect(buttons.length).toBe(2);
        expect(buttons[0].nativeElement.textContent).toContain('Pergunta 1?');
    });

    it('should start with all answers collapsed', () => {
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(0);
    });

    it('should open an answer when its button is clicked', () => {
        const button = fixture.debugElement.query(By.css('button[data-faq-button]'));
        button.nativeElement.click();
        fixture.detectChanges();
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(1);
        expect(answers[0].nativeElement.textContent).toContain('Resposta 1.');
    });

    it('should close an open answer when its button is clicked again', () => {
        const button = fixture.debugElement.query(By.css('button[data-faq-button]'));
        button.nativeElement.click();
        fixture.detectChanges();
        button.nativeElement.click();
        fixture.detectChanges();
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(0);
    });

    it('should only show one answer at a time', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button[data-faq-button]'));
        buttons[0].nativeElement.click();
        fixture.detectChanges();
        buttons[1].nativeElement.click();
        fixture.detectChanges();
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(1);
        expect(answers[0].nativeElement.textContent).toContain('Resposta 2.');
    });
});
