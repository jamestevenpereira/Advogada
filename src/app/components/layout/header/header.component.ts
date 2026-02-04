import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { BorderBeamComponent } from '../../magic-ui/border-beam/border-beam.component';

/**
 * HeaderComponent handles the main navigation of the application.
 * It includes a responsive design with a mobile-specific drawer menu.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, BorderBeamComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /** Signal to track the state of the mobile menu */
  isMenuOpen = signal(false);

  /** Icons used in the template */
  Menu = Menu;
  X = X;

  /**
   * Toggles the mobile menu state.
   */
  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  /**
   * Closes the mobile menu.
   */
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
