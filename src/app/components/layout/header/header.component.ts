import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X, ChevronDown, Heart, Scale, Briefcase, Building, Shield, Gavel } from 'lucide-angular';
import { BorderBeamComponent } from '../../magic-ui/border-beam/border-beam.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, BorderBeamComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isAreasOpen = signal(false);

  Menu = Menu;
  X = X;
  ChevronDown = ChevronDown;

  areas = [
    { label: 'Direito da Família', path: '/areas/direito-da-familia', icon: Heart },
    { label: 'Direito Civil', path: '/areas/direito-civil', icon: Scale },
    { label: 'Direito do Trabalho', path: '/areas/direito-do-trabalho', icon: Briefcase },
    { label: 'Direito Comercial', path: '/areas/direito-comercial', icon: Building },
    { label: 'Direito Penal', path: '/areas/direito-penal', icon: Shield },
    { label: 'Direito Administrativo', path: '/areas/direito-administrativo', icon: Gavel },
  ];

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
    if (!this.isMenuOpen()) this.isAreasOpen.set(false);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isAreasOpen.set(false);
  }

  toggleAreas(): void {
    this.isAreasOpen.set(!this.isAreasOpen());
  }
}
