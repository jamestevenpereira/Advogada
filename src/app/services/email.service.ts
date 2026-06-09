import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    private readonly SERVICE_ID = environment.emailjs.serviceId;
    private readonly TEMPLATE_ID = environment.emailjs.templateId;
    private readonly PUBLIC_KEY = environment.emailjs.publicKey;
    private readonly RECIPIENT_EMAIL = environment.emailjs.recipientEmail;

    async sendAppointmentEmail(data: any): Promise<EmailJSResponseStatus> {
        const templateParams = {
            ...data,
            to_email: this.RECIPIENT_EMAIL,
            site_name: 'Conceição Lopes - Advogada'
        };

        const response = await emailjs.send(
            this.SERVICE_ID,
            this.TEMPLATE_ID,
            templateParams,
            this.PUBLIC_KEY
        );

        return response;
    }
}
