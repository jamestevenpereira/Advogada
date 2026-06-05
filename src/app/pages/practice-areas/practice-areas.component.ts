import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Heart, Scale, Briefcase, Building, Shield, Gavel } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-practice-areas',
  standalone: true,
  imports: [
    CommonModule,
    BlurFadeComponent,
    LucideAngularModule
  ],
  templateUrl: './practice-areas.component.html',
  styleUrl: './practice-areas.component.scss'
})
export class PracticeAreasComponent {
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
      icon: Heart
    },
    {
      title: 'Direito Civil',
      description: 'Elaboração e revisão de contratos, responsabilidade civil, direitos reais e posse. Defendemos os seus interesses em litígios civis com rigor e eficácia.',
      icon: Scale
    },
    {
      title: 'Direito do Trabalho',
      description: 'Despedimento ilícito, rescisão com justa causa, assédio laboral, acidentes de trabalho e negociação de indemnizações. Defenda os seus direitos enquanto trabalhador.',
      icon: Briefcase
    },
    {
      title: 'Direito Comercial',
      description: 'Constituição e dissolução de sociedades, contratos comerciais, recuperação de créditos e processos de insolvência. Assessoria jurídica para empresas e empresários do Distrito de Viseu.',
      icon: Building
    },
    {
      title: 'Direito Penal',
      description: 'Defesa em processos-crime, constituição como assistente, recursos e habeas corpus. Representação discreta e eficaz em todas as fases do processo penal.',
      icon: Shield
    },
    {
      title: 'Direito Administrativo',
      description: 'Impugnação de atos administrativos, contencioso tributário, licenciamentos e relações com entidades públicas. Defendemos os seus direitos face à Administração Pública.',
      icon: Gavel
    }
  ];
}
