import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WordRotateComponent } from '../../components/magic-ui/word-rotate/word-rotate.component';
import { MarqueeComponent } from '../../components/magic-ui/marquee/marquee.component';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, ChevronRight, ShieldCheck, Scale, Users } from 'lucide-angular';
import { DotPatternComponent } from '../../components/magic-ui/dot-pattern/dot-pattern.component';
import { ShinyButtonComponent } from '../../components/magic-ui/shiny-button/shiny-button.component';
import { MeteorsComponent } from '../../components/magic-ui/meteors/meteors.component';

/**
 * HomeComponent serves as the landing page for the website.
 * Features:
 * - Animated Hero section with Word Rotation.
 * - Testimonials Marquee with glassmorphism effects.
 * - Key features and values presentation.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WordRotateComponent,
    MarqueeComponent,
    BlurFadeComponent,
    LucideAngularModule,
    ShinyButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

  /** Icons used in the template */
  ChevronRight = ChevronRight;
  ShieldCheck = ShieldCheck;
  Scale = Scale;
  Users = Users;

  /** Redirects to scheduling page */
  schedulingRedirect() {
    this.router.navigate(['/agendamento']);
  }

  /**
   * Client testimonials data.
   * Displayed in the Marquee section.
   */
  testimonials = [
    {
      text: "Excelente serviço profissional. A Dra. Conceição Lopes resolveu o meu caso de divórcio rapidamente e com muita sensibilidade.",
      initials: "MJ",
      author: "Maria João",
      caseType: "Direito da Família"
    },
    {
      text: "Muito profissional e dedicada. Senti-me sempre acompanhado e bem informado durante todo o processo laboral.",
      initials: "RA",
      author: "Ricardo André",
      caseType: "Direito do Trabalho"
    },
    {
      text: "Uma advogada que realmente se preocupa com o cliente. Transparência total em todos os momentos.",
      initials: "PS",
      author: "Paula Santos",
      caseType: "Direito Civil"
    },
    {
      text: "Recomendo vivamente. Ética e competência num serviço jurídico de excelência.",
      initials: "LF",
      author: "Luís Ferreira",
      caseType: "Direito Comercial"
    },
    {
      text: "Dra. Conceição é uma profissional impecável. Senti-me segura e bem representada em todo o processo de partilhas.",
      initials: "AM",
      author: "Ana Martins",
      caseType: "Direito de Família"
    },
    {
      text: "Excelente atendimento e clareza nas explicações. Recomendo para qualquer assunto de direito comercial.",
      initials: "JP",
      author: "João Pedro",
      caseType: "Direito Comercial"
    },
    {
      text: "A dedicação e o rigor colocados no meu caso foram fundamentais para o sucesso. Muito grata pelo apoio.",
      initials: "HG",
      author: "Helena Gomes",
      caseType: "Direito Civil"
    }
  ];
}
