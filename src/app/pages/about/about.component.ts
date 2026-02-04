import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { RouterLink } from '@angular/router';

/**
 * AboutComponent displays the biography and professional profile of the lawyer.
 * It uses a split-screen layout with a prominent professional photo.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, BlurFadeComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent { }
