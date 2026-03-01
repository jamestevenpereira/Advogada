import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BentoGridComponent, BentoCardComponent } from '../../components/magic-ui/bento-grid/bento-grid.component';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { MagicCardComponent } from '../../components/magic-ui/magic-card/magic-card.component';
import { BorderBeamComponent } from '../../components/magic-ui/border-beam/border-beam.component';
import { LucideAngularModule, Heart, Scale, Briefcase, Building, Shield, Gavel } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';

/**
 * PracticeAreasComponent showcases the various legal fields the firm specializes in.
 * It uses a Bento Grid layout for a modern, structured presentation.
 */
@Component({
  selector: 'app-practice-areas',
  standalone: true,
  imports: [
    CommonModule,
    BlurFadeComponent,
    BentoGridComponent,
    BentoCardComponent,
    MagicCardComponent,
    BorderBeamComponent,
    LucideAngularModule
  ],
  templateUrl: './practice-areas.component.html',
  styleUrl: './practice-areas.component.scss'
})
export class PracticeAreasComponent {
  /** Icons used in the template */
  ScaleIcon = Scale;

  constructor() {
    inject(SeoService).update({
      title: 'Áreas de Direito — Família, Trabalho, Penal, Comercial',
      description: 'Assessoria jurídica especializada em 6 áreas do direito em Nelas: Família, Civil, Trabalho, Comercial, Penal e Administrativo.',
      canonical: 'https://www.conceicaolopesadvogada.pt/areas',
    });
  }

  practiceAreas = [
    {
      title: 'Direito da Família',
      description: 'Divórcios, regulação das responsabilidades parentais, partilhas e inventários.',
      icon: Heart,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Civil',
      description: 'Contratos, responsabilidade civil e direitos reais.',
      icon: Scale,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito do Trabalho',
      description: 'Contestação de despedimentos, contratos de trabalho e direitos dos trabalhadores.',
      icon: Briefcase,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Comercial',
      description: 'Constituição de sociedades, assessoria a empresas e insolvências.',
      icon: Building,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Penal',
      description: 'Defesa e acompanhamento em processos-crime.',
      icon: Shield,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Administrativo',
      description: 'Relações com entidades públicas e contencioso administrativo.',
      icon: Gavel,
      class: 'md:col-span-1'
    }
  ];
}
