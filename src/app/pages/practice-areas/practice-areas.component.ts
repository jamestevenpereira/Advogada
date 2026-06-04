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
      title: 'Serviços Jurídicos em Nelas e Viseu',
      description: 'Serviços jurídicos em Nelas e Viseu: Direito da Família, Civil, Penal, Trabalho, Comercial e Administrativo. Consulta personalizada com a Dra. Conceição Lopes.',
      canonical: 'https://www.conceicaolopesadvogada.pt/areas',
    });
  }

  practiceAreas = [
    {
      title: 'Direito da Família',
      description: 'Divórcios, regulação do poder parental, pensão de alimentos, partilhas e inventários. Acompanhamento humano e discreto nos momentos mais difíceis da sua vida familiar.',
      icon: Heart,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Civil',
      description: 'Elaboração e revisão de contratos, responsabilidade civil, direitos reais e posse. Defendemos os seus interesses em litígios civis com rigor e eficácia.',
      icon: Scale,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito do Trabalho',
      description: 'Despedimento ilícito, rescisão com justa causa, assédio laboral, acidentes de trabalho e negociação de indemnizações. Defenda os seus direitos enquanto trabalhador.',
      icon: Briefcase,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Comercial',
      description: 'Constituição e dissolução de sociedades, contratos comerciais, recuperação de créditos e processos de insolvência. Assessoria jurídica para empresas e empresários do Distrito de Viseu.',
      icon: Building,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Penal',
      description: 'Defesa em processos-crime, constituição como assistente, recursos e habeas corpus. Representação discreta e eficaz em todas as fases do processo penal.',
      icon: Shield,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Administrativo',
      description: 'Impugnação de atos administrativos, contencioso tributário, licenciamentos e relações com entidades públicas. Defendemos os seus direitos face à Administração Pública.',
      icon: Gavel,
      class: 'md:col-span-1'
    }
  ];
}
