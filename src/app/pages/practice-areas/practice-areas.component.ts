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
      title: 'Serviços Jurídicos em Viseu',
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
      description: 'Elaboração e revisão de contratos, responsabilidade civil, direitos reais e posse. Quando os seus direitos são ignorados, agimos para os repor, com processos claros e sem surpresas.',
      icon: Scale,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito do Trabalho',
      description: 'Despedimento ilícito, rescisão com justa causa, assédio laboral, acidentes de trabalho e negociação de indemnizações. Quando o emprego termina de forma injusta, há sempre algo a fazer.',
      icon: Briefcase,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Comercial',
      description: 'Constituição e dissolução de sociedades, contratos comerciais, recuperação de créditos e processos de insolvência. Para empresários do Distrito de Viseu que precisam de um advogado que conhece a realidade local.',
      icon: Building,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Penal',
      description: 'Defesa em processos-crime, constituição como assistente, recursos e habeas corpus. A defesa começa na fase de inquérito; não espere pela acusação para agir.',
      icon: Shield,
      class: 'md:col-span-1'
    },
    {
      title: 'Direito Administrativo',
      description: 'Impugnação de atos administrativos, contencioso tributário, licenciamentos e relações com entidades públicas. Quando o Estado ou uma instituição ignora os seus direitos, temos as ferramentas para obrigar à resposta que merece.',
      icon: Gavel,
      class: 'md:col-span-1'
    }
  ];
}
