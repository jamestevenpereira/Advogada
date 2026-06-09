import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { BorderBeamComponent } from '../../components/magic-ui/border-beam/border-beam.component';
import { CalendarComponent } from '../../components/ui/calendar/calendar.component';
import { LucideAngularModule, Send, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-angular';
import { FirebaseService } from '../../services/firebase.service';
import { EmailService } from '../../services/email.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlurFadeComponent,
    BorderBeamComponent,
    LucideAngularModule,
    CalendarComponent
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss'
})
export class SchedulingComponent {
  private fb = inject(FormBuilder);
  private firebaseService = inject(FirebaseService);
  private emailService = inject(EmailService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    inject(SeoService).update({
      title: 'Agendar Consulta em Nelas',
      description: 'Agende a sua consulta jurídica com a Dra. Conceição Lopes em Nelas. Atendimento de 2ª a 6ª, 9h–18h. Disponível para clientes em todo o Distrito de Viseu.',
      canonical: 'https://www.conceicaolopes-advogada.pt/agendamento',
    });
  }

  schedulingForm = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    reason: ['', Validators.required],
    gdpr: [false, Validators.requiredTrue]
  });

  onDateChange(isoDate: string): void {
    this.schedulingForm.get('date')?.setValue(isoDate);
    this.schedulingForm.get('date')?.markAsTouched();
  }

  isSubmitting = signal(false);
  submitted = signal(false);
  submitError = signal<string | null>(null);

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  SendIcon = Send;
  CalendarIcon = Calendar;
  ClockIcon = Clock;
  UserIcon = User;
  MailIcon = Mail;
  PhoneIcon = Phone;
  MessageIcon = MessageSquare;
  CheckCircleIcon = CheckCircle;

  async onSubmit(): Promise<void> {
    if (this.schedulingForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const leadData = {
      firstName: this.schedulingForm.value.firstName!,
      lastName: this.schedulingForm.value.lastName!,
      email: this.schedulingForm.value.email!,
      phone: this.schedulingForm.value.phone!,
      date: this.schedulingForm.value.date!,
      time: this.schedulingForm.value.time!,
      reason: this.schedulingForm.value.reason!
    };

    try {
      await this.firebaseService.submitLead(leadData);

      try {
        await this.emailService.sendAppointmentEmail(leadData);
      } catch {
        // Email failure is non-blocking; lead is already saved
      }

      this.isSubmitting.set(false);
      this.submitted.set(true);

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const element = document.getElementById('success-card');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }

    } catch {
      this.isSubmitting.set(false);
      this.submitError.set('Ocorreu um erro ao enviar o seu pedido. Por favor, tente novamente ou contacte-nos por telefone: +351 910 322 893.');
    }
  }

  filterPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.schedulingForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  resetForm(): void {
    this.submitted.set(false);
    this.submitError.set(null);
    this.schedulingForm.reset();
  }
}
