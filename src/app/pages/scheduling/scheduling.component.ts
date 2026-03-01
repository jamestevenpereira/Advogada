import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { BorderBeamComponent } from '../../components/magic-ui/border-beam/border-beam.component';
import { LucideAngularModule, Send, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-angular';
import { FirebaseService } from '../../services/firebase.service';
import { EmailService } from '../../services/email.service';
import { SeoService } from '../../services/seo.service';

/**
 * SchedulingComponent manages the appointment request form.
 * 
 * Features:
 * - Reactive Form with comprehensive validation.
 * - Integration with Firebase Firestore for secure data storage.
 * - Success/Error states with visual feedback.
 * - GDPR compliance checkbox.
 * - Standard Angular structure (separate HTML/SCSS/Spec).
 */
@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlurFadeComponent,
    BorderBeamComponent,
    LucideAngularModule
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss'
})
export class SchedulingComponent {
  // --------------------------------------------------------------------------
  // Properties & DI
  // --------------------------------------------------------------------------

  private fb = inject(FormBuilder);
  private firebaseService = inject(FirebaseService);
  private emailService = inject(EmailService);

  constructor() {
    inject(SeoService).update({
      title: 'Agendar Consulta Jurídica em Nelas',
      description: 'Marque a sua consulta com a Dra. Conceição Lopes de forma rápida e segura. Atendimento personalizado em Nelas, Viseu.',
      canonical: 'https://www.conceicaolopesadvogada.pt/agendamento',
    });
  }

  /** Main scheduling form group with validators. */
  schedulingForm = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/) // Letters and international characters
    ]],
    lastName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^\d{9,15}$/) // Only digits, 9 to 15 length
    ]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    reason: ['', Validators.required],
    gdpr: [false, Validators.requiredTrue]
  });

  /** Loading state signal */
  isSubmitting = signal(false);

  /** Submission success state signal */
  submitted = signal(false);

  /** Returns today's date in YYYY-MM-DD format for the calendar 'min' attribute */
  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /** Icons for the template */
  SendIcon = Send;
  CalendarIcon = Calendar;
  ClockIcon = Clock;
  UserIcon = User;
  MailIcon = Mail;
  PhoneIcon = Phone;
  MessageIcon = MessageSquare;
  CheckCircleIcon = CheckCircle;

  // --------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------

  /**
   * Handles form submission.
   * Validates the form and triggers the secure Firebase submission.
   */
  async onSubmit(): Promise<void> {
    if (this.schedulingForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);

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
      // 1. Log simulation (for debug)
      console.log('Submitting lead to Firestore secure database...', leadData);

      // 2. Perform secure submission via Firebase Service
      await this.firebaseService.submitLead(leadData);

      // 3. Send email notification via EmailJS
      // Note: This will use the placeholders until real IDs are provided
      try {
        await this.emailService.sendAppointmentEmail(leadData);
      } catch (emailError: any) {
        console.warn('Email notification failed, but data was saved to database:', emailError);
      }

      // 4. Update UI states
      this.isSubmitting.set(false);
      this.submitted.set(true);

      // Note: For actual email delivery, you should set up a Firebase Cloud Function
      // that triggers when a new document is added to the 'leads' collection.

    } catch (error) {
      console.error('Submission error:', error);
      this.isSubmitting.set(false);
      alert('Ocorreu um erro ao enviar o seu pedido de forma segura. Por favor, tente novamente.');
    }
  }

  /**
   * Filters non-numeric characters from the phone input.
   */
  filterPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-digits
    this.schedulingForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  /**
   * Resets the form and submission state.
   */
  resetForm(): void {
    this.submitted.set(false);
    this.schedulingForm.reset();
  }
}
