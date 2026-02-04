import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

/**
 * EmailService handles sending emails via EmailJS.
 * 
 * To use this service:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Set up a Service and an Email Template.
 * 3. Replace the placeholder IDs below with your actual credentials.
 */
@Injectable({
    providedIn: 'root'
})
export class EmailService {
    // --------------------------------------------------------------------------
    // Configuration (Replace with real IDs when available)
    // --------------------------------------------------------------------------

    private readonly SERVICE_ID = 'service_cwkcr1a';
    private readonly TEMPLATE_ID = 'template_uufnfct';
    private readonly PUBLIC_KEY = 'JrbxqlACBzqz-hDMH';

    /** The email address where appointment notifications will be sent for testing */
    private readonly TEST_RECIPIENT_EMAIL = 'jamestevenpereira@gmail.com';

    /**
     * Sends an appointment notification email.
     * @param data Parameters for the email template.
     * @returns A promise that resolves to the EmailJS response status.
     */
    async sendAppointmentEmail(data: any): Promise<EmailJSResponseStatus> {
        try {
            const templateParams = {
                ...data,
                to_email: this.TEST_RECIPIENT_EMAIL, // This can be used in the template as {{to_email}}
                site_name: 'Conceição Lopes - Advogada'
            };

            const response = await emailjs.send(
                this.SERVICE_ID,
                this.TEMPLATE_ID,
                templateParams,
                this.PUBLIC_KEY
            );

            console.log('Email sent successfully!', response.status, response.text);
            return response;
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}
