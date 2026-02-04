import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, Phone, MapPin, Linkedin, Facebook, Clock } from 'lucide-angular';

/**
 * FooterComponent displays the firm's contact information, social links,
 * and navigation links. It also includes legal policy links.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  /** Icons used in the template */
  Mail = Mail;
  Phone = Phone;
  MapPin = MapPin;
  Linkedin = Linkedin;
  Facebook = Facebook;
  Clock = Clock;
}
